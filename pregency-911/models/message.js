const mongoose = require('mongoose')
const messageSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    }
});

const messageModel = mongoose.model("message", messageSchema);
module.exports = messageModel;