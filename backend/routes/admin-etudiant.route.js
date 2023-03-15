const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/etudiant');
const config = require('../config/config');

// Middleware function to verify the token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).send({ error: 'Invalid token' });
    }
  } else {
    res.status(401).send({ error: 'Missing authorization header' });
  }
}


// POST request to add a new student
router.post('/students/add', async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Check if the email is already registered
    const emailExists = await Student.findOne({ email });
    if (emailExists) {
      res.status(400).send({ error: 'Email already exists' });
    } else {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(motDePasse, salt);

      // Create a new student
      const etudiant = new Student({
        nom,
        prenom,
        email,
        motDePasse: hashedPassword,
        estValide: true,
      });

      // Save the new student
      const savedEtudiant = await etudiant.save();
      res.send(savedEtudiant);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET request to get all valid students
router.get('/students', async (req, res) => {
  try {
    // Get all the valid students
    const students = await Student.find({ estValide: true });
    res.send(students);
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET request to get students with estValide set to false
router.get('/students/invalid', async (req, res) => {
  try {
    // Get all the invalid students
    const students = await Student.find({ estValide: false });
    res.send(students);
  } catch (err) {
    res.status(400).send(err);
  }
});


router.get('/students/:id', getStudent, (req, res) => {
  res.json(res.student);
});
// Middleware function to get article by ID
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
}

router.patch('/students/edit/:id', async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, estValide } = req.body;

    // Check if the email is already registered
    const emailExists = await Student.findOne({ email });
    if (emailExists && emailExists._id.toString() !== req.params.id) {
      res.status(400).send({ error: 'Email already exists' });
    } else {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      student.nom = nom || student.nom;
      student.prenom = prenom || student.prenom;
      student.email = email || student.email;
      student.estValide = estValide || student.estValide;
      if (motDePasse) {
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(motDePasse, salt);
        student.motDePasse = hashedPassword;
      }

      const updatedStudent = await student.save();
      res.send(updatedStudent);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});



// Supprimer un article existant
router.delete('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
