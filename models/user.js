const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const mongooseValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

UserSchema.plugin(mongooseValidator);

//const User = module.exports = mongoose.model('Message', UserSchema);
const User = module.exports = mongoose.model('User', UserSchema);

//find a user by id
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

//find a user by username
module.exports.getUserByUsername = (username, callback) => {
    const query={ username: username}
    User.findOne(query, callback);
}

//add a user
module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

//compare the password
module.exports.comparePassword = (candidatePwd, hash, callback) => {
    bcrypt.compare(candidatePwd, hash, (err, isMatch) => {
        if(err) {
            throw err;
        }
        callback(null, isMatch);
    });
}
