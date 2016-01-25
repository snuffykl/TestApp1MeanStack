var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

var localStrategy = function () {

    passport.use(new LocalStrategy({
            //Get data DOM from index.ejs
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            var url = 'mongodb://localhost:27017/testApp1';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                collection.findOne({
                    username: username
                }, function (err, results) {
                    if (results.password === password) {
                        var user = results;
                        done(null, user);
                    } else {
                        done(null, false, {
                            message: 'Bad password'
                        });
                    }

                });
            });
        }));
};

module.exports = localStrategy;