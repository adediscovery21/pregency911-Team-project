const mongoose = require('mongoose')
const loginSchema = mongoose.Schema({
   
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
   
});

const loginModel = mongoose.model("login", loginSchema);
module.exports = loginModel;