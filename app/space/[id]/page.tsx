import { Background } from "@/app/comps/Gradient";
import { Navbar } from "@/app/comps/Navbar";
import { VideoComp } from "@/app/comps/videoComp";
import { getQueue } from "@/app/helperfuncs/getQueue";
import { getSession } from "@/app/lib/GetSession";

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
                
                <div className="flex-1 flex flex-col p-6 lg:p-12 max-w-400 mx-auto w-full">
                    <div className="w-full h-full">
                        <VideoComp initialQueue={initialQueue} spaceId={spaceId} />
                    </div>
                </div>
            </div>
        </div>
    );
}