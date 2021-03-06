const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const mongoose = require('mongoose');
const database = require('../database/authschema');
const passport_auth = require('../config/passport');
var login = false;
var register = false;
function userloginpage(req, res, next) {
    login = true;
    register = false;
    next();
}
function userregister(req, res, next) {
    console.log("comming from  register page ");
    register = true;
    login = false;
    next()
}

router.get("/googlelogin", userloginpage, passport.authenticate("google", {
    scope: ["profile", 'email']
}));
router.get("/googleregister", userregister, passport.authenticate("google", {
    scope: ["profile", 'email']
}));

router.get('registerfail', (req, res) => {
    res.send("regsiter fail");
})
router.get("/googleredirect", passport.authenticate("google", { failureRedirect: '/home/auth/registerfail' }), (req, res) => {

    const data = {
        username: req.user.displayName,
        email: req.user._json.email
    }
    if (login == true && register == false) {
        database.findOne({ username: data.username }).then(user => {
            if (user) {
                res.redirect('/home/')

            }
            else {
                const register_err = [];
                register_err.push({ err_msg: "Plase register first" })
            }
        })

    }
    else {

        database.findOne({ username: data.username }).then(user => {
            if (user) {
                let login_err = [];
                login_err.push({ err_msg: "user already exist plase login" })
                res.render('login', { login_err });
            }
            else {

                database.create(data)
                    .then(() => {

                        req.session.myuser = data.username;

                        res.redirect('/home/')


                    })
                    .catch((err) => {
                        console.log("data was not inserted    " + err);
                    })



            }
        })





    }


});

router.get("/googleregister", passport.authenticate("google", {
    scope: ["profile", 'email']
}));




router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/login', (req, res) => {
    const login_err = [];
    database.findOne({ username: req.body.uname }).then((user) => {
        if (user) {
            bcrypt.compare(req.body.psw, user.password, (err, ok) => {

                if (ok == true) {
                    req.session.myuser = user.username;

                    res.redirect('/home/');
                }
                else if (ok == false) {
                    login_err.push({ err_msg: "plase enter correct password" })
                    res.render('login', { login_err });
                }
            })
        }
        else {
            login_err.push({ err_msg: "user not exist please register" })
            res.render('login', { login_err })

        }


    }).catch(err => {
        console.log(err);
    })

})

router.post('/register', (req, res) => {
    var register_err = [];


    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.psw,
        confirm_password: req.body.psw_repeat
    }

    if (data.username == '' || data.email == '') {
        register_err.push({ err_msg: "all fields are nessasary " })
    }
    if (data.password.length < 6 || data.confirm_password.length < 6) {
        register_err.push({ err_msg: "password length should be greater than 6" })
    }
    if (data.password.localeCompare(data.confirm_password)) {
        register_err.push({ err_msg: "confirm password not matching" })
    }
    console.log(register_err);
    if (register_err.length > 0) {
        console.log(register_err);
        res.render('register', { register_err });

    }
    else {



        database.findOne({ username: data.username }).then((user) => {
            if (user) {
                let login_err = [];
                login_err.push({ err_msg: "user already exist " })

                res.render('login', { login_err });


            }
            else {




                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(data.password, salt, (err, hash) => {
                        if (err) throw err;
                        data.password = hash;
                        data.confirm_password = hash;

                        database.create(data)
                            .then(() => {

                                req.session.myuser = data.username;

                                res.redirect('/home/')


                            })
                            .catch((err) => {
                                console.log("data was not inserted    " + err);
                            })





                    })
                })





            }


        })
            .catch(err => {
                console.log(err);

            })








        console.log("function running");
    }




})
module.exports = router;