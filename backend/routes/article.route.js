const express = require('express');
const router = express.Router();
const Article = require('../models/article');
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

// const fs = require('fs');
// const path = require('path');

// router.get('/uploads/:filename', (req, res) => {
//   const { filename } = req.params;
//   const filePath = path.join(__dirname, '../uploads', filename);

//   if (fs.existsSync(filePath)) {
//     const file = fs.createReadStream(filePath);
//     file.pipe(res);
//     // console.log();
//   } else {
//     res.status(404).send('File not found');
//   }
// });

// GET all articles
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
    // res.json({msg:"hello articles"})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET one article
router.get('/articles/:id', getArticle, (req, res) => {
  res.json(res.article);
});

// Ajouter un nouvel article
router.post('/articles/add', upload.single('image'), (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date(),
    updatedAt: null,
    image: req.file.filename // use req.file instead of req.body.image
  });

  article.save((err, savedArticle) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: 'Error saving article' });
    }

    res.status(201).send({ message: 'Article saved successfully' });
  });
});

// Add error handling for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    console.log(err);
    res.status(500).send({ message: 'Error uploading file' });
  } else {
    next();
  }
});

  
router.patch('/articles/edit/:id', getArticle, async (req, res) => {
  if (req.body.title != null) {
    res.article.title = req.body.title;
  }
  if (req.body.content != null) {
    res.article.content = req.body.content;
  }
  if (req.body.updatedAt != null) {
    res.article.updatedAt = req.body.updatedAt;
  }
  if (req.body.image != null) {
    res.article.image = req.body.image;
  }

  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Supprimer un article existant
router.delete('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Middleware function to get article by ID
async function getArticle(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Article not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.article = article;
  next();
}


module.exports = router;