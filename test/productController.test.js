require('dotenv').config()
const request = require('supertest')
const express = require('express')
const productRoutes = require('../routes/productRoutes')
const connectDB = require('../config/db')
const mongoose = require('mongoose')
const Product = require('../models/Product')


// creamos una app de express solo para test
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', productRoutes)

console.log('Usando DB de test:', process.env.MONGO_URI_TEST)

beforeAll(async () => {
    await connectDB(process.env.MONGO_URI_TEST) //conectar a la base de datos del TEST 
})

beforeEach (async () => {
    await Product.deleteMany({})
})

afterAll(async () => {
    await mongoose.connection.db.dropDatabase() //borrar
    await mongoose.connection.close() //cerrar
})

// test GET /products


describe('GET ALL PRODUCTS', () => {
    it('should return empty array if no products exist', async () => {
        const res = await request(app).get('/api/products')
        console.log('Response body:', res.body)

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(0)
    })

    it('should return products if they exist', async () => {
        await Product.create({
            name:'Bolso rosa',
            description: 'Bolso rosa grande',
            image: 'http://image',
            category: 'Accesorios',
            size: 'L',
            price: '25'
        })

        const res = await request(app).get('/api/products')
        console.log('Response body with product:', res.body)

        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(1)
        expect(res.body[0].name).toBe('Bolso rosa')
    })
})

describe('GET PRODUCT BY ID', () => {
    let productId

    beforeEach(async () => {
        const product = await Product.create({
            name: 'Camiseta Test',
            description: 'Camiseta de prueba',
            price: 20,
            category: 'Camisetas',
            size: 'M',
            image: 'https://res.cloudinary.com/'
        })
        productId = product._id
    })

    it('should return products if they exist', async () => {
        const res = await request(app).get(`/api/products/${productId}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe('Camiseta Test')
        expect(res.body.price).toBe(20)
    })

    it('should return 404 if the product not exist', async () => {
        const fakeId = '64f0c0b0c0b0c0b0c0b0c0b0'; // ID válido pero inexistente
        const res = await request(app).get(`/api/products/${fakeId}`)
        expect(res.statusCode).toBe(404)
    })
    
    it('should return 400 if the id is invalid', async () => {
        const res = await request(app).get(`/api/products/123`)
        expect(res.statusCode).toBe(400)
    })
})

describe('POST API PRODUCTS', () => {

    it('should create a new product', async () => {
        const newProduct = {
            name: 'Pantalón Test',
            description: 'Pantalón de prueba',
            price: 35,
            category: 'Pantalones',
            size: 'L',
            image: 'https://res.cloudinary.com/mi-imagen.jpg'
        }

        const res = await request(app).post('/api/products').send(newProduct)
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe('Pantalón Test')
        expect(res.body.category).toBe('Pantalones')
    })

    it('should fail if a required field is missing', async () => {
        const incompleteProduct = {
            description: 'Sin nombre',
            price: 10,
            category: 'Camisetas',
            size: 'M',
            image: 'https://res.cloudinary.com/mi-imagen.jpg'
        }

        const res = await request(app).post('/api/products').send(incompleteProduct)
        expect(res.statusCode).toBe(500)
    })
})

describe('PUT API PRODUCTS BY ID', () => {
    let productId

    beforeEach(async () => {
        const product = await Product.create({
            name: 'Zapato Test',
            description: 'Zapato de prueba',
            price: 50,
            category: 'Zapatos',
            size: 'M',
            image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
        })
        productId = product._id
    })

    it('should update an existing product', async () => {
        const updatedData = {
            name: 'Zapato Actualizado',
            price: 55
        }

        const res = await request(app).put(`/api/products/${productId}`).send(updatedData)
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe('Zapato Actualizado')
        expect(res.body.price).toBe(55)
    })

    it('should return 404 if product not exist', async () => {
        const fakeId = '64f0c0b0c0b0c0b0c0b0c0b0'
        const res = await request(app).put(`/api/products/${fakeId}`).send({name: 'No existe'})
        expect(res.statusCode).toBe(404)
    })

    it('debería devolver 400 si el ID es inválido', async () => {
        const res = await request(app).put(`/api/products/123`).send({name: 'ID inválido'})
        expect(res.statusCode).toBe(400)
    })
})


describe('DELETE PRODUCTS BY ID', () => {
    let productId

    beforeEach(async () => {
        const product = await Product.create({
            name: 'Accesorio Test',
            description: 'Accesorio de prueba',
            price: 20,
            category: 'Accesorios',
            size: 'M',
            image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
        });
        productId = product._id
    })

    it('should delete existing product', async () => {
        const res = await request(app).delete(`/api/products/${productId}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('Product deleted successfully')
       
        // verificamos que ya no existe en la DB
        const productInDb = await Product.findById(productId)
        expect(productInDb).toBeNull()
    })

    it('should return 404 if the product not exist', async () => {
        const fakeId = '64f0c0b0c0b0c0b0c0b0c0b0'
        const res = await request(app).delete(`/api/products/${fakeId}`)
        expect(res.statusCode).toBe(404)
    })

    it('should return 400 if the id is invalid', async () => {
        const res = await request(app).delete(`/api/products/123`)

        expect(res.statusCode).toBe(400)
    })
})
