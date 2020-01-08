const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 1,
        max: 200,
        required: true
    },
    cookTime: {
        type: String,
        min: 5,
        max: 50,
        required: true
    },
    prepTime: {
        type: String,
        min: 5,
        max: 50,
        required: true
    },
    ingredients: {
        type: [String],
        min: 1,
        max: 20000,
        required: true
    },
    instructions: {
        type: [String],
        min: 1,
        max: 20000,
        required: true
    },
    author: {
        type: String,
        required: true,
        min: 1,
        max: 40
    },
    type: {
        type: String,
        required: true,
        min: 1,
        max: 40
    },
    date: {
        type: Date,
        default: Date.now
    },
    hidden: {
        type: Boolean,
        required: true,
        default: false
    },
    submittedBy: {
        type: String,
        required: true,
        min: 1,
        max: 40
    }
},
{
    collection: 'recipes'
});

module.exports = mongoose.model('Recipe', recipeSchema);