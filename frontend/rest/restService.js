const express = require('express');
const axios = require('axios');

const router = express.Router();

const baseUrl = 'http://localhost:8081';

// Page d'accueil
router.get('/', async (req, res) => {
    try {
        // Appel à votre service REST pour récupérer tous les employés
        const response = await axios.get(`${baseUrl}/employees`);
        const employees = response.data;
        res.render('index', { employees, baseURL : '/rest' });
        console.log(employees)
    } catch (error) {
        console.error('Erreur lors de la récupération des employés:', error);
        res.status(500).send('Erreur lors de la récupération des employés');
    }
});

// Route pour afficher le formulaire d'ajout d'employé
router.get('/addEmployee', (req, res) => {
    res.render('addEmployee', {serviceURL : '/rest'});
});

// Route pour ajouter un employé
router.post('/addEmployee', async (req, res) => {
    try {
        const { name, salary } = req.body;
        // Appel à votre service REST pour créer un nouvel employé
        await axios.post(`${baseUrl}/employees`, { name, salary });
        res.redirect('http://localhost:3000/rest');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'employé:', error);
        res.status(500).send('Erreur lors de l\'ajout de l\'employé');
    }
});

// Route pour récupérer un employé par ID
router.get('/employees/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // Appel à votre service REST pour récupérer un employé par ID
        const response = await axios.get(`${baseUrl}/employees/${id}`);
        const employee = response.data;
        res.render('updateEmployee', { employee, serviceURL : '/rest' });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'employé:', error);
        res.status(500).send('Erreur lors de la récupération de l\'employé');
    }
});

// Route pour supprimer un employé par ID
router.get('/delete/:id', async (req, res) => {
    const referer = req.headers.referer;
    try {
        const id = req.params.id;
        // Appel à votre service REST pour supprimer un employé par ID
        await axios.delete(`${baseUrl}/employees/${id}`);
        res.redirect(referer);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé:', error);
        res.status(500).send('Erreur lors de la suppression de l\'employé');
    }
});

// Route pour mettre à jour un employé par ID
router.post('/updateEmployee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, salary } = req.body;
        // Appel à votre service REST pour mettre à jour un employé par ID
        await axios.put(`${baseUrl}/employees/${id}`, { name, salary });
        res.redirect('http://localhost:3000/rest');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'employé:', error);
        res.status(500).send('Erreur lors de la mise à jour de l\'employé');
    }
});



module.exports = router;