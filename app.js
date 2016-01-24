'use strict';

var express = require('express');

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

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouters);
app.use('/Admin', adminRouters);

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