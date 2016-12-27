var ws = new WebSocket("ws://127.0.0.1:1234", "echo-protocol");

var registered = false;
var client = {};



var button = document.getElementById("button");

button.addEventListener("click", function() {
	var message = document.getElementById("message").value;
	ws.send(message);
});

var canvas = document.getElementById("canvas");
// send strokes to the server
canvas.addEventListener("mouseup", function() {
	if (client.id != undefined) {
		var message = strokeToString();
		ws.send(JSON.stringify(strokes[strokeNum]));
	}
	
})

// listen from server
ws.addEventListener("message", function(e) {
	var msg = e.data;
	if (isDirective(msg)) {
		saveInfo(msg);
	}

	console.log(msg);
	// document.getElementById("chatlog").innerHTML += "<p>" + msg + "</p>";
});

function isDirective(str) {
	if (str.length > 0 && str[0] == "*") {
		return true;
	}

	return false;
}

function saveInfo(str) {
	var commands = str.split(",");
	var key = commands[0];
	var value = commands[1];
	client[key.substring(1, key.length)] = value;
}