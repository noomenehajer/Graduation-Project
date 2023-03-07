const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image:
    {
      type: String,
     
    }
  ,
  updatedAt: {
    type: Date,
    default: Date.now
  }

});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;