require('dotenv').config();
const mongoose = require("mongoose");

const URL = process.env.DATABASEURL;

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Database successfully connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
