This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

--

Deployment checklist for Vercel

- 1) Build succeeds locally: `npm run build` — confirmed
- 2) Add secrets / environment variables on Vercel:
	- Set `GS1_API_KEY` in your Vercel Project → Settings → Environment Variables (do not put secrets into source code)
- 3) Connect this repository on Vercel (via the Vercel dashboard) and deploy — Vercel will auto-detect Next.js settings.
- 4) If you want predictable Node version, set an `engines` field in `package.json` or configure the Runtime in Vercel project settings.

Important note about the API key

The project includes `app/api/vbg-lookup/route.js` which reads `process.env.GS1_API_KEY`. For safety: remove any hard-coded keys from `route.js` and use `GS1_API_KEY` from the environment. The repository now contains a `.env.example` to show required variables.

If you'd like, I can create a small `vercel.json` with redirects or runtime options — say the word and I'll add it.
