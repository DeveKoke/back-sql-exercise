
const entry_authors = {
    getAuthorByEmail: `
    SELECT name, surname, email, image
	FROM authors
	where email=$1;`,
    getAllAuthors: `SELECT name, surname, email, image
	FROM public.authors;`,
    createAuthor: `INSERT INTO authors(
        name, surname, email, image)
        VALUES ($1, $2, $3, $4 );`,
    updateAuthor: `UPDATE authors
	SET name= $1, surname=$2, email=$3, image=$4
	WHERE email =$5;`,
    deleteAuthorByEmail: `DELETE FROM authors
	WHERE title=$1`,
    deleteTableAuthors: `DROP TABLE $1;`
}
module.exports = entry_authors;