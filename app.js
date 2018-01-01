const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//route files
const appRoutes = require('./routes/index');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');

var app = express();
mongoose.connect('mongodb://localhost/messages', { useMongoClient: true });
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/messages');

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var port = 3000;
//setup the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//use middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set the headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, PATCH, DELETE, OPTIONS');
    next();
});

//set the routes
app.use('/', appRoutes);
app.use('/message', messageRoutes);
app.use('/user', userRoutes);


//listen to port
app.listen(port, ()=>{
    console.log("Server at " + port);
});
//catch the error and 404
app.use((req, res, next) => {
    return res.render('index');
});

module.exports = app;
