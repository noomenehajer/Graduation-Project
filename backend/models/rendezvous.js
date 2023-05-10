const mongoose = require('mongoose');
const { Schema } = mongoose;

const rendezvousSchema = new Schema({
  etudiant: {
    type: Schema.Types.ObjectId,
    ref: 'Etudiant',
    required: true,
  },
  disponibilite: {
    type: Schema.Types.ObjectId,
    ref: 'Disponibilite',
    required: true,
  },
  status: { type: String, enum: ['demande', 'confirme', 'refuse'], default: 'demande' ,required: false },
  type: { type: String, enum: ['face to face', 'online'], default: 'online',required: true  },
  commentaire: { type: String, required: false },
});

module.exports = mongoose.model('RendezVous', rendezvousSchema);