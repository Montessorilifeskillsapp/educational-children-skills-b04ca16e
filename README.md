# Montessori Learning App

A comprehensive React-based Montessori learning platform with skill tracking, progress analytics, and premium features.

## Features

- **Skill Categories**: Math, Language, Practical Life, Sensorial, Art, Geography, Botany, Grace & Courtesy
- **Progress Tracking**: Child profiles with detailed progress analytics
- **Premium Features**: Advanced materials, reports, and educator communication
- **E-commerce**: Shop for Montessori materials and bundles
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: React Context + TanStack Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd montessori-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Update .env with your Supabase credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts for state management
├── data/              # Static data and skill definitions
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── pages/             # Route components
└── types/             # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The app is configured for Netlify deployment with:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects for SPA routing configured in `netlify.toml`

## License

Private - All rights reserved