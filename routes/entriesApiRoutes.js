const express = require('express');
// Rutas de productos
const entriesApiController = require("../controllers/entriesApiController");
const entriesApiRouter = express.Router();

entriesApiRouter.get('/', entriesApiController.getEntries);
entriesApiRouter.post('/', entriesApiController.createEntry);
entriesApiRouter.put('/', entriesApiController.updateEntry);
entriesApiRouter.delete('/title', entriesApiController.deleteEntry);
entriesApiRouter.get('/authors', entriesApiController.getAllAuthors);
entriesApiRouter.get('/authors?', entriesApiController.getAuthorEmail);
entriesApiRouter.post('/authors', entriesApiController.createAuthor);
entriesApiRouter.put('/authors', entriesApiController.updateAuthor);
entriesApiRouter.put('/authors', entriesApiController.deleteAuthor);


module.exports = entriesApiRouter;

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
// POST http://localhost:3000/api/entries
/*
{
    "title":"noticia desde Node",
    "content":"va a triunfar esto2",
    "email":"alejandru@thebridgeschool.es",
    "category":"sucesos"
}
    */


//PUT json body
// {
//     "old_title": "Se acabaron las mandarinas de TB",
//     "new_title": "Fernando Alonso gana su tercer título", 
//     "content": "Alonso por fín consiguió su tan ansiado tercer título tras una temporada de infarto, remontando al RedBull de Verstappen una distancia de 35 pts.",
//     "email": "birja@thebridgeschool.es",
//     " ": "deportes"
// }
