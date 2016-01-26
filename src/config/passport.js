var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    //Store into DB
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    //Get out to store in passport session.
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    require('./strategies/local.strategy')();
};

/*Another alternative way to declare module.exports*/

//var passportFunction = function (app) {
//    app.use(passport.initialize());
//    app.use(passport.session());
//
//    //Store into DB
//    passport.serializeUser(function (user, done) {
//        done(null, user);
//    });
//
//    //Get out to store in passport session.
//    passport.deserializeUser(function (user, done) {
//        done(null, user);
//    });
//
//    require('./strategies/local.strategy')();
//};
//
//module.exports = passportFunction;