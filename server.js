let express = require("express")
const cors = require('cors')
let app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors())

app.listen(8000, function() {
    console.log('responde por el puerto 7999')
})

require('./config/routes')(app)