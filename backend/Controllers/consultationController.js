const Disponibilite = require('../models/disponibilite');
const RendezVous = require('../models/rendezvous');
const Psychologue=require('../models/psy');
const asyncHandler = require('express-async-handler')


exports.definirDisponibilite = async (req, res) => {
  try {
    const { psy, seance } = req.body;
    const disponibilite = new Disponibilite({
      psy: psy,
      seance: seance.map((s) => ({
        debut: s.debut,
        fin: s.fin,
        jour: s.jour,
      }))
    });
    
    // console.log(disponibilite);
    await disponibilite.save();

    res.status(201).json(disponibilite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteDisponibilite = async (req, res) => {
  try {
    const disponibiliteId = req.params.id;

    const deletedDisponibilite = await Disponibilite.findByIdAndDelete(disponibiliteId);

    if (!deletedDisponibilite) {
      return res.status(404).json({ message: "Disponibilite not found" });
    }

    res.status(200).json({ message: "Disponibilite deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getDisponibilite = async (req, res) => {
  try {
    const { psyId } = req.query;

    const disponibilites = await Disponibilite.find({ psy: psyId });
    
    console.log(disponibilites);
    res.status(200).json(disponibilites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getRvpsy = async (req, res) => {
  try {
    const { psyId } = req.query;

    const rendezVous = await RendezVous.find({ psy: psyId });
    
    console.log(rendezVous);
    res.status(200).json(disponibilites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get disponibilite of psy for students
exports.getDisponibiliteByPsyId = async (req, res) => {
  try {
    const { psyId } = req.params;

    const disponibilites = await Disponibilite.find({ psy: psyId });
    
    console.log(disponibilites);
    res.status(200).json(disponibilites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.demanderRv= async (req, res) =>{
  try {
    const { etudiantId, disponibiliteId, type, commentaire } = req.body;

    // Check if the disponibilite exists
    const disponibilite = await Disponibilite.findById(disponibiliteId);
    if (!disponibilite) {
      return res.status(404).json({ message: 'Disponibilité introuvable' });
    }

    // Check if the student has already requested this availability
    let rendezvous = await RendezVous.findOne({ etudiant: etudiantId, disponibilite: disponibiliteId });
    if (rendezvous) {
      return res.status(400).json({ message: 'Vous avez déjà envoyé une demande pour cette disponibilité' });
    }

    // Create a new rendezvous document
    rendezvous = new RendezVous({
      etudiant: etudiantId,
      disponibilite: disponibiliteId,
      type: type || 'online',
      commentaire: commentaire || '',
    });

    // Save the new rendezvous document
    await rendezvous.save();

    res.status(201).json({ message: 'Demande de rendez-vous créée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de la demande de rendez-vous' });
  }
};





exports.annulerRendezVous = async (req, res) => {
  try {
    const { etudiantId, disponibiliteId } = req.body;

    // Check if the rendezvous exists
    const rendezvous = await RendezVous.findOne({ etudiant: etudiantId, disponibilite: disponibiliteId });
    if (!rendezvous) {
      return res.status(404).json({ message: 'Rendez-vous introuvable' });
    }

    // Delete the rendezvous document
    await rendezvous.remove();

    res.status(200).json({ message: 'Rendez-vous annulé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'annulation du rendez-vous' });
  }
};

//get rendez vous by availabilityId

// exports.getRendezVousByDisponibilite = async (req, res, next) => {
//   const { disponibiliteId } = req.params;
//   try {
//     const rendezvous = await RendezVous.find({ disponibilite: disponibiliteId }).populate('etudiant');
//     res.status(200).json(rendezvous);
//   } catch (error) {
//     next(error);
//   }
// };

