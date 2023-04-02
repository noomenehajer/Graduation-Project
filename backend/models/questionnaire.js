const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  text: String,
  type: String,
  options: [{
    text: String,
    value: String
  }],
  answer: String
});

const QuestionnaireSchema = new Schema({
  title: String,
  description: String,
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
