const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Psychologue= require('../models/psy');
const config = require('../config/config');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


// // GET request to get all psychologues
exports.getAllPsychologues = async (req, res) => {
 
    try {
      // Get all the psychologues
      const psychologues = await Psychologue.find({estValide: true});
      res.send(psychologues);
    } catch (err) {
      res.status(400).send(err);
    }
  }

   exports.getNonValidPsy= async (req, res) => {
    try {
      // Get all the invalid psy
      const psychologues = await Psychologue.find({ estValide: false });
      res.send(psychologues);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  exports.addPsychologue = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Check if the email is already registered
    const emailExists = await Psychologue.findOne({ email });
    if (emailExists) {
      res.status(400).send({ error: 'Email already exists' });
    } else {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(motDePasse, salt);

      // Create a new psy
      const psychologue = new Psychologue({
      
        nom,
        prenom,
        email,
        motDePasse: hashedPassword,
        estValide: true,
      });

      // Save the new psy
      const savedPsychologue = await psychologue.save();
      res.send(savedPsychologue);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};


exports.editPsy= async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, estValide,estSuspendu} = req.body;

    const psy = await Psychologue.findById(req.params.id);
    if (!psy) {
      return res.status(404).json({ message: 'Psychologist not found' });
    }

    if (email !== psy.email) {
      // Check if the email is already registered
      const emailExists = await psy.findOne({ email });
      if (emailExists) {
        return res.status(400).send({ error: 'Email already exists' });
      }
    }

    psy.nom = nom || psy.nom;
    psy.email = email || psy.email;
    psy.motDePasse = motDePasse || psy.motDePasse;
    psy.estValide = estValide || psy.estValide;
    psy.estSuspendu = estSuspendu || psy.estSuspendu;
    psy.prenom = prenom || psy.prenom;
 
    const updatedPsy = await psy.save();
    res.send(updatedPsy);
  } catch (err) {
    res.status(400).send(err);
  }
};



exports.deletePsy = async (req, res) => {
  try {
    const psy = await Psychologue.findByIdAndDelete(req.params.id);
    if (!psy) {
      return res.status(404).json({ message: 'Psychologue non trouvé' });
    }
    res.json({ message: 'Psychologue supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// // Middleware function to get article by ID
exports.getPsychologue=async(req, res)=> {

  try {
   const psychologue = await Psychologue.findById(req.params.id);
    if (psychologue == null) {
      return res.status(404).json({ message: 'psy not found' });
    }res.json(psychologue);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

}

exports.toggleSuspendAcc = async (req, res) => {
  try {
    const psy = await Psychologue.findById(req.params.id);
    if (!psy) {
      return res.status(404).json({ message: 'Psy non trouvé' });
    }

    psy.estSuspendu = !psy.estSuspendu;
    await psy.save();

    return res.json(psy);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Erreur du serveur' });
  }
};
