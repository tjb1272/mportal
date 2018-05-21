const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../models');
const { ensureAuthenticated } = require('../authorize/auth');
const flash = require('connect-flash');


// Register
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    });
    req.flash('success_msg', 'You have successfully registered your account!');
    res.redirect('home');
});

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/success',
        failureRedirect: '/users/failure'
    })(req, res, next);
    console.log('log in attempt');
});



//Home
router.get('/home', (req, res) => {
    res.render('home');
});

//Logout
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are now logged out!');
    res.redirect('home');
    console.log('logged out');
});


//Failure
router.get('/failure', (req, res) => {
    req.flash('error_msg', 'Something went wrong! Please try again.');
    res.redirect('login');
    console.log('log in failure');
});

//Success
router.get('/success', (req, res, next) => {
    req.flash('success_msg', 'You are now logged in!');
    res.redirect('home');
    console.log('log in success');
});

router.get('/protected', ensureAuthenticated, (req, res) => {
    res.send('You have successfully logged in.');
});

module.exports = router;