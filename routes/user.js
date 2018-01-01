const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.send('users page');
    //res.render('index');
});

//register page
router.post('/register', (req, res, next) => {
    var newUser = new User({
        firstname: req. body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        user: req.body.user
    });
    User.addUser(newUser,(err, user) => {
        if(err){
            return res.status(500).json({
                title: '500 error',
                error: err
            });
        }
        res.status(201).json({
            message: "new user is registered.",
            obj: user
        });
    });
});

//user sign in
router.post('/signin', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            return res.status(500).json({
                title: 'An error 500',
                error: err
            });
        }
        if(!user) {
            return res.status(401).json({
                title: 'not able to login',
                error: {message: 'invalid creadentials'}
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'password does not match',
                error: { message: 'invalid password'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Login successfully',
            token: token,
            userId: user._id
        });
    });
});

module.exports = router;
