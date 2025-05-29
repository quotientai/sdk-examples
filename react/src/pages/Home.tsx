import { useQuotient } from "@quotientjs/react";

function Home() {
  const { client } = useQuotient();

  return (
    <div>
      <h2>Welcome to Quotient React SDK Example</h2>
      <p>
        This example demonstrates how to use the @quotientjs/react SDK with React hooks and providers.
      </p>
      
      <div className="status info">
        <p>
          <strong>Client Status:</strong> {client ? "Initialized" : "Not initialized"}
        </p>
        <p>
          Navigate through the menu above to explore different features of the SDK.
        </p>
      </div>

      <h3>Features Demonstrated:</h3>
      <ul>
        <li><strong>Client Status:</strong> View and manage client state information</li>
        <li><strong>Authentication:</strong> Test your API key connection</li>
        <li><strong>People:</strong> Manage user profiles and data</li>
        <li><strong>Analytics:</strong> Track events and user interactions</li>
      </ul>

      <h3>Key Concepts:</h3>
      <ul>
        <li>QuotientProvider wraps your app and provides client access</li>
        <li>useQuotient hook gives access to the client instance</li>
        <li>Automatic page view tracking when enabled</li>
        <li>Session and device management handled automatically</li>
      </ul>
    </div>
  );
}

export default Home;