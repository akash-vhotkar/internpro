const express = require('express');
const passport = require('passport');
const express_session = require('express-session');
const session_secrete = require('./keys').session_secrete;
const mongoose = require('mongoose');
const app = express();

app.use(express_session({
    secret: session_secrete,
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 120 * 60000
    }
}))
app.get('/', (req, res) => {
    res.send("working")
})




const port = process.env.PORT || 5000;


app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log("server is running on port 5000.....");
})