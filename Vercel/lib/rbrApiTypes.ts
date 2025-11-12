// Types for Rocket Bot Royale API (ported from bonus-collector)
export type RBRLoginResponse = {
  token: string
  user_id: string
  username: string
  expires: number
}

export type RBRClaimResponse = {
  ok: boolean
  reward?: any
  error?: string
}
