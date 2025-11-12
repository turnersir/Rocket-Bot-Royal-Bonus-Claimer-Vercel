
import axios from 'axios'
import type { Account } from './accountsStore'
import type { RBRLoginResponse, RBRClaimResponse } from './rbrApiTypes'

const BASE = process.env.RBR_BASE_URL || 'https://rocketbotroyale.game/api'

async function login(username: string, password: string): Promise<RBRLoginResponse> {
  const url = `${BASE}/auth/login`
  const res = await axios.post(url, { username, password })
  return res.data
}

export async function claimBonusForAccount(account: Account): Promise<RBRClaimResponse & { login?: any }> {
  let token = account.apiKey // treat apiKey as token if present
  let loginResult = undefined

  // If no token, try to login (assume password is stored in apiKey for now)
  if (!token && account.username && account.apiKey) {
    try {
      loginResult = await login(account.username, account.apiKey)
      token = loginResult.token
    } catch (err: any) {
      return { ok: false, error: 'Login failed: ' + (err?.response?.data?.error || err?.message || String(err)), login: err?.response?.data }
    }
  }

  if (!token) {
    return { ok: false, error: 'No token or password provided' }
  }

  // Claim bonus
  try {
    const url = `${BASE}/bonus/claim`
    const res = await axios.post(url, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.data && res.data.ok) {
      return { ok: true, reward: res.data.reward, login: loginResult }
    } else {
      return { ok: false, error: res.data?.error || 'Unknown error', login: loginResult }
    }
  } catch (err: any) {
    return { ok: false, error: err?.response?.data?.error || err?.message || String(err), login: loginResult }
  }
}
