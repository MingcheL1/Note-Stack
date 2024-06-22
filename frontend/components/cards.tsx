import { FC } from "react";
import Image from "next/image";

export const Credits: FC = () => {
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

      <div className="grid grid-cols-3 gap-4">
        {notes.map((notes) => (
          <div key={note.id} className="text-center my-5">
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-full shadow-md w-24 h-24 ">
                <img src={ppl.img} alt={ppl.name + "'s picture"} className="object-cover" />
              </div>
              <p className="font-bold">{ppl.name}</p>
              <p>{ppl.job}</p>
              <p>{ppl.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};