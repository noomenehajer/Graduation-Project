const express = require('express');
const router = express.Router();
const etudiantController = require ('../Controllers/etudiantController')
const { protect } = require('../middlewares/auth.middleware');
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

router.get('/profile',authController.isAuthenticated, protect, etudiantController.getProfile);
router.put('/profile/edit',authController.isAuthenticated,upload.single('photo'), protect, etudiantController.editProfile);
router.put('/profile/password',authController.isAuthenticated, protect,etudiantController.updatePassword);
router.post('/profile/anonyme',authController.isAuthenticated,protect,etudiantController.encryptData); 

module.exports = router;
