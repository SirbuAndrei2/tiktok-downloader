# TokDown

TikTok (and Instagram, Facebook, X) video downloader: [tokdown.org](https://tokdown.org).

- Next.js 16 (App Router, next-intl) built with OpenNext and served by the `tiktok-downloader` Cloudflare Worker.
- Every page is prerendered into the static-assets cache, so the Worker stays inside the 10 ms CPU budget of the Workers Free plan.
- `www.tokdown.org` is a separate 301 Worker in `www-redirect/`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build:cf   # OpenNext build → .open-next/
npm run deploy     # build:cf + deploy from this machine
```

Every push to `main` builds and deploys through Cloudflare Workers Builds. See `CLAUDE.md` for architecture, ads and deploy details.
