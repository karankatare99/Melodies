import { Background } from "./comps/gradient";
import { Navbar } from "./comps/navbar";
import { getSession } from "./lib/GetSession";

export default async function Home() {
  const { user } = await getSession()
  console.log(user)
  return (
    <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden text-white flex flex-col">
      <Background />
      <div className="relative z-10 flex flex-col h-full">
          <Navbar />
          <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 p-6 lg:p-12 max-w-7xl mx-auto w-full">
              
              <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
              </div>

              <div className="w-full lg:w-7/12">
              </div>

          </div>
      </div>
    </div>
  );
}