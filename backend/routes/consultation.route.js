const express = require('express');
const router = express.Router();
const consultationController = require('../Controllers/consultationController');
const { protectPsy ,protect} = require('../middlewares/auth.middleware');

const { definirDisponibilite,deleteDisponibilite,demanderRv ,annulerRendezVous,getRvpsy,getRvpsyById} = require('../Controllers/consultationController');

//demander un rendez vous 
router.post('/demanderRv', protect,demanderRv);
router.delete('/annulerRv',protect,annulerRendezVous);

// Route pour récupérer les rendez vous du psychologue
router.get('/getRV',protectPsy,getRvpsy);
router.get('/getRV/:rendezvousId',protectPsy,getRvpsyById);
// Route pour définir la disponibilité du psychologue 
router.post('/disponibilites',protectPsy, definirDisponibilite);
router.delete('/:id',protectPsy, deleteDisponibilite);

// Route pour récupérer les disponibilités du psychologue pour psychologue
router.get('/getdisponibilites',protectPsy,consultationController.getDisponibilite);

// Route pour récupérer les disponibilitésdu psychologue pour l'etudiant
router.get('/getDisponibiliteByPsyId/:psyId',consultationController.getDisponibiliteByPsyId);

//  router.get('/getRendezVousByDisponibilite/:disponibiliteId', getRendezVousByDisponibilite);

module.exports = router;