var http = require("http");
var server = http.createServer(function (request, response) {

})

server.listen(1234, function() {
	console.log((new Date()) + " Server is listening on port 1234.");
});

var WebSocketServer = require("websocket").server;

var wsServer = new WebSocketServer({
	httpServer: server
});

var count = 0;
var clients = {};


// only runs when a request occurs
wsServer.on("request", function(r) {
	var connection = r.accept("echo-protocol", r.origin);

	var id = count++;
	clients[id] = connection;

	console.log((new Date()) + " Connection accepted [" + id + "]");

	// recieved  data
	connection.on("message", function(message) {
		console.log(">>>> " + typeof message + ", " + message.utf8Data + ", " + message.data);
		var messageString = message.utf8Data;
		for (var i in clients) {
			clients[i].sendUTF(messageString);
		}
	})

	connection.on("close", function(reasonCode, description) {
		delete clients[id];
		console.log((new Date()) +" Peer " + connection.remoteAddress + " disconnected.");
	})
	console.log(count);
});