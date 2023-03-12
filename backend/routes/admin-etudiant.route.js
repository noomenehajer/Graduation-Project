const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Etudiant = require('../models/etudiant');
const config = require('../config/config');

// POST request to add a new student
router.post('/add-student', verifyToken, async (req, res) => {
  // Check if the user is authenticated
  jwt.verify(req.token, config.secret, async (err, authData) => {
    if (err) {
      res.status(403).send({ error: 'Unauthorized access' });
    } else {
      try {
        const { nom, prenom, email, motDePasse, niveau } = req.body;

        // Check if the email is already registered
        const emailExists = await Etudiant.findOne({ email });
        if (emailExists) {
          res.status(400).send({ error: 'Email already exists' });
        } else {
          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(motDePasse, salt);

          // Create a new student
          const student = new Etudiant({
            nom,
            prenom,
            email,
            motDePasse: hashedPassword,
            niveau,
          });

          // Save the new student
          const savedStudent = await student.save();
          res.send(savedStudent);
        }
      } catch (err) {
        res.status(400).send(err);
      }
    }
  });
});

// Middleware function to verify the token
function verifyToken(req, res, next) {
  // Get the token from the header
  const token = req.headers.authorization;

  // Check if the token exists
  if (typeof token !== 'undefined') {
    req.token = token;
    next();
  } else {
    // If the token does not exist, return an error
    res.status(403).send({ error: 'Unauthorized access' });
  }
}

// GET request to get all students
router.get('/students', verifyToken, async (req, res) => {
  // Check if the user is authenticated
  jwt.verify(req.token, config.secret, async (err, authData) => {
    if (err) {
      res.status(403).send({ error: 'Unauthorized access' });
    } else {
      try {
        // Get all the students
        const students = await Etudiant.find({});
        res.send(students);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  });
});

module.exports = router;
