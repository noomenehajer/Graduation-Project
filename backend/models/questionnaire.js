const mongoose = require('mongoose');
const Question = require('./question');

const questionnaireSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  isPublic: { type: Boolean, default: true },
  questions: [Question.schema],
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }],
  responses: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' },
      answers: [
        {
          question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
          answer: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
