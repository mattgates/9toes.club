const mongoose = require("mongoose");

//Schema for the collection that holds recipe submission data
//title, cookTime, prepTime, ingredients[], instructions[], appetizer, breakfast, brunch, dessert, dinner, drink, lunch, snack, submittedBy, credited, about, hidden, and (creation) date
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 1,
      max: 200,
      required: true
    },
    cookTime: {
      type: String,
      min: 1,
      max: 40,
      required: true
    },
    prepTime: {
      type: String,
      min: 1,
      max: 40,
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
    credited: {
      type: String,
      min: 1,
      max: 40
    },
    appetizer: {
      type: Boolean,
      required: true
    },
    breakfast: {
      type: Boolean,
      required: true
    },
    brunch: {
      type: Boolean,
      required: true
    },
    dessert: {
      type: Boolean,
      required: true
    },
    dinner: {
      type: Boolean,
      required: true
    },
    drink: {
      type: Boolean,
      required: true
    },
    lunch: {
      type: Boolean,
      required: true
    },
    snack: {
      type: Boolean,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    hidden: {
      type: Boolean,
      required: true
    },
    submittedBy: {
      type: String,
      required: true,
      min: 1,
      max: 40
    },
    about: {
      type: String,
      max: 2000
    }
  },
  {
    collection: "recipes"
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
