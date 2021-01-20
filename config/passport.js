const express = require('express');
const mongoose = require('mongoose');
const database = require('../database/authschema')
const passport = require('passport');
const bcrypt = require('bcrypt');

const google_strat = require('passport-google-oauth20').Strategy;

const g_id = require('../keys').google_Id;
const g_se = require('../keys').google_secrete;


passport.serializeUser((user, done) => {
    done(null, user);

})




passport.deserializeUser((user, done) => {
    done(null, user)
})






passport.use(new google_strat({
    callbackURL: "http://localhost:5000/home/auth/googleredirect",
    clientID: g_id,
    clientSecret: g_se

}
    , (accessstoken, refreshtoken, profile, done) => {
        done(null, profile);

    })
)

