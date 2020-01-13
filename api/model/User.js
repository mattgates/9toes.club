const mongoose = require('mongoose');

//Schema for the collection that holds user submission data
//username, submissions, appetizer, breakfast, brunch, dessert, dinner, drink, lunch, snack, date, and hidden
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        max: 40
    },
    submissions: {
        type: Number,
        min: 0,
        default: 0
    },
    dessert: {
        type: Number,
        min: 0,
        default: 0
    },
    drink: {
        type: Number,
        min: 0,
        default: 0
    },
    dinner: {
        type: Number,
        min: 0,
        default: 0
    },
    lunch: {
        type: Number,
        min: 0,
        default: 0
    },
    breakfast: {
        type: Number,
        min: 0,
        default: 0
    },
    brunch: {
        type: Number,
        min: 0,
        default: 0
    },
    snack: {
        type: Number,
        min: 0,
        default: 0
    },
    appetizer: {
        type: Number,
        min: 0,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    hidden: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'users'
    });

module.exports = mongoose.model('User', userSchema);