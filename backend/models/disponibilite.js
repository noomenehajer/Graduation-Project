const mongoose = require('mongoose');
const { Schema } = mongoose;

const disponibiliteSchema = new Schema({
  psy: {
    type: Schema.Types.ObjectId,
    ref: 'Psychologue',
    required: true,
  },
  jour: { type: String, enum: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'], required: true },
  debut: { type: Date, required: true },
  fin: { type: Date, required: true },
});

module.exports = mongoose.model('Disponibilite', disponibiliteSchema);
