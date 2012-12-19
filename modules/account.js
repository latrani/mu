var klass = require("klass");

var ACCOUNT_INDEX = 0;

var Account = klass(function (name, password, start_location) {
    this.id = "c" + ACCOUNT_INDEX++;
    this.name = name;
    this.password = password;
    this.start_location = start_location;
    this.connection = null;
})
.methods({
    connect: function(connection) {
        this.connection = connection;
        this.connection.account = this;
        this.start_location.add(this);
        this.location.emit(this.name + ' has connected.', {except: this});
    },
    notify: function(msg) {
        if (this.connection) {
            this.connection.notify(msg);
        }
    }
});

module.exports = Account;