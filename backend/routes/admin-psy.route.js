const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Psychologue = require('../models/psy');
const config = require('../config/config');

// Middleware function to verify the token
// function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = jwt.verify(token, config.secret);
//       req.user = decoded;
//       next();
//     } catch (err) {
//       res.status(403).send({ error: 'Invalid token' });
//     }
//   } else {
//     res.status(401).send({ error: 'Missing authorization header' });
//   }
// }

// // POST request to add a new psychologue
// router.post('/psychologues/add', async (req, res) => {
//   try {
//     const { nom, prenom, email, motDePasse } = req.body;

//     // Check if the email is already registered
//     const emailExists = await Psychologue.findOne({ email });
//     if (emailExists) {
//       res.status(400).send({ error: 'Email already exists' });
//     } else {
//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(motDePasse, salt);

//       // Create a new psychologue
//       const psychologue = new Psychologue({
//         nom,
//         prenom,
//         email,
//         motDePasse: hashedPassword,
//       });

//       // Save the new psychologue
//       const savedPsychologue = await psychologue.save();
//       res.send(savedPsychologue);
//     }
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // GET request to get all psychologues
// router.get('/psychologues', verifyToken, async (req, res) => {
//   // Check if the user is authenticated
//   // const authData = verifyToken(req, res);
//   // if (authData === null) {
//   //   res.status(403).send({ error: 'Unauthorized access' });
//   // } else {
//     try {
//       // Get all the psychologues
//       const psychologues = await Psychologue.find({});
//       res.send(psychologues);
//     } catch (err) {
//       res.status(400).send(err);
//     }
//   }
// // }
// );

router.post('/psychologues/add', async (req, res) => {
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
        motDePasse: hashedPassword
      });

      // Save the new psy
      const savedPsychologue = await psychologue.save();
      res.send(savedPsychologue);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET request to get all psychologues
router.get('/psychologues', async (req, res) => {
  // Check if the user is authenticated
  // const authData = verifyToken(req, res);
  // if (authData === null) {
  //   res.status(403).send({ error: 'Unauthorized access' });
  // } else {
    try {
      // Get all the psychologues
      const psychologues = await Psychologue.find({});
      res.send(psychologues);
    } catch (err) {
      res.status(400).send(err);
    }
  }
// }
);
router.get('/psychologues/:id', getPsychologue, (req, res) => {
  res.json(res.psychologue);
});
// Middleware function to get article by ID
async function getPsychologue(req, res, next) {
  let psychologue;
  try {
    psychologue = await Psychologue.findById(req.params.id);
    if (psychologue == null) {
      return res.status(404).json({ message: 'psy not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.psychologue = psychologue;
  next();
}

router.delete('/psychologues/:id', async (req, res) => {
  try {
    const psy = await Psychologue.findByIdAndDelete(req.params.id);
    if (!psy) {
      return res.status(404).json({ message: 'Psychologue non trouvé' });
    }
    res.json({ message: 'Psychologue supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






module.exports = router;
