import mongoose from "mongoose";

export async function connect() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        // Set connection options to avoid long waits
        const options = { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout for server selection
        };

        await mongoose.connect(uri, options);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected with database');
        });

        connection.on('error', (error) => {
            console.error('Database connection error:', error);
        });

        return true;
    } catch (error) {
        console.error('Database connection error:', error);
        return false;
    }
}
