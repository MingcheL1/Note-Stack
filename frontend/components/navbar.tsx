import Link from "next/link"
import { FC } from "react"


export const Navbar:FC=()=>{
    return(
        <div className="bg-black py-2 w-full h-auto jetbrains-mono">
            <div className="grid grid-cols-[1fr_max-content_1fr]  place-items-center px-4">
                <div className="">
                    <Link href="/">Home</Link>
                </div>
                <div className="grid grid-flow-col gap-12 text-2xl">
                    <Link href="" className="text-white">About</Link>
                    <Link href="" className="text-white">Notes</Link>
                    <Link href="" className="text-white">Sharing</Link>
                    
                </div>
            </div>
        </div>
    )
}