import type { NextApiRequest, NextApiResponse } from 'next'
import { listAccounts, addAccount, removeAccount } from '../../lib/accountsStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(listAccounts())
  }

  if (req.method === 'POST') {
    const { username, apiKey } = req.body
    if (!username) {
      return res.status(400).json({ error: 'username required' })
    }
    const acc = addAccount({ username, apiKey })
    return res.status(201).json(acc)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'id required' })
    }
    removeAccount(id)
    return res.status(204).end()
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
  res.status(405).end('Method Not Allowed')
}
