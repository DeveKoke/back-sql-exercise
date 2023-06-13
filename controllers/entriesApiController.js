const entry = require('../models/entries'); // Importar el modelo de la BBDD
const author = require ('../models/authors')

//getEntries
// if(hay email)
//     busca por mail 
// else
//     busca todo


// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getEntriesEmail = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

const getAllAuthors = async (req, res) => {
    let authors;
    if (req.query) {
        authors = await author.getAllAuthors(req.query);
    }
    else {
        authors = await author.getAllAuthors();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

const getAuthorEmail = async (req, res) => {
    let authors;
    if (req.query.email) {
        authors = await author.getAuthorByEmail(req.query.email);
    }
    else {
        authors = await author.getAuthorByEmail();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

//createEntry
// POST http://localhost:3000/api/entries
// let newEntry = {
//     title:"noticia desde Node",
//     content:"va a triunfar esto2",
//     email:"alejandru@thebridgeschool.es",
//     category:"sucesos"}

// Crear entry por email
const createEntry = async (req, res) => {
    const dataEntry = req.body; // {title,content,email,category}
    const response = await entry.createEntry(dataEntry);
    console.log('aquí llega')
    res.status(201).json({
        "items_created": response,
        data: dataEntry
    });
}

const createAuthor = async (req, res) => {
    const dataAuthor = req.body; // {title,content,email,category}
    const response = await author.createAuthor(dataAuthor);
    res.status(201).json({
        "usuario creado:": response,
        data: dataAuthor
    });
}

// Crear entry por email
const updateAuthor = async (req, res) => {
    const dataAuthor = req.body; // {new_title,content,email,category, old_title}
    const response = await author.updaupdateAuthorteEntry(dataAuthor);
    res.status(200).json({
        "autor actualizado": response,
        data: dataAuthor
    });
}

const updateEntry = async (req, res) => {
    const dataEntry = req.body; // {new_title,content,email,category, old_title}
    const response = await entry.updateEntry(dataEntry);
    res.status(201).json({
        "items_updated": response,
        data: dataEntry
    });
}


const deleteEntry = async (req, res) => {
    const dataEntry = req.body; // {title}
    const response = await entry.deleteEntry(dataEntry);
    res.status(200).json({
        "Se ha borrado la entry  ": response,
        data: dataEntry
    });
}
const deleteAuthor = async (req, res) => {
    const dataAuthor = req.body; // {email}
    const response = await author.deleteAuthor(dataAuthor);
    res.status(200).json({
        "Se ha borrado el autor: ": response,
        data: dataAuthor
    });
}


module.exports = {
    getEntriesEmail,
    createEntry,
    updateEntry, //--> PUT
    deleteEntry, //--> DELETE
    getAllAuthors,
    getAuthorEmail,
    createAuthor, 
    updateAuthor,
    deleteAuthor
}



