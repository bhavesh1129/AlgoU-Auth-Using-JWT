const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { DBConnection } = require("./database/db.js");
const User = require("./model/User.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

app.get("/", (req, res) => {
    res.status(200).json({ 
        message: "AlgoU Auth Server is running!",
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

app.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!(firstname && lastname && email && password)) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required information: firstname, lastname, email, and password"
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email 
            }, 
            process.env.SECRET_KEY, 
            {
                expiresIn: "24h",
            }
        );

        const userResponse = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            createdAt: user.createdAt
        };

        res.status(201).json({ 
            success: true,
            message: "User registered successfully!",
            user: userResponse,
            token: token
        });

    } catch (error) {
        console.error("Registration error:", error);
        
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationErrors
            });
        }
        
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error during registration"
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password"
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email 
            }, 
            process.env.SECRET_KEY, 
            {
                expiresIn: "24h",
            }
        );

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };

        const userResponse = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        };

        res.status(200)
           .cookie("token", token, cookieOptions)
           .json({
               success: true,
               message: "Login successful!",
               user: userResponse,
               token: token
           });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during login"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the server at: http://localhost:${PORT}`);
});
