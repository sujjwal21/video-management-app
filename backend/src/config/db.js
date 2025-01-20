const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Disable strict query mode
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/video-manager', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 120000,
            socketTimeoutMS: 120000,
            connectTimeoutMS: 120000,
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection errors
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
