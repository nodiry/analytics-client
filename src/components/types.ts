// types.ts
export interface PageStats {
    path: string;
    visits: number;
    avg_loading_time: number;
    exit_rate: number;
    avg_time_on_page: number;
  }
  
  export interface ReferrerStats {
    referrer: string;
    count: number;
  }
  
  export interface DeviceDistribution {
    desktop: number;
    mobile: number;
    tablet: number;
  }
  
  export interface WebsiteStats {
    total_visits: number;
    monthly_visits: number;
    daily_visits: number;
    unique_visitors: number;
    avg_session_duration: number;
    bounce_rate: number;
    top_referrers: ReferrerStats[];
    device_distribution: DeviceDistribution;
    pages: PageStats[];
  }
  
  export interface Website {
    _id: string;
    dev: string;
    url: string;
    desc?: string;
    unique_key: string;
    created_at: string;
    modified_at?: string;
    stats: WebsiteStats;
  }
  export interface PageMetrics {
    url: string;
    visits: number;
  }
  
  export interface ReferrerStats {
    referrer: string;
    count: number;
  }
  
  export interface DeviceStats {
    desktop: number;
    mobile: number;
    tablet: number;
  }
  
  export interface GeoDistribution {
    country: string;
    visits: number;
  }
  
  export interface MetricData {
    unique_key: string;
    timestamp: string;
    totalVisits: number;
    uniqueVisitors: number;
    avgSessionDuration: number;
    bounceRate: number;
    avgLoadTime: number;
    pages: PageMetrics[];
    referrers: ReferrerStats[];
    deviceStats: DeviceStats;
    geoDistribution: GeoDistribution[];
  }
  