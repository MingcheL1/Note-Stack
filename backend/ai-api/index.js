let generatedContent = ''; 

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
    const answer = data.candidates[0].content.parts[0].text; 

    return answer;
  } catch (error) {
    console.error('Error generating content:', error);
    return null; 
  }
}


async function getGeneratedContent(text) {
  try {
    const prompt = 'Given the following text file, generate detailed but extremely compact notes on the important parts in bullet points: '; 
    generatedContent = await generateContent(prompt + text); 

    if (!generatedContent) {
      console.error('Failed to generate content'); 
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

let text = ""; 


getGeneratedContent(text)
  .then(() => {
    
    const output = document.querySelector('#output');
    output.innerText = generatedContent;
  
  });