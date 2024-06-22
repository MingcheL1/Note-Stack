// backend/routes/router.js
const express = require('express');
const router = express.Router();
const { Note, User } = require('../models');

// Handle saving a new note
router.post('/notes', requireAuth, async (req, res) => {
    try {
        const newNote = new Note({
            ...req.body,
            owner: req.auth.userId,
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(400).json({ error: 'Failed to save note' });
    }
});

// Fetch all public notes
router.get('/public-notes', async (req, res) => {
    try {
        const publicNotes = await Note.find({ isPublic: true });
        res.json(publicNotes);
    } catch (error) {
        console.error('Error fetching public notes:', error);
        res.status(500).json({ error: 'Failed to fetch public notes' });
    }
});

module.exports = router;
