import { CreateSpace } from "@/app/comps/createspace";
import { Background } from "@/app/comps/gradient";
import { Navbar } from "@/app/comps/navbar";
import { getSession } from "@/app/lib/GetSession";


export default async function CreateSpacePage() {
  const { user } = await getSession()

  if (!user?.id) return
  const userId = user?.id
  
  return (
    <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden flex flex-col">
    
    <Background />

      <div className="relative z-10 w-full h-full flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center gap-16 md:gap-24 px-8">
            <div className="w-full max-w-md h-full mt-48">
                <CreateSpace userId={userId} />
            </div>

        </div>
      </div>

    </div>
  );
}