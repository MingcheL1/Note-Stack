// backend/routes/notestack.js

const express = require('express');
const router = express.Router();
const handleError = require("../../utils/errorHandler");
const { Note, User } = require('../models'); // Import Note and User models

// Define route to get all notes
router.get('/notes', async (req, res) => {
    try {
        const publicNotes = await Note.find({isPublic : true}); // Retrieve all notes from database
        return res.status(200).json(publicNotes) // Send JSON response with notes array
    } catch (error) {
        console.error(error.message);
        handleError(error, res); // Handle server error
    }
});

router.post('/notes', async (req, res) => {
    const { title, content, subject, userId } = req.body; // Destructure title, content, subject, and userId from request body
    try {
        // Validate userId format (must be a valid ObjectId)
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: 'Invalid userId format' });
        }
        // Find user by userId in User model
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Create a new Note instance with validated data
        const newNote = new Note({
            title,
            content,
            subject,
            owner: userId
        });
        // Save new note to database
        await newNote.save();

        // Respond with the newly created note
        return res.status(201).json(newNote);
    } catch (error) {
        console.error(error.message);
        handleError(error, res);
    }   
});

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from database
        return res.status(200).json(users); // Send JSON response with users array
    } catch (error) {
        console.error(error.message);
        handleError(error, res); // Handle server error
    }
});

// Route to create a new user
router.post('/users', async (req, res) => {
    const { email, name, password } = req.body; // Destructure email, name, and password from request body
    try {
        // Validate if all required fields are provided
        if (!email || !name || !password) {
            return res.status(400).json({ msg: 'Please provide email, name, and password' });
        }

        // Check if a user with the same email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        // Create a new User instance
        const newUser = new User({
            email,
            name,
            password
        });

        // Save new user to database
        await newUser.save();

        // Return successful response with the new user
        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error.message);
        handleError(error, res); // Handle server error
    }
});

module.exports = router; // Export router to use in server.js or other files
