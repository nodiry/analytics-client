import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart2 } from "lucide-react";

interface WebsiteCardProps {
  id: string;
  website_url: string;
  total_visits: number;
  daily_visits: number;
  avg_loading_time: number;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ id, website_url, total_visits, daily_visits, avg_loading_time }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className=" m-8 hover:shadow-lg hover:border-neutral-500 dark:hover:border-neutral-400 cursor-pointer transition-all duration-300"
      onClick={() => navigate(`/metrics/${id}`)} >
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BarChart2 className="text-blue-500" size={20} /> {website_url}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium text-black dark:text-white">Total Visits:</span> {total_visits}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium text-black dark:text-white">Daily Visits:</span> {daily_visits}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium text-black dark:text-white">Avg Load Time:</span> {avg_loading_time.toFixed(2)}s
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <ArrowRight className="text-gray-500 dark:text-gray-400 transition-transform duration-200 group-hover:translate-x-1" />
      </CardFooter>
    </Card>
  );
};

export default WebsiteCard;
