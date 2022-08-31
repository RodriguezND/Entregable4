const { mongoose } = require("mongoose");

const productosCollection = "productos"

const ProductoSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max:100},
    descripcion: {type: String, require: true, max:100},
    codigo: {type: String, require: true, max:100},
    foto: {type: String, require: true, max:500},
    precio: {type: Number, require: true, max:1000},
    stock: {type: Number, require: true, max:100},
    id: {type: Number, require: true, max:100},
    timestamp: {type: String, require: true, max:100}
})

module.exports = mongoose.model(productosCollection, ProductoSchema);


