# Quotient SDK Examples

This repository contains practical examples demonstrating how to use Quotient SDKs in different contexts.

## Examples

### JavaScript/TypeScript

#### react-basic
**React application with automatic page tracking**
- QuotientProvider setup and useQuotient hook usage
- Automatic page view tracking with React Router
- Beta signup form with people management
- Manual event tracking for form submissions

#### html-cdn
**Vanilla HTML with CDN-loaded SDK**
- UMD bundle loaded from unpkg CDN
- Manual page view tracking in single-page app
- Form handling with vanilla JavaScript
- No build tools required

## Quick Start

Each example is self-contained and ready to run:

### React Example
```bash
cd javascript/react-basic
npm install
npm run dev
```

### HTML Example
Simply open `javascript/html-cdn/index.html` in your browser, or serve with:
```bash
cd javascript/html-cdn
python -m http.server 8000  # or npx http-server
```

## Test Credentials

Both examples come pre-configured with test credentials:
- **API Key**: `pk_949bfeff7de899f1b48cd2bf7563fbe4cf25be93`
- **Base URL**: `https://api.staging.getquotient.ai`

## Key Features Demonstrated

- **Client Initialization**: Setting up Quotient with API key
- **Automatic Page Tracking**: React Router integration (react-basic)
- **Manual Page Tracking**: Custom implementation (html-cdn)
- **Event Tracking**: Form submissions and custom events
- **People Management**: Adding users to waitlists
- **Error Handling**: User-friendly error messages

## Use Cases

- **react-basic**: Best for React applications that want automatic analytics
- **html-cdn**: Perfect for simple websites, prototypes, or adding analytics to existing sites

## Directory Structure

```
examples/
└── javascript/
    ├── react-basic/     # React + @quotientjs/react
    └── html-cdn/        # Vanilla HTML + @quotientjs/client via CDN
```

## Contributing

To add a new example:
1. Create a new directory under the appropriate language folder
2. Include a README.md explaining the use case and setup
3. Use published SDK packages (not workspace dependencies)
4. Include working test credentials

## License

MIT# sdk-examples
