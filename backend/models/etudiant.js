const mongoose = require("mongoose");
saltRounds=12;
const { Schema } = mongoose;
const validator = require('validator');

const AnswerSchema = new Schema({
  questionnaire: { type: Schema.Types.ObjectId, ref: 'Questionnaire' },
  answers: [{
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    answer:  {
      type: Schema.Types.Mixed, 
      default: null,
    },
  }]
});

const etudiantSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate:[validator.isEmail,'please provide a valid email'],

  },
  motDePasse: {
    type: String,
    required: true,
    minlength:8
  },
  telephone: { type: String, required: false },
  adresse: { type: String, required: false },
  niveau: { type: String, required: false },
  photo: { type: String, required: false },
  estValide: { type: Boolean, default: false },
  estSuspendu: { type: Boolean, default: false },
  publishedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire' }],
  answers: [AnswerSchema]});

module.exports = mongoose.model("Etudiant", etudiantSchema);
