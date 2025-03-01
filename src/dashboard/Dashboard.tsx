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
    <div className="flex flex-col w-full space-y-6 min-h-screen">
      <NavBar />
        <h1 className="mx-2 text-6xl mt-16 font-semibold text-black dark:text-white ">
          Dashboard
        </h1>
          {websites.length>0 ?(            
              <div  className="flex-col justify-items-center rounded-lg  p-10 m-16 ">
                {websites.map((w:any) => (
            <WebsiteCard key={w._id}id={w.unique_key}
              website_url={w.website_url}
              total_visits={w.stats.total_visits}
              daily_visits={w.stats.daily_visits}
              avg_loading_time={w.stats.pages[0]?.avg_loading_time || 0}
            /> ))}
                <WebsiteCreator/>              
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
