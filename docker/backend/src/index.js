var express = require('express');
var os = require('os');
var app = express();

/**
 * Random number between 0 and 10000
 */
app.get('/rand', function(req, res) {
	res.send('' + Math.floor(Math.random() * 10000));
});

/**
 * Local uptime
 */
app.get('/uptime', function(req, res) {
	res.send(os.uptime() + ' s');
});

/**
 * Network informations
 */
app.get('/net', function(req, res) {
	res.send(os.networkInterfaces());
});

var serv = app.listen(3000, function() {
	var host = serv.address().address;
	var port = serv.address().port;

	console.log('Listening at http://%s:%s', host, port);
});