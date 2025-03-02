import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/siteConfig";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VisitsChart from "@/components/visitChart";
import DeviceStatsChart from "@/components/devStatsChart";
import ReferrersChart from "@/components/referrers";
import AvgLoadTimeChart from "@/components/avgLoadTime";
import PagesChart from "@/components/pageChart";
import BounceRateChart from "@/components/bounceRate";
import SessionDurationChart from "@/components/sessionChart";
import { MetricData, Website } from "@/components/types";
import Loading from "@/components/Loading";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Info from "@/components/info";
import Update from "@/components/updatewebsite";
import RefreshMetrics from "@/components/refresh";
import CodeGuide from "@/components/code";
import DeleteWebsite from "@/components/delete";

const Metric = () => {
  const { id, period } = useParams(); // Get unique_key and period from URL
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [loading, setLoading] = useState(true);
  const [website, setWeb] = useState<Website | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const periodMap: { [key: string]: string } = {
    "1": "day", // Last 24 hours
    "2": "week", // Last 7 days
    "3": "month", // Last 30 days
    "4": "all", // All data from the start
  };

  // Function to extract "Day" and "Week" data from 1-month data
  const extractMetrics = (allData: MetricData[]) => {
    const now = new Date().getTime();
    const last24Hours = now - 24 * 60 * 60 * 1000;
    const last7Days = now - 7 * 24 * 60 * 60 * 1000;

    const dayData = allData.filter((m) => new Date(m.timestamp).getTime() >= last24Hours);
    const weekData = allData.filter((m) => new Date(m.timestamp).getTime() >= last7Days);

    localStorage.setItem(`metrics_${id}_day`, JSON.stringify(dayData));
    localStorage.setItem(`metrics_${id}_week`, JSON.stringify(weekData));
    localStorage.setItem(`metrics_${id}_month`, JSON.stringify(allData));
  };

  const loadMetrics = async (periodKey: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const websites: Website[] = JSON.parse(localStorage.getItem("web") || "[]");

    if (!user._id || !id) {
      navigate("/");
      return;
    }

    const matchedWebsite = websites.find((web) => web.unique_key === id);
    if(matchedWebsite) setWeb(matchedWebsite);

    // Check if metrics exist in localStorage
    const cachedMetrics = localStorage.getItem(`metrics_${id}_${periodKey}`);
    if (cachedMetrics) {
      setMetrics(JSON.parse(cachedMetrics));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${siteConfig.links.metrics}${user._id}/${id}/${periodKey === "all" ? 4 : 3}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        if (periodKey === "all") localStorage.setItem(`metrics_${id}_all`, JSON.stringify(data.metrics));
        else extractMetrics(data.metrics);
        
        setMetrics(data.metrics);
      } else {
        setError(data.message || "Failed to fetch metrics");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  const handlePeriodChange = (selectedPeriod: string) => {
    // Update URL with the new period
    navigate(`/metrics/${id}/${selectedPeriod}`);
  };
  useEffect(() => {
    const selectedPeriod = period ? periodMap[period] : "day";
    loadMetrics(selectedPeriod);
  }, [id, period]);

  if (loading) return <div><NavBar /> <Loading /></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex-col p-6 place-items-center space-y-6">
      <NavBar />
      <h1 className="text-2xl font-bold mt-12 mb-4">Metrics for {website?.url} <Info date={website?.created_at || "unknown"} url={website?.url|| "unknown"} desc={website?.desc|| "unknown"}/></h1>
      <div className="flex flex-row space-x-6 items-center justify-between">
        <CodeGuide unique_key={website?.unique_key || "null"}/>
        <RefreshMetrics unique_key={website?.unique_key || "null"}/>
       <ToggleGroup type="single" value={period} onValueChange={handlePeriodChange}>
        <ToggleGroupItem variant='outline' value="1" >Day</ToggleGroupItem>
        <ToggleGroupItem variant='outline' value="2" >Week</ToggleGroupItem>
        <ToggleGroupItem variant='outline' value="3" >Month</ToggleGroupItem>
        <ToggleGroupItem variant='outline' value="4">All Time</ToggleGroupItem>
      </ToggleGroup>
     {website && <Update website={website}/>} 
     {website && <DeleteWebsite unique_key={website?.unique_key}/>} 
      </div>

      {metrics.length > 0 ? (
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <VisitsChart metrics={metrics} />
          <DeviceStatsChart deviceStats={metrics[metrics.length - 1].deviceStats} />
          <ReferrersChart referrers={metrics[metrics.length - 1].referrers} />
          <AvgLoadTimeChart metrics={metrics} />
          <PagesChart metrics={metrics} />
          <BounceRateChart metrics={metrics} />
          <SessionDurationChart metrics={metrics} />
        </div>
      ) : (
        <div className="justify-center">No metrics available for the selected time period.</div>
      )}
      <Toaster />
    </div>
  );
};

export default Metric;