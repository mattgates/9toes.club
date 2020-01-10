const router = require("express").Router();
const Account = require("../model/Account");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

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

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const emailExists = await Account.findOne({
    email: new RegExp("^" + req.body.email + "$", "i")
  });
  if (emailExists)
    return res.status(400).send({ error: "That email is already registered." });

  const usernameExists = await Account.findOne({
    username: new RegExp("^" + req.body.username + "$", "i")
  });
  if (usernameExists)
    return res
      .status(400)
      .send({ error: "That username is already registered." });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

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

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ error: "Invalid credentials." });

  const user = await Account.findOne({
    username: new RegExp("^" + req.body.username + "$", "i")
  });
  if (!user) return res.status(400).send({ error: "Invalid credentials." });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Invalid credentials." });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res
    .header("auth-token", token)
    .send({ response: "Logged in as " + user.username });
});

module.exports = router;
