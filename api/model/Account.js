const mongoose = require('mongoose');

//Schema for the collection that holds user login/account data
//username, email, password, and (creation) date
const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        max: 40
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 12,
        max: 512
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: 'accounts'
    });

module.exports = mongoose.model('Account', accountSchema);