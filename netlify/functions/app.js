require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const serverless = require("serverless-http");

// Init app
const app = express();

// Moment
app.locals.moment = require('moment');

// Cookies + Sessions
app.use(cookieParser());
app.use(
  session({
    secret: process.env.secret || 'bookrakacha',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10800000 }
  })
);
app.use(flash());

// Global flash variables
app.use((req, res, next) => {
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };
  next();
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Static assets (VERY important for Netlify)

app.use('/css', express.static(path.join(__dirname, '../../assets/stylesheets/css')));
app.use('/js', express.static(path.join(__dirname, '../../assets/javascripts/js')));
app.use('/img', express.static(path.join(__dirname, '../../assets/img')));

// Routes
const routes = require('../../routes');
app.use('/', routes);

// IMPORTANT: No app.listen()
// Export for Netlify
module.exports.handler = serverless(app);
