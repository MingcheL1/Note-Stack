document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
    const loadingIndicator = document.getElementById('loading');
    const resultContainer = document.getElementById('result');

    if (file) {
        const reader = new FileReader();

        reader.onload = function() {
            const image = new Image();
            image.src = reader.result;

            // Show the loading indicator
            loadingIndicator.style.display = 'block';
            resultContainer.textContent = ''; // Clear previous results

            Tesseract.recognize(
                image.src,
                'eng',
                {
                    logger: m => console.log(m)
                }
            ).then(({ data: { text } }) => {
                resultContainer.textContent = text;
            }).catch(error => {
                console.error('Error:', error);
                resultContainer.textContent = 'Error processing image.';
            }).finally(() => {
                // Hide the loading indicator
                loadingIndicator.style.display = 'none';
            });
        };

        reader.readAsDataURL(file);
    } else {
        console.error('No file selected.');
        resultContainer.textContent = 'No file selected.';
    }
});
