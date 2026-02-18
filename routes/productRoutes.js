// Archivo que contendrá la definición de las rutas CRUD para los productos. Éste llama a los métodos del controlador

const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const upload = require('../middlewares/uploadCloudinaryMiddleware');

//CATÁLOGO PÚBLICO
router.get('/products', productController.getAllProducts) //Devuelve todos los productos (página principal del catálogo)
router.get('/products/:productId', productController.getProductById) //Devuelve el detalle de un producto específico

//DASHBOARD
router.get('/dashboard', productController.getDashboard) //Devuelve el dashboard con todos los productos subidos

router.get('/dashboard/new', productController.getNewProductForm) //Devuelve el formulario para subir un artículo nuevo

router.post('/dashboard', upload.single('image'), productController.createProduct); //Crea un nuevo producto y lo guarda en la base de datos

router.get('/dashboard/:productId/edit', productController.getProductFormEdit) //Devuelve el formulario para editar un producto


router.get('/dashboard/:productId', productController.getProductDashboard) //Devuelve el detalle de un producto en el dashboard
router.put('/dashboard/:productId', upload.single('image'), productController.updateProduct) //Actualiza un producto existente

router.delete('/dashboard/:productId', productController.deleteProduct) //Elimina un producto existente

// -------- API JSON -------- //
/*
/api/products
/api/products/:id
/api/products  (POST)
/api/products/:id (PUT)
/api/products/:id (DELETE)
*/

router.get('/api/products', productController.apiGetAllProducts)
router.get('/api/products/:productId', productController.apiGetProductById)
router.post('/api/products', upload.single('image'), productController.apiCreateProduct)
router.put('/api/products/:productId', upload.single('image'), productController.apiUpdateProduct)
router.delete('/api/products/:productId', productController.apiDeleteProduct)


module.exports = router