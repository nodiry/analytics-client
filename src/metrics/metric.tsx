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
import { words } from "@/textConfig";
import { StatCard } from "@/components/webcard";
import GeoDistro from "@/components/geoDistro";

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

  // For formatting avg session duration from seconds to minutes and seconds
const fSD = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} mins & ${remainingSeconds.toFixed(0)} sec`;
};
  return (
    <div className="flex flex-col p-6 space-y-6 w-full max-w-screen overflow-x-hidden">
  <NavBar />
  <h1 className="text-2xl font-bold mt-12 mb-4 text-center">
  <a 
    href={website?.url?.startsWith('http') ? website.url : `https://${website?.url}`} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-blue-500 hover:underline"
  >
    {website?.url}
  </a> Metrics{' '}
  <Info
    date={website?.created_at || "unknown"}
    url={website?.url || "unknown"}
    desc={website?.desc || "unknown"}
  />
</h1>

  {/* Controls - Wraps on Mobile */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
    {/* Toggle Group (Moves Above Buttons on Mobile) */}
    <div className="w-full md:w-auto flex justify-center">
      <ToggleGroup
        type="single"
        value={period}
        onValueChange={handlePeriodChange}
        className="flex flex-wrap justify-center"
      >
        <ToggleGroupItem variant="outline" value="1">
          {words.day}
        </ToggleGroupItem>
        <ToggleGroupItem variant="outline" value="2">
          {words.week}
        </ToggleGroupItem>
        <ToggleGroupItem variant="outline" value="3">
          {words.month}
        </ToggleGroupItem>
        <ToggleGroupItem variant="outline" value="4">
          {words.all}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-wrap justify-center md:justify-end gap-4">
      <CodeGuide unique_key={website?.unique_key || "null"} />
      <RefreshMetrics unique_key={website?.unique_key || "null"} />
      {website && <Update website={website} />}
      {website && <DeleteWebsite unique_key={website?.unique_key} />}
    </div>
  </div>

  {/* Top Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard title={words.totalvisits} value={website?.stats.total_visits|| 0} />
            <StatCard title={words.uniquevisits} value={website?.stats.unique_visitors || 0} />
            <StatCard title={words.bouncerate} value={`${website?.stats.bounce_rate.toFixed(2)}%`} />
            <StatCard title={words.avgses} value={fSD(website?.stats.avg_session_duration || 0)} />
          </div>

  {/* Metrics Section */}
  {metrics.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
      <VisitsChart metrics={metrics} />
      <DeviceStatsChart metrics={metrics} />
      <ReferrersChart metrics={metrics} />
      <AvgLoadTimeChart metrics={metrics} />
      <PagesChart metrics={metrics} />
      <BounceRateChart metrics={metrics} />
      <SessionDurationChart metrics={metrics} />
      <GeoDistro metrics={metrics}/>
    </div>
  ) : ( <div className="text-center text-neutral-500">{words.nometricmes} </div> )}
  <Toaster />
</div>

  );
};

export default Metric;