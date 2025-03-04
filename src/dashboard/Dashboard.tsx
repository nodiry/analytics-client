import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "../components/NavBar";
import WebsiteCreator from "@/components/creator";
import { words } from "@/textConfig";
import WebsiteCard from "@/components/webcard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<any[] | null>(null);

  useEffect(() => {
    try {
      const webs = localStorage.getItem("web");
      if (webs) {
        setWebsites(JSON.parse(webs));
      } else {
        navigate("/");
      }
    } catch {
      navigate("/");
    }
  }, [navigate]);

  if (!websites) return null; // Prevents rendering before navigation

  return (
    <div className="flex flex-col w-full max-w-screen space-y-6 min-h-screen justify-center items-center overflow-hidden">
      <NavBar />

      {/* Dashboard Title */}
      <h1 className="text-4xl md:text-6xl mt-16 font-semibold text-center">
        {words.dashboard} {websites.length > 0 && <WebsiteCreator />}
      </h1>

      {/* Website List */}
      {websites.length > 0 ? (
        <div className="w-full max-w-3xl flex flex-col items-center rounded-lg">
          {websites.map((w) => (
            <WebsiteCard key={w._id} website={w} />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-lg flex flex-col items-center rounded-lg border-dashed p-10 border-2 border-neutral-500">
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-4 text-center">
            {words.nowebmes}
          </p>
          <WebsiteCreator />
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Dashboard;
