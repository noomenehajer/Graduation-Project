const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/etudiant');
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

// GET request to get all valid students
exports.getAllStudents = async (req, res) => {
  try {
    // Get all the valid students
    const students = await Student.find({ estValide: true });
    res.send(students);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.editStudent= async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, estValide, estSuspendu } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (email !== student.email) {
      // Check if the email is already registered
      const emailExists = await Student.findOne({ email });
      if (emailExists) {
        return res.status(400).send({ error: 'Email already exists' });
      }
    }

    student.nom = nom || student.nom;
    student.prenom = prenom || student.prenom;
    student.email = email || student.email;
    student.estValide = estValide || student.estValide;
    student.estSuspendu = estSuspendu || student.estSuspendu;
    // if (motDePasse) {
    //   // Hash the new password
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(motDePasse, salt);
    //   student.motDePasse = hashedPassword;
    // }

    const updatedStudent = await student.save();
    res.send(updatedStudent);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Supprimer un etudiant existant
exports.deleteStudent= async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'etudiant non trouvé' });
    }
    res.json({ message: 'etudiant supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET request to get students with estValide set to false
exports.getNonValidStudents= async (req, res) => {
  try {
    // Get all the invalid students
    const students = await Student.find({ estValide: false });
    res.send(students);
  } catch (err) {
    res.status(400).send(err);
  }
};


// POST request to add a new student
exports.addStudent= async (req, res) => {
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
};



    // Middleware function to get article by ID
   exports.getStudent = async(req, res) =>{
       try {
         
       const student = await Student.findById(req.params.id);
        if (student == null) {
          return res.status(404).json({ message: 'Student not found' });
        }res.json(student);
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    //   res.student = student;
      
    }

    exports.toggleSuspendAccount = async (req, res) => {
          try {
            const student = await Student.findById(req.params.id);
            if (!student) {
              return res.status(404).json({ message: 'Etudiant non trouvé' });
            }
        
            student.estSuspendu = !student.estSuspendu;
            await student.save();
        
            return res.json(student);
          } catch (error) {
            console.error(error.message);
            return res.status(500).json({ message: 'Erreur du serveur' });
          }
        };