import { Background } from "./comps/Gradient";
import { Pagebody } from "./comps/homeBody";
import { Navbar } from "./comps/Navbar";
import { getSession } from "./lib/GetSession";

export default async function Home() {
  const { user } = await getSession()
  console.log(user)
  return (
    <div className="max-h-screen w-full relative bg-slate-950 overflow-hidden text-white flex flex-col">
      <Background />
      <div className="relative z-10 flex flex-col h-full">
          <Navbar />
          <div className="flex-1 flex items-center">
            <Pagebody />
          </div>
      </div>
    </div>
  );
}