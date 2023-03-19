const User=require('../models/etudiant');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');




exports.signupStudent = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Check if user already exists with same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user object and save to database with estvalide set to false
    const newUser = new User({ nom, prenom, email, motDePasse, estValide: false });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Find user with given email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token for user
    const token = jwt.sign({ userId: user._id }, process.env.STUDENT_JWT_SECRET);

    // Return token and user data
    return res.status(200).json({ token, user: { nom: user.nom, prenom: user.prenom, email: user.email ,estValide: user.estValide } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyStudentToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
    
    }

    const decodedToken = jwt.verify(token, process.env.STUDENT_JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized access' });
  }
};

// changer admin password

exports.changeAdminPassword = (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // Rechercher l'admin dans la base de données par son adresse e-mail
  Admin.findOne({ email }).lean().exec((err, admin) => {
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
        Admin.updateOne({ _id: admin._id }, { password: hash }, (err, result) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          return res.json({ message: 'Mot de passe modifié avec succès' });
        });
      });
    });
  });
};
