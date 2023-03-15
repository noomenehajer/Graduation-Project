const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const config = require('../config/config');
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

    const token = jwt.sign({ id: admin._id }, config.secret);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
