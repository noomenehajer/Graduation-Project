const Article = require('../models/article');




exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createArticle = async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date(),
    updatedAt: null,
    image: req.file.filename
  });

  try {
    const savedArticle = await article.save();
    res.status(201).json({ message: 'Article saved successfully', savedArticle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateArticle = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (article == null) {
        return res.status(404).json({ message: 'Article not found' });
      }
    
      if (req.body.title != null) {
        article.title = req.body.title;
      }
      if (req.body.content != null) {
        article.content = req.body.content;
      }
      if (req.body.updatedAt != null) {
        article.updatedAt = req.body.updatedAt;
      }
      if (req.file != null) {
        article.image = req.file.filename;
      }
    
      const updatedArticle = await article.save();
      const imageUrl = req.file ? req.file.filename : article.image;
      res.json({ ...updatedArticle.toObject(), imageUrl });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
