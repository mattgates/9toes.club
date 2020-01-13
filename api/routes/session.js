const router = require("express").Router();
const Session = require("../model/Session");
const Account = require("../model/Account");
const Joi = require("@hapi/joi");

//validation for creating a new session. kinda useless?
const sessionValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(1)
      .max(40)
      .required()
  });
  return schema.validate(data);
};

//endpoint to make a new session
router.post("/new", async (req, res) => {
  //checks request body to validate the sent data. just a username and returns an error if invalid
  const { error } = sessionValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  //checks if a user is in the Accounts collection. returns invalid if not
  const usernameExists = await Account.findOne({
    username: new RegExp("^" + req.body.username + "$", "i")
  });
  if (!usernameExists)
    return res.status(400).send({ error: "Invalid request." });
  if (usernameExists) {
    //looks to see if the user has another session open at the time and cancels that before making a new one
    await Session.findOneAndDelete({ username: req.body.username });

    //creates new session
    const session = new Session({
      username: req.body.username
    });
    try {
      const savedSession = await session.save();
      //returns the session id and username if the session was successfully made. these will be used to make cookies to track the session
      res.send({ _id: savedSession._id, username: savedSession.username });
    } catch (err) {
      //? make this return "Invalid request."?
      res.status(400).send({ error: err });
    }
  }
});

//endpoint to validate a user's session
router.post("/validate", async (req, res) => {
  //checks to see if both the session id and username were submitted
  //TODO add regex validation on these since the id isn't in the schema
  if (!req.body._id || !req.body.username) {
    return res.status(400).send({ error: "Invalid request." });
  }

  //checks if a session is active with that id
  const sessionExists = await Session.findById(req.body._id);

  //if the session exists and the usernames match up too then validate the session
  if (sessionExists && req.body.username === sessionExists.username) {
    return res.status(200).send({ response: "Valid." });
  }
  //else return invalid
  return res.status(400).send({ error: "Invalid request." });
});

//endpoint to terminate a session id. triggered by logout button
router.delete("/terminate", async (req, res) => {
  //TODO add regex to id check
  if (!req.body._id) return res.status(400).send({ error: "Invalid request." });

  //looks for the session and terminates it if found
  const sessionExists = await Session.findByIdAndDelete(req.body._id);

  if (sessionExists) {
    return res.status(200).send({ response: "Session terminated." });
  } else {
    return res.status(400).send({ error: "Invalid request." });
  }
});

module.exports = router;
