const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    referalId: {
        type: String,
        required: false
    },
    referralname: {
        type: String,
        required: false
    }


})


module.exports = mongoose.model("authschema", schema);