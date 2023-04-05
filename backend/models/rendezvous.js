const mongoose = require('mongoose');
const { Schema } = mongoose;

const rendezvousSchema = new Schema({
  etudiant: {
    type: Schema.Types.ObjectId,
    ref: 'Etudiant',
    required: true,
  },
  psy: {
    type: Schema.Types.ObjectId,
    ref: 'Psychologue',
    required: true,
  },
  date: { type: Date, required: true },
  status: { type: String, enum: ['demande', 'confirme', 'refuse'], default: 'demande' },
  commentaire: { type: String, required: false },
});

module.exports = mongoose.model('RendezVous', rendezvousSchema);