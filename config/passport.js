const passport = require('passport');
const local_stratergy = require('passport-local');
const mongoose = require('mongoose');
const database = require('../database/authschema');

passport.use(new local_stratergy(
    function (username, password, done) {
        database.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

