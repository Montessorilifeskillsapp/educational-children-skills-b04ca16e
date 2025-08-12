import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8014cebf2b954c64aa6cdf0224122d0f',
  appName: 'kid-skill-builder',
  webDir: 'dist',
  server: {
    url: 'https://8014cebf-2b95-4c64-aa6c-df0224122d0f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#10B981',
      showSpinner: false
    }
  }
};

export default config;