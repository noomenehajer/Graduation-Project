const Disponibilite = require('../models/disponibilite');
const RendezVous = require('../models/rendezvous');
const Psychologue=require('../models/psy');
const asyncHandler = require('express-async-handler')


exports.definirDisponibilite = async (req, res) => {
  try {
    const { jour, debut, fin } = req.body;
    const psyId = req.body.psy;

    const disponibilite = new Disponibilite({
      psy: psyId,
      seance: { jour, debut, fin },
    });
    console.log(disponibilite);

    await disponibilite.save();

    res.status(201).json(disponibilite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.getDisponibilite = async (req, res) => {
  try {
    const { psyId } = req.body.psy;

    const disponibilites = await Disponibilite.find({  psyId });

    res.status(200).json(disponibilites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  

// Action pour consulter les rendez-vous du psychologue
exports.consulterRendezVous = async (req, res) => {
  const { psy } = req.user; // le psychologue est récupéré depuis l'objet user de la requête

  try {
    const rendezVous = await RendezVous.find({ psy }).populate('etudiant', 'nom prenom').exec();

    res.status(200).json({ rendezVous });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des rendez-vous." });
  }
};

// Action pour gérer les demandes de consultation
exports.gererDemandesConsultation = async (req, res) => {
  const { rendezVousId, status, commentaire } = req.body;

  try {
    const rendezVous = await RendezVous.findByIdAndUpdate(rendezVousId, { status, commentaire });

    res.status(200).json({ message: "Demande de consultation mise à jour avec succès !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de la demande de consultation." });
  }
};
