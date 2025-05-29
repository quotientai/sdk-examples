import { useState } from "react";
import { useQuotient } from "@quotientjs/react";

function Analytics() {
  const { client } = useQuotient();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [customEventName, setCustomEventName] = useState("");
  const [customEventData, setCustomEventData] = useState("");

  const trackEvent = async (eventType: string, data?: any) => {
    if (!client) {
      setError("Client not initialized");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      await client.analytics.event({
        eventType,
        ...data
      });
      
      setResult({ 
        success: true, 
        eventType, 
        data,
        timestamp: new Date().toISOString() 
      });
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTrackPageView = () => trackEvent("pageView");
  
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      setError("Please enter a search query");
      return;
    }
    trackEvent("search", { searchQuery });
  };

  const handleTrackCustomEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEventName) {
      setError("Please enter an event name");
      return;
    }
    
    let parsedData = {};
    if (customEventData) {
      try {
        parsedData = JSON.parse(customEventData);
      } catch {
        setError("Invalid JSON in custom event data");
        return;
      }
    }
    
    trackEvent(customEventName, parsedData);
  };

  return (
    <div>
      <h2>Analytics</h2>
      <p>Track various events to understand user behavior.</p>

      <div style={{ marginBottom: '30px' }}>
        <h3>Page View Event</h3>
        <p>Track when users view pages in your application.</p>
        <button onClick={handleTrackPageView} disabled={loading}>
          Track Page View
        </button>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Search Event</h3>
        <form onSubmit={handleTrackSearch}>
          <div className="form-group">
            <label htmlFor="searchQuery">Search Query</label>
            <input
              id="searchQuery"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search term"
            />
          </div>
          <button type="submit" disabled={loading}>
            Track Search
          </button>
        </form>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Custom Event</h3>
        <form onSubmit={handleTrackCustomEvent}>
          <div className="form-group">
            <label htmlFor="customEventName">Event Name</label>
            <input
              id="customEventName"
              type="text"
              value={customEventName}
              onChange={(e) => setCustomEventName(e.target.value)}
              placeholder="e.g., buttonClick, formSubmit"
            />
          </div>
          <div className="form-group">
            <label htmlFor="customEventData">Event Data (JSON)</label>
            <textarea
              id="customEventData"
              value={customEventData}
              onChange={(e) => setCustomEventData(e.target.value)}
              placeholder='{"buttonId": "cta-1", "location": "header"}'
              rows={4}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}
            />
          </div>
          <button type="submit" disabled={loading}>
            Track Custom Event
          </button>
        </form>
      </div>

      {result && (
        <div className="status success" style={{ marginTop: '20px' }}>
          <h3>Event Tracked Successfully!</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="status error" style={{ marginTop: '20px' }}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>About Analytics Events</h3>
        <p>
          Quotient automatically enriches events with:
        </p>
        <ul>
          <li>Device ID and Session ID</li>
          <li>Timestamp and timezone information</li>
          <li>Browser and device details</li>
          <li>Person ID (if identified)</li>
        </ul>
        <p>
          Note: With <code>autoTrackPageViews</code> enabled, page views are tracked automatically on route changes.
        </p>
      </div>
    </div>
  );
}

export default Analytics;