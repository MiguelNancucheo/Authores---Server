const cnxmongoose = require("../config/mongoose")

/* ****************************************************** */
/*    Schema                                              */
/* ****************************************************** */

const AuthorsSchema = new cnxmongoose.Schema( {
    name: { 
        type: String, 
        requerid: [true, "Se requiere de name Authors"],
        unique: [true, 'Authors ya existe'],
        minlength: 3, 
        maxlength: 50
    },
}, { timestamps: true } )

const Author = cnxmongoose.model('Author', AuthorsSchema);

module.exports = Author

