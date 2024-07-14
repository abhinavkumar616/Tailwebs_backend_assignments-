const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function (next) {
  try {
      if (!this.isModified('password')) {
          return next();
      }

      // Password complexity validation
      if (!isValidPassword(this.password)) {
          return next(new Error("Password must contain at least 10 characters including at least one special character, one lowercase letter, one uppercase letter, and one digit."));
      }

      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      return next();
  } catch (error) {
      return next(error);
  }
});

// Function to validate password complexity
function isValidPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{10,}$/;
  return passwordRegex.test(password);
}


module.exports = mongoose.model('User', UserSchema);
