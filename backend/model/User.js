const mongoose = require("mongoose");

/**
 * User Schema Definition
 * Defines the structure for user documents in MongoDB
 * Includes validation and constraints for user data
 */
const userSchema = new mongoose.Schema({
    // User's first name - optional field with string type
    firstname: {
        type: String,
        required: [true, "First name is required"],
        trim: true, // Remove whitespace from beginning and end
        minlength: [2, "First name must be at least 2 characters long"],
        maxlength: [50, "First name cannot exceed 50 characters"]
    },
    
    // User's last name - optional field with string type  
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minlength: [2, "Last name must be at least 2 characters long"],
        maxlength: [50, "Last name cannot exceed 50 characters"]
    },
    
    // User's email address - must be unique across all users
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true, // Convert to lowercase before saving
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]
    },
    
    // User's hashed password - will be encrypted before storage
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    
    // Add timestamp fields for tracking when user was created/updated
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
