const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/db_test');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    surname: String,
    mail: String
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

