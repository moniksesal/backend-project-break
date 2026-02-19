// BONUS: Archivo que contendrá la definición de las rutas para la autenticación. Este llama a los métodos del controlador.

const express = require('express')
const loginController = require('../controllers/authController')
const router = express.Router()

// mostrar formulario de login
router.get('/login', loginController.showLoginForm)

// procesar login
router.post('/login', loginController.login)

// procesar logout
router.get('/logout', loginController.logout)

module.exports = router