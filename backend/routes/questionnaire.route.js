const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/questionnaire');

router.post('/', async (req, res) => {
  try {
    const questionnaire = new Questionnaire({
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions
    });
    await questionnaire.save();
    res.status(201).json(questionnaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find();
    res.json(questionnaires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getQuestionnaire, (req, res) => {
  res.json(res.questionnaire);
});

router.patch('/:id', getQuestionnaire, async (req, res) => {
  if (req.body.title != null) {
    res.questionnaire.title = req.body.title;
  }
  if (req.body.description != null) {
    res.questionnaire.description = req.body.description;
  }
  if (req.body.questions != null) {
    res.questionnaire.questions = req.body.questions;
  }
  try {
    const updatedQuestionnaire = await res.questionnaire.save();
    res.json(updatedQuestionnaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getQuestionnaire, async (req, res) => {
  try {
    await res.questionnaire.remove();
    res.json({ message: 'Questionnaire supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getQuestionnaire(req, res, next) {
  let questionnaire;
  try {
    questionnaire = await Questionnaire.findById(req.params.id);
    if (questionnaire == null) {
      return res.status(404).json({ message: 'Questionnaire introuvable' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.questionnaire = questionnaire;
  next();
}

module.exports = router;
