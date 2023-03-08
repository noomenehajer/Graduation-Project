const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre('save', async function (next) {
  const admin = this;
  if (admin.isModified('password') || admin.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(admin.password, salt);
      admin.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

adminSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model('Admin', adminSchema);
