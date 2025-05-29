import { useState, useEffect } from "react";
import { useQuotient } from "@quotientjs/react";

function ClientStatus() {
  const { client } = useQuotient();
  const [clientState, setClientState] = useState<{
    deviceId?: string;
    sessionId?: string;
    browserFingerprint?: string | null;
    personId?: string | null;
  }>({});

  const updateClientState = () => {
    if (!client) return;

    try {
      console.log("Updating client state");
      const deviceId = client.store.deviceId();
      const sessionId = client.store.sessionId();
      
      let browserFingerprint;
      try {
        const bfValue = client.store.browserFingerprint();
        browserFingerprint = typeof bfValue === "object" 
          ? JSON.stringify(bfValue) 
          : bfValue || "Not available";
      } catch (err) {
        browserFingerprint = "Not available";
      }

      let personId;
      try {
        const pValue = client.store.personId();
        personId = typeof pValue === "object" 
          ? JSON.stringify(pValue) 
          : pValue || null;
      } catch (err) {
        personId = null;
      }

      setClientState({
        deviceId: deviceId ? String(deviceId) : "Not set",
        sessionId: sessionId ? String(sessionId) : "Not set",
        browserFingerprint: typeof browserFingerprint === "string" 
          ? browserFingerprint 
          : JSON.stringify(browserFingerprint),
        personId: personId === null ? null : String(personId),
      });
    } catch (error) {
      console.error("Error retrieving client state:", error);
    }
  };

  useEffect(() => {
    updateClientState();
  }, [client]);

  const handleClearStorage = async () => {
    if (!client) return;
    
    try {
      client.store.clear();
      updateClientState();
      alert("Storage cleared successfully!");
    } catch (error) {
      console.error("Error clearing storage:", error);
      alert("Error clearing storage");
    }
  };

  return (
    <div>
      <h2>Client Status</h2>
      <p>View the current state of your Quotient client instance.</p>

      <div className="status info">
        <h3>Client State Information</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                <strong>Device ID:</strong>
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                {clientState.deviceId || "Not available"}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                <strong>Session ID:</strong>
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                {clientState.sessionId || "Not available"}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                <strong>Browser Fingerprint:</strong>
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                {clientState.browserFingerprint || "Not available"}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>
                <strong>Person ID:</strong>
              </td>
              <td style={{ padding: '8px' }}>
                {clientState.personId || "Not set"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={updateClientState} style={{ marginRight: '10px' }}>
          Refresh State
        </button>
        <button onClick={handleClearStorage} style={{ backgroundColor: '#dc3545' }}>
          Clear Storage
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>About Client State</h3>
        <ul>
          <li><strong>Device ID:</strong> A unique identifier for this device/browser</li>
          <li><strong>Session ID:</strong> A unique identifier for the current session</li>
          <li><strong>Browser Fingerprint:</strong> Additional browser identification data</li>
          <li><strong>Person ID:</strong> The ID of the currently identified person (if any)</li>
        </ul>
      </div>
    </div>
  );
}

export default ClientStatus;