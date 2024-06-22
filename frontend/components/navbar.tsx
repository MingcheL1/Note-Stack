import Link from "next/link"
import { FC } from "react"


export const Navbar:FC=()=>{
    return(
        <div className="py-2 w-full h-auto jetbrains-mono">
            <div className="grid grid-cols-[1fr_max-content_1fr]  place-items-center px-4">
                <div className="text-white ml-[-40]">
                    <Link href="/">Home</Link>
                </div>
                <div className="grid grid-flow-col gap-12 text-2xl">
                    <Link href="/ai" className="text-white underline_anim">AI</Link>
                    <Link href="/dashboard" className="text-white underline_anim">Dashboard</Link>
                    <Link href="/browse" className="text-white underline_anim">Browse</Link>     
                </div>
            </div>
        </div>
    )
}