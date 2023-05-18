import dotenv from 'dotenv';
import mongoose from 'mongoose';
import auth from 'http-auth';
import authConnect from 'http-auth-connect';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';
import apiRouter from './routes/api.js';
import stripeRouter from './routes/stripe.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: './.env'});

const app = express();
app.set('trust proxy', true);

if (process.env.HTTP_AUTH_PASSWORD !== undefined) {
  app.use(
    authConnect(
      auth.basic(
        {
          realm: 'furever-user',
          skipUser: true, // Do not allow this library to overwrite user, user should be a Salon.js model.
        },
        (_username, password, callback) => {
          callback(password === process.env.HTTP_AUTH_PASSWORD);
        }
      )
    )
  );
}

// MongoDB configuration
const connectRetry = function () {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
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

// Enable sessions using encrypted cookies
app.use(
  session({
    cookie: {maxAge: 2592000000}, // 60 * 60 * 24 * 30 * 1000 = 1 month
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Set up useful middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Initialize Passport and restore any existing authentication state
app.use(passport.initialize());
app.use(passport.session());

// Disable caching on all APIs to prevent secrets from being used more than once
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// CRUD routes for the salon signup and dashboard
app.use('/api', apiRouter);
app.use('/stripe', stripeRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..')));
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start the server on the correct port
app.listen(process.env.PORT, () => {
  console.log('🐾 FurEver server started');
});
