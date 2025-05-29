import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { QuotientProvider, useQuotient } from "@quotientjs/react";

// Icons and Logo (simple SVG components)
const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
  </svg>
);

const AcmeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="currentColor" />
    <path d="M8 20L16 8L24 20H20L16 12L12 20H8Z" fill="white" />
    <rect x="14" y="16" width="4" height="4" fill="white" />
  </svg>
);

// Beta Signup Form Component
function BetaSignupForm() {
  const { client } = useQuotient();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!email || !email.includes("@")) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      // Upsert person to waitlist
      await client?.people.upsert({
        emailAddress: email,
        emailMarketingState: "SUBSCRIBED",
        firstName: name.split(" ")[0] || "",
        lastName: name.split(" ").slice(1).join(" ") || "",
        lists: ["beta-form-signup"],
        properties: {
          betaUser: true
        },
      });

      setStatus({
        type: "success",
        message: "Thanks for signing up! We'll be in touch soon.",
      });

      // Clear form
      setEmail("");
      setName("");
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-card border rounded-lg p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-4">Join the Beta</h2>
            <p className="text-center text-muted-foreground mb-8">
              Be among the first to experience ACME's revolutionary productivity platform.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full"
              >
                Request Beta Access
                <ArrowRightIcon />
              </button>
            </form>

            {status.type && (
              <div className={`mt-6 p-4 rounded-md text-sm ${status.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
                }`}>
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Page Components
function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Build <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">faster</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                The most powerful productivity platform ever built.
                Join thousands of teams who've transformed their workflow.
              </p>
              <div className="flex gap-4">
                <NavLink
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
                >
                  Get Started
                  <ArrowRightIcon />
                </NavLink>
                <NavLink
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 rounded-md px-8"
                >
                  Learn More
                </NavLink>
              </div>
            </div>
            <div className="text-center">
              <div className="w-full max-w-md mx-auto h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <AcmeLogo className="w-32 h-32 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join ACME?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey with the most advanced productivity platform.
          </p>
          <NavLink
            to="/signup"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-background/90 h-11 rounded-md px-8"
          >
            Start Free
            <ArrowRightIcon />
          </NavLink>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About ACME</h2>
          <div className="prose prose-lg">
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2024, ACME is on a mission to revolutionize how teams
              collaborate and get work done. We believe that software should be powerful
              yet simple, secure yet accessible.
            </p>

            <h3 className="text-2xl font-semibold mb-4 mt-8">Our Values</h3>
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="p-6 bg-card border rounded-lg">
                <h4 className="font-semibold mb-2">Innovation</h4>
                <p className="text-muted-foreground">We push boundaries every day</p>
              </div>
              <div className="p-6 bg-card border rounded-lg">
                <h4 className="font-semibold mb-2">Simplicity</h4>
                <p className="text-muted-foreground">Complex problems, simple solutions</p>
              </div>
              <div className="p-6 bg-card border rounded-lg">
                <h4 className="font-semibold mb-2">Community</h4>
                <p className="text-muted-foreground">Built with and for our users</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              We're just getting started. Be part of something special from the beginning.
            </p>

            <NavLink
              to="/signup"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
            >
              Get Early Access
              <ArrowRightIcon />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignupPage() {
  return <BetaSignupForm />;
}

// Client State Page
function ClientStatePage() {
  const { client } = useQuotient();
  const [clientState, setClientState] = useState<{
    deviceId?: string;
    sessionId?: string;
    browserFingerprint?: string | null;
    personId?: string | null;
  }>({});
  const [loading, setLoading] = useState(false);

  const refreshClientState = async () => {
    if (!client) return;

    setLoading(true);
    try {
      const deviceId = client.store.deviceId();
      const sessionId = client.store.sessionId();

      let browserFingerprint;
      try {
        const bfValue = await client.store.browserFingerprint();
        browserFingerprint = typeof bfValue === "object"
          ? JSON.stringify(bfValue)
          : bfValue || "Not available";
      } catch (err) {
        browserFingerprint = "Not available";
      }

      let personId;
      try {
        const pValue = await client.store.personId();
        personId = typeof pValue === "object"
          ? JSON.stringify(pValue)
          : pValue || null;
      } catch (err) {
        personId = null;
      }

      setClientState({
        deviceId: deviceId ? String(deviceId) : "Not available",
        sessionId: sessionId ? String(sessionId) : "Not available",
        browserFingerprint: typeof browserFingerprint === "string"
          ? browserFingerprint
          : JSON.stringify(browserFingerprint),
        personId: personId === null ? null : String(personId),
      });
    } catch (error) {
      console.error("Error retrieving client state:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearStorage = async () => {
    if (!client) return;

    try {
      setLoading(true);
      client.store.clear();
      refreshClientState();
      alert("Storage cleared successfully! The page will reload to reinitialize the client.");
      window.location.reload();
    } catch (error) {
      console.error("Error clearing storage:", error);
      alert("Error clearing storage");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshClientState();
  }, [client]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">(Quotient Client State)</h2>

          <div className="bg-card border rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Quotient Store API Demo</h3>
            <p className="text-muted-foreground mb-6">
              This page demonstrates the Quotient client's store API, which manages device identification,
              session tracking, and user state.
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">Device ID</h4>
                <code className="text-sm bg-background px-2 py-1 rounded border block">
                  {clientState.deviceId || "Loading..."}
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  Unique identifier for this browser/device
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">Session ID</h4>
                <code className="text-sm bg-background px-2 py-1 rounded border block">
                  {clientState.sessionId || "Loading..."}
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  Unique identifier for this browsing session
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">Person ID</h4>
                <code className="text-sm bg-background px-2 py-1 rounded border block">
                  {clientState.personId || "Not identified"}
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  Set when a user is identified (e.g., after signup)
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">Browser Fingerprint</h4>
                <code className="text-sm bg-background px-2 py-1 rounded border block overflow-hidden text-ellipsis">
                  {clientState.browserFingerprint || "Loading..."}
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  Browser characteristics for identification
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={refreshClientState}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
              >
                {loading ? "Loading..." : "Refresh State"}
              </button>

              <button
                onClick={handleClearStorage}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4"
              >
                Clear Storage
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-blue-900">💡 Try This:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Sign up for the beta to see the Person ID get populated</li>
              <li>• Clear storage to see new IDs generated</li>
              <li>• Refresh the page to see session persistence</li>
              <li>• Open in incognito to see different device tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


// Toast Component
function DeveloperToolsToast() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000); // Hide after 8 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm bg-blue-600 text-white rounded-lg shadow-lg p-4 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">
            💡 Pro Tip
          </p>
          <p className="text-sm mt-1 opacity-90">
            Open your developer tools (F12) to see outgoing analytics events in the Network tab!
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 flex-shrink-0 text-white/70 hover:text-white"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Main App Component
function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <DeveloperToolsToast />
      
      {/* Header */}
      <header className="flex items-stretch w-full shadow-sm border-b">
        <div className="flex items-center w-48">
          <NavLink to="/" className="flex items-center px-4 py-2 hover:bg-muted rounded-full mx-2 my-1">
            <AcmeLogo className="w-8 h-8 mr-2" />
            <div className="flex flex-col">
              <span className="font-black text-xl leading-none">ACME</span>
            </div>
          </NavLink>
        </div>

        <nav className="flex items-stretch flex-grow">
          <div className="flex items-center space-x-6 ml-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80 ${isActive ? "text-foreground border-b-2 border-primary" : "text-foreground/60"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/client-state"
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80 ${isActive ? "text-foreground border-b-2 border-primary" : "text-foreground/60"
                }`
              }
            >
              (Quotient Client State)
            </NavLink>
          </div>
        </nav>

        <div className="flex items-stretch w-48">
          <NavLink
            to="/signup"
            className="bg-foreground text-background px-6 py-2 hover:opacity-90 flex items-center justify-center rounded-full mx-3 my-2 text-sm font-medium"
          >
            Join Beta →
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/client-state" element={<ClientStatePage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background w-full">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ACME</h3>
              <p className="text-sm opacity-90">
                The most powerful productivity platform ever built.
                Transform your team's workflow with advanced collaboration tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <NavLink to="/about" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/client-state" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                    Client State
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                    Join Beta
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Powered By</h3>
              <p className="text-sm opacity-90">
                Analytics powered by{" "}
                <a
                  href="https://getquotient.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Quotient
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-background/10 text-center text-sm opacity-75">
            © 2024 ACME. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QuotientProvider
      clientOptions={{
        apiKey: "pk_949bfeff7de899f1b48cd2bf7563fbe4cf25be93",
        baseUrl: "https://staging.getquotient.ai",
      }}
      autoTrackPageViews={true}
    >
      <AppContent />
    </QuotientProvider>
  );
}

export default App;
