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
// disponibiliteSchema.methods.isSeanceDisponible = async function(jour, debut, fin) {
//   const seance = await this.constructor.findOne({
//     'seance.jour': jour,
//     $or: [
//       { 'seance.debut': { $lte: debut }, 'seance.fin': { $gt: debut } },
//       { 'seance.debut': { $lt: fin }, 'seance.fin': { $gte: fin } }
//     ]
//   });
//   return !seance;
// };
