// Unified theme configuration for consistent styling across all pages
// Aligned with the Montessori palette: turquoise, cream, sage, gold, wood brown
export const montessoriTheme = {
  // Main color palette inspired by Montessori natural materials
  colors: {
    primary: {
      50: '#f0f7f7',
      100: '#d9edec',
      200: '#b3dbd9',
      300: '#8cc9c6',
      400: '#6FB7B3',
      500: '#52a39e',
      600: '#418a86',
      700: '#35706d',
      800: '#2d5b58',
      900: '#254a48',
    },
    secondary: {
      50: '#f2f5f3',
      100: '#e0e7e3',
      200: '#c1d0c7',
      300: '#9fb8a9',
      400: '#5F7F6E',
      500: '#4a6655',
      600: '#3d5447',
      700: '#33453b',
      800: '#2b3831',
      900: '#242e28',
    },
    accent: {
      50: '#fbf8ed',
      100: '#f5efd0',
      200: '#ece0ab',
      300: '#e2d086',
      400: '#E6C567',
      500: '#dcb84a',
      600: '#c9a23a',
      700: '#a58430',
      800: '#856a2c',
      900: '#6e5528',
    }
  },

  // Background gradients for different sections
  backgrounds: {
    home: 'bg-gradient-to-br from-background via-background to-muted',
    dashboard: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
    skills: 'bg-gradient-to-br from-background via-background to-muted',
    shop: 'bg-gradient-to-br from-accent/15 via-background to-accent/10',
    parent: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
    profile: 'bg-gradient-to-br from-background via-background to-muted',
    practical: 'bg-gradient-to-br from-secondary/10 via-background to-accent/10',
    sensorial: 'bg-gradient-to-br from-primary/10 via-background to-accent/10',
    math: 'bg-gradient-to-br from-accent/10 via-background to-primary/10',
    geography: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
    botany: 'bg-gradient-to-br from-secondary/10 via-background to-primary/10',
    art: 'bg-gradient-to-br from-accent/10 via-background to-secondary/10',
    cultural: 'bg-gradient-to-br from-primary/10 via-background to-accent/10'
  },

  // Card styling for consistency
  card: {
    base: 'bg-card border-2 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg',
    primary: 'border-primary/30',
    secondary: 'border-secondary/30',
    accent: 'border-accent/30',
    success: 'border-secondary/40 bg-secondary/10',
    warning: 'border-accent/40 bg-accent/10',
    info: 'border-primary/40 bg-primary/10'
  },

  // Button variants
  button: {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    accent: 'bg-accent hover:bg-accent/90 text-accent-foreground',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10'
  },

  // Text colors for consistency
  text: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    muted: 'text-muted-foreground',
    light: 'text-muted-foreground/70'
  }
};

// Helper function to get theme classes
export const getThemeClasses = (section: keyof typeof montessoriTheme.backgrounds) => ({
  background: montessoriTheme.backgrounds[section],
  card: `${montessoriTheme.card.base} ${montessoriTheme.card.primary}`,
  button: montessoriTheme.button.primary,
  text: montessoriTheme.text.primary
});
