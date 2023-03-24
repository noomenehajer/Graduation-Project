const express = require('express');
const router = express.Router();
const adminPsyController= require('../Controllers/admin-psyController');






router.get('/psychologues',adminPsyController.getAllPsychologues);
router.post('/psychologues/add',adminPsyController.addPsychologue);
router.delete('/psychologues/:id',adminPsyController.deletePsy);
router.get('/psychologues/:id',adminPsyController.getPsychologue);
router.get('/psychologues/invalidPsy',adminPsyController.getNonValidPsy);




module.exports = router;
