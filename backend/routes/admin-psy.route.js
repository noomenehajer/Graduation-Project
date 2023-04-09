const express = require('express');
const router = express.Router();
const adminPsyController= require('../Controllers/admin-psyController');
const {protectPsy} = require('../middlewares/auth.middleware');





router.get('/psychologues',adminPsyController.getAllPsychologues);
// router.get('/psychologues/:id/disponibilites',protectPsy,adminPsyController);
router.get('/psychologues/invalidpsy',adminPsyController.getNonValidPsy);
router.post('/psychologues/add',adminPsyController.addPsychologue);
router.delete('/psychologues/:id',adminPsyController.deletePsy);
router.get('/psychologues/:id',adminPsyController.getPsychologue);
router.patch('/psychologues/edit/:id',adminPsyController.editPsy);

router.put('/psychologues/suspend/:id',adminPsyController.toggleSuspendAcc, (req, res) => {
    res.json(res.psy);
  });

module.exports = router;
