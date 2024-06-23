
'use client';
import React, { FC, FormEvent, useState } from "react";
import { Navbar } from "./navbar";

export const Text: FC = () => {
  const [generatedContent, setGeneratedContent] = useState<string | null>('');
  
  const [content, setContent] = useState()
  const [likes, setLikes] = useState()
  const [subject, setSubject] = useState()
  const [isPublic, setPublic] = useState()
  const [title, setTitle] = useState()

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const note={
      content, 
      likes, 
      subject, 
      title
    }

    console.log(note)
  }

  async function generateContent(prompt: string) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA-Rv1tf59PGCNnb2FPdDGZt6VMxhZagF4';
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      let answer = data.candidates[0].content.parts[0].text;
      answer = answer.replace(/\*/g, ''); 
      answer = answer.replace(/\#/g, '');
      answer = answer.replace(/\\n/g, '\n');

      return answer;
    } catch (error) {
      console.error('Error generating content:', error);
      return null;
    }
  }

  const handleGenerate = async () => {
    try {
      const inputText = (document.getElementById('input') as HTMLInputElement).value;
      const prompt = 'Given the following text file, generate detailed but extremely compact notes on the important parts in bullet points: ';
      const content = await generateContent(prompt + inputText);
      if (content) {
        setGeneratedContent(content);
      } else {
        console.error('Failed to generate content');
      }
    } catch (error) {
      console.error('Error:');
    }
  };

  const handleCopyToClipboardWrapper = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    handleCopyToClipboardWrapper(event);
  };

  return (
    <div className="bg-black h-screen w-screen">
      <div className="flex items-center justify-center p-5">
        <div className="rounded-lg p-5 w-2/5">
          <div className="flex text-black">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                
            </div>
            <textarea className="w-full max-w-[650px] bg-white text-black pl-2 text-base font-semibold outline-0 h-auto" placeholder="Enter text to generate notes" id="input" />
            <input type="button" value="Generate" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" onClick={handleGenerate} />
          </div>
        </div>
      </div>
            
    <h1 className="text-center font-bold text-4xl">Notes:</h1>
      <div className="flex ">
        <div className="flex items-center justify-center mt-4 bg-neutral-900 p-6 rounded-lg shadow-lg w-[680px] h-96 m-auto">
          <p className="text-white w-full h-full text-xl font-mono whitespace-pre-line overflow-y-auto" id="output">
            {generatedContent}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-10 bg-black">
  <form className="bg-neutral-900 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium text-white">
        Category
      </label>
      <select
        id="category"
        className="block w-full px-3 py-2 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent mt-1"
      >
        <option className=" bg-black">Math</option>
        <option className=" bg-black">English</option>
        <option className=" bg-black">History</option>
        <option className=" bg-black">Science</option>
        <option className=" bg-black">STEM</option>
        <option className=" bg-black">Other</option>
      </select>
    </div>

    <div className="mb-4">
      <label htmlFor="title" className="block text-sm font-medium text-white">
        Note Title
      </label>
      <input
        type="text"
        id="title"
        placeholder="Enter title here"
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent mt-1"
      />
    </div>

    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </form>
</div>


    </div>
  );
};


