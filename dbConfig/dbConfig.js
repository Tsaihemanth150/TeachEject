import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected with database');
        });

        connection.on('error', (error) => {
            console.error('Database connection error:', error);
        });

        return true; // Return true to indicate successful connection
    } catch (error) {
        console.error('Database connection error:', error);
        return false; // Return false to indicate connection failure
    }
}
