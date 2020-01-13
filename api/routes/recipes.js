const router = require("express").Router();
const verify = require("./verifyToken");
const Recipe = require("../model/Recipe");
const User = require("../model/User");
const Joi = require("@hapi/joi");

//TODO add console.log() to view activity

//validation schema for recipe submissions
const recipeValidation = data => {
  const schema = Joi.object({
    title: Joi.string()
      .min(1)
      .max(200)
      .required(),
    credited: Joi.string()
      .min(1)
      .max(40),
    cookTime: Joi.string()
      .min(1)
      .max(40)
      .required(),
    prepTime: Joi.string()
      .min(1)
      .max(40)
      .required(),
    ingredients: Joi.array().items(
      Joi.string()
        .min(1)
        .required()
    ),
    instructions: Joi.array().items(
      Joi.string()
        .min(1)
        .required()
    ),
    appetizer: Joi.bool().required(),
    breakfast: Joi.bool().required(),
    brunch: Joi.bool().required(),
    dessert: Joi.bool().required(),
    dinner: Joi.bool().required(),
    drink: Joi.bool().required(),
    lunch: Joi.bool().required(),
    snack: Joi.bool().required(),
    hidden: Joi.bool().required(),
    submittedBy: Joi.string()
      .required()
      .min(1)
      .max(40),
    about: Joi.string().max(2000)
  });
  return schema.validate(data);
};

//endpoint for getting a list of recipes
router.get("/recipes", async (req, res) => {
  //if a username is submitted then it'll search only for recipes submitted by that user
  if (req.query.username) {
    const recipe = await Recipe.find({
      hidden: false,
      submittedBy: req.query.username
    });

    if (recipe) return res.send(recipe);
  }
  //otherwise it'll just find all that are not hidden
  else {
    const recipe = await Recipe.find({ hidden: false });
    if (recipe) return res.send(recipe);
  }
});

//endpoint for post request
router.post("/recipes", async (req, res) => {
  //validates request body and returns error if necessary
  const { error } = recipeValidation(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send({ error: error });
  }

  //creates new recipe object with the Recipe schema
  const recipe = new Recipe({
    title: req.body.title,
    cookTime: req.body.cookTime,
    prepTime: req.body.prepTime,
    cedited: req.body.credited,
    appetizer: req.body.appetizer,
    breakfast: req.body.breakfast,
    brunch: req.body.brunch,
    dessert: req.body.dessert,
    dinner: req.body.dinner,
    drink: req.body.drink,
    lunch: req.body.lunch,
    snack: req.body.snack,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    hidden: req.body.hidden,
    submittedBy: req.body.submittedBy
  });

  //stores the recipe in the database
  //TODO error handling for this
  const savedRecipe = await recipe.save();

  //increments user submissions by 1
  await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { submissions: 1 } });

  if (req.body.appetizer) await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { appetizer: 1 } });
  if (req.body.breakfast) await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { breakfast: 1 } });
  if (req.body.brunch) await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { brunch: 1 } });
  if (req.body.dessert) await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { dessert: 1 } });
  if (req.body.dinner) await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { dinner: 1 } });
  if (req.body.drink) await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { drink: 1 } });
  if (req.body.lunch) await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { lunch: 1 } });
  if (req.body.snack) await User.findOneAndUpdate({ 'username': req.body.submittedBy }, { $inc: { snack: 1 } });

  //return recipe title after it has been saved
  res.send({ title: savedRecipe.title });
});

//endpoint to get a singular recipe
router.get("/recipe", async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.query._id });
  console.log(recipe.title);
  if (recipe) return res.send(recipe);
  //TODO error handling with this
});

module.exports = router;
