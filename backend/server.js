require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const articleRoutes = require('./routes/article.route');
const admin_psyRoutes= require('./routes/admin-psy.route');
const admin_etudiantRoutes= require('./routes/admin-etudiant.route');
const adminRoutes=require('./routes/admin.route');
const Admin =require('./models/admin');
// Configuration du port d'écoute
const PORT = process.env.PORT || 3000;
// Initialiser l'application Express
const app = express();

// Middleware pour parser le corps des requêtes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Autoriser les requêtes Cross-Origin Resource Sharing (CORS)
app.use(cors());

//Se connecter à la base de données MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/myappdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// // creation d'un admin 
// async function seed() {
//   const email = 'admin@gmail.com';
//   const password = 'admin';
//   const admin = new Admin({ email, password });
//   await admin.save();
//   console.log('Admin created:', admin);
// //  mongoose.connection.close();
// }
// seed();



db.on('error', (error) => {
  console.error('Error connecting to database:', error);
});

db.once('open', () => {
  console.log('Connected to database');
});
app.use('/api', articleRoutes);
app.use('/admin',admin_psyRoutes,adminRoutes,admin_etudiantRoutes);
// app.use('/student',);
app.use('/uploads', express.static('uploads'));
// app.use('/admin', );
// Démarrer le serveur
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));