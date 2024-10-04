const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'agency'], default: 'agency' },
  // Agency-specific fields
  agencyDetails: {
    name: String,
    address: String,
    contact: String,
    projects: { type: Number, default: 0 },
  },
  isActive: { type: Boolean, default: true }, // New field for status
});

// Hash passwords before saving to DB
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
