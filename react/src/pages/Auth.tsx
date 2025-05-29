import { useState } from "react";
import { useQuotient } from "@quotientjs/react";

function Auth() {
  const { client } = useQuotient();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleWhoami = async () => {
    if (!client) {
      setError("Client not initialized");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await client.auth.whoami({});
      setResult(response);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <p>Test your API key and get information about your Quotient account.</p>

      <button onClick={handleWhoami} disabled={loading}>
        {loading ? "Testing..." : "Test Connection (whoami)"}
      </button>

      {result && (
        <div className="status success" style={{ marginTop: '20px' }}>
          <h3>Connection Successful!</h3>
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
        <h3>About the whoami Endpoint</h3>
        <p>
          The <code>whoami</code> endpoint returns information about your API key:
        </p>
        <ul>
          <li><strong>businessId:</strong> The ID of the business associated with this API key</li>
          <li><strong>keyType:</strong> The type of API key (e.g., "public")</li>
          <li><strong>scopes:</strong> The permissions granted to this API key</li>
        </ul>
      </div>
    </div>
  );
}

export default Auth;