// backend/models/Note.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define note schema
const noteSchema = new Schema({
    title: { type: String, required: true }, // Title field required
    content: { type: String, required: true }, // Content field required
    likes: { type: Number}, // Likes field required
    subject: { type: String, required: true }, // Subject field required
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model, required
    isPublic: { type: Boolean, default: false }, // isPublic field defaulting to false
    createdAt: { type: Date, default: Date.now }, // createdAt field with default value of current date/time
    updatedAt: { type: Date, default: Date.now }, // updatedAt field with default value of current date/time
});

module.exports = mongoose.model('Note', noteSchema); // Export note model with defined schema
