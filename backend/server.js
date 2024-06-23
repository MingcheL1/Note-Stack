const express = require('express'); // Require express middleware
const bodyParser = require('body-parser'); // Require body-parser middleware
const helmet = require('helmet'); // Require helmet middleware for security headers
const morgan = require('morgan'); // Require morgan middleware for logging
const cors = require('cors'); // Require cors middleware for cross-origin requests

const connectDB = require('./db'); // Require the connectDB function from db.js
const notestack = require('./routes/api/notestack'); // Require notestack route handler
require('dotenv').config();
const PORT = 4000;
const app = express();

// Enable CORS with specific options
app.use(
    cors({
        origin: 'http://localhost:4000', // Updated origin to match typical frontend port
        credentials: true
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev')); // Use 'dev' format for morgan logging
app.use(helmet()); // Use helmet middleware for enhanced security headers

connectDB(); // Connect to MongoDB database
app.use('/notestack', notestack); // Mount notestack routes under '/notestack'

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`); // Updated console.log message for clarity
});

console.log('ok'); // Added 'ok' message for confirmation
