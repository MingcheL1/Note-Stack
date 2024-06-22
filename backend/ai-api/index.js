async function generateContent(prompt) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA-Rv1tf59PGCNnb2FPdDGZt6VMxhZagF4";
  const headers = {
    "Content-Type": "application/json",
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
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Function to update the <p> tag with the result
async function updateOutput(text) {
  const prompt = "given the following text, generate simple notes: "; // You can change the prompt here
  //const text = "the sky is blue, the ground is green";
  //const outputElement = document.getElementById("output");
  let output = "";

  try {
    const result = await generateContent(prompt + text);
    output = JSON.stringify(
      result.candidates[0].content.parts[0].text,
      null,
      2
    ); // Display JSON result
  } catch (error) {
    output = `Error: ${error.message}`;
  }
  return output;
}


