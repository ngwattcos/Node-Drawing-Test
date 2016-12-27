var ws = new WebSocket("ws://127.0.0.1:1234", "echo-protocol");

var registered = false;
var clientID;

var button = document.getElementById("button");

button.addEventListener("click", function() {
	var message = document.getElementById("message").value;
	ws.send(message);
});

var canvas = document.getElementById("canvas");
canvas.addEventListener("mouseup", function() {
	var message = strokeToString();
	ws.send(message);
})

// listen from server
ws.addEventListener("message", function(e) {
	var msg = e.data;
	document.getElementById("chatlog").innerHTML += "<p>" + msg + "</p>";
});