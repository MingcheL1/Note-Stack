import React, { FC, useState } from 'react';

export const Image: FC = () => {

  return (
    <div className="bg-black h-screen w-screen">
<body>
    <h1>Upload an Image to Convert to Text</h1>
        <form id="uploadForm">
            <input type="file" id="imageInput" accept="image/*" required/>
            <input type="submit" value="Generate"/>
        </form>
        <p id="loading">Processing image, please wait...</p>
        <div id="output"></div>
        <script src="https://cdn.jsdelivr.net/npm/tesseract.js@2/dist/tesseract.min.js"></script>
        <script src="newImage.js"></script>
    </body>
    </div>
  );
};

