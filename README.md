# Tienda de ropa - Project Break

Aplicación fullstack desarrollada con Node.js y MongoDB que permite gestionar un catálogo de ropa con panel de administración protegido por autenticación.

Incluye subida de imágenes con Cloudinary, filtrado por categorías y API REST completa en formato JSON.

## Tecnologías usadas

- Node.js
- Express
- MongoDB + Mongoose
- dotenv
- Method-Override
- Cloudinary
- Render
- Multer
- CSS

## Funcionalidades

- Ver productos (escaparate público)
- Ver producto con detalles
- Filtrar por categoría
- Login administrador
- Crear producto
- Editar producto
- Eliminar producto
- Subida de imágenes

## Instalación

1. Clonar el repositorio
2. Instalar dependencias
3. Crear archivo .env con variables de entorno
4. Iniciar servidor (con npm start)

## Estructura del proyecto

├── config
│   └── cloudinary.js
│   └── db.js
├── controllers
│   └── authController.js
│   └── productController.js
├── docs
│   └── index.js
├── helpers
│   ├── baseHtml.js
│   ├── getNavBar.js
│   └── getProductCards.js
│   └── getProductDetail.js
│   └── getProductFormEdit.js
│   └── template.js
├── middlewares
│   └── authMiddleware.js
│   └── uploadCloudinaryMiddleware.js
├── models
│   └── Product.js
├── node_modules
├── public
│   └── css
│       └── styles.css
├── routes
│   └── authRoutes.js
│   └── index.js
│   └── productRoutes.js
├── test
│   └── productController.test.js
├── .env
├── .gitignore
├── index.js
├── package-lock.json
└── package.json
└── README.md

## Rutas principales

### Productos

- GET /products → Lista todos los productos
- GET /products/:id → Detalle de un producto
- GET /dashboard → Dashboard administrador
- GET /dashboard/new → Formulario nuevo producto
- POST /dashboard → Crear producto
- GET /dashboard/:id/edit → Editar producto
- PUT /dashboard/:id → Actualizar producto
- DELETE /dashboard/:id/delete → Eliminar producto

### Login

- GET /login → Mostrar formulario de login
- GET /logout → Procesar logout
- POST /login → Procesar login

### API JSON

- GET /api/products → Lista todos los productos en JSON
- GET /api/products/:productId → Trae un producto en JSON por su ID
- POST /api/products → Crear producto
- PUT /api/products/:id → Actualizar producto
- DELETE /api/products/:id → Eliminar producto

## Subida de imágenes con Coudinary

Las imágenes se suben mediante Multer y se almacenan en Cloudinary.
El middleware uploadCloudinaryMiddleware gestiona la subida automática y guarda la URL en la base de datos.

## Test

Para asegurarnos de que la API funciona correctamente, se incluyen tests automáticos con Jest. Se prueban los endpoints de productos:

- GET /api/products → obtiene todos los productos
- POST /api/products → crea un producto
- PUT /api/products/:productId → actualiza un producto existente
- DELETE /api/products/:productId → elimina un producto

Los tests verifican:

- Respuesta correcta (status code) para cada endpoint.
- Que los productos se crean, actualizan y eliminan correctamente en la base de datos.
- Manejo de errores, como IDs inválidos o productos no existentes.

## Deploy

App desplegada en https://backend-project-break-xd3i.onrender.com/

## Documentación API (Swagger)

Puedes ver y probar la API de productos en:

http://localhost:4000/api-docs

## Autor

Mónica Serrano Salazar
