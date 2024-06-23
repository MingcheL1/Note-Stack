const express = require('express'); // Require express middleware
const bodyParser = require('body-parser'); // Require body-parser middleware
const helmet = require('helmet'); // Require helmet middleware for security headers
const morgan = require('morgan'); // Require morgan middleware for logging
const cors = require('cors'); // Require cors middleware for cross-origin requests

const connectDB = require('./db'); // Require the connectDB function from db.js
const notestack = require('./routes/api/notestack'); // Require notestack route handler
require('dotenv').config();
const PORT = 5000;
const app = express();

// Enable CORS with specific options
app.use(
    cors({
        origin: 'http://localhost:5000', // Updated origin to match typical frontend port
    })
);

app.use(cors()); // Enable CORS
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev')); // Use 'dev' format for morgan logging
app.use(helmet()); // Use helmet middleware for enhanced security headers

connectDB(); // Connect to MongoDB database
app.use('/notestack', notestack); // Mount notestack routes under '/notestI just did this. Can't be that easy. Hello hello Chi hello dude I don't know what's going on. I can't hear any of you guys and doing this weird thing on VS code whereack'

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`); // Updated console.log message for clarity
});

console.log('ok'); // Added 'ok' message for confirmationI just did this. Can't be that easy. Hello hello Chi hello dude I don't know what's going on. I can't hear any of you guys and doing this weird thing on BS code where when I talk it it's it's typing what I'm saying and have no clue how to, stop i stop it testing testing is it going to say OK it's still saying when I'm typing if somebody else sees what's happening go to server J it's typing what I'm saying in realt
 stop it testing testing is it going to say OK? It's still saying when I'm typing if somebody else sees what's happening go to server that it's typing what I'm saying in real time. stop it testing testing is it going to say OK? It's still saying when I'm typing if somebody else sees what's happening go to server that it's typing what I'm saying in real time who we are