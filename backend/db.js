const mongoose = require("mongoose");

// MongoDB connection URL retrieved from environment variable
const URL = process.env.DATABASEURL;

const connectDB = async () => {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Database successfully connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Export the connectDB function to be used in other parts of your application
module.exports = connectDB;
