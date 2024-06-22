import { FC } from "react";
import Image from "next/image";

export const NoteCards: FC = () => {
  const notes = [
    {
        "title": "First Post",
        "content": "This is the content of my first post.",
        "likes": 15,
        "subject": "General",
        "owner": "60d74ef1c7a5e61f48a7a57d", // User ObjectId reference
        "isPublic": true,
        "createdAt": "2024-06-22T12:00:00.000Z",
        "updatedAt": "2024-06-22T12:00:00.000Z"
      },
      {
        "title": "Recipe Collection",
        "content": "Here are some delicious recipes to try out!",
        "likes": 32,
        "subject": "Cooking",
        "owner": "60d74ef1c7a5e61f48a7a57e", // User ObjectId reference
        "isPublic": true,
        "createdAt": "2024-06-21T15:30:00.000Z",
        "updatedAt": "2024-06-21T18:45:00.000Z"
      },
      {
        "title": "Travel Tips",
        "content": "Tips for hassle-free travel.",
        "likes": 10,
        "subject": "Travel",
        "owner": "60d74ef1c7a5e61f48a7a57f", // User ObjectId reference
        "isPublic": true,
        "createdAt": "2024-06-20T08:00:00.000Z",
        "updatedAt": "2024-06-20T10:30:00.000Z"
      },
      {
        "title": "Coding Challenges",
        "content": "Solving coding challenges can improve your skills!",
        "likes": 25,
        "subject": "Programming",
        "owner": "60d74ef1c7a5e61f48a7a580", // User ObjectId reference
        "isPublic": false,
        "createdAt": "2024-06-19T17:45:00.000Z",
        "updatedAt": "2024-06-19T19:00:00.000Z"
      }
            
      
      
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.createdAt} className="my-5 w-full h-40 bg-white rounded-md">
            <h3 className="text-xl pl-2">{note.title}</h3>
            <p className="pl-3">{note.content}</p>
            <p>Likes: {note.likes}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};