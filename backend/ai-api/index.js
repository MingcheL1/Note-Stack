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