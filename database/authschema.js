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
        required: false
    },
    confirm_password: {
        type: String,
        required: false
    },
    referfrom: [{
        child_node_name: String,
        Child_node_email: String,
        Child_node_referalID: String,
        Child_node_referral_name: String
    }]
    ,
    referalId: {
        type: String,
        required: false
    },
    referralname: {
        type: String,
        required: false
    },
    referlto: [{
        child_node_name: String,
        Child_node_email: String,
        Child_node_referalID: String,
        Child_node_referral_name: String
    }]


})


module.exports = mongoose.model("authschema", schema);