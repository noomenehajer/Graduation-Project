const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

router.put('/change-password', async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    admin.password = newPassword;
    await admin.save();

    return res.json({ message: 'Password changed successfully' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
