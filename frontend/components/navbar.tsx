import Link from "next/link"
import { FC } from "react"


export const Navbar:FC=()=>{
    return(
        <div className="py-2 w-full h-auto jetbrains-mono z-1000">
            <div className="grid grid-cols-[1fr_max-content_1fr]  place-items-center px-4">
                <div className="text-white ml-[-40]">
                    
                </div>
                <div className="grid grid-flow-col gap-12 text-2xl">
                    <Link href="/" className="text-white underline_anim">Home</Link>
                    <Link href="/ai" className="text-white underline_anim">AI</Link>
                    <Link href="/browse" className="text-white underline_anim">Browse Notes</Link>     
                </div>
            </div>
        </div>
    )
}