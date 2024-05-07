import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const salonSchemaName = 'SalonV3';

export interface ISalon extends Document {
  _id: string;
  email: string;
  password: string;

  firstName: string;
  lastName: string;

  // Stripe account ID to send payments obtained with Stripe Connect.
  stripeAccountId?: string;
  // Can be no_dashboard_soll, no_dashboard_poll, dashboard_soll. Default is no_dashboard_soll
  accountConfig: string;
  businessName: string;

  generateHash: (password: string) => string;
  validatePassword: (password?: string) => boolean;
  save: () => Promise<void>;
}

// Define the Salon schema.
const SalonSchema = new Schema<ISalon>({
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
  firstName: String,
  lastName: String,
  // Stripe account ID to send payments obtained with Stripe Connect.
  stripeAccountId: String,
  // Can be no_dashboard_soll, no_dashboard_poll, dashboard_soll. Default is no_dashboard_soll
  accountConfig: String,
  businessName: String,
  quickstartAccount: Boolean,
});

// Check the email address to make sure it's unique (no existing salon with that address).
function SalonEmailValidator(email: string) {
  // Asynchronously resolve a promise to validate whether an email already exists
  return new Promise((resolve, reject) => {
    // Only check model updates for new salons (or if the email address is updated).
    // @ts-ignore - 'this' implicitly has type 'any' because it does not have a type annotation.ts(2683)
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

// Generate a password hash (with an auto-generated salt for simplicity here).
SalonSchema.methods.generateHash = function (password) {
  return password;
};

// Check if the password is valid by comparing with the stored hash.
SalonSchema.methods.validatePassword = function (password) {
  return password === this.password;
};

// Pre-save hook to define some default properties for salons.
SalonSchema.pre('save', function (next) {
  // Make sure the password is hashed before being stored.
  if (this.isModified('password')) {
    this.password = this.generateHash(this.password);
  }
  next();
});

const Salon =
  mongoose.models[salonSchemaName] ||
  mongoose.model(salonSchemaName, SalonSchema);

export default Salon;
