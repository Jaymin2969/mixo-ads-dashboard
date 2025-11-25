# Deployment Guide

## Deploy to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project and deploy.

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit: Mixo Ads Dashboard"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

The dashboard will be live at a URL like: `https://mixo-ads-dashboard.vercel.app`

## Environment Variables

No environment variables are required for this project. The API base URL is hardcoded in `lib/api.ts`.

## Post-Deployment

After deployment, verify:
- ✅ Dashboard loads successfully
- ✅ Campaign data is displayed
- ✅ Filters and sorting work
- ✅ Charts render correctly
- ✅ Responsive design works on mobile

## Troubleshooting

If the API fails to load:
- Check that `https://mixo-fe-backend-task.vercel.app` is accessible
- Verify CORS settings on the backend
- Check browser console for errors

