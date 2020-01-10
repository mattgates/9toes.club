const router = require("express").Router();
const verify = require("./verifyToken");
const Recipe = require("../model/Recipe");
const Joi = require("@hapi/joi");

const recipeValidation = data => {
  const schema = Joi.object({
    title: Joi.string()
      .min(1)
      .max(200)
      .required(),
    author: Joi.string()
      .min(1)
      .max(40)
      .required(),
    cookTime: Joi.string()
      .min(5)
      .max(50)
      .required(),
    prepTime: Joi.string()
      .min(5)
      .max(50)
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
    type: Joi.string()
      .min(1)
      .max(50)
      .required(),
    hidden: Joi.bool().required(),
    submittedBy: Joi.string()
      .required()
      .min(1)
      .max(40)
  });
  return schema.validate(data);
};

router.get("/recipes", async (req, res) => {
  if (req.query.username) {
    const recipe = await Recipe.find({
      hidden: false,
      submittedBy: req.query.username
    });
    if (recipe) return res.send(recipe);
  } else {
    const recipe = await Recipe.find({ hidden: false });
    if (recipe) return res.send(recipe);
  }
});

router.post("/recipes", async (req, res) => {
  console.log("here");

  console.log(req.body);
  const { error } = recipeValidation(req.body);
  if (error) return res.status(400).send({ error: error });
  const recipe = new Recipe({
    title: req.body.title,
    cookTime: req.body.cookTime,
    prepTime: req.body.prepTime,
    author: req.body.author,
    type: req.body.type,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    hidden: req.body.hidden,
    submittedBy: req.body.submittedBy
  });

  const savedRecipe = await recipe.save();
  res.send({ title: savedRecipe.title });
});

router.get("/recipe", async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.query._id });
  console.log(recipe.title);
  if (recipe) return res.send(recipe);
});
module.exports = router;
