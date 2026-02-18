const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    }, 
    image: {
        type: String,
        required: [true, "La imagen es obligatoria"]
    },
    category: {
        type: String,
        required: [true, "La categoría es obligatoria"],
        enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"]
    },
    size: {
        type: String,
        required: [true, "La talla es obligatoria"],
        enum: ["XS", "S", "M", "L", "XL"]
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"]
    },
    imagePublicId: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema, 'Products')

//mongoose.model(nombreModelo, schema, nombreColeccion)