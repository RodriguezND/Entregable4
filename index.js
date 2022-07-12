const express = require("express");
const productos = require("./productos.js")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api", productos)

app.use("/formulario", express.static("public"))
 
const server = app.listen(8080, () => {

    console.log("Servidor ok puerto 8080")

})

server.on("ERROR", error => console.log(`Error en el servidor ${error}`))

