const Product = require('../models/Product')
const mongoose = require('mongoose')
const getProductCards = require('../helpers/getProductCards')
const {template} = require('../helpers/template')
const getProductFormEdit = require('../helpers/getProductFormEdit')
const getProductDetail = require('../helpers/getProductDetail')
const { cloudinary } = require('../config/cloudinary')


const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const category = req.query.category //lee ?category=xxx
            let products = []

            if (category) {
                products = await Product.find({category})  //filtra por categoría
            } else {
                products = await Product.find() //todos los productos
            }

            const productCards = getProductCards(products)

            const html = template(
                'Productos',
                productCards,
                'productos'
            )

            res.send(html)

        } catch (error) {
            console.error(error)
            res.status(500).json('Server error')
        }
    },

    getProductById: async (req, res) => {
        try {
            const productId = req.params.productId

            if (!productId || productId == "") {
                return res.status(400).json('id is required')
            }

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json('invalid product id')
            }

            const product = await Product.findById(productId)
            if (!product) {
                return res.status(404).json('post not found')
            }

            const productHTML = getProductDetail(product, 'shop')
            const html = template(product.name, productHTML, 'shop')

            res.send(html)

        } catch (error) {
            console.error(error)
            res.status(500).json('Server error')
        }
    },

    getDashboard: async (req, res) => {
        try {
            const products = await Product.find()
            const productCards = getProductCards(products, 'dashboard')

            const html = template(
                'Dashboard',
                productCards,
                'dashboard'
            )

            res.send(html)
        } catch (error) {
            console.error(error)
            res.status(500).json('Server error')   
        }
    },

    getNewProductForm: (req, res) => {
        const formHTML = getProductFormEdit(
            {},
            '/dashboard',
            'POST'
        )

        const html = template('Nuevo Producto', formHTML, 'dashboard')
        res.send(html)
    },

    createProduct: async (req, res) => {
        try {
            const productData = {
                ...req.body,
                image: req.file ? req.file.path : null,
                imagePublicId: req.file ? req.file.filename : null
            }

            console.log('REQ.BODY', req.body)
            console.log('REQ.FILE', req.file)
            
            await Product.create(productData)
            res.redirect('/dashboard')
        } catch (error) {
            console.error(error)
            res.status(500).send('error creating product')
        }
    },

    getProductFormEdit: async (req, res) => {
        try {
            const productId = req.params.productId

            if(!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).send('invalid ID')
            }

            const product = await Product.findById(productId)

            if (!product) {
                return res.status(404).send('product not found')
            }

            const formHTML = getProductFormEdit(
                product,
                `/dashboard/${product._id}?_method=PUT`, //ruta para actualizar
                'POST' //método POST + method-override
            )

            const html = template(`Editar ${product.name}`, formHTML, 'dashboard')

            res.send(html)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server error')
        }
    },

    getProductDashboard: async(req, res) => {
        try {
            const {productId} = req.params
            const product = await Product.findById(productId)

            if (!product) {
                return res.status(404).send('product not found')
            }

            const productDetailHTML = `
                <h1>${product.name}</h1>
                <img src="${product.image}" alt="${product.name}">
                <p>Precio: ${product.price}</p>
                <p>Categoría: ${product.category}</p>
                <p>${product.description}</p>
                <p>Talla: ${product.size}</p>

                <a href="/dashboard/${product._id}/edit"><button type="button">Editar</button></a>
                <form action="/dashboard/${product._id}?_method=DELETE" method="POST"><button type="submit">Borrar</button></form>
            `
            const html = template(product.name, productDetailHTML, 'dashboard')

            res.send(html)
        } catch (error) {
            console.error(error)
            res.status(500).send('Serve error')
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {productId} = req.params

            const product = await Product.findById(productId)

            if(!product) {
                return res.status(400).send('product not found')
            }

            const updatedData = {
                ...req.body
            }

            //si el usuario sube una nueva imagen
            if (req.file) {

                //borrar img antigua de Cloudinary
                if (product.imagePublicId) {
                    await cloudinary.uploader.destroy(product.imagePublicId)
                }

                //guardar nueva imagen
                updatedData.image = req.file.path
                updatedData.imagePublicId = req.file.filename
            }

            await Product.findByIdAndUpdate(productId, updatedData)

            res.redirect('/dashboard')
        } catch (error) {
            console.error(error)
            res.status(500).send('error updating product')
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params

            const product = await Product.findById(productId)
            if (!product) {
                return res.status(404).send('product not found')
            }

            // borrar imagen en Cloudinary (si existe)
            if (product.imagePublicId) {
                try {
                    await cloudinary.uploader.destroy(product.imagePublicId)
                } catch (err) {
                    console.error('Cloudinary deletion error:', err)
                    // no detenemos el proceso, seguimos con el borrado del prodcto
                }
            }

            // borrar producto de la base de datos
            await Product.findByIdAndDelete(productId);

            // Redirigir al dashboard
            res.redirect('/dashboard');

        } catch (error) {
            console.error(error);
            res.status(500).send('error deleting product');
        }
    },

    apiGetAllProducts: async (req, res) => { //GET ALL
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({message: 'Server error'})
        }
    },

    apiGetProductById: async (req, res) => { //GET BY ID
        try {
            const productId = req.params.productId

            if(!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({message: 'Invalid ID'})
            }

            const product = await Product.findById(productId)

            if (!product) {
                return res.status(404).json({message: 'Product not found'})
            }

            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    },

    apiCreateProduct: async (req, res) => { //CREATE
        try {
            const productData = {
                ...req.body,
                image: req.file ? req.file.path : req.body.image,
                imagePublicId: req.file ? req.file.filename : null
            }
            
            const newProduct = await Product.create(productData)

            res.status(201).json(newProduct) //200: ok, 201: created - si el endpoint solo devuelve info 200; si crea algo nuevo 201
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    },

    apiUpdateProduct: async (req, res) => { //DELETE
        try {
            const {productId} = req.params

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({message: 'Invalid ID'})
            }

            const product = await Product.findById(productId)

            if (!product) {
                return res.status(404).json({message: 'Product not found'})
            }

            const updatedData = {...req.body}

            if (req.file) {
                if (product.imagePublicId) {
                    await cloudinary.uploader.destroy(product.imagePublicId)
                }

                updatedData.image = req.file.path
                updatedData.imagePublicId = req.file.filename
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                updatedData,
                {new: true}
            )

            res.status(201).json(updatedProduct)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    },

    apiDeleteProduct: async (req, res) => {
        try {
            const { productId } = req.params

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({message: 'Invalid ID'})
            }

            const product = await Product.findById(productId)

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Intentar borrar imagen (pero no bloquear si falla)
            if (product.imagePublicId) {
                try {
                    await cloudinary.uploader.destroy(product.imagePublicId)
                } catch (err) {
                    console.error('Cloudinary deletion error:', err)
                }
            }

            await Product.findByIdAndDelete(productId)

            res.status(200).json({message: 'Product deleted successfully'})

        } catch (error) {
            console.error('API delete error:', error)
            res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = ProductController