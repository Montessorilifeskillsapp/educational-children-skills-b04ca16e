export const COOKIE_SETTINGS_EVENT = 'open-cookie-settings';

/** Opens the Cookie settings dialog from any link or button in the app. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}
