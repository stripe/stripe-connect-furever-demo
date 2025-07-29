import mongoose from 'mongoose';
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null};
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    console.log('Setting up database');
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('Got the db!');
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('Could not connect to the database:', e);
    cached.promise = Promise.reject(e);
    cached.conn = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
