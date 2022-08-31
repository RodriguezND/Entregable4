const { query } = require("express");
const admin = require("firebase-admin")

const serviceAccount = require("../../DB/ecommerce-a7f41-firebase-adminsdk-p81rb-e069ba984b.json")

const model = require("../../Models/producto")

class ContenedorFirebase{

    constructor()
    {
        this.id = 0        
    }


    async connectar(){

        try 
        {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://ecommerce-a7f41.firebaseio.com"
              });

            console.log("Base Firebase Conectada!")

    
        } catch (err) {
            console.log(err)
        }


    }


    async save(objeto){

        const db = admin.firestore();
        const query = db.collection("productos")

        let doc = query.doc()

        const listaObjetos = await this.getAll()
        const IDproductosOrdenados = listaObjetos.sort((a,b) => a.id - b.id);
        const mayorID = IDproductosOrdenados[IDproductosOrdenados.length-1].id 

        const idLoco = mayorID + 1

        const producto = { nombre: objeto.nombre,
        descripcion: objeto.descripcion,
        codigo: objeto.codigo,
        foto: objeto.foto,
        precio: objeto.precio,
        stock: objeto.stock,
        id: idLoco,
        timestamp: Date.now() }

        try{

            
            await doc.create(producto)

            console.log("Datos Ingresados")


        } catch (err){
            console.log(err)
        }

        console.log("AGREGADO")

    
    }
        
    async getById(id)
    {
       
      

    }

    async getAll()
    {
        console.log("READ ALL FIREBASE")
        const db = admin.firestore();
        const query = db.collection("productos")

       try{
            const querySnapshot = await query.get()

            let docs = querySnapshot.docs;

            const response = docs.map((doc) => ({
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock,
                id: doc.data().id,
                timestamp: doc.data().timestamp

            }))

            console.log(response)

            return response

        } catch (err) { console.log(err)}
       

       
        
    }

    async deleteById(id)
    {
        
    }


    async deleteAll(){

        
    }

}


module.exports = ContenedorFirebase










