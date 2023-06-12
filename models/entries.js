// const { Pool } = require('pg');
// const queries = require('./queries')
// const pool = new Pool({
//     host: 'localhost',
//     user: 'alex',
//     database: 'postgres',
//     password: '1234'
// }) 

const pool = require('../utils/db_pgsql'); // Conexión a la BBDD
const entryQueriesDoc = require('./queries/entry.queries'); // Queries SQL



// *  GET  -------------------------------------------------------------------------------------------
// GET ENTRY BY EMAIL
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(entryQueriesDoc.getEntriesByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {  // pase lo que pase...
        client.release(); // ...cierra la base de datos
    }
    return result
}

// GET ALL ENTRIES
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(entryQueriesDoc.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


//* CREATE ---------------------------------------------------------------------------------------
const createEntry = async (entry) => { // entry es por donde llega el objeto queries de queries
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(entryQueriesDoc.createEntry,[title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


//* UPDATE   --------------------------------------------------------------------------------------
const updateEntry = async (entry) => { // entry es por donde llega el objeto queries de entryQueriesDoc
    const { new_title, content, email, category, old_title } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(entryQueriesDoc.updateEntry,[new_title, content, email, category, old_title])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//*  DELETE --------------------------------------------------------------------------------------------
const deleteEntry = async (entry) => { // entry es por donde llega el objeto queries de entryQueriesDoc
    const {title} = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(entryQueriesDoc.deleteEntry,[title])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntry,
    deleteEntry,
}

module.exports = entries;


// Pruebas GET
getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data));

getAllEntries()
.then(data=>console.log(data));


//*DELETE AN ENTRY 
deleteEntry(title).then(data=>console.log(data));



//* CREAR UNA ENTRY
let newEntry = {
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
}
createEntry(newEntry)
    .then(data => console.log(data))
    

//* ACTUALIZAR UNA ENTRY
    let dataUpdateEntry = {
        old_title: "Se acabaron las mandarinas de TB",
        new_title: "Fernando Alonso gana su tercer título", 
        content: "Alonso por fín consiguió su tan ansiado tercer título tras una temporada de infarto, remontando al RedBull de Verstappen una distancia de 35 pts.",
        email: "birja@thebridgeschool.es",
        category: "deportes"
    }
updateEntry(dataUpdateEntry)
.then(data => console.log(data));

let newAuthor = {
    name:"Gonzalo", 
    surname: "Serrano", 
    email: "gonzalo27@gmail.com", 
    image: "https://pbs.twimg.com/profile_images/1514355360169177092/V0cdan8Z_400x400.jpg"
}
createAuthor(newAuthor)
.then(data => console.log(data));

let updateDataAuthor = {
    name:"Borjita", 
    surname: "Riveru",
    email_1: "borjita@thebridgeschool.es", 
    image: "https://randomuser.me/api/portraits/thumb/men/60.jpg", 
    email_2: "birja@thebridgeschool.es"
}
updateAuthor(updateDataAuthor)
.then(data => console.log(data));

