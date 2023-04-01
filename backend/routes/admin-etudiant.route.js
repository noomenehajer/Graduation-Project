
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/etudiant');
const config = require('../config/config');
const adminStController=require('../Controllers/admin-stController');
// const {verifyAdminToken}= require('../Controllers/authController.js');

router.get('/students',adminStController.getAllStudents);
router.patch('/students/edit/:id',adminStController.editStudent);
router.delete('/students/:id',adminStController.deleteStudent);
router.get('/students/invalid',adminStController.getNonValidStudents);
router.post('/students/add',adminStController.addStudent);
router.get('/students/:id',adminStController.getStudent, (req, res) => {
  res.json(res.student);
});

router.put('/students/suspend/:id',adminStController.toggleSuspendAccount, (req, res) => {
  res.json(res.student);
});


module.exports = router;
