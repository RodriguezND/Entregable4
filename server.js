const express = require("express");
const productos = require("./productos.js")
const carrito = require("./carrito.js")

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.use("/api/carrito", carrito)
app.use("/api/productos", productos)


app.use("/public", express.static("public"))
 
const server = app.listen(process.env.PORT || 8080, () => {

    console.log("Servidor ok puerto 8080")

})

server.on("ERROR", error => console.log(`Error en el servidor ${error}`))



