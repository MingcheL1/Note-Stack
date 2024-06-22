const mongoose = require("mongoose");

//MongoDB connection URL
const URL = "mongodb+srv://rzhang27:apple1234@cluster0.h6gdxc3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
    await mongoose.connect(URL);
    console.log("database successfully connected");
}

//The connectDB function is exported
module.exports = connectDB;