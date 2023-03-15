const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');


router.post('/', (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // Rechercher l'admin dans la base de données par son adresse e-mail
  Admin.findOne({ email }, (err, admin) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!admin) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }

    // Vérifier si le mot de passe actuel est correct en le comparant avec le hash stocké dans la base de données
    if (!currentPassword || !admin.password) {
      return res.status(400).json({ message: 'Mot de passe manquant' });
    }
    
    bcrypt.compare(currentPassword, admin.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!result) {
        return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
      }

      // Hacher le nouveau mot de passe et le stocker dans la base de données
      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        admin.password = hash;
        admin.save((err) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          return res.json({ message: 'Mot de passe modifié avec succès' });
        });
      });
    });
  });
});

module.exports = router;
