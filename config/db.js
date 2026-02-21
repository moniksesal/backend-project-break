const mongoose = require('mongoose')

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri || process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('Mongo connection error:', error)
        process.exit(1) //detiene el servidor si falla
    }
}

module.exports = connectDB