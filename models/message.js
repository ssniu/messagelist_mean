const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//require the user object
var User = require('./user');

var MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

//const Message = module.exports = mongoose.model('Message', MessageSchema);

/*
//crud methods
//get all messages
module.exports.getMessages =(callback, limit) => {
    Message.find(callback).limit(limit);
}

//get one task
module.exports.getMessageById = (id, callback) => {
    Message.findById(id, callback);
}

//add message
module.exports.addMessage = (message, callback) => {
    Message.create(message,callback);
}

//update a single message
module.exports.updateMessage =(id, message, options, callback) => {
    var query = {_id: id};
    var update = {
        date: 'Mon-Tue'
    }
    Message.findOneAndUpdate(query, update, options, callback);
}

//delete message
module.exports.removeMessage = (id, callback) => {
    var query = {_id: id};
    Message.remove(query, callback);
}
*/

MessageSchema.post('remove', function (message) {
    User.findById(message.user, function (err, user) {
        user.messages.pull(message);
        user.save();
    });
});

 module.exports = mongoose.model('Message', MessageSchema);
