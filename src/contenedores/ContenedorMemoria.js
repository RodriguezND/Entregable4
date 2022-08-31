const tablaProductos = [{
    "nombre": "Fernet",
    "descripcion": "Bebida alcoholica",
    "codigo": "78235",
    "foto": "https://http2.mlstatic.com/D_NQ_NP_667080-MLA46226339547_052021-V.jpg",
    "precio": "652",
    "stock": "20",
    "id": 1,
    "timestamp": 1660156016234
},
{
    "nombre": "Vaso",
    "descripcion": "Recipiente cilindrico para beber",
    "codigo": "5896852",
    "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKMuCn-87BiV-QZjCJ8bSlifeCKymP6iurvYaO7vt&s",
    "precio": "500",
    "stock": "3",
    "id": 2,
    "timestamp": 1660154921354
}]


class ContenedorMemoria{

    constructor ()
    {

      
    }

    async save(objeto){
        
        const productoBuscado = await this.getAll()
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


        tablaProductos.push(producto)

        console.log(producto)


    }
        
    async getById(id)
    {
       
        

    }

    async getAll()
    {

        return tablaProductos
        
        
    }

    async deleteById(id)
    {
        
    }


    async deleteAll(){


        
    }

}


module.exports = ContenedorMemoria










