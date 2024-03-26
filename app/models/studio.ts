import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const studioSchemaName = 'StudioV1';

export interface IStudio extends Document {
  email: string;
  password: string;

  firstName: string;
  lastName: string;

  // Stripe account ID to send payments obtained with Stripe Connect.
  stripeAccountId: string;
  // Can be no_dashboard_soll, no_dashboard_poll, dashboard_soll. Default is no_dashboard_soll
  accountConfig: string;

  generateHash: (password: string) => string;
  validatePassword: (password?: string) => boolean;
  save: () => Promise<void>;
}

// Define the Salon schema.
const StudioSchema = new Schema<IStudio>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      // Custom validator to check if the email was already used.
      validator: StudioEmailValidator,
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
});

// Check the email address to make sure it's unique (no existing salon with that address).
function StudioEmailValidator(email: string) {
  // Asynchronously resolve a promise to validate whether an email already exists
  return new Promise((resolve, reject) => {
    // Only check model updates for new salons (or if the email address is updated).
    // @ts-ignore - 'this' implicitly has type 'any' because it does not have a type annotation.ts(2683)
    if (this.isNew || this.isModified('email')) {
      // Try to find a matching salon
      Studio.findOne({email}).exec((err, studio) => {
        // Handle errors
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        // Validate depending on whether a matching salon exists.
        if (studio) {
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
StudioSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 8);
};

// Check if the password is valid by comparing with the stored hash.
StudioSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Pre-save hook to define some default properties for salons.
StudioSchema.pre('save', function (next) {
  // Make sure the password is hashed before being stored.
  if (this.isModified('password')) {
    this.password = this.generateHash(this.password);
  }
  next();
});

const Studio =
  mongoose.models[studioSchemaName] ||
  mongoose.model(studioSchemaName, StudioSchema);

export default Studio;
