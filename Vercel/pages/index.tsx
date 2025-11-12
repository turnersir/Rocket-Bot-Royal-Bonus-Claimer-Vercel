import React, { useEffect, useState } from 'react'

type Account = {
  id: string
  username: string
  apiKey?: string
}

export default function Home() {
  const [username, setUsername] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then(setAccounts)
  }, [])

  async function addAccount(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, apiKey }),
      })
      if (res.ok) {
        const a = await res.json()
        setAccounts((s) => [...s, a])
        setUsername('')
        setApiKey('')
      } else {
        console.error('Failed to add')
      }
    } finally {
      setLoading(false)
    }
  }

  async function remove(id: string) {
    setLoading(true)
    try {
      await fetch(`/api/accounts?id=${id}`, { method: 'DELETE' })
      setAccounts((s) => s.filter((x) => x.id !== id))
    } finally {
      setLoading(false)
    }
  }

  async function claimNow() {
    setLoading(true)
    try {
      const res = await fetch('/api/claim')
      const j = await res.json()
      alert(`Claimed for ${j.count} accounts. Check console for details.`)
      console.log(j)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Varcel Rocket Bot Royale Bonus Claimer</h1>

      <section style={{ marginBottom: 20 }}>
        <form onSubmit={addAccount}>
          <div>
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>API Key (optional)</label>
            <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </div>
          <button type="submit" disabled={loading}>Add account</button>
        </form>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>Accounts</h2>
        <ul>
          {accounts.map((a) => (
            <li key={a.id}>
              {a.username} <button onClick={() => remove(a.id)} disabled={loading}>Remove</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <button onClick={claimNow} disabled={loading}>Run claim now</button>
        <p style={{ marginTop: 8 }}>Tip: Set up a Vercel Cron job to call <code>/api/claim</code> every 5 minutes.</p>
      </section>
    </main>
  )
}
