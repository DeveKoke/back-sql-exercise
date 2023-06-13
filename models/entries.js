const pool = require('../utils/db_pgsql'); // Conexión a la BBDD llamando al fichero de utils
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

//* DELETE TABLE 
const deleteTableEntries = async (entry) => { // entry es por donde llega el objeto queries de entryQueriesDoc
    const {tableName} = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(entryQueriesDoc.deleteTableEntries,[tableName])
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
    deleteTableEntries
}

module.exports = entries;



//*  ---------------------------  PRUEBAS DE EJECUCIÓN DE ARCHIVO --------------------------------------------
// Pruebas GET
// getEntriesByEmail("birja@thebridgeschool.es")
//     .then(data=>console.log(data));

// getAllEntries()
// .then(data=>console.log(data));


//* PRUEBA DELETE AN ENTRY 
// deleteEntry("birja@thebridgeschool.es").then(data=>console.log(data));



//* PRUEBA CREAR UNA ENTRY
// let newEntry = { 
//     title: "La tortilla de patatas declarada patrimonio de la Humanidad", 
//     content: "La UNESCO declara la tortilla de patatas como patrimonio para toda la humanidad. A parti de ahora serán un 25% más baratas", 
//     email: "muchelle@thebridgeschool.es", 
//     category: "sociedad"
    
//   }
// createEntry(newEntry)
//     .then(data => console.log(data))
    

// //* PRUEBA ACTUALIZAR UNA ENTRY
//     let dataUpdateEntry = {
//         old_title: "Se acabaron las mandarinas de TB",
//         new_title: "Fernando Alonso gana su tercer título", 
//         content: "Alonso por fín consiguió su tan ansiado tercer título tras una temporada de infarto, remontando al RedBull de Verstappen una distancia de 35 pts.",
//         email: "birja@thebridgeschool.es",
//         category: "deportes"
//     }
// updateEntry(dataUpdateEntry)
// .then(data => console.log(data));



