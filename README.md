# Mixo Ads - Campaign Dashboard

A functional campaign monitoring dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Summary Cards**: Overview of total campaigns, active campaigns, budgets, and daily spending
- **Status Distribution Chart**: Visual representation of campaign status (active, paused, completed)
- **Platform Distribution Chart**: Breakdown of campaigns by advertising platform
- **Campaign Table**: Sortable and filterable table with all campaign details
  - Filter by status (all, active, paused, completed)
  - Sort by name, budget, or creation date
  - Responsive design for mobile and desktop

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Server Components** - Efficient data fetching and rendering

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## API Integration

The dashboard connects to the Mixo Ads backend API:
- Base URL: `https://mixo-fe-backend-task.vercel.app/`
- Endpoints:
  - `GET /campaigns` - Fetch all campaigns
  - `GET /campaigns?status={status}` - Filter campaigns by status
  - `GET /campaigns/{id}` - Fetch single campaign details

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically

The app uses dynamic rendering to fetch fresh data from the API on each request.

## Project Structure

```
mixo-ads-dashboard/
├── app/
│   ├── layout.tsx       # Root layout
│   └── page.tsx          # Main dashboard page
├── components/
│   ├── CampaignTable.tsx # Campaign data table
│   ├── PlatformChart.tsx # Platform distribution chart
│   ├── StatusChart.tsx   # Status distribution chart
│   └── SummaryCard.tsx   # Summary metric cards
├── lib/
│   └── api.ts            # API client functions
└── types/
    └── campaign.ts       # TypeScript type definitions
```

## License

Built for Mixo Ads Frontend Engineer Challenge.
# mixo-ads-dashboard
