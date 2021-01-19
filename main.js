const express = require('express');
const passport = require('passport');
const express_session = require('express-session');
const session_secrete = require('./keys').session_secrete;
const mongoose = require('mongoose');
const Url = require('./keys').mongoUrl;
const { mongoUrl } = require('./keys');
const app = express();
app.set("view engine", 'ejs');


mongoose.connect(Url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("the database is connected successfully...");
}).catch(err => {
    console.log(err);
})

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require('./routes/authenticateuser'));



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