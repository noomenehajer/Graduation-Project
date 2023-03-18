const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

router.post('/signup', authController.signupStudent);
router.post('/loginstudent', authController.loginStudent);

module.exports = router;
