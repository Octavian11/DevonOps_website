# DevonOps Website

Three-path microsite structure for devonshireops.com:

| Path | Content |
|------|--------|
| `devonshireops.com` | "You are not authorized to view this page" |
| `devonshireops.com/pe` | Full PE microsite (portfolio operations) |
| `devonshireops.com/msp` | "Coming Soon" |
| `devonshireops.com/markets` | "Coming Soon" |

## Deploy to Vercel with custom domain

1. Push this repo and connect it to Vercel (or use the existing Vercel project).
2. In Vercel: **Project Settings → Domains** → add **devonshireops.com**.
3. Add the root domain and (if desired) `www.devonshireops.com`; Vercel will serve the same app.
4. Deploy; the `vercel.json` rewrites ensure all paths are handled by the SPA.
