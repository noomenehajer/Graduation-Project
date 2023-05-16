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
      jour: { type: Date, required: true },
      debut: { type: Date, required: true },
      fin: { type: Date, required: true }
    }],
 
  }
  
});
module.exports = mongoose.model('Disponibilite', disponibiliteSchema);
