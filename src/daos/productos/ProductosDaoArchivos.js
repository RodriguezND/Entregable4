/* import ContenedorArchivo from "../../contenedores/ContenedorArchivo"; */

const ContenedorArchivo = require("../../contenedores/ContenedorArchivo")


class ProductosDaoArchivo extends ContenedorArchivo
{

    constructor(){

        super("DB/productos.txt")
    }

    async desconectar(){

    }
}

module.exports = ProductosDaoArchivo
