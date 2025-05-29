# Quotient React SDK - Basic Example

This example demonstrates how to use the `@quotientjs/react` SDK with React hooks and providers.

## Features Demonstrated

- QuotientProvider setup and configuration
- useQuotient hook usage
- Client state management
- Authentication (whoami endpoint)
- People management (upsert)
- Analytics tracking (page views, search, custom events)
- Automatic page view tracking with React Router

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

4. The example comes pre-configured with a test API key and staging URL

## Key Concepts

### QuotientProvider

Wrap your app with the QuotientProvider to make the client available throughout your component tree:

```tsx
<QuotientProvider
  clientOptions={{
    apiKey: 'pk_949bfeff7de899f1b48cd2bf7563fbe4cf25be93',
    baseUrl: 'https://api.staging.getquotient.ai'
  }}
  autoTrackPageViews={true}
>
  {/* Your app components */}
</QuotientProvider>
```

### useQuotient Hook

Access the Quotient client in any component:

```tsx
import { useQuotient } from "@quotientjs/react";

function MyComponent() {
  const { client } = useQuotient();
  
  // Use the client
  const response = await client.auth.whoami({});
}
```

### Automatic Features

- **Session Management**: Sessions are automatically created and managed
- **Device Identification**: Unique device IDs are generated and persisted
- **Page View Tracking**: When enabled, page views are tracked on route changes
- **State Persistence**: Client state is persisted in local storage

## Learn More

- [Quotient Documentation](https://docs.quotient.com)
- [API Reference](https://api.quotient.com/docs)