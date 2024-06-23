import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/utils/cn";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  return (
    <>
    <div className="bg-black h-screen w-screen">
      <div className="z-50">
        <Navbar />
      </div>

      <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md mt-5">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Note Stack
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
 
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
      
  
      {/* <h1 className="text-white text-8xl mt-52 ml-20 font-bold">Note Stack</h1> */}
      <div className=" w-auto p-10 bg-black flex flex-row items-center justify-center space-x-8">
        <button className=" w-52 rounded-full bg-gradient-to-r from-violet-600 to-indigo-800 text-white text-2xl container_anim">
          <p className="p-4">Register</p>
        </button>
        <button className=" w-52 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 text-white text-2xl container_anim">
          <p className="p-4">View More</p>
        </button>
      </div>
    </div>
    </>
  );
}
