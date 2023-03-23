'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Salon = require('../models/salon');
const {stripeAccountRequired} = require('./middleware');
const reservations = require('../public/data/reservations.json');

/**
 * GET /signup
 *
 * Display the signup form on the right step depending on the current completion.
 */
router.get('/signup', (req, res) => {
  let step = 'account';
  // Naive way to identify which step we're on: check for the presence of user profile data
  if (req.user) {
    if (!req.user.stripeAccountId) {
      step = 'profile'; // Mising onboarding to platform + Stripe
    } else if (!req.stripeAccount?.details_submitted) {
      step = 'onboarding'; // Missing onboarding to Stripe
    } else {
      return res.redirect('/dashboard'); // Created account + onboarded to Stripe
    }
  }
  res.render('signup', {step: step});
});

/**
 * POST /signup
 *
 * Create a user during the salon onboarding process.
 */
router.post('/signup', async (req, res, next) => {
  const body = Object.assign({}, req.body, {
    // Use `type` instead of `salon-type` for saving to the DB.
    type: req.body['salon-type'],
    'salon-type': undefined,
  });

  // Check if we have a logged-in salon
  let salon = req.user;
  if (!salon) {
    try {
      // Try to create and save a new salon
      salon = new Salon(body);
      salon = await salon.save();
      // Sign in and redirect to continue the signup process
      req.logIn(salon, (err) => {
        if (err) next(err);
        return res.redirect('/signup');
      });
    } catch (err) {
      console.log(err);
      // Show an error message to the user
      const errors = Object.keys(err.errors).map(
        (field) => err.errors[field].message
      );
      res.render('signup', {step: 'account', error: errors[0]});
    }
  }
});

/**
 * GET /login
 *
 * Simple salon login.
 */
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

/**
 * POST /login
 *
 * Simple salon login.
 */
router.post(
  '/login',
  passport.authenticate('salon-login', {
    successRedirect: '/signup',
    failureRedirect: '/login',
  })
);

/**
 * GET /logout
 *
 * Delete the salon from the session.
 */
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

/**
 * GET /dashboard
 *
 * Show the Dashboard page for the logged-in salon
 *
 * Use the `stripeAccountRequired` middleware to ensure that only registered
 * salons can access this route.
 */
router.get('/dashboard', stripeAccountRequired, async (req, res) => {
  res.render('dashboard');
});

/**
 * GET /payouts
 *
 * Show the Payouts page for the logged-in salon
 *
 * Use the `stripeAccountRequired` middleware to ensure that only registered
 * salons can access this route.
 */
router.get('/payouts', stripeAccountRequired, async (req, res) => {
  res.render('payouts');
});

/**
 * GET /reservations
 *
 * Show the Reservations page for the logged-in salon
 *
 * Use the `stripeAccountRequired` middleware to ensure that only registered
 * salons can access this route.
 */
router.get('/reservations', stripeAccountRequired, async (req, res) => {
  res.render('reservations', {reservations});
});

/**
 * GET /customers
 *
 * Show the Customers page for the logged-in salon
 *
 * Use the `stripeAccountRequired` middleware to ensure that only registered
 * salons can access this route.
 */
router.get('/customers', stripeAccountRequired, async (req, res) => {
  res.render('404');
});

/**
 * GET /profile
 *
 * Show the Profile page for the logged-in salon
 *
 * Use the `stripeAccountRequired` middleware to ensure that only registered
 * salons can access this route.
 */
router.get('/profile', stripeAccountRequired, async (req, res) => {
  res.render('profile');
});

// Serialize the salon's sessions for Passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    let user = await Salon.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Define the login strategy for salons based on email and password
passport.use(
  'salon-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      let user;
      try {
        user = await Salon.findOne({email});
        if (!user) {
          return done(null, false, {message: 'Unknown user'});
        }
      } catch (err) {
        return done(err);
      }
      if (!user.validatePassword(password)) {
        return done(null, false, {message: 'Invalid password'});
      }
      return done(null, user);
    }
  )
);

module.exports = router;
