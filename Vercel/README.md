# Varcel Rocket Bot Royale Bonus Claimer

This is a minimal Next.js + TypeScript app intended for Vercel.

Features
- Add Rocket Bot Royale accounts (username + optional apiKey)
- /api/claim endpoint to attempt claiming bonuses for all accounts
- Simple UI to add/remove accounts and trigger a claim manually

Usage
1. Install dependencies:

```bash
npm install
```

2. Run locally:

```bash
npm run dev
```

3. Deploy to Vercel. To run the /api/claim endpoint every 5 minutes, create a Vercel Cron Job that calls:

```
https://<your-deployment>.vercel.app/api/claim
```

Notes and next steps
- This uses an on-disk `.accounts.json` for persistence during development. For production use, switch to a database.
- The Rocket Bot Royale API client is a placeholder. Check https://github.com/rocket-bot-royale for the real API endpoints and authentication.
- Ensure you follow TOS and rate limits when automating claims.
