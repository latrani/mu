var klass = require("klass");

var CONN_INDEX = 0;

var Connection = klass(function (socket, database) {
    this.id = "c" + CONN_INDEX++;
    this.socket = socket;
    this.database = database;
    this.account = null;
})
.methods({
    handle_input: function(raw_data) {
        var data = raw_data.toString().replace(/(\r\n|\n|\r)/gm,"");
        if(data === "QUIT" || data.toUpperCase() === "/quit") {
            if (this.account) {
                this.account.location.emit(this.account.name + ' has disconnected.', {except: this});
            }
            this.notify("Goodbye!");
            this.socket.end();
        }
        else {
            var tokens = data.split(" ");
            var command = tokens[0].toLowerCase();
            var msg;
            if (!this.account) {
                if (command === "connect" || command === "co") {
                    this.handle_connect(tokens[1], tokens[2]);
                }
                else {
                    this.notify("You must log in!");
                }
                return;
            }

            if (command === "say") {
                msg = tokens.slice(1).join(" ");
                this.account.location.emit(this.account.name + ' says, "' + msg + '"', {except: this.account});
                this.notify('You say, "' + msg + '"');
            }
            else if (command === "pose") {
                msg = tokens.slice(1).join(" ");
                this.account.location.emit(this.account.name + ' ' + msg);
            }
            else {
                this.notify("I don't understand that command.");
            }
        }
    },

    handle_connect: function(name, password) {
        this.notify("handle_connect");
        var account = this.database.accounts[name];
        if (!account) {
            this.notify("Can't find an account with that name!");
            return;
        }
        else if (account.password !== password) {
            this.notify("Wrong password!");
            return;
        }
        else {
            account.connect(this);
        }
    },
    notify: function(msg) {
        this.socket.write(msg + "\n");
    }
});

module.exports = Connection;