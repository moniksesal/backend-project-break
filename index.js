const express = require('express')
require('dotenv').config()
const methodOverride = require('method-override')
const productRoutes = require('./routes/productRoutes')
const productController = require('./controllers/productController')
const connectDB = require('./config/db')
const session = require('express-session')
const authRoutes = require('./routes/authRoutes')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./docs/basicInfo');

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SESSION_SECRET, //firma la sesión
    resave: false, //no guarda sesión si no hay cambios
    saveUninitialized: false, //no crea sesiones vacías
    cookie: {maxAge: 1000 * 60 * 60} //para que se quede abierta la sesion 1h
}))
app.use(methodOverride('_method'))
app.use(express.static('public')) //carpeta para CSS
app.set('views engine', 'ejs')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

//Rutas
app.use('/', productRoutes)
app.get('/', productController.getAllProducts) //para que muestre los productos en la home, no solo en /products
app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
})
