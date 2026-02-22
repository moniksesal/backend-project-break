const productsDoc = require('./products')
const components = require('./components')

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Project Break API',
    version: '1.0.0',
    description: 'Documentación completa de la API de Project Break',
  },
  servers: [
    { url: `http://localhost:${process.env.PORT || 4000}` }
  ],
  paths: productsDoc,
  ...components
}
