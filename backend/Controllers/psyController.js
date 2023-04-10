const Psychologue = require('../models/psy');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.getProfile = async (req, res) => {
  try {
    const psyId = req.psyId;

    // Find psychologue by ID
    const psy = await Psychologue.findById(psyId);
    if (!psy) {
      return res.status(404).json({ message: 'Psychologue not found' });
    }
    res.json({ psy });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.updatePsy = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse, specialite, description } = req.body;
    const psyId = req.psyId;

    // Find psychologue by ID
    const psy = await Psychologue.findById(psyId);
    if (!psy) {
      return res.status(404).json({ message: 'Psychologue not found' });
    }

    // Update psychologue object
    if (req.body.nom != null) {
      psy.nom = req.body.nom ;
      }
      if (req.body.prenom != null) {
        psy.prenom = req.body.prenom;
      }
      if (req.body.telephone != null) {    
        psy.telephone = req.body.telephone;
      }
      if (req.body.adresse != null) {
        psy.adresse = req.body.adresse;
      }
      if (req.body.niveau != null) {
        psy.niveau = req.body.niveau;
    }
      if (req.body.description != null) {   
        psy.description = req.body.description;
      }      
      if (req.file != null) {
        psy.photo = req.file.filename ;
        }

    // Save updated psychologue object to database
       const updatedPsy = await psy.save();
    const imageUrl = req.file ? req.file.filename : psy.photo;
    res.json({ ...updatedPsy.toObject(), imageUrl });

   // return res.status(200).json({ message: 'Psychologue updated successfully', psy: psy });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;
    const psyId = req.psyId;

    // Find psychologue by ID
    const psy = await Psychologue.findById(psyId);
    if (!psy) {
      return res.status(404).json({ message: 'Psychologue not found' });
    }
     // Check if old password is correct
    const isMatch = await bcrypt.compare(ancienMotDePasse, psy.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, saltRounds);

    // Update psychologue object with new password
    psy.motDePasse = hashedPassword;

    // Save updated psychologue object to database
    await psy.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 

