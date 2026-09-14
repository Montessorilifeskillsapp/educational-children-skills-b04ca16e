import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

interface ServiceAccount {
  type: string;
  project_id: string;
  private_key: string;
  client_email: string;
  token_uri: string;
}

function base64UrlEncode(data: ArrayBuffer | string): string {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const keyBody = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  const binaryString = atob(keyBody);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return crypto.subtle.importKey(
    'pkcs8',
    bytes.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: sa.client_email,
    sub: sa.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: sa.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaims = base64UrlEncode(JSON.stringify(claims));
  const signingInput = `${encodedHeader}.${encodedClaims}`;

  const privateKey = await importPrivateKey(sa.private_key);
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${base64UrlEncode(signature)}`;

  const res = await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  if (!data.access_token) {
    throw new Error('No access_token in token response');
  }
  return data.access_token;
}

async function fetchFirestoreVersion(projectId: string, accessToken: string, platform: string): Promise<string | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/config/AppVersion`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Firestore fetch failed: ${res.status} ${err}`);
  }

  const doc = await res.json();
  return doc?.fields?.[platform]?.stringValue ?? null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await req.json().catch(() => ({})) as Record<string, unknown>;
    const platform = String(body.platform ?? '');
    if (!['ios', 'android'].includes(platform)) {
      return json({ error: 'platform must be ios or android' }, 400);
    }

    const raw = Deno.env.get('FIREBASE_SERVICE_ACCOUNT_JSON');
    if (!raw) {
      return json({ error: 'Firebase service account not configured' }, 500);
    }

    let sa: ServiceAccount;
    try {
      sa = JSON.parse(raw);
    } catch {
      return json({ error: 'Invalid Firebase service account JSON' }, 500);
    }

    if (!sa.project_id || !sa.private_key || !sa.client_email) {
      return json({ error: 'Firebase service account is missing required fields' }, 500);
    }

    const accessToken = await getAccessToken(sa);
    const version = await fetchFirestoreVersion(sa.project_id, accessToken, platform);

    return json({ platform, version });
  } catch (err: any) {
    console.error('app-version-check error:', err.message);
    return json({ error: err.message || 'Internal error' }, 500);
  }
});
