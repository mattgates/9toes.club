const router = require('express').Router();
const User = require('../model/User');

//endpoint to get a list of all users that are not hidden
router.get('/list', async (req, res) => {
    const list = await User.find({ hidden: false });
    if (list) return res.status(400).send(list);
});

module.exports = router;