const mongoose = require('mongoose');

const creneauSchema = new mongoose.Schema({
  psy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Psychologue requis']
  },
  date: {
    type: Date,
    required: [true, 'Date requis']
  },
  heure: {
    type: String,
    required: [true, 'Heure requis']
  }
});

const Creneau = mongoose.model('Creneau', creneauSchema);

module.exports = Creneau;
