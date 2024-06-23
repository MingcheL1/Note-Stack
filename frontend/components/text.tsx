import React, { FC, FormEvent, useState } from "react";
import axios from 'axios';
import Link from "next/link";

export const Text: FC = () => {
  const updateGoogleSheet = () => {
    fetch("https://sheet.best/api/sheets/a57fa426-17d2-4fbc-87a8-9724d5219b68", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id: "101",
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    const note = {
      content: generatedContent || 'Student Forgot to Generate Notes.',
      likes: 0,
      subject,
      title
    };

    console.log(note);
      axios.post('https://sheet.best/api/sheets/a57fa426-17d2-4fbc-87a8-9724d5219b68', note).then((response)=>{
        console.log(response);
      });
  
  };

  async function generateContent(prompt: string) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA-Rv1tf59PGCNnb2FPdDGZt6VMxhZagF4';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
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
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-black h-screen w-screen">
      <div className="flex items-center justify-center p-5">
        <div className="rounded-lg p-5 w-2/5">
          <div className="flex text-black">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5"></div>
            <textarea className="w-full max-w-[650px] bg-white text-black pl-2 text-base font-semibold outline-0 h-auto" placeholder="Enter text to generate notes" id="input" />
            <input type="button" value="Generate" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" onClick={handleGenerate} />
          </div>
        </div>
      </div>
      
      <h1 className="text-center font-bold text-4xl">Notes:</h1>
      <div className="flex ">
        <div className="flex items-center justify-center mt-4 bg-neutral-900 p-6 rounded-lg shadow-lg w-[680px] h-96 m-auto">
          <p className="text-white w-full h-full text-xl font-mono whitespace-pre-line overflow-y-auto">
            {generatedContent}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-10 bg-black">
        <form className="bg-neutral-900 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-2/5" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-white ">Category</label>
            <select
              required
              id="category"
              onChange={(e) => setSubject(e.target.value)}
              className="bg-black text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent mt-1"
            >
              <option className="bg-black text-white">Math</option>
              <option className="bg-black text-white">English</option>
              <option className="bg-black text-white">History</option>
              <option className="bg-black text-white">Science</option>
              <option className="bg-black text-white">STEM</option>
              <option className="bg-black text-white">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-white">Note Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Enter title here"
              className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent mt-1 bg-white"
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