const express = require("express");
const app = express();
const port = 3000;

const entriesApiRoutes = require('./routes/entriesApiRoutes')


// Middlewares
app.use(express.json()); // Habilitar tipo de dato a recibir
app.use(express.urlencoded({ extended: true }));

//Public folder
app.use(express.static('public'))

app.use('/api/entries',entriesApiRoutes); // Rutas API entries


app.listen(port, () => console.info(`>listening at ${port}`))