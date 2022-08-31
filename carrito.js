const express = require("express");
const fs = require("fs");
const { Router } = express;

const router = Router();

const productosArchivo = "./productos.txt"
const carritoArchivo = "./carrito.txt"
let hayCarrito = false

//GET CARRITO
/* router.get("/", (req,res) => {
    
    fs.promises.readFile(carritoArchivo, "utf-8")
    .then( contenido => {

        let carritoJson = JSON.parse(contenido)

        if(carritoJson.length > 0)
        {
            hayCarrito = true
            res.render("carrito.ejs", {carrito:carritoJson,hayCarrito: hayCarrito})

        } else {
            
            res.render("carrito.ejs", {hayCarrito: hayCarrito})
        }

    })
    .catch(error => {

        return console.log("Error", error)
    })
        

}) */

//GET DE PRODUCTOS POR ID DE CARRITOS
router.get("/:id/productos", (req,res) => {
    
    const id = req.params.id;

    fs.promises.readFile(carritoArchivo, "utf-8")
    .then( contenido => {

        let carritoJson = JSON.parse(contenido)

        const productos = fs.readFileSync(productosArchivo, "utf-8")
        let productoJson = JSON.parse(productos)

        console.log(carritoJson)

        if(carritoJson.length > 0)
        {
            hayCarrito = true

            for(let i=0;i<carritoJson.length;i++)
            {
                if(carritoJson[i].id == id){ 
                    
                    let productos = carritoJson[i]["productos"]

                    res.render("ListarProductosCarrito.ejs", {carrito:productos, idcarrito:id, productos:productoJson})
                    return
                } 
            } 



            res.render("carrito.ejs", {carrito:carritoJson,hayCarrito: hayCarrito})

        } else {
            
            res.render("carrito.ejs", {hayCarrito: hayCarrito})
        }


    })
    .catch(error => {

        return console.log("Error", error)
    })
        

})

//POST DE PRODUCTOS POR ID DE CARRITOS
router.post("/:id/productos", (req, res) => {

    const idCarrito = req.params.id;
    let idCarritoNum = Number(idCarrito)

    const idProducto = req.body

    fs.promises.readFile(carritoArchivo, "utf-8")
    .then( contenido => {

        let carritoJson = JSON.parse(contenido)

        const productos = fs.readFileSync(productosArchivo, "utf-8")
        let productoJson = JSON.parse(productos)

        console.log(carritoJson)

        if(carritoJson.length > 0)
        {
            hayCarrito = true

            for(let i=0;i<productoJson.length;i++)
            {
                if(productoJson[i].id == idProducto["id"]){ 
                    
                    let produ = productoJson[i]

                    console.log(carritoJson[idCarritoNum-1]["productos"])

                    carritoJson[idCarritoNum-1]["productos"].push(produ)

            /*Escribe en el archivo Producto */
            let carritoString = JSON.stringify(carritoJson, null, carritoJson.length);

            fs.promises.writeFile(carritoArchivo, carritoString)
            /* ************* */

                    res.render("ListarProductosCarrito.ejs", {carrito:carritoJson[idCarritoNum-1]["productos"], idcarrito:idCarrito, productos:productoJson})
                    return
                } 
            } 

        } else {
            
            res.render("ListarProductosCarrito.ejs", {carrito:carritoJson, idcarrito:idCarrito, productos:carritoJson[idCarrito]["productos"]})
        }


    })
    .catch( error => {

        return console.log("Error", error)

    })


})

//POST CREA CARRITO
router.post("/", (req, res) => {

    fs.promises.readFile(carritoArchivo, "utf-8")
    .then( contenido => {
        let carritoJson = JSON.parse(contenido)

        if(carritoJson.length == 0){

            hayCarrito = true

            let carritoNuevo = {}

            carritoNuevo.id = 1
            carritoNuevo.timestamp = Date.now()
            carritoNuevo.productos = []

            carritoJson.push(carritoNuevo)

            /*Escribe en el archivo Producto */
            let carritoString = JSON.stringify(carritoJson, null, carritoJson.length);

            fs.promises.writeFile(carritoArchivo, carritoString)
            /* ************* */

            console.log(carritoJson[carritoJson.length-1]["id"])

            res.render("carrito.ejs", {carrito:carritoJson,hayCarrito: hayCarrito})

        }
        else{

            const cantidad = carritoJson.length
            const carritoUltimo = carritoJson[cantidad-1]

            let carritoNuevo = {}
 
            carritoNuevo.id = carritoUltimo.id +1 
            carritoNuevo.timestamp = Date.now()
            carritoNuevo.productos = []

            carritoJson.push(carritoNuevo)

            /*Escribe en el archivo Producto */
            let carritoString = JSON.stringify(carritoJson, null, carritoJson.length);

            fs.promises.writeFile(carritoArchivo, carritoString)
            /* ************* */

            res.render("carrito.ejs", {carrito:carritoJson,hayCarrito: hayCarrito})
        }

    })
    .catch( error => {

        return console.log("Error", error)

    })


})

//DELETE CARRITO
router.delete("/:id", (req,res) => {

    const id = req.params.id;

    fs.promises.readFile(carritoArchivo, "utf-8")
    .then( contenido => {

        let carritoJson = JSON.parse(contenido)

        console.log(carritoJson)

        for(let i=0;i<carritoJson.length;i++)
        {
            if(carritoJson[i].id == id){ 
                
                carritoJson.splice(i,1)
                haycarrito = true

                /*Escribe en el archivo carrito */
                let carritoString = JSON.stringify(carritoJson, null, carritoJson.length);
                fs.promises.writeFile(carritoArchivo, carritoString)
                /* ************* */

                res.render("carritoEliminado.ejs", {carrito:carritoJson,haycarrito: haycarrito, idcarrito: id})
                return
            } 
        } 

    })
    .catch(error => {

        return console.log("Error", error)
    })


})

router.delete("/:id/productos/:id_prod", (req,res) => {

    const id = req.params.id;
    let idNum = Number(id)

    const id_prod = req.params.id_prod;

    fs.promises.readFile(carritoArchivo, "utf-8")
    .then( contenido => {

        const productos = fs.readFileSync(productosArchivo, "utf-8")
        let productoJson = JSON.parse(productos)


        let carritoJson = JSON.parse(contenido)

        let productosCarrito = carritoJson[idNum-1]["productos"]

        for(let i=0;i<productosCarrito.length;i++)
        {
            if(productosCarrito[i]["id"] == id_prod){ 
                
                productosCarrito.splice(i,1)
                haycarrito = true

                carritoJson[idNum-1]["productos"] = productosCarrito
                /*Escribe en el archivo carrito */
                let carritoString = JSON.stringify(carritoJson, null, carritoJson.length);
                fs.promises.writeFile(carritoArchivo, carritoString)
                /* ************* */

                res.render("ListarProductosCarrito.ejs", {carrito:productosCarrito, idcarrito:idNum, productos:productoJson})
                return
            }
            
        } 

    })
    .catch(error => {

        return console.log("Error", error)
    })


})


module.exports = router;