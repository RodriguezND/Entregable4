
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb")


class ProductosDaoMongoDb extends ContenedorMongoDb
{

    constructor(){

        super()
    }

    async desconectar(){

    }
}

module.exports = ProductosDaoMongoDb
