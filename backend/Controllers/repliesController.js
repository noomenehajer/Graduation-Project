const Article = require('../models/article');
const Etudiant = require('../models/etudiant');

exports.createReply = async (req, res) => {
  try {
    const { content } = req.body;
    const { articleId } = req.params;

    console.log('articleId:', articleId); // add this line

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // create a new reply
    const reply = {
      content,
      student: req.userId,
    };

    article.replies.push(reply);
    await article.save();

    return res.status(201).json({ message: 'Reply created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getReplies = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId).populate('replies.student', '-motDePasse');
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article.replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};