const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/admin-passwordController');

router.post('/', passwordController.changePassword);

module.exports = router;
