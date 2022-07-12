const express = require("express");
const { Router } = express;

const router = Router();

const productos = [ 
    { title: "Ropa", price: 56, thumbnail: "http:bla", id:1},
    { title: "Shampo", price: 100, thumbnail: "http:bla",id:2},
]



//GET
router.get("/productos", (req,res) => {

    res.json(productos)

})

router.get("/productos/:id", (req,res) => {

    const id = req.params.id;

    for(let i=0;i<productos.length;i++)
    {
        if(productos[i].id == id){     
            res.json(productos[i]);
            return
        } 
    } 

    res.json({"error":"Producto no encontrado"});

})

// POST

router.post("/productos", (req, res) => {

    if(productos.length == 0){

        const productoNuevo = req.body
        
        productoNuevo.id = 1 

        productos.push(productoNuevo)

        res.json(productoNuevo)

    }
    else{

        const cantidad = productos.length

        const productoUltimo = productos[cantidad-1]

        const productoNuevo = req.body
        
        productoNuevo.id = productoUltimo.id +1 

        productos.push(productoNuevo)

        res.json(productoNuevo)
    }

})

//PUT

router.put("/productos/:id", (req, res) => {

    const id = req.params.id;

    for(let i=0;i<productos.length;i++)
    {
        if(productos[i].id == id){    
            
            productos[i] = req.body
            productos[i].id = id

            res.json(productos[i]);
            return
        } 
    } 

    res.json({"error":"Producto no encontrado"});

})

// DELETE

router.delete("/productos/:id", (req,res) => {

    const id = req.params.id;

    for(let i=0;i<productos.length;i++)
    {
        if(productos[i].id == id){ 
            
            productos.splice(i,1)

            res.send(productos);
            return
        } 
    } 

    res.json({"error":"Producto no encontrado"});

})

module.exports = router;