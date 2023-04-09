const mongoose = require('mongoose');
const { Schema } = mongoose;

const disponibiliteSchema = new Schema({
  psy: {
    type: Schema.Types.ObjectId,
    ref: 'Psychologue',
    required: true,
  },
  seance: {
    type: [{
      jour: { type: String, enum: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'], required: true },
      debut: { type: Date, required: true },
      fin: { type: Date, required: true }
    }],
    default: [{
      jour: 'lundi',
      debut: new Date('2023-04-05T08:00:00Z').toISOString(),
      fin: new Date('2023-04-05T12:00:00Z').toISOString(),
    },
    {
      jour: 'lundi',
      debut: new Date('2023-04-05T13:00:00Z').toISOString(),
      fin: new Date('2023-04-05T17:00:00Z').toISOString(),
    }]
  }
  
});

module.exports = mongoose.model('Disponibilite', disponibiliteSchema);
