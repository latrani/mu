var db = require("./modules/database.js");

var connection = db.connection,
    Account = db.Account,
    Location = db.Location;

connection.once('open', function(foo) {

    // console.log(this.collections.accounts.drop);

    this.collections.accounts.drop();
    this.collections.locations.drop();

    (new Account({username: "Indi", password: "foobar"})).save();
    (new Account({username: "Anawyn", password: "mirage"})).save();

    (new Location({name: "The Ether"})).save();
    (new Location({name: "Winter Den"})).save();

    Account.find(function(err, accounts){
        console.log("Accounts:", accounts.length);
    });

    Location.find(function(err, locations){
        console.log("Locations:", locations.length);
    });
});