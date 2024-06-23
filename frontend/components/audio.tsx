"use client";
import React, { useState } from 'react';

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

export const Audio: React.FC = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [generatedContent, setGeneratedContent] = useState<string>('');

  let recognition: SpeechRecognition | null = null;

  const startListening = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const interimTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

      setTranscript(interimTranscript);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      setListening(false);
      // Generate content when speech recognition ends
      generateAndSetContent(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionEvent) => {
      console.error('Speech recognition error:');
      setListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
    // Generate content with the current transcript state
    setListening(false);
    generateAndSetContent(transcript);
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  async function generateContent(prompt: string): Promise<string | null> {
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
      answer = answer.replace(/;/g, '<br />');  // Replace semicolons with HTML line breaks

      return answer;
    } catch (error) {
      console.error('Error generating content:', error);
      return null;
    }
  }

  const generateAndSetContent = async (text: string) => {
    try {
      const prompt = `Given the following text, generate detailed but extremely compact notes on the important parts in bullet points: ${text}`;
      const content = await generateContent(prompt);
      if (content) {
        setGeneratedContent(content);
      } else {
        console.error('Failed to generate content');
        setGeneratedContent('');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('');
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center">
          <div className="grid grid-flow-col place-items-center mt-10">
            <button className="bg-gradient-to-r from-violet-600 to-indigo-800 p-3 rounded-xl" onClick={toggleListening}>
              {listening ? 'Stop Listening' : 'Start Listening'}
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center mt-4 bg-neutral-900 p-6 rounded-lg shadow-lg w-[680px] h-96">
            <p className="text-white w-full h-full text-xl font-mono whitespace-pre-line overflow-y-auto" id="output">
              {generatedContent}
            </p>
          </div>
      </div>
    </div>
  );
};
