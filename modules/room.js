var klass = require("klass");

var ROOM_INDEX = 0;

var Room = klass(function(name) {
    this.name = name;
    this.id = "r" + ROOM_INDEX++;
    this.occupants = [];
})
.methods({
    emit: function(msg, options) {
        options = options || {};
        this.occupants.forEach(function(occupant) {
            if (occupant !== options.except) {
                occupant.notify(msg);
            }
        });
    },
    add: function(occupant) {
        this.occupants.push(occupant);
        occupant.location = this;
        occupant.notify("You have entered " + this.name);
    }
});

module.exports = Room;