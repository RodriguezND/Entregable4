const express = require("express");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// app.use("/estatico", express.static("public"))
 

const productos = [ 
    { title: "Ropa", price: 56, thumbnail: "http:bla", id:1},
    { title: "Shampo", price: 100, thumbnail: "http:bla",id:2},
]


app.listen(8080, () => {

    console.log("servidor ok puerto 8080")

})
//GET
app.get("/api/productos", (req,res) => {

    res.send(productos)

})

app.get("/api/productos/:id", (req,res) => {

    const id = req.params.id;

    for(let i=0;i<productos.length;i++)
    {
        if(productos[i].id == id){     
            res.send(productos[i]);
            return
        } 
    } 

    res.json({"error":"Producto no encontrado"});

})

// POST

app.post("/api/productos", (req, res) => {

    if(productos.length == 0){

        const productoNuevo = req.body
        
        productoNuevo.id = 1 

        productos.push(productoNuevo)

        res.send(productoNuevo)

    }
    else{

        const cantidad = productos.length

        const productoUltimo = productos[cantidad-1]

        const productoNuevo = req.body
        
        productoNuevo.id = productoUltimo.id +1 

        productos.push(productoNuevo)

        res.send(productoNuevo)
    }

})

//PUT

app.put("/api/productos/:id", (req, res) => {

    const id = req.params.id;

    for(let i=0;i<productos.length;i++)
    {
        if(productos[i].id == id){    
            
            productos[i] = req.body
            productos[i].id = id

            res.send(productos[i]);
            return
        } 
    } 

    res.json({"error":"Producto no encontrado"});

})

// DELETE

app.delete("/api/productos/:id", (req,res) => {

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
