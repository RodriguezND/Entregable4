/* import ProductosDaoArchivo from "./src/daos/productos/ProductosDaoArchivos"
 */
const ProductosDaoFirebase = require("./src/daos/productos/ProductosDaoFirebase");
const ProductosDaoMemoria = require("./src/daos/productos/ProductosDaoMemoria");
const ProductosDaoMongo = require("./src/daos/productos/ProductosDaoMongoDb")
const ProductosDaoArchivo = require("./src/daos/productos/ProductosDaoArchivos")
const express = require("express");
const server = require("./server.js")
const fs = require("fs");
const { off } = require("process");

const { Router } = express;

const router = Router();

const productosArchivo = "./productos.txt"
let hayProductos = false

/*  
    const BD = 1 => ARCHIVO
    const BD = 2 => MONGO 
    const BD = 3 => FIREBASE
    const BD = 4 => MEMORIA
*/

const BD = 4

const proArchivo = new ProductosDaoArchivo()
const proMongo = new ProductosDaoMongo()
const proFirebase = new ProductosDaoFirebase()
const proMemoria = new ProductosDaoMemoria()

/* proMongo.connectar() */


/* proFirebase.connectar() */


let admin = true


//GET FORMULARIO
router.get("/formulario", (req,res) => {


    if(admin)
    {
        if(BD== 1){

            //--------------------------------BD ARCHIVO
            console.log("BASE DE DATOS ARCHIVO")
            proArchivo.getAll().then(objetoLoco => {

            if(objetoLoco.length > 0)
            {
                console.log(objetoLoco)
                hayProductos = true
                res.render("formulario.ejs", {productos:objetoLoco,hayProductos: hayProductos})

            } else {
                
                res.render("formulario.ejs", {hayProductos: hayProductos})
            }

            })
            .catch(error => {

                return console.log("Error", error)
            })
            //--------------------------------BD ARCHIVO

        }
        else if(BD == 2){
            //--------------------------------BD MONGO
            proMongo.connectar()
            console.log("BASE DE DATOS MONGO")
            productoJson = proMongo.getAll()
            hayProductos = true

            res.render("formulario.ejs", {productos:productoJson,hayProductos: hayProductos})

            //--------------------------------BD MONGO
        }
        else if(BD == 3){
            //--------------------------------BD FIREBASE
            proFirebase.connectar()
            console.log("BASE DE DATOS FIREBASE")
            productoJson = proFirebase.getAll()
            hayProductos = true

            res.render("formulario.ejs", {productos:productoJson,hayProductos: hayProductos})

            //--------------------------------BD FIREBASE
        }else if(BD == 4){
            //--------------------------------BD MEMORIA
            productoJson =proMemoria.getAll()
            hayProductos = true

            res.render("formulario.ejs", {productos:productoJson,hayProductos: hayProductos})
            //--------------------------------BD MEMORIA
        }
        
    } else {

        res.json({ error : -1, descripcion: "ruta '/formulario' método 'Nuevo Producto' no autorizada" })
    }

})

//GET: '/:id?'
router.get("/", (req,res) => {

    if(BD==1){
            //--------------------------------BD ARCHIVO
            proArchivo.getAll().then(objetoLoco => {

            if(objetoLoco.length > 0)
            {
                hayProductos = true

                console.log(objetoLoco)

                res.render("index.ejs", {productos:objetoLoco,hayProductos: hayProductos})

            } else {
                
                res.render("index.ejs", {hayProductos: hayProductos})
            }

            })
        //--------------------------------BD ARCHIVO
    }else if(BD == 2){

        //--------------------------------BD MONGO
        proMongo.connectar() 
        console.log("BASE DE DATOS MONGO")
        proMongo.getAll().then(objetoLoco => {

            if(objetoLoco.length > 0)
            {
                hayProductos = true

                console.log(objetoLoco)

                res.render("index.ejs", {productos:objetoLoco,hayProductos: hayProductos})

            } else {
                
                res.render("index.ejs", {hayProductos: hayProductos})
            }

        })
        //--------------------------------BD MONGO
    }else if(BD == 3){

        //--------------------------------BD FIREBASE
        proFirebase.connectar()
        console.log("BASE DE DATOS FIREBASE")
        proFirebase.getAll().then(objetoLoco => {

            if(objetoLoco.length > 0)
            {
                hayProductos = true

                console.log(objetoLoco)

                res.render("index.ejs", {productos:objetoLoco,hayProductos: hayProductos})

            } else {
                
                res.render("index.ejs", {hayProductos: hayProductos})
            }

        })
        //--------------------------------BD FIREBASE

    }else if(BD == 4){
        //--------------------------------BD MEMORIA
        proMemoria.getAll().then(objetoLoco => {

            if(objetoLoco.length > 0)
            {
                hayProductos = true

                console.log(objetoLoco)

                res.render("index.ejs", {productos:objetoLoco,hayProductos: hayProductos})

            } else {
                
                res.render("index.ejs", {hayProductos: hayProductos})
            }

        })
        //--------------------------------BD MEMORIA


    }
        

})

router.get("/:id?", (req,res) => {

    const id = req.params.id;
    //--------------------------------BD ARCHIVO
    proArchivo.getById(id).then(obj => {

        let produ = [obj]

        hayProductos = true 

        res.render("index.ejs", {productos:produ,hayProductos: hayProductos})
        return

    })
    //--------------------------------BD ARCHIVO

})

// POST: '/'
router.post("/", (req, res) => {
    if(admin)
    {
        if(BD== 2){
        //--------------------------------BD MONGO
            proMongo.connectar() 
            const productoNuevo = req.body

            hayProductos = true

            proMongo.save(productoNuevo)

            productoJson = proMongo.getAll()

            res.render("index.ejs", {productos:productoJson,hayProductos: hayProductos})
            //--------------------------------BD MONGO

        }else if(BD == 3){
            
            //--------------------------------BD FIREBASE
            proFirebase.connectar()
            const productoNuevo = req.body

            hayProductos = true

            proFirebase.save(productoNuevo)

            productoJson = proFirebase.getAll()

            res.render("index.ejs", {productos:productoJson,hayProductos: hayProductos})

            //--------------------------------BD FIREBASE
        }else if(BD == 4){

            const productoNuevo = req.body
            hayProductos = true
            proMemoria.save(productoNuevo)
            productoJson = proMemoria.getAll()

            res.render("index.ejs", {productos:productoJson,hayProductos: hayProductos})

        }
     
    } else{
        res.json({ error : -1, descripcion: "ruta '/' método 'Agregar Producto' no autorizada" })
    }
        

})

//PUT: '/:id'
router.put("/:id", (req, res) => {

    const id = req.params.id;
    if(admin){
        fs.promises.readFile(productosArchivo, "utf-8")
        .then( contenido => {

            let productoJson = JSON.parse(contenido)

            for(let i=0;i<productoJson.length;i++)
            {
                if(productoJson[i].id == id){    
                    
                    productoJson[i] = req.body
                    productoJson[i].id = id
                    productoJson[i].timestamp = Date.now()

                    /*Escribe en el archivo Producto */
                    let productoString = JSON.stringify(productoJson, null, productoJson.length);
                    fs.promises.writeFile(productosArchivo, productoString)
                    /* ************* */

                    res.render("index.ejs", {productos:productoJson,hayProductos: hayProductos})
                    return
                } 
            } 

            res.json({"error":"Producto no encontrado"});
        })
        .catch( error => {

            return console.log("Error", error)

        })
    } else {
        res.json({ error : -1, descripcion: "ruta '/:id' método 'Actualizar Producto' no autorizada" })
    }

})

// DELETE: '/:id'
router.delete("/:id", (req,res) => {

    const id = req.params.id;
    if(admin){

        fs.promises.readFile(productosArchivo, "utf-8")
        .then( contenido => {

            let productoJson = JSON.parse(contenido)

            console.log(productoJson)

            for(let i=0;i<productoJson.length;i++)
            {
                if(productoJson[i].id == id){ 
                    
                    productoJson.splice(i,1)
                    hayProductos = true

                    /*Escribe en el archivo Producto */
                    let productoString = JSON.stringify(productoJson, null, productoJson.length);
                    fs.promises.writeFile(productosArchivo, productoString)
                    /* ************* */

                    res.render("index.ejs", {productos:productoJson,hayProductos: hayProductos})
                    return
                } 
            } 

        })
        .catch(error => {

            return console.log("Error", error)
        })
    } else {

        res.json({ error : -1, descripcion: "ruta '/:id' método 'Eliminar Producto' no autorizada" })
    }      


})


module.exports = router;