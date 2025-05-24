const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Establishes connection to MongoDB database
 * Uses mongoose to connect to the database with proper error handling
 */

const DBConnection = async () => {
    // Get MongoDB connection string from environment variables
    const MONGO_URI = process.env.MONGODB_URL;
    
    // Validate that MongoDB URI is provided
    if (!MONGO_URI) {
        console.error("Error: MONGODB_URL environment variable is not set");
        process.exit(1);
    }
    
    try {
        // Connect to MongoDB with recommended options
        await mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error while connecting to the database:", error.message);
        process.exit(1); // Exit process if database connection fails
    }
};

// Export the connection function for use in other modules
module.exports = { DBConnection };
