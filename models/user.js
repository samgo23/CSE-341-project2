const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleSchema = new Schema({
  username: String,
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const githubSchema = new Schema({
  githubId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

githubSchema.statics.findOrCreate = function (condition) {
  const self = this;
  return this.findOne(condition)
    .then((result) => {
      if (result) {
        return result;
      } else {
        return self.create(condition);
      }
    })
    .catch((err) => {
      throw err;
    });
};

// Define a combined schema for both Google and GitHub users
const User = mongoose.model('User', new Schema({
  // Common fields for both Google and GitHub users
  username: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Fields specific to Google users
  google: googleSchema,
  // Fields specific to GitHub users
  github: githubSchema
}));

module.exports = User;
