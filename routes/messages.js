const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

var User = require('../models/user');
var Message = require('../models/message');

//find the messages
router.get('/', (req, res, next) => {
    //res.send('messages page');
    //res.render('index');
    Message.find()
        .populate('user', 'username')
        .exec((err, messages) => {
            if(err){
                return res.status(500).json({
                    title: '500 error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
});

router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err, decoded)=>{
        if(err) {
             return res.status(401).json({
                 title: 'not authenticated',
                 error: err
             });
        }
        next(); //go to next middleware
    })
});

//add message
router.post('/', (req, res, next) =>{
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err,user) => {
        if(err) {
            return res.status(500).json({
                title: '500 error',
                error: err
            });
        }

        var message = new Message({
            content: req.body.content,
            user: user
        });
        //save the message
        message.save((err, result) =>{
            if(err) {
                return res.status(500).json({
                    title: '500 error',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'saved',
                obj: result
            });
        });
    });
});

//update the message
router.patch('/:id', (req, res, next) => {
    var decoded = jwt.decoded(req.query.token);
    Message.findById(req.params.id, (err, message) => {
        if(err) {
            return res.status(500).json({
                title: '500 error',
                error: err
            });
        }
        if(!message) {
             return res.status(500).json({
                 title: 'No message found!',
                 error: { message: 'message not found'}
             });
        }
        message.content= req.body.content;
        message.save((err, result) => {
            if(err) {
                return res.status(500).json({
                    title: '500 error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'update message',
                obj: result
            });
        });
    });
});

//delete the message
router.delete('/:id', (req, res, next) => {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, (err, message) =>{
        if(err) {
            return res.status(500).json({
                title: '500 error',
                error: err
            });
        }
        if(!message) {
            return res.status(500).json({
                title: 'No message found!',
                error: { message: 'message not found'}
            });
        }
        if(message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'invalid authentications',
                error: { message: 'users do not match'}
            });
        }
        message.remove((err, result) => {
            if(err) {
                return res.status(500).json({
                    title: '500 error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted',
                obj: result
            });
        });
    });
});



module.exports = router;
