import { Toaster } from "@/components/ui/sonner";
import NavBar from "../components/NavBar";
import WebsiteCreator from "@/components/creator";
import { words } from "@/textConfig";
import WebsiteCard from "@/components/webcard";
import { useState } from "react";

const Dashboard = () => {
  const [websites] = useState(() => {  try {
      const webs = localStorage.getItem("web");
      return webs ? JSON.parse(webs) : null;
  } catch { return null }});
  return (
    <div className="flex flex-col w-full space-y-6 min-h-screen justify-center items-center">
      <NavBar />
        <h1 className="mx-2 text-6xl mt-16 font-semibold">
          {words.dashboard} <WebsiteCreator/>  
        </h1>
          {websites.length>0 ?(            
              <div  className="flex-col justify-items-center rounded-lg ">
                {websites.map((w:any) => ( <WebsiteCard key={w._id} website={w} /> ))}              
              </div>
          ) : (
            <div className="flex-col justify-items-center rounded-lg border-dashed p-10 m-16 border-2 border-neutral-500">
              <p className="text-2xl text-neutral-600 dark:text-neutral-300 mb-4">{words.nowebmes}</p>
              <WebsiteCreator/>
            </div>
          )}     
      <Toaster />
    </div>
  );
};

export default Dashboard;
