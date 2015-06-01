var dgram = require('dgram');
var socket = dgram.createSocket("udp4");

var BROADCAST_ADDR = "255.255.255.255";
var PORT = 7666;
var BEAT_INTERVAL = 1000; // ms

socket.bind(function () {
	socket.setBroadcast(true);
});


function beat() {
	var data = {
		type: 'backend'
		// Feel free to add data here!
	};

	var json = JSON.stringify(data);
	var message = new Buffer(json);
	socket.send(message, 0, message.length, PORT, BROADCAST_ADDR);

	console.log("beat");
}

setInterval(beat, BEAT_INTERVAL);
