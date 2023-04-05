const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../Controllers/authController');
const { protect } = require('../middlewares/auth.middleware');
const { getProfile, editProfile, updatePassword, encryptData , getEtudiantById} = require('../Controllers/etudiantController');

router.get('/:id', protect, isAuthenticated, getProfile);
router.put('/:id', protect, isAuthenticated, editProfile);
router.put('/:id/password', protect, isAuthenticated, updatePassword);
router.post('/:id/anonyme',protect, isAuthenticated, encryptData);

module.exports = router;
