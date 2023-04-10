const express = require('express');
const router = express.Router();
const psyController = require ('../Controllers/psyController')
const {protectPsy} = require('../middlewares/auth.middleware');
const authController = require('../Controllers/authController');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/profile',authController.isAuthenticatedPsy, protectPsy, psyController.getProfile);
router.put('/profile/edit',authController.isAuthenticatedPsy,upload.single('photo'), protectPsy, psyController.updatePsy);
router.put('/profile/password',authController.isAuthenticatedPsy, protectPsy,psyController.changePassword);
module.exports = router;
