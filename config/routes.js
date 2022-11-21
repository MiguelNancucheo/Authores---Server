module.exports = function(app) {

    const {
        listAuthors,
        newAuthor,
        getIdAuthor,
        updIdAuthor,
        delIdAuthor,
        newQuoteAuthor,
        voteQuoteAuthor,
        delQuoteAuthor
     } = require('../controllers/authors')

    app.get('/authors', listAuthors) //lista todo

    app.post('/new', newAuthor) // nuevo registro

    app.get('/author/:id', getIdAuthor) //entrega por id 

    app.put('/author/:id', updIdAuthor) // actualiza autor

    app.delete('/author/:id', delIdAuthor) //Borrar por id

    app.put('/newquote/:id', newQuoteAuthor) // nuevo registro cita
    
    app.put('/votequote/:id', voteQuoteAuthor) // actualiza votacion

    app.put('/quote/:id', delQuoteAuthor) //Borrar quote 

}