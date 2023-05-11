const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.statics.findOrCreate = function (condition) {
    const self = this;
    return this.findOne(condition)
      .then(result => {
        if (result) {
          return result;
        } else {
          return self.create(condition);
        }
      })
      .catch(err => {
        throw err;
      });
  };
  
  

const User = mongoose.model('User', userSchema);

module.exports = User;
