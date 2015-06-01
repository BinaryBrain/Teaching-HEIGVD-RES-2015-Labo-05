var fs = require('fs');
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var exec = require('child_process').exec,
    child;

var PORT = 7666;
var DEAD_AFTER_TIME = 5000; // ms
var REMOVE_DEAD_AFTER_TIME = 1000; // ms
// var LOADBALANCER_CONF = '../conf/httpd-vhosts-lb.conf';
var LOADBALANCER_CONF = '/usr/local/apache2/conf/extra/httpd-vhosts-lb.conf';

var backends = [];

var modified = false;

server.on('error', function (err) {
	console.error("Heartbeat handler error!");
	console.error(err.stack);
	server.close();
});

server.on('message', function (json, sender) {
	console.log("server got: " + json + " from " + sender.address + ":" + sender.port);
	var msg = JSON.parse(json);

	if (typeof msg.type !== 'undefined' && msg.type === 'backend') {
		addOrUpdateBackend(sender.address);
		console.log(backends);
	}
});

function addOrUpdateBackend(addr) {
	var backend = null;

	// Get the backend if it exists
	for (var i = 0, l = backends.length; i < l; i++) {
		if (backends[i].address === addr) {
			backend = backends[i];
		}
	}

	// if it doesn't, we create it
	if (backend === null) {
		backends.push({
			address: addr,
			lastBeat: new Date()
		});

		modified = true;
	}
	// otherwise, we update it
	else {
		backend.lastBeat = new Date();
	}
}

function removeDeadBackends() {
	var aliveBackends = [];

	for (var i = 0, l = backends.length; i < l; i++) {
		if (new Date() - backends[i].lastBeat <= DEAD_AFTER_TIME) {
			aliveBackends.push(backends[i]);
		} else {
			modified = true;
		}
	}

	backends = aliveBackends;

	console.log(backends);
}

function regenarateApacheConf() {
	fs.readFile(LOADBALANCER_CONF, 'utf8', function (err, file) {
		var lines = file.split(/\n\s*/);
		var newLines = [];
		var isInProxy = false;

		var i = 0;
		var l = lines.length;

		// We copy every lines from the original file until we met the Proxy Backend part
		for (; i < l; i++) {
			newLines.push(lines[i]);

			if (lines[i] === '<Proxy balancer://backend>') {
				isInProxy = true;
				break;
			}
		}

		// We add every backend to the file
		for (var j = 0; j < backends.length; j++) {
			newLines.push('BalancerMember http://' + backends[j].address + ':3000');
		}

		// Backend proxy config
		newLines.push('ProxySet lbmethod=byrequests');

		// And we copy the end of the original file
		for (; i < l; i++) {
			if (lines[i] === "</Proxy>") {
				isInProxy = false;
			}

			if (!isInProxy) {
				newLines.push(lines[i]);
			}
		}

		var newFile = newLines.join('\n');

		// We write the file
		fs.writeFile(LOADBALANCER_CONF, newFile, function (err) {
			if (err) throw err;
			console.log('Apache conf updated');

			// Shell command
			child = exec('apachectl restart',
			  function (error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			      console.log('exec error: ' + error);
			    }
			});

		});
	});
}

function update() {
	removeDeadBackends();
	
	if (modified) {
		regenarateApacheConf();
	}

	modified = false;
}

setInterval(update, REMOVE_DEAD_AFTER_TIME);

server.bind(PORT);
