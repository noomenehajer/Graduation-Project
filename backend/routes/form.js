const express = require('express');
const router = express.Router();
const Form = require('../models/form');

router.post('/', async (req, res) => {
  const form = new Form(req.body);
  await form.save();
  res.json(form);
});

router.get('/:id', async (req, res) => {
  const form = await Form.findById(req.params.id).populate('questions');
  res.json(form);
});

module.exports = router;
