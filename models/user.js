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

const githubSchema = new mongoose.Schema({
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

const userSchema = new Schema({
  username: String,
  password: String,
  google: googleSchema,
  github: githubSchema,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.statics.findOrCreate = function (condition) {
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

const User = mongoose.model('User', userSchema);

module.exports = User;
