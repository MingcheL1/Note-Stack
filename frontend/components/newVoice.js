document.getElementById('audio-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('audio-file');
    const file = fileInput.files[0];

    if (!file) {
        document.getElementById('result').innerText = 'Please upload an audio file.';
        return;
    }

    const formData = new FormData();
    formData.append('audio', file);

    try {
        document.getElementById('result').innerText = 'Transcribing...';

        const response = await fetch('https://api.assemblyai.com/v2/upload', {
            method: 'POST',
            headers: {
                'Authorization': 'df607301dd8747808d970b6e306db853'
            },
            body: formData
        });

        const uploadData = await response.json();
        const audioUrl = uploadData.upload_url;

        const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
            method: 'POST',
            headers: {
                'Authorization': 'df607301dd8747808d970b6e306db853',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ audio_url: audioUrl })
        });

        const transcriptData = await transcriptResponse.json();
        const transcriptId = transcriptData.id;

        let transcriptText = 'Transcription in progress...';

        // Poll for the transcription result
        while (transcriptText === 'Transcription in progress...') {
            const transcriptStatusResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
                headers: { 'Authorization': 'df607301dd8747808d970b6e306db853' }
            });

            const statusData = await transcriptStatusResponse.json();
            
            if (statusData.status === 'completed') {
                transcriptText = statusData.text;
            } else if (statusData.status === 'failed') {
                transcriptText = 'Transcription failed.';
                break;
            } else {
                await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds before checking again
            }
        }

        document.getElementById('result').innerText = transcriptText;
        console.log(transcriptText);
        getGeneratedContent(transcriptText)
  .then(() => {
    console.log('Content stored in generatedContent variable.'); 
    console.log(generatedContent);
    console.log("Done");
  
  });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Failed to transcribe audio';
    }
});


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
