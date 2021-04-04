import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import * as config from '../config/index.js';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: { type: String, trim: true, minlength: 6, maxlength: 60 },
    name: { type: String, required: true },
    role: { type: String, default: 'USER' },
    avatar: { type: String },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // Check to see if password is modified. If it is, encrypt it. If not, execute next();
  if (this.password && this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }

  next();
});

userSchema.methods = {
  /**
   * Compare password - check if the passwords are the same
   *
   * @param {String} password
   * @return {Boolean} true/false
   */
  comparePassword: async function (password) {
    return bcrypt.compare(password, this.password);
  },

  /**
   * Generate token
   *
   * @return {String} token
   */
  generateJWTToken: function () {
    const token = jwt.sign(
      {
        id: this._id,
        email: this.email,
        name: this.name,
        role: this.role,
        avatar: this.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: `${config.jwt.tokenExpirationMinutes}m` },
    );
    return token;
  },

  /**
   * Convert user model to JSON
   *
   * @return {Object} model as JSON except password
   */
  toJSON: function () {
    return {
      id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
      avatar: this.avatar,
    };
  },
};

const User = mongoose.model('User', userSchema);

export default User;
