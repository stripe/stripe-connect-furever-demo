import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import Salon from '../models/salon.js';
import {retrieveStripeAccount} from './middleware.js';

export const router = express.Router();

/**
 * GET /api/session
 *
 * Return the logged-in salon and their Stripe account if available.
 */
router.get('/session', async (req, res) => {
  try {
    if (req.user) {
      let stripeAccount = null;
      // Get the stripe account object if available
      if (req.user.stripeAccountId) {
        stripeAccount = await retrieveStripeAccount(req.user.stripeAccountId);
      }
      res.status(200);
      return res.json({
        user: req.user,
        stripeAccount,
      });
    } else {
      res.status(200);
      return res.json({
        user: null,
        stripeAccount: null,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /api/signup
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
      salon = await salon!.save();
      // Sign in and redirect to continue the signup process
      req.logIn(salon, (err) => {
        if (err) next(err);
        return res.status(200).end();
      });
    } catch (err: any) {
      console.error(err);
      // Show an error message to the user
      const errors = Object.keys(err.errors).map(
        (field) => err.errors[field].message
      );
      return res.status(500).json({
        error: errors[0],
      });
    }
  }
});

/**
 * POST /api/login
 *
 * Simple salon login.
 */
router.post(
  '/login',
  passport.authenticate('salon-login'),
  function (req, res) {
    if (req.user) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  }
);

/**
 * POST /api/logout
 *
 * Delete the salon from the session.
 */
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({error: err.message});
    }
    return res.status(200).end();
  });
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
