
'use client';
import React, { FC, useState } from "react";
import { Navbar } from "./navbar";

export const Text: FC = () => {
  const [generatedContent, setGeneratedContent] = useState<string | null>('');

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

  return (
    <div className="bg-black h-screen w-screen">
      <div className="flex items-center justify-center p-5">
        <div className="rounded-lg p-5 w-2/5">
          <div className="flex text-black">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                
            </div>
            <textarea className="w-full max-w-[650px] bg-white text-black pl-2 text-base font-semibold outline-0" placeholder="Enter text to generate notes" id="input" />
            <input type="button" value="Generate" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors" onClick={handleGenerate} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <p className="text-white max-w-xl h-auto text-xl font-mono" id="output">{generatedContent}</p>
      </div>
    </div>
  );
};


