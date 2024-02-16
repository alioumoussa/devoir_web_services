const express = require('express');
const soap = require('soap');


const router = express.Router()
// Adresse du WSDL du service SOAP
const wsdlUrl = 'http://localhost:8080/employeeService?wsdl';

// Fonction pour créer le client SOAP
function createSOAPClient(callback) {
    soap.createClient(wsdlUrl, (err, client) => {
        if (err) {
            console.error('Erreur lors de la création du client SOAP:', err);
            callback(err, null);
        } else {
            callback(null, client);
        }
    });
}

// Page d'accueil
router.get('/', (req, res) => {

    const pathArray = req.originalUrl.split('/');
    const serviceURL = '/' + pathArray[1];
    console.log(req.path);
    console.log(serviceURL);
    createSOAPClient((err, client) => {
        if (err) {
            res.status(500).send('Erreur lors de la création du client SOAP');
            return;
        }

        // Appeler l'opération getAllEmployees
        client.getAllEmployees({}, (err, response) => {
            if (err) {
                console.error('Erreur lors de l\'appel de getAllEmployees:', err);
                res.status(500).send('Erreur lors de l\'appel de getAllEmployees');
                return;
            }
            console.log('Résultat de getAllEmployees:', response);
            res.render('index', { employees: response.return, baseURL : '/soap' });
        });
    });
});

// Route pour afficher le formulaire d'ajout d'employé
router.get('/addEmployee', (req, res) => {
    res.render('addEmployee', {serviceURL : '/soap'});
});

// Route pour ajouter un employé
router.post('/addEmployee', (req, res) => {
    const { name, salary } = req.body;
   

    createSOAPClient((err, client) => {
        if (err) {
            res.status(500).send('Erreur lors de la création du client SOAP');
            return;
        }

        // const newEmployee = new Employee(name, salary);
        const employeeData = {
            // id: '20', // Remplacez par l'ID de l'employé (optionnel)
            name: name, // Remplacez par le nom de l'employé
            salary: salary // Remplacez par le salaire de l'employé
        };
        // Appeler l'opération createEmployee
        client.createEmployee({ arg0: employeeData }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erreur lors de l\'ajout de l\'employé');
                return;
            }
            console.log('Résultat de createEmployee:', response);
            res.redirect('http://localhost:3000/soap'); // Rediriger vers la page d'accueil après l'ajout de l'employé
        });
    });
});

// Route pour récupérer un employé par ID
router.get('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    createSOAPClient((err, client) => {
        if (err) {
            res.status(500).send('Erreur lors de la création du client SOAP');
            return;
        }
    
        // Appeler l'opération getEmployeeById
        client.getEmployeeById({arg0 : id}, (err, response) => {
            if (err) {
                res.status(500).send('Erreur lors de la récupération de l\'employé');
                return;
            }
            console.log('Employé récupéré avec succès:', response);
            res.render('updateEmployee', {employee : response.return, serviceURL : '/soap'} );
        });
    });
});

// Route pour supprimer un employé par ID
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const referer = req.headers.referer;
    createSOAPClient((err, client) => {
        if (err) {
            res.status(500).send('Erreur lors de la création du client SOAP');
            return;
        }

        // Appeler l'opération deleteEmployee
        client.deleteEmployee({ arg0: id }, (err, response) => {
            if (err) {
                res.status(500).send('Erreur lors de la suppression de l\'employé');
                return;
            }
            console.log('Employé supprimé avec succès:', response);
            res.redirect(referer); // Rediriger vers la page d'accueil après la suppression
        });
    });
});



// app.get('/updateEmployee/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     createSOAPClient((err, client) => {
//         if (err) {
//             res.status(500).send('Erreur lors de la création du client SOAP');
//             return;
//         }
    
//         // Appeler l'opération getEmployeeById
//         client.getEmployeeById({arg0 : id}, (err, response) => {
//             if (err) {
//                 res.status(500).send('Erreur lors de la récupération de l\'employé');
//                 return;
//             }
//             console.log('Employé récupéré avec succès:', response);
//             res.render('updateEmployee', {employee : response} );
//         });
//     });
// });
router.post('/updateEmployee/:id', (req, res) => {
    const { name, salary } = req.body;
    const id=parseInt(req.params.id);
    const referer = req.headers.referer;
 
    createSOAPClient((err, client) => {
        if (err) {
            res.status(500).send('Erreur lors de la création du client SOAP');
            return;
        }

        // const newEmployee = new Employee(name, salary);
        const newData = {
            id: id, // Remplacez par l'ID de l'employé (optionnel)
            name: name, // Remplacez par le nom de l'employé
            salary: salary // Remplacez par le salaire de l'employé
        };
    
        // Appeler l'opération createEmployee
        client.updateEmployee({ arg0: id, arg1 : newData }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erreur lors de l\'ajout de l\'employé');
                return;
            }
            console.log('Résultat de createEmployee:', response);
            res.redirect('http://localhost:3000/soap'); // Rediriger vers la page d'accueil après l'ajout de l'employé
        });
    });
});


module.exports = router;