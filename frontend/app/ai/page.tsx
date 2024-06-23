"use client";
import { Navbar } from "@/components/navbar";
import "../../../backend/ai-api/index.js";
import { Text } from "@/components/text";
import { useState } from "react";
import { Audio } from "@/components/audio";

const Page = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('text');

  const [content, setContent] = useState()
  const [likes, setLikes] = useState()
  const [subject, setSubject] = useState()
  const [isPublic, setPublic] = useState()

  const note={
    content, 
    likes, 
    subject, 
    isPublic
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedComponent(event.target.value);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'text':
        return <Text />;
      case 'audio':
        return <Audio />;
      default:
        return <Text />;
    }
  };

  return (
    <div className="text-white bg-black w-screen h-screen flex flex-col items-center">
      <Navbar />
      <h2 className="text-center font-bold text-4xl mt-10">Select a notetaking method:</h2>
      <div className="flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none mt-10">
        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            name="radio"
            value="text"
            className="peer hidden"
            checked={selectedComponent === 'text'}
            onChange={handleSelectChange}
          />
          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Text to Notes
          </span>
        </label>

        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            name="radio"
            value="audio"
            className="peer hidden"
            checked={selectedComponent === 'audio'}
            onChange={handleSelectChange}
          />
          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Speech to Notes
          </span>
        </label>
      </div>

      <div className="mt-10">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Page;
