const express = require('express');
const mongoose = require('mongoose');
const database = require('../database/authschema')
const passport = require('passport');
const bcrypt = require('bcrypt');

const google_strat = require('passport-google-oauth20');

const g_id = require('../keys').google_Id;
const g_se = require('../keys').google_secrete;


passport.serializeUser((user, done) => {
    done(null, user.id);

})




passport.deserializeUser((id, done) => {

    database.findById(id).then((user) => {
        done(null, user)
    })
        .catch((err) => {
            console.log(err);
        })
})






passport.use(new google_strat({
    callbackURL: "/home/auth/googleredirect",
    clientID: g_id,
    clientSecret: g_se

}
    , (accessstoken, refreshtoken, profile, done) => {

        const data = {
            username: profile.displayName,
            email: "googleuser@gmail.com",
            password: profile.id,
            confirm_password: profile.id,
            picture: profile._json.picture
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
                if (err) throw err;
                data.password = hash;
                data.confirm_password = hash;

            })
        })


        database.findOne({ username: data.username }).then((user) => {
            if (user) {
                done(null, database)
            }
            else {
                database.create(data).then(() => {
                    done(null, data)
                })


                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
            .catch((err) => {
                console.log(err);
            })


    })
)

