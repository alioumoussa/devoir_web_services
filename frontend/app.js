const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const soapRoutes = require('./soap/soapService');
const restRoutes = require('./rest/restService');


//Creation d'une instance de express
const app = express();


// Définition du moteur de template
app.set('view engine', 'ejs');

// Analyser les demandes de type application/json
app.use(bodyParser.json());

// Analyser les demandes de type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(methodOverride('_method'));

// Route pour la page de démarrage
app.get('/', (req, res) => {
    // Définir la valeur de baseURL en fonction de la base URL choisie
    // const baseURL = req.baseUrl === '/soap' ? '/soap' : '/rest';
    // Rendre la page start.ejs avec la valeur de baseURL
    res.render('start');
});

app.use('/soap', soapRoutes);
app.use('/rest', restRoutes);


// Port d'écoute du serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
