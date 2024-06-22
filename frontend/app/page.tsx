import { Navbar } from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black h-screen w-screen">
      <Navbar/>
      <div className="text-white text-8xl mt-52 ml-20 font-bold">
        <h1 className="m-auto">Note Stack </h1>
      </div>

      <div className="w-auto p-10">
        <button className="mt-10 ml-12 w-52 rounded-full bg-gradient-to-r from-violet-600 to-indigo-800 text-white text-2xl container_anim">
          <p className="p-4">Register</p>
        </button>
        <button className="mt-10 ml-12 w-52 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 text-white text-2xl container_anim">
          <p className="p-4">View More</p>
        </button>
      </div>
      <div><video className="absolute top-62 left-0 w-full h-screen object-cover" 
        src= "https://eubzkoywhckxuyrjsrje.supabase.co/storage/v1/object/public/website/line-waves.webm?t=2024-03-19T22%3A09%3A07.266Z" loop playsInline></video></div>
    </div>
  );
}
