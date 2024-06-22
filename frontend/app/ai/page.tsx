import { Navbar } from "@/components/navbar";

const Page=()=>{
    return(
        <div className="bg-black h-screen w-screen">
            <Navbar/>
            <div className="flex items-center justify-center p-5">
                <div className="rounded-lg p-5">
                    <div className="flex">
                    <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                    </div>
                    <input type="text" className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0" placeholder="" id=""/>
                    <input type="button" value="Generate" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;