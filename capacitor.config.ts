import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.montessorilifeskills.app',
  appName: 'educational-children-skills',
  webDir: 'dist',
  bundledWebRuntime: false,
  // server block removed for production - app uses bundled files from dist/
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#F6F2E9',
      showSpinner: true,
      spinnerColor: '#6FB7B3',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      iosSpinnerStyle: 'small'
    },
    StatusBar: {
      backgroundColor: '#F6F2E9',
      style: 'DARK',
      overlaysWebView: false
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true
    }
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  }
};

export default config;
