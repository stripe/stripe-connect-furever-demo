'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const salonSchemaName = 'SalonV3'

// Define the Salon schema.
const SalonSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      // Custom validator to check if the email was already used.
      validator: SalonEmailValidator,
      message: 'This email already exists. Please try to log in instead.',
    },
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'individual',
    enum: ['individual', 'company', 'non_profit', 'government_entity'],
  },
  firstName: String,
  lastName: String,
  address: String,
  postalCode: String,
  city: String,
  state: {type: String},
  country: {type: String, default: 'US'},
  created: {type: Date, default: Date.now},
  salon: {
    name: String,
    license: String,
    specialty: String,
  },
  // Stripe account ID to send payments obtained with Stripe Connect.
  stripeAccountId: String,
});

// Check the email address to make sure it's unique (no existing salon with that address).
function SalonEmailValidator(email) {
  const Salon = mongoose.model(salonSchemaName);
  // Asynchronously resolve a promise to validate whether an email already exists
  return new Promise((resolve, reject) => {
    // Only check model updates for new salons (or if the email address is updated).
    if (this.isNew || this.isModified('email')) {
      // Try to find a matching salon
      Salon.findOne({email}).exec((err, salon) => {
        // Handle errors
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        // Validate depending on whether a matching salon exists.
        if (salon) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } else {
      resolve(true);
    }
  });
}

// Return a salon name for display.
SalonSchema.methods.displayName = function () {
  // return this.stripeAccountId;
  if (this.type === 'company') {
    return this.salon.name;
  } else {
    return `${this.firstName} ${this.lastName}`;
  }
};

// Generate a password hash (with an auto-generated salt for simplicity here).
SalonSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 8);
};

// Check if the password is valid by comparing with the stored hash.
SalonSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Pre-save hook to define some default properties for salons.
SalonSchema.pre('save', function (next) {
  // Make sure the password is hashed before being stored.
  if (this.isModified('password')) {
    this.password = this.generateHash(this.password);
  }
  next();
});

const Salon = mongoose.model(salonSchemaName, SalonSchema);

module.exports = Salon;
