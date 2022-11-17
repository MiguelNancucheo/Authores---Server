/* mongoose.js */
const cnxmongoose = require('mongoose') 

cnxmongoose.connect('mongodb://0.0.0.0:27017/Authors_db', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    } )
    .then( () => console.log("Se conecto a Authors_db") )
    .catch( (error)=> console.log(error));

 module.exports = cnxmongoose