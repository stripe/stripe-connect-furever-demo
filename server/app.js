'use strict';

require('dotenv').config({path: './.env'});
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const logger = require('morgan');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const moment = require('moment');
const {retrieveStripeAccount} = require('./routes/middleware');

const app = express();
app.set('trust proxy', true);

// MongoDB configuration
const mongoose = require('mongoose');
const connectRetry = function () {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: 500,
    },
    (err) => {
      if (err) {
        console.log('Mongoose connection error:', err);
        setTimeout(connectRetry, 5000);
      }
    }
  );
};
connectRetry();

// Set up the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Enable sessions using encrypted cookies
app.use(
  session({
    cookie: {maxAge: 2592000000}, // 60 * 60 * 24 * 30 * 1000 = 1 month
    secret: process.env.SECRET,
    signed: true,
    resave: true,
  })
);
// Set up flash messages
app.use(flash());

// Set up useful middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport and restore any existing authentication state
app.use(passport.initialize());
app.use(passport.session());

// Middleware that exposes the salon and stripe account object (if any) to views
app.use(async (req, res, next) => {
  const [showBanner] = req.flash('showBanner');
  res.locals.path = req.originalUrl;
  if (req.user) {
    res.locals.user = req.user;
    res.locals.showBanner = !!showBanner || req.query.showBanner;

    // Get the stripe account object if available
    if (req.user.stripeAccountId) {
      req.stripeAccount = await retrieveStripeAccount(req.user.stripeAccountId);
      // The onboardingComplete flag is used to know if the account has completed onboarding
      res.locals.onboardingComplete = !!req.stripeAccount?.details_submitted;
    }
  }
  next();
});

// Disable caching on all APIs to prevent secrets from being used more than once
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.locals.moment = moment;

// CRUD routes for the salon signup and dashboard
app.use('/', require('./routes/main'));
app.use('/stripe', require('./routes/stripe'));

// Index page for FurEver
app.get('/', (req, res) => {
  res.render('index');
});

// Respond to the Google Cloud health check
app.get('/_ah/health', (req, res) => {
  res.type('text').send('ok');
});

// Catch 404 errors and forward to error handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Development error handler: will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// Production error handler: no stacktraces will be leaked to user
app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

// Start the server on the correct port
const server = app.listen(process.env.PORT, () => {
  console.log('🐾 FurEver server started:', process.env.PUBLIC_DOMAIN);
});
