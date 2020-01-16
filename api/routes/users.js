const router = require('express').Router();
const User = require('../model/User');

//endpoint to get a list of all users that are not hidden
router.get('/list', async (req, res) => {
    const list = await User.find({ hidden: false });
    if (list) {
        console.log("Retreiving list of users");
        return res.status(200).send(list);
    }
    else {
        console.log("ERROR: list of users");
        return res.status(400).send({ error: "Invalid request." })
    }
});

module.exports = router;