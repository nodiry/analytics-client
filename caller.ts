const analyticsServer = "http://localhost:3004/kj25"; // Change to production URL

const trackingData = [
    {
      "url": "http://example.com/home",
      "referrer": "http://google.com",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "ip": "192.168.1.1",
      "loadTime": 523,
      "session_id": "sess-abc123",
      "country": "USA",
      "deviceType": "desktop"
    },
    {
      "url": "http://example.com/about",
      "referrer": "http://example.com/home",
      "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)",
      "ip": "192.168.1.2",
      "loadTime": 678,
      "session_id": "sess-xyz456",
      "country": "Canada",
      "deviceType": "mobile"
    },
    {
      "url": "http://example.com/contact",
      "referrer": "http://bing.com",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      "ip": "192.168.1.3",
      "loadTime": 345,
      "session_id": "sess-qwe789",
      "country": "UK",
      "deviceType": "desktop"
    },
    {
      "url": "http://example.com/blog",
      "referrer": "direct",
      "userAgent": "Mozilla/5.0 (Linux; Android 11)",
      "ip": "192.168.1.4",
      "loadTime": 901,
      "session_id": "sess-uiop567",
      "country": "Germany",
      "deviceType": "mobile"
    },
    {
      "url": "http://example.com/shop",
      "referrer": "http://facebook.com",
      "userAgent": "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)",
      "ip": "192.168.1.5",
      "loadTime": 600,
      "session_id": "sess-asdfg234",
      "country": "France",
      "deviceType": "tablet"
    },
    {
      "url": "http://example.com/products",
      "referrer": "http://twitter.com",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "ip": "192.168.1.6",
      "loadTime": 455,
      "session_id": "sess-lkjh654",
      "country": "Italy",
      "deviceType": "desktop"
    },
    {
      "url": "http://example.com/login",
      "referrer": "http://example.com",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6)",
      "ip": "192.168.1.7",
      "loadTime": 302,
      "session_id": "sess-zxcv098",
      "country": "Spain",
      "deviceType": "desktop"
    },
    {
      "url": "http://example.com/dashboard",
      "referrer": "http://example.com/login",
      "userAgent": "Mozilla/5.0 (Linux; Android 10)",
      "ip": "192.168.1.8",
      "loadTime": 789,
      "session_id": "sess-mnbv432",
      "country": "Brazil",
      "deviceType": "mobile"
    },
    {
      "url": "http://example.com/signup",
      "referrer": "http://instagram.com",
      "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X)",
      "ip": "192.168.1.9",
      "loadTime": 499,
      "session_id": "sess-qazwsx123",
      "country": "Australia",
      "deviceType": "mobile"
    },
    {
      "url": "http://example.com/support",
      "referrer": "http://example.com/contact",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0)",
      "ip": "192.168.1.10",
      "loadTime": 621,
      "session_id": "sess-edcrfv456",
      "country": "India",
      "deviceType": "desktop"
    },
    {
      "url": "http://example.com/pricing",
      "referrer": "http://linkedin.com",
      "userAgent": "Mozilla/5.0 (Linux; Android 12)",
      "ip": "192.168.1.11",
      "loadTime": 410,
      "session_id": "sess-tgbnhy789",
      "country": "Japan",
      "deviceType": "mobile"
    },
    {
      "url": "http://example.com/terms",
      "referrer": "direct",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6)",
      "ip": "192.168.1.12",
      "loadTime": 532,
      "session_id": "sess-vcxzas098",
      "country": "Mexico",
      "deviceType": "desktop"
    },
    {
      "url": "http://example.com/privacy",
      "referrer": "http://example.com/terms",
      "userAgent": "Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X)",
      "ip": "192.168.1.13",
      "loadTime": 478,
      "session_id": "sess-bnmqwer234",
      "country": "South Korea",
      "deviceType": "tablet"
    },
    {
      "url": "http://example.com/checkout",
      "referrer": "http://example.com/shop",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0)",
      "ip": "192.168.1.14",
      "loadTime": 839,
      "session_id": "sess-plokm098",
      "country": "Russia",
      "deviceType": "desktop"
    },
    {
      "url": "http://example.com/cart",
      "referrer": "http://example.com/shop",
      "userAgent": "Mozilla/5.0 (Linux; Android 9)",
      "ip": "192.168.1.15",
      "loadTime": 356,
      "session_id": "sess-nmlop123",
      "country": "China",
      "deviceType": "mobile"
    }
  ]

async function sendTrackingData() {
  for (const data of trackingData) {
          try {
            console.log(`Sending data: ${JSON.stringify(data, null, 2)}`);
            
            const response = fetch(analyticsServer, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            if (!response) {
              console.error(`Error: ${response}`);
            } else {
              console.log(`Success: Data sent at ${new Date().toISOString()}`);
            }
          } catch (error) {
            console.error(`Request failed: ${error}`);
          }
  }
}

sendTrackingData();
