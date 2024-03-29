const User=require('../models/etudiant');
const Psy = require('../models/psy');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const config = require('../config/config');
const Notification = require('../models/notification');
const saltRounds = 12;


exports.loginAdmin =async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
}

// *********************************************student***************************************************//
exports.signupStudent = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Check if user already exists with same email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);

    // Create new user object and save to database with estValide set to false
    const newUser = new User({ nom, prenom, email, motDePasse: hashedPassword, estValide: false, estSuspendu:false });
    await newUser.save();

    // Get admin account and create a notification for the new student signup
    const admin = await Admin.findOne();
    const newNotification = new Notification({ 
      receiverId: admin._id,
      senderId: newUser._id,
      message: `${email} want to valid his account `
    });
    await newNotification.save();

    admin.notifications.push(newNotification);
    await admin.save();

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
    // console.log(user);
    // console.log(user.estValide);
    // console.log(typeof(user.estValide));
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

     // Check if user is validated
     if (!user.estValide) {
     // console.log("hi");
      return res.status(401).json({ message: 'you are not authorized yet ' });
    }
    if (user.estSuspendu) {
      // console.log("hi");
      return res.status(401).json({ message: 'your account has been suspended by an administrator ! ' });
    }
    
    // Generate JWT token for user
    const token = jwt.sign({ userId: user._id }, process.env.STUDENT_JWT_SECRET);
    console.log(token);
    // Return token and user data
    return res.status(200).json({ token, user: { userId:user._id,nom: user.nom, prenom: user.prenom, email: user.email ,estValide: user.estValide ,estSuspendu:user.estSuspendu} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.STUDENT_JWT_SECRET);
    
    req.userId = decodedToken.userId;

    // Find user by ID and check if user is validated
    const user = await User.findById(req.userId);
    if (!user || !user.estValide) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized access' });
  }
};

exports.isAuthenticatedPsy = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    req.psyId = decodedToken.psyId;

    // Find user by ID and check if user is validated
    const psy = await Psy.findById(req.psyId);
    if (!psy || !psy.estValide) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized access' });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('userId');
  res.clearCookie('user');
  res.status(200).send({ message: 'Logout successful' });
};


// ***********************************************************admin****************************************//



//logout
exports.logoutAdmin = (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Logout successful' });
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

//**********************************************psychologue*****************************************//
exports.signupPsy = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Check if user already exists with same email
    const existingPsy = await Psy.findOne({ email });

    if (existingPsy) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);

    // Create new user object and save to database with estValide set to false
    const newPsy = new Psy({ nom, prenom, email, motDePasse: hashedPassword, estValide: false });
    await newPsy.save();

    return res.status(201).json({ message: 'Psy created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.logoutPsy = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('psyId');
  res.clearCookie('psy');

  res.status(200).send({ message: 'Logout successful' });
};
exports.loginPsy = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Find user with given email
    const psy = await Psy.findOne({ email });
    // console.log(user);
    // console.log(user.estValide);
    // console.log(typeof(user.estValide));
    if (!psy) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(motDePasse, psy.motDePasse);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

     // Check if user is validated
     if (!psy.estValide) {
     // console.log("hi");
      return res.status(401).json({ message: 'you are not authorized yet ' });
    }
   
    
    // Generate JWT token for user
    const token = jwt.sign({ psyId: psy._id }, process.env.JWT_SECRET);
    
    // Return token and user data
   console.log(psy._id)
    return res.status(200).json({ token, psy: {psyId:psy._id,nom: psy.nom, prenom: psy.prenom, email: psy.email ,estValide: psy.estValide} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.isAuthenticated = async (userId) => {
//   try {
//     // Find user by ID and check if user is validated
//     const user = await User.findById(userId);
//     if (!user) {
//       return false;
//     }

//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };