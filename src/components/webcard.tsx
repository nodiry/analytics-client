import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Website } from "./types";
import { useNavigate } from "react-router-dom";
import { words } from "@/textConfig";
import UpdateWebsite from "./update";

interface WebsiteCardProps {  website: Website;}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  if (!website) return null;
  const navigate = useNavigate();
  const { url, stats } = website;

  // Device distribution data for Pie Chart
  const deviceData = [
    { name: words.desktop, value: stats.device_distribution.desktop, color: "#4A90E2" },
    { name: words.mobile, value: stats.device_distribution.mobile, color: "#E94E77" },
    { name: words.tablet, value: stats.device_distribution.tablet, color: "#F8B500" },
  ];

// For formatting avg session duration from seconds to minutes and seconds
const fSD = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} mins & ${remainingSeconds.toFixed(0)} sec`;
};

  return (
    <Card className="m-6 border rounded-lg">
      <CardHeader>
        <CardTitle >{url} <UpdateWebsite unique_key={website?.unique_key || "null"}/></CardTitle>
      </CardHeader>
      <CardContent>
        {/* Top Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title={words.totalvisits} value={stats.total_visits} />
          <StatCard title={words.uniquevisits} value={stats.unique_visitors} />
          <StatCard title={words.bouncerate} value={`${stats.bounce_rate.toFixed(2)}%`} />
          <StatCard title={words.avgses} value={fSD(stats.avg_session_duration)} />
        </div>

        {/* Device Distribution Pie Chart */}
        <div className="w-full flex justify-center my-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={deviceData}
                cx="50%" cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages and Referrers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Top Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{words.toppages}</h3>
            <ul className="text-sm">
              {stats.pages.slice(0, 3).map((page, index) => (
                <li key={index} className="flex justify-between">
                  <span >{page.path}</span>
                  <span className="font-medium">{page.visits} visits</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Referrers */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{words.topreferrers}</h3>
            <ul className="text-sm">
              {stats.top_referrers.slice(0, 3).map((ref, index) => (
                <li key={index} className="flex justify-between">
                  <span>{ref.referrer}</span>
                  <span className="font-medium">{ref.count} {words.visits}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-end">
        <Button variant="default" onClick={()=>{navigate('/metrics/'+website.unique_key+'/3')}}>{words.metrics}</Button>
      </CardFooter>
    </Card>
  );
};

// Reusable StatCard Component
const StatCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
  <Card className="p-3 text-center border">
    <CardTitle className="text-md font-medium">{title}</CardTitle>
    <p className="text-lg font-bold">{value}</p>
  </Card>
);

export default WebsiteCard;