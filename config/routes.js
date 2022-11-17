module.exports = function(app) {

    const {
        listAuthors,
        newAuthor,
        getIdAuthor,
        updIdAuthor,
        delIdAuthor
     } = require('../controllers/authors')

    app.get('/auhors', listAuthors) //lista todo

    app.post('/new', newAuthor) // nuevo registro

    app.get('/author/:id', getIdAuthor) //entrega por id 

    app.put('/author/:id', updIdAuthor) // actualiza

    app.delete('/author/:id', delIdAuthor) //Borrar por id

}