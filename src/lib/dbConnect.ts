import mongoose from "mongoose";

type MongooseConnection = {
    isConnected?: number 
}

const MONGODB_URI = process.env.MONGODB_URI || "";

const connection : MongooseConnection = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("MongoDB is already connected");
        return;
    } else {
        try {
            const db = await mongoose.connect(MONGODB_URI);
            connection.isConnected = db.connections[0].readyState;
            console.log("MongoDB connected successfully:", db);
        } catch (error) {
            console.log("Error connecting to MongoDB:", error);
            process.exit(1); // Exit the process with failure
        }
    }
}

export default dbConnect;