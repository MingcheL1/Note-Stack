"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";

export const NoteCards: FC = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/notestack/notes'); // Adjust URL as needed
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);


  return (
    <div>
      {/* <div className="grid grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note._id} className="my-5 w-full h-40 bg-white rounded-md">
            <h3 className="text-xl pl-2">{note.title}</h3>
            <p className="pl-3">{note.content}</p>
            <p>Likes: {note.likes}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};
