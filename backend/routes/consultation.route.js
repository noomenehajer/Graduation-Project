const express = require('express');
const router = express.Router();
const consultationController = require('../Controllers/consultationController');
const {protectPsy} = require('../middlewares/auth.middleware');
const { definirDisponibilite } = require('../controllers/consultationController');


// Route pour définir la disponibilité du psychologue
router.post('/disponibilites',protectPsy, definirDisponibilite);
// Route pour récupérer les disponibilités du psychologue
router.get('/getdisponibilites', protectPsy,consultationController.getDisponibilite);

// Route pour consulter les rendez-vous du psychologue
router.get('/rendezvous',  consultationController.consulterRendezVous);

// Route pour gérer les demandes de consultation
router.put('/rendezvous',  consultationController.gererDemandesConsultation);
module.exports = router;