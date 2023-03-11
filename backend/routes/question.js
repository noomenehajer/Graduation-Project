const express = require('express');
const router = express.Router();
const Question = require('../models/question');

router.post('/', async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.json(question);
});

router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.json(question);
});

module.exports = router;
