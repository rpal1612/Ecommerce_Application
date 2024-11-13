const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
const server_config = require("./configs/server.configs");
const db_config = require("./configs/db.configs");
const user_model = require("./models/user_model");

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    next();
});

// MongoDB connection
mongoose.connect(db_config.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB!");
        init();
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
        process.exit(1);  // Exit if we can't connect to database
    });

async function init() {
    try {
        let user = await user_model.findOne({ userId: "admin" });
        if (user) {
            console.log("Admin is already present");
            return;
        }    

        user = await user_model.create({
            name: "Riya",
            userId: "admin",
            email: "rpal1612@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome1", 8)
        });     
        console.log("Admin created successfully");
    } catch (err) {
        console.log("Error in init:", err);
    }
}
    
// Routes setup
require("./route/auth.route")(app);
require("./route/category.route")(app);
require("./route/product.route")(app);
require("./route/cart.route")(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        
        message: "Internal server error",
        error: err.message
    });
});

// Start server
const server = app.listen(server_config.PORT, () => {
    console.log(`Server started at port: ${server_config.PORT}`);
});

// Handle server shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server shutdown complete');
        process.exit(0);
    });
});