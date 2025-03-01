import { siteConfig } from '@/siteConfig';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Metric = () => {
  const { id } = useParams(); // Get unique_key from URL params
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user._id);
    // If there's no user or uniqueKey, navigate back to the home page
    if (!user._id || !id) navigate('/');

    const fetchMetrics = async () => {
      try {
        const res = await fetch(siteConfig.links.metrics + user._id+'/'+id,
          {credentials:"include"}
        );
        const data = await res.json();

        if (res.ok) {
          setMetrics(data.metrics); // Set the fetched metrics data
        } else {
          setError(data.message || 'Failed to fetch metrics');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics(); 
  }, [id, navigate]);

  if (loading) return <div>Loading...</div>;
  
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      <h1>Metrics for {id}</h1>
      {metrics.length > 0 ? (
        <div>
          {metrics.map((metric: any) => (
            <div key={metric.timestamp}>
              <h3>{new Date(metric.timestamp).toLocaleString()}</h3>
              <div>
                <strong>Total Visits:</strong> {metric.totalVisits}
              </div>
              <div>
                <strong>Unique Visitors:</strong> {metric.uniqueVisitors}
              </div>
              <div>
                <strong>Avg Load Time:</strong> {metric.avgLoadTime}
              </div>
              <div>
                <strong>Top Pages:</strong>
                <ul>
                  {metric.topPages.map((page: any) => (
                    <li key={page.url}>
                      {page.url}: {page.visits} visits
                    </li>
                  ))}
                </ul>
              </div>
              {/* You can add more sections for the other metrics (e.g., referrers, bounceRate, etc.) */}
            </div>
          ))}
        </div>
      ) : (
        <div>No metrics available for the past 24 hours.</div>
      )}
    </div>
  );
};

export default Metric;
