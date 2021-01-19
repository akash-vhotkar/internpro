const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const mongoose = require('mongoose');
const database = require('../database/authschema');
const passport_auth = require('../config/passport');

router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });



module.exports = router;