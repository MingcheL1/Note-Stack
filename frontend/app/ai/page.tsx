"use client";
import { Navbar } from "@/components/navbar";
import "../../../backend/ai-api/index.js";
import { Text } from "@/components/text"
import {Image} from "@/components/image";
import { useState } from "react";
const Page = () => {
    const [selectedComponent, setSelectedComponent] = useState<string>('');
  
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedComponent(event.target.value);
    };
  
    const renderComponent = () => {
      switch (selectedComponent) {
        case 'text':
          return <Text />;
        case 'image':
          return <Image />;
        default:
          return <Text/>;
      }
    };
  
    return (
      <div className="text-white bg-black w-screen h-screen flex flex-col items-center">
        <Navbar/>
        <h2 className="text-center font-bold text-4xl mt-10 ">Select a notetaking method:</h2>
        <select className="rounded-lg text-white text-2xl mt-10 h-auto bg-gradient-to-r from-violet-600 to-indigo-800"value={selectedComponent} onChange={handleSelectChange}>
          <option value="">Select...</option>
          <option value="text">Text to Notes</option>
          <option value="image">Image to Notes</option>
        </select>
        
        <div style={{ marginTop: '20px' }}>
          {renderComponent()}
        </div>
      </div>
    );
  };

export default Page;