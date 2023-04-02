const mongoose = require("mongoose");
saltRounds=12;
const validator = require('validator');
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
  // motDePasseConfirm:{
  //   type:String,
  //   required:[true,'Please confirm your password']
  // },
  telephone: { type: String, required: false },
  adresse: { type: String, required: false },
  niveau: { type: String, required: false },
  photo: { type: String, required: false },
  estValide: { type: Boolean, default: false },
  estSuspendu: { type: Boolean, default: false },
});


etudiantSchema.pre('save',async function(next){
  
  if(!this.isModified('motDePasse')) return next();
  this.motDePasse= await bcrypt.hash(this.motDePasse,saltRounds)
  next();
});


module.exports = mongoose.model("Etudiant", etudiantSchema);
