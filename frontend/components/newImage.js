async function recognizeTextFromImage() {
    return new Promise((resolve, reject) => {
        const imageInput = document.getElementById('imageInput');
        const file = imageInput.files[0];

        if (!file) {
            reject('No file selected.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function() {
            const image = new Image();
            image.src = reader.result;

            Tesseract.recognize(
                image.src,
                'eng',
                {
                    logger: m => console.log(m)
                }
            ).then(({ data: { text } }) => {
                resolve(text);
            }).catch(error => {
                console.error('Error:', error);
                reject('Error processing image.');
            });
        };

        reader.onerror = function(error) {
            console.error('FileReader error:', error);
            reject('Error reading file.');
        };

        reader.readAsDataURL(file);
    });
}

document.getElementById('uploadForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const loadingIndicator = document.getElementById('loading');
  const resultContainer = document.getElementById('result');

  try {
      loadingIndicator.style.display = 'block';
      resultContainer.textContent = ''; // Clear previous results

      const recognizedText = await recognizeTextFromImage();
      // Now you have the recognized text as a string
      console.log('Recognized text:', recognizedText);

      // Example of passing the recognized text to another function
      await anotherFunction(recognizedText); // Ensure 'await' here to complete before finally block

  } catch (error) {
      console.error('Error:', error);
      resultContainer.textContent = error; // Display error message
  } finally {
      loadingIndicator.style.display = 'none'; // Hide loading indicator
  }
});


let text = "";

function anotherFunction(txt) {
    // Example of what you can do with the recognized text
    text = txt
    console.log(text);
    getGeneratedContent(text)
  .then(() => {
    console.log('Content stored in generatedContent variable.'); 
    console.log(generatedContent);
    let res = document.querySelector("#output");
    res.innerText = generatedContent; 
    console.log("Done");
  
  });

    // Perform further actions with the recognized text here
}

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


