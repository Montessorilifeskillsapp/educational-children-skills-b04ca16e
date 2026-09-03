import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3';

const UpsertSchema = z.object({
  action: z.literal('upsert'),
  material_key: z.string().min(1).max(255),
  display_name: z.string().max(255),
  amazon_url: z.string().max(2048),
  notes: z.string().max(1024),
  active: z.boolean(),
});

const DeleteSchema = z.object({
  action: z.literal('delete'),
  material_key: z.string().min(1).max(255),
});

const BodySchema = z.union([UpsertSchema, DeleteSchema]);

function urlHasTag(url: string, tag: string) {
  try {
    const u = new URL(url);
    return u.searchParams.get('tag') === tag;
  } catch {
    return false;
  }
}

export default {
  async fetch(req: Request) {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      });
    }

    try {
      const authHeader = req.headers.get('Authorization');
      const apiKey = req.headers.get('apikey');
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        });
      }

      const body = await req.json().catch(() => ({}));
      const parsed = BodySchema.safeParse(body);
      if (!parsed.success) {
        return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
        { auth: { persistSession: false } }
      );

      const jwt = authHeader.replace(/^Bearer\s+/, '');
      const { data: userData, error: verifyError } = await supabaseAdmin.auth.getUser(jwt);
      if (verifyError || !userData.user) {
        return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        });
      }

      const userId = userData.user.id;
      const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc('has_role', {
        _user_id: userId,
        _role: 'admin',
      });

      if (roleError) {
        return new Response(JSON.stringify({ error: 'Role check failed' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        });
      }

      if (!isAdmin) {
        return new Response(JSON.stringify({ error: 'Forbidden: admin role required' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        });
      }

      const action = parsed.data.action;

      if (action === 'delete') {
        const { error } = await supabaseAdmin
          .from('material_links')
          .delete()
          .eq('material_key', parsed.data.material_key);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      }

      const { material_key, display_name, amazon_url, notes, active } = parsed.data;
      const normalizedKey = material_key.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

      const url = amazon_url.trim();
      const affiliateTag = 'kerryhoward-20';
      if (url && url.includes('amazon') && urlHasTag(url, affiliateTag)) {
        return new Response(JSON.stringify({ error: 'URL must not include an affiliate tag' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      const { error } = await supabaseAdmin.from('material_links').upsert(
        {
          material_key: normalizedKey,
          display_name: display_name.trim(),
          amazon_url: url,
          notes: notes.trim(),
          active,
        },
        { onConflict: 'material_key' }
      );

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  },
};
