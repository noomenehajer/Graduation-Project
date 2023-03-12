const mongoose = require('mongoose');

const demandeInscriptionSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telephone: { type: String, required: true },
  genre: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  niveau: { type: String, required: true },
  filiere: { type: String, required: true },
  annee: { type: Number, required: true },
  status: { type: String, enum: ['en_attente', 'valide', 'suspendu'], default: 'en_attente' },
  dateCreation: { type: Date, default: Date.now },
  dateValidation: { type: Date },
  adminValidation: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('DemandeInscription', demandeInscriptionSchema);
