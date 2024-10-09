const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userroutes'); // Import routes

const dburl = "mongodb://localhost:27017/mydb2";

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // To parse form data

mongoose.connect(dburl).then(() => {
    console.log("Connected to database");
    app.listen(3000, () => console.log("Server running on port 3000"));
})
.catch(() => console.log("Something went wrong"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Define routes for static pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get("/reg", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "registration.html"));
});

app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "userslist.html"));
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Use userRoutes for handling user-related routes
app.use('/api/users', userRoutes);