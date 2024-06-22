import { FC } from "react"
import { Navbar } from "./navbar"

export const AI:FC=()=>{
    let generatedContent = ''; // Variable to store the generated content

async function generateContent(prompt) {
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
    const answer = data.candidates[0].content.parts[0].text; // Extract the text/answer portion

    return answer;
  } catch (error) {
    console.error('Error generating content:', error);
    return null; // Return null or handle error as per your application's logic
  }
}

// Function to fetch generated content and store it in a const variable
async function getGeneratedContent() {
  try {
    const prompt = 'Explain how AI works'; // You can change the prompt here
    generatedContent = await generateContent(prompt); // Store the generated content in the variable

    if (!generatedContent) {
      console.error('Failed to generate content'); // Handle error case
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call getGeneratedContent to fetch and store the generated content
getGeneratedContent()
  .then(() => {
    // do stuff
    // var generatedContent

    // select the p tag change .innerText to generatedContent
    const output = document.querySelector('#output');
    output.innerText = generatedContent;
  
  });
    return(
        <div className="bg-black h-screen w-screen">
        <Navbar/>
        <div className="flex items-center justify-center p-5">
            <div className="rounded-lg p-5">
                <div className="flex">
                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                </div>
                <input type="text" className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0" placeholder="ask me to generate notes" id="input"/>
                <input type="button" value="Generate" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"/>
                </div>
            </div>
        </div>
        <p className="text-white" id="output"></p>
    </div>
    )
}