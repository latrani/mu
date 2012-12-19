var net = require('net');

// var database = require("./modules/database.js");
var Connection = require("./modules/connection.js");
var Account = require("./modules/account.js");
var Room = require("./modules/room.js");

var connections = {};

var etherRoom = new Room("The Ether");

var database = {
    accounts: {
        "indi": new Account("Indi", "foobar", etherRoom),
        "anawyn": new Account("Anawyn", "mirage", etherRoom),
        "blue": new Account("Cobaltie", "bluething", etherRoom)
    },
    rooms: {
        "den": new Room("Winter Den"),
        "ether": etherRoom,
    }
};

// Callback method executed when a new TCP socket is opened.
var newSocket = function(socket) {
    var connection = new Connection(socket, database);
    console.log("New connection:", connection.id);

    connections[connection.id] = connection;

    connection.notify('Welcome to the server!');
    connection.notify('You are connection ' + connection.id + '.');
    connection.notify('Log in with "connect <name> <password>"');

    socket.on('data', function(data) {
        connection.handle_input(data);
        // handle_input(connection, data);
    });

    socket.on('end', function() {
        console.log("Connection closed:", connection.id);
        delete connections[connection.id];
    });
};

var server = net.createServer(newSocket);
server.listen(8888);
