const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');


router.post('/signup', authController.signupStudent);
router.post('/loginstudent', authController.loginStudent);
router.post('/password', authController.changeAdminPassword);
router.post('/login', authController.loginAdmin);
router.post('/logout', authController.logoutAdmin);

module.exports = router;
