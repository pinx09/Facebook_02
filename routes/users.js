var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/facebook");
var schema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String
});

schema.plugin(plm);

module.exports = mongoose.model('user', schema);