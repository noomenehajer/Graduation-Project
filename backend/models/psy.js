const mongoose = require('mongoose');
const psychologueSchema = new mongoose.Schema({
 
  nom: { type: String, required: true },

  prenom: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  motDePasse: { type: String, required: true },
  telephone: { type: String, required: false },
  adresse: { type: String, required: false },
  specialite: { type: String, required: false },
  description: { type: String, required: false },
  photo: { type: String, required: false },
  estValide: { type: Boolean, default: false },
  estSuspendu: { type: Boolean, default: false }
});

module.exports = mongoose.model('Psychologue', psychologueSchema);
