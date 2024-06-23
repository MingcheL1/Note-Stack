// // pages/index.js
// import { useState } from 'react';
// import { createWorker } from 'tesseract.js';

// export default function Home() {
//   const [ocrText, setOcrText] = useState('');
//   const [imageData, setImageData] = useState(null);
//   const worker = createWorker();

//   const convertImageToText = async () => {
//     if (!imageData) return;
//     await worker.load();
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');
//     const { data: { text } } = await worker.recognize(imageData);
//     setOcrText(text);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const imageDataUri = reader.result;
//       setImageData(imageDataUri);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       {imageData && <img src={imageData} alt="Uploaded" />}
//       <p>{ocrText}</p>
//     </div>
//   );
// }
import FileUploader from "@/components/FileUploader"

const url = "/api/upload";

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => (
  <div className="flex flex-col items-center justify-between gap-4 min-h-60 bg-zinc-800 w-full max-w-2xl py-10 px-4 rounded-xl h-fit">
    {children}
  </div>
)

export default function Home() {
  return (
    <main className="min-h-screen flex-col py-20 px-4 md:px-32 bg-zinc-900 text-white grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
      <Container>
        <h1 className="text-2xl font-bold">File Uploader</h1>
        <FileUploader
          url={url}
          acceptedFileTypes={[
            "image/png",
            "image/jpeg",
          ]}
          maxFileSize={100}
          label="Max File Size: 1MB"
          labelAlt="Accepted File Types: png, jpeg"
        />
      </Container>
      <Container>
        <h1 className="text-2xl font-bold">File Uploader</h1>
        <FileUploader
          url={url}
          acceptedFileTypes={[
            "image/png",
            "image/jpeg",
          ]}
          allowMultiple={true}
          maxFileSize={100}
          label="Max File Size: 100MB (multiple)"
          labelAlt="Accepted File Types: png, jpeg"
        />
      </Container>
      <Container>
        <h1 className="text-2xl font-bold">File Uploader</h1>
        <FileUploader
          url={'https://example.com'}
          acceptedFileTypes={[
            "image/png",
            "image/jpeg",
          ]}
          allowMultiple={true}
          maxFileSize={100}
          label="Max File Size: 100MB (non-existent endpoint)"
          labelAlt="Accepted File Types: png, jpeg"
        />
      </Container>

    </main >
  )
}