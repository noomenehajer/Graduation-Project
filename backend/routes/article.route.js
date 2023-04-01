const express = require('express');
const router = express.Router();
const articleController = require('../controllers/ArticleController');
const repliesController =require('../Controllers/repliesController');
const {isAuthenticated}=require('../Controllers/authController');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/articles',articleController.getArticles);
router.get('/articles/:id',articleController.getArticleById, (req, res) => {
  res.json(res.article);
});

router.post('/articles/add', upload.single('image'), articleController.createArticle);
router.patch('/articles/edit/:id', upload.single('image'), articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);

router.post('/articles/:articleId/addreply',repliesController.createReply);
router.get('/articles/:articleId/getreply',repliesController.getReplies);

module.exports = router;