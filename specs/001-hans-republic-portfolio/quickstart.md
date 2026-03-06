# Quickstart Guide: Hans Republic Portfolio

**Date**: 2026-03-06 | **Branch**: 001-hans-republic-portfolio

## Prerequisites

- Node.js 18.x or later
- npm or pnpm
- Git

## Setup

### 1. Clone and Install

```bash
git clone https://github.com/hansrepublic/hansrepublic.git
cd hansrepublic
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```bash
# Required: Monitoring dashboard credentials
MONITORING_USERNAME=admin
MONITORING_PASSWORD=your-secure-password

# Optional: UptimeRobot API (for production monitoring)
UPTIME_ROBOT_API_KEY=your-api-key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) in your browser.

## Project Structure

```
hansrepublic/
├── src/
│   ├── app.css                    # Global styles with Tailwind CSS v4
│   ├── app.html                  # HTML template
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/              # Base UI (Button, Card, Badge, Section)
│   │   │   ├── layout/          # Header, Footer
│   │   │   └── brands/          # Brand components
│   │   ├── config.ts            # Data loading utilities
│   │   ├── types.ts             # TypeScript type definitions
│   │   └── data/
│   │       ├── brands.json       # Brand data
│   │       └── properties.yaml   # Digital properties
│   └── routes/
│       ├── +layout.svelte       # Root layout
│       ├── +page.svelte         # Homepage
│       ├── +page.server.ts      # Homepage data loader
│       ├── brands/
│       │   ├── +page.svelte    # Brands listing
│       │   ├── +page.server.ts # Brands data loader
│       │   └── [slug]/
│       │       ├── +page.svelte    # Brand detail
│       │       └── +page.server.ts # Brand detail data loader
│       └── monitoring/
│           ├── +page.svelte    # Monitoring dashboard
│           └── +page.server.ts # Monitoring data loader
├── vite.config.ts               # Vite config with Tailwind v4
├── tailwind.config.js           # Tailwind v3 config (legacy, not used)
├── svelte.config.js             # SvelteKit config
└── package.json
```

## Adding a New Brand

1. Edit `src/lib/data/brands.json`:

```json
{
  "brands": [
    {
      "id": "new-brand",
      "name": "New Brand",
      "tagline": "What we do",
      "description": "Full description here...",
      "image": "https://example.com/image.jpg",
      "services": ["web-development"],
      "websiteUrl": "https://newbrand.com",
      "order": 6
    }
  ]
}
```

2. Restart dev server (if running)

## Adding a Monitored Property

Edit `src/lib/data/properties.yaml`:

```yaml
properties:
  - id: newbrand-main
    brandId: new-brand
    name: New Brand Website
    url: https://newbrand.com
    type: website
    status: online
    lastChecked: "2026-03-06T00:00:00Z"
    responseTime: 150
    isPublic: true
```

## Monitoring Dashboard

Access at `/monitoring` (requires credentials set in `.env`)

The dashboard shows:

- All monitored properties with status
- Response times
- Last check timestamps
- Auto-refresh every 5 minutes

### Webhook Integration (UptimeRobot)

The monitoring dashboard supports UptimeRobot webhook integration. To configure:

1. **Get your webhook URL**:
   ```
   https://your-domain.com/api/monitoring
   ```

2. **Configure UptimeRobot**:
   - Go to UptimeRobot Dashboard → My Settings → Webhooks
   - Add webhook URL
   - Set webhook format to JSON

3. **Webhook payload format**:
   ```json
   {
     "monitor": {
       "url": "https://example.com",
       "status": "1",
       "response_time": "150",
       "lastcheck": "2026-03-06T12:00:00Z"
     }
   }
   ```

4. **Status mapping**:
   - `"0"` = offline
   - `"1"` = online
   - `"2"` or `"9"` = unknown

### API Endpoints

- `GET /api/monitoring` - Get all properties
- `POST /api/monitoring` - Update property status via webhook

## Building for Production

```bash
npm run build
```

The output is in `build/` directory with Node.js adapter.

## Running Production Build

```bash
node build/index.js
```

Or use a hosting provider that supports Node.js adapters (Vercel, Netlify, Railway, etc.)

## Design System

The UI follows the design system defined in `plans/ui-ux-design-system.md`:

- **Colors**: Primary `#0071e3`, Grays, Accents
- **Typography**: System fonts, fluid sizing with `clamp()`
- **Components**: Pill-shaped buttons, cards with hover effects
- **Tailwind CSS v4**: Uses `@theme` directive in `src/app.css`

## Troubleshooting

### Page not found after adding brand

- Ensure `id` in brands.json matches the URL slug
- Restart development server

### Monitoring shows "Unknown" status

- Check that the URL in properties.yaml is accessible
- Verify UptimeRobot API key is set (production)

### Authentication fails

- Verify credentials in `.env`
- Restart dev server after changing `.env`
