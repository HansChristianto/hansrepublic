# Hans Republic Corporate Portfolio

Corporate website for Hans Republic showcasing multiple digital brands with a monitoring dashboard.

## Features

- **Homepage** - Hero section with brand showcase
- **Brands Listing** - Search and filter brands by service category
- **Brand Detail Pages** - Individual brand pages with services and links
- **Monitoring Dashboard** - Real-time status of all digital properties
- **Webhook API** - UptimeRobot integration for automated status updates

## Tech Stack

- [SvelteKit 2.x](https://kit.svelte.dev/) with [Svelte 5](https://svelte.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) with `@theme` directive
- TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) in your browser.

## Project Structure

```
src/
├── app.css                    # Global styles with Tailwind v4 @theme
├── lib/
│   ├── components/           # UI components
│   │   ├── ui/              # Button, Card, Badge, Section
│   │   ├── layout/          # Header, Footer
│   │   └── brands/          # BrandCard, BrandList
│   ├── data/                 # JSON/YAML configuration
│   │   ├── brands.json       # Brand data
│   │   └── properties.yaml   # Monitoring properties
│   └── types.ts              # TypeScript definitions
└── routes/
    ├── +page.svelte         # Homepage
    ├── brands/               # Brand listing & detail
    ├── monitoring/           # Monitoring dashboard
    └── api/monitoring/      # Webhook endpoint
```

## Adding a Brand

Edit `src/lib/data/brands.json`:

```json
{
  "brands": [
    {
      "id": "new-brand",
      "name": "New Brand",
      "tagline": "What we do",
      "description": "Full description...",
      "image": "https://example.com/image.jpg",
      "services": ["web-development"],
      "websiteUrl": "https://newbrand.com",
      "order": 6
    }
  ]
}
```

## Monitoring Webhook Setup

1. Deploy the app
2. Configure UptimeRobot webhooks:
   - URL: `https://your-domain.com/api/monitoring`
   - Format: JSON

## Building

```bash
npm run build
```

The output will be in the `build/` directory.
