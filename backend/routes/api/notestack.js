
const express = require("express");
const router = express.Router();
const Note = require("../../models/Note.js");

app.post('/notes', requireAuth, async (req, res) => {
    try {
        const newNote = new Note({
            ...req.body,
            owner: req.auth.userId 
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/public-notes', requireAuth, async (req, res) => {
    try {
        const publicNotes = await Note.find({ isPublic: true });
        res.json(publicNotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;