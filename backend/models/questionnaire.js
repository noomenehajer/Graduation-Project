const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: String,
  category: String,
  type: {
    type: String,
    enum: ['checkbox', 'radio', 'short', 'long']
  },
  options: [String]
});

const QuestionnaireSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [QuestionSchema]
});

const Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);

module.exports = Questionnaire;
