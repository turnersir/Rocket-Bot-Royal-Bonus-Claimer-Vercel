import type { NextApiRequest, NextApiResponse } from 'next'
import { listAccounts } from '../../lib/accountsStore'
import { claimBonusForAccount } from '../../lib/rbrClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // This endpoint attempts to claim bonuses for all stored accounts and returns a summary.
  const accounts = listAccounts()
  const results = []
  for (const a of accounts) {
    // For safety, run serially to avoid hammering unknown endpoints.
    // The real integration should handle rate-limits and backoff.
    // We'll call the client and capture the response.
    // eslint-disable-next-line no-await-in-loop
    const r = await claimBonusForAccount(a)
    results.push({ id: a.id, username: a.username, result: r })
  }

  res.status(200).json({ count: accounts.length, results })
}
