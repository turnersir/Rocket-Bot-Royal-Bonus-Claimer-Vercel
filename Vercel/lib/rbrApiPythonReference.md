# Reference: bonus-collector Python logic (summary)

## Login
POST https://rocketbotroyale.game/api/auth/login
- body: { username, password }
- returns: { token, user_id, username, expires }

## Claim
POST https://rocketbotroyale.game/api/bonus/claim
- headers: { Authorization: Bearer <token> }
- returns: { ok: true, reward: {...} } or { ok: false, error: ... }

## Flow
- For each account:
  - If only token is present, use it
  - If username/password, login to get token
  - Use token to POST to /bonus/claim
  - Handle errors (invalid token, login failed, already claimed, etc)

## Error handling
- If login fails, report error
- If claim fails, report error
- If already claimed, report as such

## Notes
- The Python script supports both username/password and token
- The claim endpoint requires a valid token
