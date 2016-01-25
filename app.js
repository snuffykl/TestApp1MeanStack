'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 3000;

var nav = [
    {
        Link: '/Books',
        Text: 'Books'
    },
    {
        Link: '/Authors',
        Text: 'Authors'
    }
];

var bookRouters = require('./src/routes/bookRoutes')(nav);
var adminRouters = require('./src/routes/adminRoutes')(nav);
var authRouters = require('./src/routes/authRoutes')(nav);

//Middleware app.use(..)
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({secret: 'testApp1'}));

//SOC to do passport initialize/session/etc
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouters);
app.use('/Admin', adminRouters);
app.use('/Auth', authRouters);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Welcome SnuffyKL',
        nav: nav
    });

    app.get('/Books', function (req, res) {
        res.send('Hello Books');
    });
});

/* EJS templates */
//app.set('view engine', 'ejs');
//app.get('/', function (req, res) {
//    res.render('index', {
//        title: 'Hello from render',
//        serverList: ['a', 'b', 'c']
//    });
//});

/* Handlebars templates engine */
//var handlebars = require('express-handlebars');
//app.engine('.hbs', handlebars({
//    extname: '.hbs'
//}));
//app.set('view engine', '.hbs');
//app.get('/', function (req, res) {
//    res.render('index', {
//        title: 'Hello from render',
//        serverList: ['a', 'b', 'c']
//    });
//});

/* Jade templates engine */
//app.set('view engine', 'jade');
//app.get('/', function (req, res) {
//    res.render('index', {
//        serverList: ['a', 'b', 'c']
//    });
//});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});