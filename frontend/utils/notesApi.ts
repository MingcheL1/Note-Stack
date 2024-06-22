const API_BASE_URL = 'http://localhost:4000/notestack'; // Replace with your actual API URL

export const fetchNotes = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/notes`);
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error; // Optionally handle or rethrow the error
    }
};