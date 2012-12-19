var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mu');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AccountSchema = new Schema({
    'username': { type: String, index: true },
    'password': String
});

var LocationSchema = new Schema({
    'name': String,
    'occupants': [AccountSchema]
});

var Account = mongoose.model('Account', AccountSchema);
var Location = mongoose.model('Location', LocationSchema);

console.log("Done with Schemae");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
    Account: Account,
    Location: Location,
    connection: db
};
