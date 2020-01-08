const router = require('express').Router();
const User = require('../model/User');

router.get('/list', async (req, res) => {
    const list = await User.find({hidden: false});
    if(list) return res.send(list);
});

module.exports = router;