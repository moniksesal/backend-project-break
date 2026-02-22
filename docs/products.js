module.exports = {
  '/api/products': {
    get: {
      summary: 'Obtener todos los productos',
      description: 'Devuelve un listado de todos los productos',
      responses: {
        200: {
          description: 'Lista de productos obtenida correctamente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Product' }
              }
            }
          }
        }
      }
    },
    post: {
      summary: 'Crear un producto',
      description: 'Crea un nuevo producto en la tienda',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Product' }
          }
        }
      },
      responses: {
        201: {
          description: 'Producto creado correctamente',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Product' }
            }
          }
        }
      }
    }
  },

  '/api/products/{productId}': {
    put: {
      summary: 'Actualizar un producto',
      description: 'Actualiza un producto existente y devuelve el producto actualizado',
      parameters: [
        {
          name: 'productId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID del producto a actualizar'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Product' }
          }
        }
      },
      responses: {
        201: {
          description: 'Producto actualizado correctamente',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Product' }
            }
          }
        },
        400: { description: 'ID inválido' },
        404: { description: 'Producto no encontrado' },
        500: { description: 'Error del servidor' }
      }
    },
    delete: {
      summary: 'Eliminar un producto',
      description: 'Elimina un producto existente y devuelve un mensaje de éxito',
      parameters: [
        {
          name: 'productId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID del producto a eliminar'
        }
      ],
      responses: {
        200: {
          description: 'Producto eliminado correctamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Product deleted successfully' }
                }
              }
            }
          }
        },
        400: { description: 'ID inválido' },
        404: { description: 'Producto no encontrado' },
        500: { description: 'Error del servidor' }
      }
    }
  }
}