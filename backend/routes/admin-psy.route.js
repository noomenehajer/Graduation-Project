const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Psychologue = require('../models/psy');
const config = require('../config/config');
const adminPsyController= require('../Controllers/admin-psyController');






router.get('/psychologues',adminPsyController.getAllPsychologues);
router.post('/psychologues/add',adminPsyController.addPsychologue);
router.delete('/psychologues/:id',adminPsyController.deletePsy);
router.get('/psychologues/:id',adminPsyController.getPsychologue);




module.exports = router;
