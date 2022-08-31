const { mongoose } = require("mongoose");

const model = require("../../Models/producto")

class ContenedorMongoDb{

    constructor()
    {
        this.id = 0        
    }


    async connectar(){

        try 
        {
            const URL = "mongodb://localhost:27017/ecommerce"
            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
    
            console.log("Base de datos conectada!")

    
        } catch (err) {
            console.log(err)
        }


    }


    async save(objeto){

        let productoBuscado = await model.find({})

        const IDproductosOrdenados = productoBuscado.sort((a,b) => a.id - b.id);
        const mayorID = IDproductosOrdenados[IDproductosOrdenados.length-1].id

        console.log(mayorID)
        
        const idLoco = mayorID + 1

        const producto = { nombre: objeto.nombre,
        descripcion: objeto.descripcion,
        codigo: objeto.codigo,
        foto: objeto.foto,
        precio: objeto.precio,
        stock: objeto.stock,
        id: idLoco,
        timestamp: Date.now() }

        const productoSaveModel = model(producto)
        let productoSave = await productoSaveModel.save()
        console.log(productoSave)

        console.log("AGREGADO")

    
    }
        
    async getById(id)
    {
       
      

    }

    async getAll()
    {
       console.log("READ ALL")
       let producto = await model.find({})
       /* console.log(producto) */

       return producto
        
    }

    async deleteById(id)
    {
        
    }


    async deleteAll(){

        
    }

}


module.exports = ContenedorMongoDb










