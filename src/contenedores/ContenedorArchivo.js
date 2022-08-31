const fs = require("fs");


class ContenedorArchivo{

    constructor (nombreArchivo)
    {

        this.nombreArchivo =  nombreArchivo;
        this.listaObj = new Array();
        this.id = 0;

    }

    async save(objeto){
        
        
    }
        
    async getById(id)
    {
       
        try
        {
            const objs = this.getAll().then(o=> {

                const IdBuscado = o.find(i => i.id == id)

                return IdBuscado

            }
            )
            
            return objs

        }catch (err)
        {
            return console.log("Hubo error", err)
        }

    }

    async getAll()
    {
        try
        {
            const objs = await fs.promises.readFile(this.nombreArchivo, "utf-8")
          
            return JSON.parse(objs)

         

        }catch (err)
        {
            return console.log("Hubo error", err)
        }
        
    }

    async deleteById(id)
    {
        
    }


    async deleteAll(){


        
    }

}


module.exports = ContenedorArchivo









