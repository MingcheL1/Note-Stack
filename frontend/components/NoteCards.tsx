import { FC, useEffect, useState } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
  likes: number;
  subject: string;
  owner: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export const NoteCards: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const API_BASE_URL = 'http://localhost:4000/notestack';

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/notes`);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const notesData = await response.json();
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:', error);
        // Handle error state if needed
      }
    };

    fetchNotes();
  }, []); // Added empty dependency array

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note._id} className="my-5 w-full h-40 bg-white rounded-md">
            <h3 className="text-xl pl-2">{note.title}</h3>
            <p className="pl-3">{note.content}</p>
            <p>Likes: {note.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
