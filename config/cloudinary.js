const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
module.exports = cloudinary;
/*
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuración de Cloudinary desde .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Storage para multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tienda-de-ropa', // Carpeta donde se guardarán las imágenes
    allowed_formats: ['jpg','png','jpeg']
  }
});

// Exportamos directamente el parser de multer

const parser = multer({ storage });

module.exports = { cloudinary, storage, parser }
*/