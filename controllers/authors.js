/* modelo */
const Author = require("../models/authors")

async function listAuthors(req, res) {
    //lista todo
    await Author.find().sort( { name: 1 } )
        .then( (respuesta) => {
            console.log('Entregado OK listAuthors(). nro registros : ' + respuesta.length )
            res.json(respuesta)
        } )
        .catch( (error) =>{
            console.log('Error listAuthors()' + error)
            res.status(404).json( {error: 'Error en consulta' } )
        } )
}

async function newAuthor(req, res){
    //Nuevo
    const { name } = req.body;
    const newAuthor = new Author
    newAuthor.name =  name
    await newAuthor.save()
        .then( (respuesta) => {
            console.log('Agregado registro por newAuthor() : OK' )// + respuesta)
            res.json( { msg: 'Insert OK', author: respuesta.name } )
        } )
        .catch( (error) =>{
            console.log('Error newAuthor():' + error)
            res.status(404).json( { msg: error.message } )
        } )
}
    

async function getIdAuthor (req, res) {
    //Busca uno por _id
    await Author.findOne( { _id: req.params.id})
        .then( (respuesta) => {
            console.log('Consultado registro por ID['+ req.params.id
                    +'] por getIdAuthor(): OK')
            res.json(respuesta)
        })
        .catch( (error) =>{
            console.log('Error getIdAuthor()' + error)
            res.status(404).json(  { msg: error.message }  )
        })
}

async function updIdAuthor (req, res) {
    //Actualizar por id
    const { name } = req.body;
    const id = req.params.id
    console.log(id)
    console.log(name)
    await Author.updateOne(
        { _id: id } , {$set: { name: name } } )
        .then( (respuesta) => {
            console.log( 'Actualización de registro exitoso ['+ id +
                        '] por updIdAuthor(): OK' )
            res.json( { message: 'Actualización Exitosa' } )
        })
        .catch( (error) => {
            console.log( 'Error Actualización updIdAuthor()' + error)
            res.status(404).json(  { msg: error.message }  )
        })
}

async function delIdAuthor( req, res){
    //elimina por ID
    await Author.deleteOne( { _id: req.params.id })
    .then( (respuesta) => {
        console.log( 'Eliminación de registro ['+ req.params.id +
                 '] por delIdAuthor(): OK')
        res.json( { message: 'Registro Eliminado' } )
    })
    .catch( (error) =>{
        console.log( 'Error de Eliminación, delIdAuthor()' + error)
        res.status(404).json(  { msg: error.message }  )
    })
}


module.exports = {
    listAuthors,
    newAuthor,
    getIdAuthor,
    updIdAuthor,
    delIdAuthor }
