const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../authorize/auth');
const post = require('../models').Message;

router.post('/register', ensureAuthenticated, (req, res) => {
    post.create({ title: req.body.title, UserId: req.user.id }).then(result => {
        res.status(200).json({
            message: 'Post create',
            post: result
        });
    });
});

module.exports = router;