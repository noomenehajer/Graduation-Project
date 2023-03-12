const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Psychologue = require('../models/psy');

// Load environment variables
require('dotenv').config();

// Get the JWT secret from environment variables
const jwtSecret = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Vérifier si l'e-mail est déjà utilisé
    const existingPsychologue = await Psychologue.findOne({ email });
    if (existingPsychologue) {
      return res.status(400).json({ message: 'L\'e-mail est déjà utilisé' });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    const psychologue = new Psychologue({
      nom,
      prenom,
      email,
      motDePasse: hashedPassword
    });

    // Enregistrer le psychologue dans la base de données
    const newPsychologue = await psychologue.save();

    // Générer un jeton JWT pour le nouveau psychologue
    const token = jwt.sign({ userId: newPsychologue._id }, jwtSecret);

    res.status(201).json({ message: 'Psychologue ajouté avec succès', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du psychologue' });
  }
});

router.get('/psychologues', async (req, res) => {
  try {
    const psychologues = await Psychologue.find();
    res.status(200).json({ psychologues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des psychologues' });
  }
});


module.exports = router;


