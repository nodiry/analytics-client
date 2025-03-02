import { siteConfig } from "@/siteConfig";
import { useState } from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
interface Props {
    unique_key:string
}
const UpdateWebsite = ({unique_key}:Props) => {
  const [loading, setLoading] = useState(false);
  const key = unique_key;
  // Function to update website
  const updateWebsite = async (unique_key: string) => {
    setLoading(true);
    try {
      // Sending PUT request to update website by unique_key
      const response = await fetch(siteConfig.links.website+"renew",
         { method:"PUT", credentials:"include", body: unique_key });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Something went wrong");
      // Get all websites from localStorage
      const websites = JSON.parse(localStorage.getItem("web") || "[]");
      const websiteIndex = websites.findIndex((site: any) => site.unique_key === unique_key);

      if (websiteIndex !== -1) {
        websites[websiteIndex] = data.website;
        localStorage.setItem("web", JSON.stringify(websites));
        window.location.reload();
      } 
    } catch (err) {
      console.error("Error updating website:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <Button variant='outline' onClick={() => updateWebsite(key)}
        disabled={loading || !key} >
        {loading ? <div className="w-8 h-8 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                  : <RefreshCcw />}
      </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Update website calculations</p>
      </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  );
};
export default UpdateWebsite;