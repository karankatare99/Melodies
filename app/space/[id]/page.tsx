import { Background } from "@/app/comps/gradient";
import { Navbar } from "@/app/comps/navbar";
import { getSession, Song } from "@/app/lib/GetSession";
import axios from "axios";

const streaming: Song = {
  id: "",
  spaceId: "",
  title: "Nebula Dreams",
  channel: "Stellar Echo",
  thumbnail: "from-cyan-500 via-blue-500 to-purple-600",
  url: "",
  votes: 0,
};

const initialQueue: Song[] = [];

export default async function StreamPage() {
    const { space } = await getSession();
    
    return (
        <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden text-white flex flex-col">
        <Background />
        <div className="relative z-10 flex flex-col h-full">
            <Navbar />
            
            <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 p-6 lg:p-12 max-w-7xl mx-auto w-full">
                
                <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
                    {/* <CosmicAudioPlayer currentTrack={currentTrack} /> */}
                </div>

                <div className="w-full lg:w-7/12">
                    {/* <CosmicSongQueue initialQueue={initialQueue} /> */}
                </div>

            </div>
        </div>
        </div>
    );
}