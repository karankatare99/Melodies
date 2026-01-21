import { CreateSpace } from "@/app/comps/createSpace";
import { Background } from "@/app/comps/Gradient";
import { Navbar } from "@/app/comps/Navbar";
import { getSession } from "@/app/lib/GetSession";
import { redirect } from "next/navigation";


export default async function CreateSpacePage() {
  const { user } = await getSession()

  if (!user?.id) {
    redirect('/api/auth/signin');
  }

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