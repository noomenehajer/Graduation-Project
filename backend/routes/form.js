const express = require('express');
const router = express.Router();
const Form = require('../models/form');
const Question = require('../models/question');

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one form
router.get('/:id', getForm, (req, res) => {
  res.json(res.form);
});

// Create a form
router.post('/', async (req, res) => {
  const form = new Form({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newForm = await form.save();
    res.status(201).json(newForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a form
router.put('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (req.body.title != null) {
      form.title = req.body.title;
    }
    if (req.body.description != null) {
      form.description = req.body.description;
    } 
    const updatedForm = await form.save();
    res.json(updatedForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});  
      
// Delete a form
router.delete('/:id', getForm, async (req, res) => {
  try {
    await res.form.remove();
    res.json({ message: 'Form deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all questions for a form
router.get('/:id/questions', getForm, async (req, res) => {
  try {
    const questions = await Question.find({ form: req.params.id });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a question
router.delete('/:id/questions/:questionId', getForm, async (req, res) => {
  try {
    await Question.findByIdAndRemove(req.params.questionId, { form: req.params.id });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a question for a form
router.post('/:id/questions', getForm, async (req, res) => {
  const question = new Question({
    text: req.body.text,
    type: req.body.type,
    options: req.body.options,
    form: res.form._id
  });

  try {
    const newQuestion = await question.save();
    res.form.questions.push(newQuestion._id);
    await res.form.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a form by ID
async function getForm(req, res, next) {
  let form;
  try {
    form = await Form.findById(req.params.id).populate('questions');
    if (form == null) {
      return res.status(404).json({ message: 'Cannot find form' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.form = form;
  next();
}

module.exports = router;

