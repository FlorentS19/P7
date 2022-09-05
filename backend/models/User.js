const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  pseudo: { type: String, required: true, min: 3, max: 50, unique: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, max: 1024, min: 6, required: true },
  picture: { type: String, default: "./images/random-user.png" },
  bio : { type: String, max: 1000 },
  isAdmin: { type: Number, required: false, default: 0 }
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;