const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const path = require('path');
//utilisation fichier .env
const dotenv = require('dotenv');

//config fichier .env
dotenv.config();

const app = express();

//récup variables environnement
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

//MongoDB
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.o3lqv7e.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Express
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utilisation du router
app.use('/api/stuff', stuffRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;