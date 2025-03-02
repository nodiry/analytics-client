import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/siteConfig";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface RefreshMetricsProps {
  unique_key: string;
}

const RefreshMetrics: React.FC<RefreshMetricsProps> = ({ unique_key }) => {
  const [loading, setLoading] = useState(false);
  const [user] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Delete old stored metrics from localStorage
      localStorage.removeItem(`metrics_${unique_key}_day`);
      localStorage.removeItem(`metrics_${unique_key}_week`);
      localStorage.removeItem(`metrics_${unique_key}_month`);
      localStorage.removeItem(`metrics_${unique_key}_all`);

      // Fetch new monthly data
      const res = await fetch(`${siteConfig.links.metrics}${user._id}/${unique_key}/3`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to fetch metrics");

      // Extract different time ranges
      const monthlyData = result.metrics; // Full month data
      const dailyData = monthlyData.slice(-24); // Last 24 hours
      const weeklyData = monthlyData.slice(-168); // Last 7 days (7 * 24 hours)

      // Save new data into localStorage
      localStorage.setItem(`metrics_${unique_key}_day`, JSON.stringify(dailyData));
      localStorage.setItem(`metrics_${unique_key}_week`, JSON.stringify(weeklyData));
      localStorage.setItem(`metrics_${unique_key}_month`, JSON.stringify(monthlyData));

      // Success message
      toast.success("Metrics refreshed successfully!");
      window.location.reload(); // Reload the page
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger> <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                {loading ? <div className="w-5 h-5 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div> : <RotateCw />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Get new data by pressing this button</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );
};

export default RefreshMetrics;
