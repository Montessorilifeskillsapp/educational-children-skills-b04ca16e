# Deployment Guide

## Prerequisites

1. **Supabase Project**: Create a new Supabase project at https://supabase.com
2. **Environment Variables**: Set up your environment variables
3. **Database Setup**: Run the required SQL migrations

## Environment Setup

### 1. Supabase Configuration

Create a new Supabase project and get your credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Database Schema

Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create child_profiles table
CREATE TABLE child_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create progress table
CREATE TABLE progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  last_practiced TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Connect Repository**
   - Link your Git repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Environment Variables**
   - Add your Supabase credentials in Netlify dashboard
   - Go to Site Settings > Environment Variables

3. **Deploy**
   - Push to your main branch to trigger deployment

### Option 2: Vercel

1. **Import Project**
   - Connect your Git repository
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Environment Variables**
   - Add Supabase credentials in project settings

### Option 3: Manual Build

```bash
# Build the project
npm run build

# Upload the dist/ folder to your hosting provider
```

## Post-Deployment Checklist

- [ ] Verify environment variables are set
- [ ] Test authentication flow
- [ ] Check database connections
- [ ] Verify all routes work correctly
- [ ] Test responsive design on mobile
- [ ] Confirm SSL certificate is active

## Troubleshooting

### Common Issues

1. **Build Errors**: Check for missing dependencies
2. **Supabase Connection**: Verify URL and API key
3. **Routing Issues**: Ensure redirects are configured for SPA
4. **Environment Variables**: Check they're properly set in hosting platform

### Support

For deployment issues, check:
- Netlify/Vercel build logs
- Browser console for errors
- Supabase dashboard for API usage