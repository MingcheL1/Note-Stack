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
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Failed to transcribe audio';
    }
});
