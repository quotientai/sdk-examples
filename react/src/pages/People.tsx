import { useState } from "react";
import { useQuotient } from "@quotientjs/react";

function People() {
  const { client } = useQuotient();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [emailMarketingState, setEmailMarketingState] = useState("");

  const handleUpsertPerson = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!client) {
      setError("Client not initialized");
      return;
    }

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await client.people.upsert({
        emailAddress: email,
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(jobTitle && { jobTitle }),
        ...(emailMarketingState && { emailMarketingState: emailMarketingState as any }),
      });
      
      setResult(response);
      // Clear form on success
      setEmail("");
      setFirstName("");
      setLastName("");
      setJobTitle("");
      setEmailMarketingState("");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>People Management</h2>
      <p>Create or update person records in your Quotient database.</p>

      <form onSubmit={handleUpsertPerson} style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Software Engineer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailMarketingState">Email Marketing State</label>
          <select
            id="emailMarketingState"
            value={emailMarketingState}
            onChange={(e) => setEmailMarketingState(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="SUBSCRIBED">Subscribed</option>
            <option value="UNSUBSCRIBED">Unsubscribed</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Upserting..." : "Upsert Person"}
        </button>
      </form>

      {result && (
        <div className="status success" style={{ marginTop: '20px' }}>
          <h3>Person Upserted Successfully!</h3>
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
        <h3>About People Upsert</h3>
        <p>
          The upsert operation creates a new person or updates an existing one based on the email address.
        </p>
        <ul>
          <li>Email address is required and serves as the unique identifier</li>
          <li>All other fields are optional</li>
          <li>The response includes the person ID for future reference</li>
        </ul>
      </div>
    </div>
  );
}

export default People;