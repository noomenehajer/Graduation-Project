const express = require('express');
const router = express.Router();
const consultationController = require('../Controllers/consultationController');
const {protectPsy} = require('../middlewares/auth.middleware');
const { definirDisponibilite,deleteDisponibilite } = require('../Controllers/consultationController');


// Route pour définir la disponibilité du psychologue
router.post('/disponibilites',protectPsy, definirDisponibilite);
router.delete('/deletedisponibilite',protectPsy, deleteDisponibilite);

// Route pour récupérer les disponibilités du psychologue
router.get('/getdisponibilites',consultationController.getDisponibilite);
// router.get('/getdisponibilites/:psyId', protectPsy,consultationController.getDisponibilite);
// Route pour consulter les rendez-vous du psychologue
router.get('/rendezvous',  consultationController.consulterRendezVous);

// Route pour gérer les demandes de consultation
router.put('/rendezvous',  consultationController.gererDemandesConsultation);
module.exports = router;