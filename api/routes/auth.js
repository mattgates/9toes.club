const router = require("express").Router();
const Account = require("../model/Account");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

//TODO add console.log() to view activity

//validation for user registration
const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(1)
      .max(40)
      .required()
      .alphanum(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(12)
      .max(512)
      .required()
  });
  return schema.validate(data);
};

//validation for user login
const loginValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(1)
      .max(40)
      .required()
      .alphanum(),
    password: Joi.string()
      .min(12)
      .max(512)
      .required()
  });
  return schema.validate(data);
};

//endpoint for user registration
router.post("/register", async (req, res) => {
  //checks for issues with the request data sent to the API and returns an error if the input is invalid
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  //checks if the email is already registered in the database. returns that error if true
  const emailExists = await Account.findOne({
    email: new RegExp("^" + req.body.email + "$", "i")
  });
  if (emailExists)
    return res.status(400).send({ error: "That email is already registered." });

  //checks if the username is already registerd in the database. returns that error if true
  const usernameExists = await Account.findOne({
    username: new RegExp("^" + req.body.username + "$", "i")
  });
  if (usernameExists)
    return res.status(400).send({ error: "That username is already registered." });

  //hash the password again before storage
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //attempts to add new user to the Account collection
  const account = new Account({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedAccount = await account.save();
    res.send({ user: savedAccount.username });
  } catch (err) {
    res.status(400).send(err);
  }

  //attempts to add new user to the User collection
  const user = new User({
    username: req.body.username
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser.username });
  } catch (err) {
    res.status(400).send(err);
  }
});

//endpoint for user login. all generif invalid returns are used in order to prevent an attacker from figuring out if any of the credentials are valid
router.post("/login", async (req, res) => {
  //checks if the request body data is valid. returns error if true
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ error: "Invalid credentials." });

  //checks if a user is registered with that username. if not then an error is returned
  const user = await Account.findOne({
    username: new RegExp("^" + req.body.username + "$", "i")
  });
  if (!user) return res.status(400).send({ error: "Invalid credentials." });

  //compares the user submitted password to the one hashed and stored with that username 
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Invalid credentials." });

  //!figure out what to do with this
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({
    response: "Logged in as " + user.username
  });
});

module.exports = router;
