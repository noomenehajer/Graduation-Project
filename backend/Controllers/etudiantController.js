const Etudiant = require('../models/etudiant');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    res.json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    if (req.body.nom != null) {
    etudiant.nom = req.body.nom ;
    }
    if (req.body.prenom != null) {
    etudiant.prenom = req.body.prenom;
    }
    if (req.body.telephone != null) {    
    etudiant.telephone = req.body.telephone;
    }
    if (req.body.adresse != null) {
    etudiant.adresse = req.body.adresse;
    }
    if (req.body.niveau != null) {
    etudiant.niveau = req.body.niveau;
    }
    if (req.file != null) {
    etudiant.photo = req.file.filename ;
    }
    const updatedEtudiant = await etudiant.save();
    const imageUrl = req.file ? req.file.filename : etudiant.photo;
    res.json({ ...updatedEtudiant.toObject(), imageUrl });
  } catch (error) {
    //console.error(error);
    res.status(400).json({ message: error.message });
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updatePassword = async (req, res) => {
    try {
      const { ancienMotDePasse, nouveauMotDePasse } = req.body;
  
      // Vérifier si l'étudiant est connecté
      const etudiant = await Etudiant.findById(req.userId);
      if (!etudiant) {
        return res.status(404).json({ message: "L'étudiant n'existe pas" });
      }
  
      // Vérifier si l'ancien mot de passe correspond au mot de passe de l'étudiant
      const motDePasseEstCorrect = await bcrypt.compare(ancienMotDePasse, etudiant.motDePasse);
      if (!motDePasseEstCorrect) {
        return res.status(401).json({ message: 'Le mot de passe actuel est incorrect' });
      }
  
      // Crypter le nouveau mot de passe
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(nouveauMotDePasse, salt);
  
      // Mettre à jour le mot de passe de l'étudiant dans la base de données
      const nouveauEtudiant = await Etudiant.findByIdAndUpdate(req.userId, { motDePasse: hash }, { new: true });
  
      return res.status(200).json({ message: 'Le mot de passe a été mis à jour avec succès', etudiant: nouveauEtudiant });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du mot de passe' });
    }
  };
  
exports.encryptData = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.userId);
    etudiant.nom = 'anonymouse';
    etudiant.prenom = 'anonymouse';
    etudiant.photo = 'anonymous.png';
    await etudiant.save();
    res.json({ message: 'Data encrypted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};