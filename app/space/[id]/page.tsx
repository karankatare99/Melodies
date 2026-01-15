import { Background } from "@/app/comps/gradient";
import { Navbar } from "@/app/comps/navbar";
import { VideoQueue } from "@/app/comps/videoqueue";
import { VideoPlayer } from "@/app/comps/vidplayer";
import { getQueue } from "@/app/helperfuncs/getQueue";
import { getSession, Song } from "@/app/lib/GetSession";

const streaming: Song = {
  id: "1",
  spaceId: "",
  title: "Nebula Dreams",
  channel: "Stellar Echo",
  url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  votes: 0,
};

export default async function StreamPage() {
    const { space } = await getSession();
    let spaceId = space?.id;
    if (!spaceId) spaceId = "Xid_Space_404";

    const initialQueue = await getQueue(spaceId);
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
                    <VideoQueue initialQueue={initialQueue} spaceId={spaceId} />
                </div>

            </div>
        </div>
        </div>
    );
}