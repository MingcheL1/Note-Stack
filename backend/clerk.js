const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const frontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const apiKey = process.env.CLERK_SECRET_KEY;

ClerkExpressWithAuth({ apiKey });

module.exports = { ClerkExpressWithAuth };