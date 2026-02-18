const express = require('express')
require('dotenv').config()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const productController = require('./controllers/productController')

const app = express()
const PORT = process.env.PORT || 3000

//Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static('public')) //carpeta para CSS, imágenes estáticas

//Test ruta
app.use('/', productRoutes)
app.get('/', productController.getAllProducts)

//Conectar MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error', err))

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
})
