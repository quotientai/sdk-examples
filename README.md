# Quotient SDK Examples

This repository contains practical examples demonstrating how to use Quotient SDKs in different contexts.

## Examples

### JavaScript/TypeScript

#### react
**React application with automatic page tracking**
- QuotientProvider setup and useQuotient hook usage
- Automatic page view tracking with React Router
- Beta signup form with people management
- Manual event tracking for form submissions

### Python / Html / Vanilla Js

#### html-cdn-py
**Vanilla HTML with CDN-loaded SDK**
- UMD bundle loaded from unpkg CDN
- Manual page view tracking via dom events
- Form handling with vanilla JavaScript
- Use backend language of your choice

## Quick Start

Each example is self-contained and ready to run:

### React Example
```bash
cd react
pnpm install
pnpm dev
```

### HTML Example

```
cd html-cdn-py
uv sync
./bin/dev.sh
```

## Test Credentials

Both examples come pre-configured with test credentials:
- **API Key**: `pk_949bfeff7de899f1b48cd2bf7563fbe4cf25be93`
- **Base URL**: `https://staging.getquotient.ai`

This is a business the Quotient team maintains for demoing our SDK