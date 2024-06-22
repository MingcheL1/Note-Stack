const { ClerkClient } = require('@clerk/clerk-sdk-node');
const { Note, User } = require('../models');

const clerk = new ClerkClient({ apiKey: process.env.CLERK_SECRET_KEY });

async function createUserFromClerk(userId, email) {
    try {
        const newUser = new User({
            clerkId: userId, 
            email: email,
            
        });
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}

module.exports = { clerk, createUserFromClerk };