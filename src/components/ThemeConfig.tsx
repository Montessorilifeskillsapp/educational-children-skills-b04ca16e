// Unified theme configuration for consistent styling across all pages
export const montessoriTheme = {
  // Main color palette inspired by Montessori natural materials
  colors: {
    primary: {
      50: '#fef7ed',
      100: '#fdedd3', 
      200: '#fbd9a6',
      300: '#f8c16e',
      400: '#f4a234',
      500: '#f1900d',
      600: '#e27808',
      700: '#bc5d0b',
      800: '#964710',
      900: '#7a3b11',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    }
  },
  
  // Background gradients for different sections
  backgrounds: {
    home: 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50',
    dashboard: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
    skills: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50',
    shop: 'bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50',
    parent: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50',
    profile: 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50'
  },
  
  // Card styling for consistency
  card: {
    base: 'bg-white border-2 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg',
    primary: 'border-amber-200',
    secondary: 'border-green-200', 
    accent: 'border-purple-200',
    success: 'border-green-300 bg-green-50',
    warning: 'border-amber-300 bg-amber-50',
    info: 'border-blue-300 bg-blue-50'
  },
  
  // Button variants
  button: {
    primary: 'bg-amber-600 hover:bg-amber-700 text-white',
    secondary: 'bg-green-600 hover:bg-green-700 text-white',
    accent: 'bg-purple-600 hover:bg-purple-700 text-white',
    outline: 'border-2 border-amber-600 text-amber-700 hover:bg-amber-50'
  },
  
  // Text colors for consistency
  text: {
    primary: 'text-amber-900',
    secondary: 'text-green-800',
    accent: 'text-purple-800',
    muted: 'text-gray-600',
    light: 'text-gray-500'
  }
};

// Helper function to get theme classes
export const getThemeClasses = (section: keyof typeof montessoriTheme.backgrounds) => ({
  background: montessoriTheme.backgrounds[section],
  card: `${montessoriTheme.card.base} ${montessoriTheme.card.primary}`,
  button: montessoriTheme.button.primary,
  text: montessoriTheme.text.primary
});