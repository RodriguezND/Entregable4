const express = require("express");
const server = require("./server.js")
const fs = require("fs");
const { Router } = express;

const router = Router();

const productosArchivo = "./productos.txt"
let hayProductos = false

let admin = false

//GET FORMULARIO
router.get("/formulario", (req,res) => {

    if(admin)
    {
        fs.promises.readFile(productosArchivo, "utf-8")
        .then( contenido => {

            let productoJson = JSON.parse(contenido)

            console.log(productoJson)

            if(productoJson.length > 0)
            {
                hayProductos = true
                res.render("formulario.ejs", {productos:productoJson,hayProductos: hayProductos})

            } else {
                
                res.render("formulario.ejs", {hayProductos: hayProductos})
            }

        })
    .catch(error => {

        return console.log("Error", error)
    })
    } else {

        res.json({ error : -1, descripcion: "ruta '/formulario' método 'Nuevo Producto' no autorizada" })
    }
        

})


//GET: '/:id?'
router.get("/", (req,res) => {

    fs.promises.readFile(productosArchivo, "utf-8")
    .then( contenido => {

        let productoJson = JSON.parse(contenido)

        console.log(productoJson)

        if(productoJson.length > 0)
        {
            hayProductos = true
            res.render("index.ejs", {productos:productoJson,hayProductos: hayProductos})

        } else {
            
            res.render("index.ejs", {hayProductos: hayProductos})
        }

    })
    .catch(error => {

        return console.log("Error", error)
    })
    


})

router.get("/:id?", (req,res) => {

    const id = req.params.id;

    fs.promises.readFile(productosArchivo, "utf-8")
    .then( contenido => {

        let productoJson = JSON.parse(contenido)

        if(productoJson.length > 0)
        {
            for(let i=0;i<productoJson.length;i++)
            {
            if(productoJson[i].id == id){     

                const produ = [productoJson[i]]

                res.render("index.ejs", {productos:produ,hayProductos: hayProductos})
                return
            } 
            } 

        } else {
            
            res.render("index.ejs", {hayProductos: hayProductos})
        }
    })
    .catch(error => {

        return console.log("Error", error)
    })


    
})


// POST: '/'
router.post("/", (req, res) => {
    if(admin)
    {
    fs.promises.readFile(productosArchivo, "utf-8")
    .then( contenido => {
        let productoJson = JSON.parse(contenido)


        if(productoJson.length == 0){

            const productoNuevo = req.body

            hayProductos = true
            
            productoNuevo.id = 1 

            productoNuevo.timestamp = Date.now()

            productoJson.push(productoNuevo)

            /*Escribe en el archivo Producto */
            let productoString = JSON.stringify(productoJson, null, productoJson.length);

            fs.promises.writeFile(productosArchivo, productoString)
            /* ************* */

            res.render("index.ejs", {productos:productoJson,hayProductos: hayProductos})

        }
        else{

            const cantidad = productoJson.length

            const productoUltimo = productoJson[cantidad-1]

            const productoNuevo = req.body
            
            productoNuevo.id = productoUltimo.id +1 

            productoNuevo.timestamp = Date.now()

            productoJson.push(productoNuevo)

            /*Escribe en el archivo Producto */
            let productoString = JSON.stringify(productoJson, null, productoJson.length);

            fs.promises.writeFile(productosArchivo, productoString)
            /* ************* */

            res.render("index.ejs", {productos:productoJson,hayProductos: hayProductos})
        }

    })
    .catch( error => {

        return console.log("Error", error)

    })
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