const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/usermodel'); // Import user model
const path = require('path'); // Import path for file handling

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users);
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
});

// POST registration - Create a new user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const newUser = new User({ name, email, password });
        await newUser.save(); // Save the new user in the database

        // Redirect to the login page after successful registration
        res.redirect('/login');
    } catch (error) {
        res.status(500).send("Error registering user");
    }
});

// POST login - User authentication
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email, password });
        if (existingUser) {
            res.redirect("/dashboard"); // Redirect to dashboard on successful login
        } else {
            res.status(401).send("Invalid email or password");
        }
    } catch (error) {
        res.status(500).send("Error during login");
    }
});

// GET registration page
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registration.html')); // Serve the registration page
});

// GET login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html')); // Serve the login page
});

// GET dashboard page
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard.html')); // Serve the dashboard page
});

module.exports = router;