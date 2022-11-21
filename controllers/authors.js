/* modelo */
const Author = require("../models/authors")

async function listAuthors(req, res) {
    //lista todo
    await Author.find().sort( { name: 1 } )
        .then( (result) => {
            // console.log('En [listAuthors()]. nro registros : ' + result.length )
            res.json(result)
        } )
        .catch( (error) =>{
            // console.log('Error listAuthors()' + error)
            res.status(404).json( {message: 'Error en consulta' } )
        } )
}

async function newAuthor(req, res){
    //Nuevo
    const { name } = req.body;
    const newAuthor = new Author
    newAuthor.name =  name
    await newAuthor.save()
        .then( (result) => {
            // console.log('En [newAuthor()] : OK' )// + result)
            res.json( { message: 'Insert OK', author: result.name } )
        } )
        .catch( (error) =>{
            // console.log('Error newAuthor():' + error)
            res.status(404).json( { message: error.message } )
        } )
}
    

async function getIdAuthor (req, res) {
    //Busca uno por _id
    await Author.findOne( { _id: req.params.id})
        .then( (result) => {
            // console.log('En [getIdAuthor('+ req.params.id+')]: OK')
            res.json(result)
        })
        .catch( (error) =>{
            // console.log('Error getIdAuthor()' + error)
            res.status(404).json(  { message: error.message }  )
        })
}

async function updIdAuthor (req, res) {
    //Actualizar por id
    const { name } = req.body;
    const id = req.params.id
    // console.log( `Entro   id: ${id}   name: ${name}`  )
    await Author.updateOne(
        { _id: id } , {$set: { name: name } } )
        .then( (result) => {
            // console.log( 'En [updIdAuthor('+ id + ')]: OK' )
            res.json( { message: 'Actualización Exitosa' } )
        })
        .catch( (error) => {
            // console.log( 'Error Actualización updIdAuthor()' + error)
            res.status(404).json(  { message: error.message }  )
        })
}

async function delIdAuthor( req, res){
    //elimina por ID
    await Author.deleteOne( { _id: req.params.id })
    .then( (result) => {
        // console.log( 'En [delIdAuthor('+ req.params.id+')] OK')
        res.json( { message: 'Registro Eliminado' } )
    })
    .catch( (error) =>{
        // console.log( 'Error [delIdAuthor()]' + error)
        res.status(404).json(  { message: error.message }  )
    })
}

async function newQuoteAuthor(req, res) {
    //Busca uno por _id
    const { quotename, votes } = req.body;
    // console.log(`llego:  quotename [${quotename}]  vote [${votes}] id: [${req.params.id}] `)
    await Author.findOneAndUpdate ( 
                { _id: req.params.id } ,
                {$push: { quotes: { quotename , votes  } } } )
        .then( (result) => {
            // console.log( '[newQuoteAuthor('+ req.params.id+')] cita OK')
            res.json( { message: 'Registro Ingresado' } )
        })
        .catch( (error) => { 
            // console.log( "error: [newQuoteAuthor] en save : " + error)
            res.status(404).json(  { message: error.message }  )
        } )
}

async function voteQuoteAuthor(req, res) {
    const { idQuotes, votes } = req.body;
    let estado = true
    // console.log(`llego:  idquotes [${idquotes}]  vote [${votes}] id: [${req.params.id}] `)
    await Author.findOne( { _id: req.params.id })
        .then( async (result) => {
            for (let i=0; i < result.quotes.length; i++) {
                // console.log (result.quotes[i]._id)
                if (result.quotes[i]._id == idQuotes ) {
                    // if ( (result.quotes[i].votes + votes) < 0  ) {
                    //     estado = false
                    //     break
                    // } else {
                        result.quotes[i].votes = result.quotes[i].votes + votes
                        break
                    // }
                }
            }
            // if (estado) {
                await result.save()
                .then( (resUpdate) => {
                    // console.log("Encontrado :  " + resUpdate)
                    res.json( { message: 'Registro actualizado' } )
                } ) 
                .catch( (error) => {
                    // console.log( "error: [newQuoteAuthor] en save : " + error)
                    res.status(404).json(  { message: error.message }  )
                } )
            // } else {
            //     res.status(404).json( { message: 'Genera negativo' } )
            // }
        })
        .catch( (error) => {
            // console.log( "error: [newQuoteAuthor] en buscar : " + error)
            res.status(404).json(  { message: error.message }  )
        })
}

async function delQuoteAuthor(req, res) {
    const { idQuote } = req.body
    // console.log(req.body)
    // console.log(`llego:  idQuote [${idQuote}] id: [${req.params.id}] `)
    await Author.updateMany( 
        { _id: req.params.id },
        { $pull: { quotes: { _id: idQuote }  } } )
        .then( (result) => {
            // console.log( '[delQuoteAuthor('+ req.params.id+')] cita OK')
            // console.log( result)
            res.json( { message: 'Registro Ingresado' } )
        })
        .catch( (error) => { 
            // console.log( "error: [delQuoteAuthor]  : " + error)
            res.status(404).json(  { message: error.message }  )
        } )
}

module.exports = {
    listAuthors,
    newAuthor,
    getIdAuthor,
    updIdAuthor,
    delIdAuthor,
    newQuoteAuthor,
    voteQuoteAuthor,
    delQuoteAuthor
 }
