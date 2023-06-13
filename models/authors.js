const pool = require('../utils/db_pgsql'); // Conexión a la BBDD
const authorQueriesDoc = require('./queries/author.queries');


//* GET ----------------------------------------------------------------
//GET ALL AUTHORS 
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorQueriesDoc.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET AUTHOR BY EMAIL
const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorQueriesDoc.getAllAuthors,[email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {  // pase lo que pase...
        client.release(); // ...cierra la base de datos
    }
    return result
}


//* CREATE ---------------------------------------------------------------------------------------
const createAuthor = async (entry) => { // entry es por donde llega el objeto queries de queries
    const { name, surname, email, image } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorQueriesDoc.createAuthor,[name, surname, email, image])
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
const updateAuthor = async (entry) => { // entry es por donde llega el objeto queries de entryQueriesDoc
    const { name, surname, email_1, image, email_2  } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorQueriesDoc.updateAuthor,[name, surname, email_1, image, email_2 ])
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
const deleteAuthor = async (entry) => { // entry es por donde llega el objeto queries de entryQueriesDoc
    const {email} = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(authorQueriesDoc.deleteAuthorByEmail,[email])
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
        const data = await client.query(authorQueriesDoc.deleteTableAuthors,[tableName])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const authors = {
    getAllAuthors,
    getAuthorByEmail,
    createAuthor, 
    updateAuthor,
    deleteAuthor,
    deleteTableEntries
}

module.exports = authors;



//*  ---------------------------  PRUEBAS DE EJECUCIÓN DE ARCHIVO --------------------------------------------


//*DELETE AN AUTHOR
// deleteAuthor("birja@thebridgeschool.es").then(data=>console.log(data));

    
//* CREAR UN AUTHOR
//     let newAuthor = {
//         name:"Gonzalo", 
//         surname: "Serrano", 
//         email: "gonzalo27@gmail.com", 
//         image: "https://pbs.twimg.com/profile_images/1514355360169177092/V0cdan8Z_400x400.jpg"
//     }
//     createAuthor(newAuthor)
//     .then(data => console.log(data));
    
//* ACTUALIZAR UNA ENTRY
// let updateDataAuthor = {
//     name:"Borjita", 
//     surname: "Riveru",
//     email_1: "borjita@thebridgeschool.es", 
//     image: "https://randomuser.me/api/portraits/thumb/men/60.jpg", 
//     email_2: "birja@thebridgeschool.es"
// }
// updateAuthor(updateDataAuthor)
// .then(data => console.log(data));
