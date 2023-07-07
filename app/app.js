const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('./db/db');

app.use(session({
    secret: 'oijhadawwd532admalawldqadcaw',
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: false
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../views'));
app.use('/', function(req, res, next) {
    res.locals.ans = {subImg: ['','','','','']};
    res.locals.form = {};
    res.locals.errors = {};
    res.locals.error = null;
    res.locals.query = req.query;
    res.locals.user = req.session.user;
    next();
});
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(require('./routes/web'));



module.exports = app;