const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Etudiant' },
  answers: [{
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    answer: String
  }]
});

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
  questions: [QuestionSchema],
  published: { type: Boolean, default: false },
  publishedTo: [{ type: Schema.Types.ObjectId, ref: 'Etudiant' }],
  answers: [AnswerSchema],
  answeredBy: [{ type: Schema.Types.ObjectId, ref: 'Etudiant' }]
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);