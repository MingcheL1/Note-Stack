import { Navbar } from "@/components/navbar";
import { WavyBackground } from "@/components/ui/wavy-background";

const Page=()=>{
    return(
        <><div>
            <Navbar />
            AI
        </div><WavyBackground className="max-w-4xl mx-auto pb-40">
                <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
                    Hero waves are cool
                </p>
                <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
                    Leverage the power of canvas to create a beautiful hero section
                </p>
            </WavyBackground></>
    )
}

export default Page;