// Sends push notifications through Firebase Cloud Messaging (HTTP v1) using the
// FIREBASE_SERVICE_ACCOUNT_JSON secret. Stale tokens are deleted.
import { SignJWT, importPKCS8 } from 'npm:jose@5.9.6'

let cached: { token: string; exp: number; projectId: string } | null = null

async function getAccess(): Promise<{ token: string; projectId: string } | null> {
  const raw = Deno.env.get('FIREBASE_SERVICE_ACCOUNT_JSON')
  if (!raw) return null
  if (cached && cached.exp > Date.now() + 60_000) return cached
  const sa = JSON.parse(raw)
  const key = await importPKCS8(sa.private_key, 'RS256')
  const now = Math.floor(Date.now() / 1000)
  const jwt = await new SignJWT({ scope: 'https://www.googleapis.com/auth/firebase.messaging' })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(sa.client_email)
    .setAudience('https://oauth2.googleapis.com/token')
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key)
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  })
  if (!res.ok) {
    console.error('FCM auth failed', res.status, await res.text())
    return null
  }
  const j = await res.json()
  cached = { token: j.access_token, exp: Date.now() + j.expires_in * 1000, projectId: sa.project_id }
  return cached
}

// deno-lint-ignore no-explicit-any
export async function sendPushToUser(admin: any, userId: string, title: string, body: string, path = '/') {
  const { data: tokens } = await admin.from('push_tokens').select('token').eq('user_id', userId)
  if (!tokens?.length) return 0
  const access = await getAccess()
  if (!access) return 0
  let sent = 0
  for (const { token } of tokens) {
    const res = await fetch(`https://fcm.googleapis.com/v1/projects/${access.projectId}/messages:send`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${access.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: { token, notification: { title, body }, data: { path } } }),
    })
    if (res.ok) { sent++; continue }
    const txt = await res.text()
    if (res.status === 404 || (res.status === 400 && txt.includes('INVALID_ARGUMENT')) || txt.includes('UNREGISTERED')) {
      await admin.from('push_tokens').delete().eq('token', token)
    } else {
      console.error('FCM send failed', res.status, txt)
    }
  }
  return sent
}
