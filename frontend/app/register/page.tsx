// pages/Page.js (or your preferred filename)

import { Navbar } from "@/components/navbar";
import { Register } from "@/components/register";
import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-white text-4xl font-bold mb-8">Register</h1>
        <Register />
      </div>
      <Link href="/signin"><p className="text-white text-center mt-10 text-xl hover:underline hover:text-blue-500">Already have an account? Sign in!</p></Link>
    </div>
  );
};

export default Page;
