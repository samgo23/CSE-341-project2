const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const initDb = (callback) => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Database connected!');
      callback(null, mongoose.connection);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not initialized!');
  }
  return mongoose.connection;
};

module.exports = {
  initDb,
  getDb
};
