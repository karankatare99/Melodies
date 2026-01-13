import { Background } from "@/app/comps/gradient";
import { Navbar } from "@/app/comps/navbar";
import { VideoQueue } from "@/app/comps/videoqueue";
import { VideoPlayer } from "@/app/comps/vidplayer";
import { getSession, Song } from "@/app/lib/GetSession";
import axios from "axios";

const streaming: Song = {
  id: "",
  spaceId: "",
  title: "Nebula Dreams",
  channel: "Stellar Echo",
  url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  votes: 0,
};

const initialQueue: Song[] = [
    {
        id: "1",
        spaceId: "",
        title: "Nebula Dreams",
        channel: "Stellar Echo",
        url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        votes: 0,
    },
    {
        id: "2",
        spaceId: "",
        title: "Midnight City",
        channel: "M83",
        url: "https://www.youtube.com/watch?v=dX3k_QDnzHE",
        votes: 0,
    },
    {
        id: "3",
        spaceId: "",
        title: "Starboy",
        channel: "The Weeknd",
        url: "https://www.youtube.com/watch?v=34Na4j8AVgA",
        votes: 0,
    },
    {
        id: "4",
        spaceId: "",
        title: "After Dark",
        channel: "Mr. Kitty",
        url: "https://www.youtube.com/watch?v=sQXjkJiKNS0",
        votes: 0,
    },
    {
        id: "5",
        spaceId: "",
        title: "Neon Lights",
        channel: "Synthwave Mix",
        url: "https://www.youtube.com/watch?v=39zIw9O88kE",
        votes: 0,
    },
    {
        id: "6",
        spaceId: "",
        title: "Nightcall",
        channel: "Kavinsky",
        url: "https://www.youtube.com/watch?v=MV_3Dpw-BRY",
        votes: 0,
    },
    {
        id: "7",
        spaceId: "",
        title: "Resonance",
        channel: "Home",
        url: "https://www.youtube.com/watch?v=8GW6sLrK40k",
        votes: 0,
    },
    {
        id: "8",
        spaceId: "",
        title: "SimpsonWave",
        channel: "Chill Lofi",
        url: "https://www.youtube.com/watch?v=aWIE0PX1uXk",
        votes: 0,
    },
    {
        id: "9",
        spaceId: "",
        title: "Tech Noir",
        channel: "Gunship",
        url: "https://www.youtube.com/watch?v=-nC5TBv3sfU",
        votes: 0,
    },
    {
        id: "10",
        spaceId: "",
        title: "Instant Crush",
        channel: "Daft Punk",
        url: "https://www.youtube.com/watch?v=a5uQMwRMHcs",
        votes: 0,
    }
];

export default async function StreamPage() {
    const { space } = await getSession();
    
    return (
        <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden text-white flex flex-col">
        <Background />
        <div className="relative z-10 flex flex-col h-full">
            <Navbar />
            
            <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 p-6 lg:p-12 max-w-7xl mx-auto w-full">
                
                <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
                    <VideoPlayer streaming={streaming} />
                </div>

                <div className="w-full lg:w-7/12">
                    <VideoQueue initialQueue={initialQueue} />
                </div>

            </div>
        </div>
        </div>
    );
}