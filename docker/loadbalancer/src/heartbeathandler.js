var fs = require('fs');
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var PORT = 7666;
var DEAD_AFTER_TIME = 5000; // ms
var REMOVE_DEAD_AFTER_TIME = 1000; // ms

var backends = [];

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
		}
	}

	backends = aliveBackends;

	console.log(backends);
}

function regenarateApacheConf() {
	fs.readFile('../conf/httpd-vhosts-lb.conf', 'utf8', function (err, file) {
		var lines = file.split(/\n\s*/);
		var newLines = [];
		var isInProxy = false;

		var i = 0;
		var l = lines.length;

		for (; i < l; i++) {
			newLines.push(lines[i]);

			if (lines[i] === '<Proxy balancer://backend>') {
				isInProxy = true;
				break;
			}
		}

		for (var j = 0; j < backends.length; j++) {
			newLines.push('BalancerMember http://' + backends[j].address + ':80');
		}

		newLines.push('ProxySet lbmethod=byrequests');

		for (; i < l; i++) {
			if (lines[i] === "</Proxy>") {
				isInProxy = false;
			}

			if (!isInProxy) {
				newLines.push(lines[i]);
			}
		}

		var newFile = newLines.join('\n');

		fs.writeFile('../conf/httpd-vhosts-lb.conf', newFile, function (err) {
			if (err) throw err;
			console.log('Apache conf updated');
		});
	});
}

function update() {
	removeDeadBackends();
	regenarateApacheConf();
}

setInterval(update, REMOVE_DEAD_AFTER_TIME);

server.bind(PORT);
