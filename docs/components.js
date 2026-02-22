module.exports = {
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: "User identification number",
            example: "6201064b0028de7866e2b2c4"
          },
          username: {
            type: 'string',
            description: "Username to register",
            example: "John"
          },
          email: {
            type: 'string',
            description: "User email",
            example: "john@gmail.com"
          },
          password: {
            type: 'string',
            description: "User password",
            example: "123456"
          }
        }
      },
      Product: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: "Product ID",
            example: "631a1f2b9b1a2c0012345678"
          },
          name: {
            type: 'string',
            description: "Name of the product",
            example: "Camiseta blanca"
          },
          price: {
            type: 'number',
            description: "Price of the product",
            example: 25.5
          },
          category: {
            type: 'string',
            description: "Category",
            example: "Camisetas"
          },
          image: {
            type: 'string',
            description: "URL of the product image",
            example: "https://res.cloudinary.com/.../image.jpg"
          }
        }
      }
    }
  }
}