# Add password reset

## What's wrong now
There's no way to reset a password anywhere in the app. The sign-in screens have no "Forgot password?" link, and there's no page for choosing a new password. A user who forgets their password is locked out.

## What will change (only these things)
1. **"Forgot password?" link** under the password box on the sign-in page and in the pop-up sign-in window. Clicking it shows one email box and a "Send reset link" button. After it's sent, the user sees: "If an account exists for that email, a reset link is on its way." This message doesn't reveal whether an account exists.
2. **New "Set a new password" page** that opens from the email link. It has a new-password box and a confirm box (at least 6 characters, both must match). When it's saved, the user is signed in and taken to the homepage with a confirmation message. If the link has expired or is invalid, the page says so and offers to send a new one.
3. **Nothing else changes.** No changes to the homepage, navigation, sign-up, Google/Apple sign-in, or styling. The new pieces use the existing card and button styles.

## One thing you need to do
Your login system is hosted on your own external account, so I can't change its settings from here. In your Supabase dashboard, go to Authentication and then URL Configuration. Make sure these addresses are in the allowed redirect list:
- https://montessorilifeskillsapp.com/reset-password
- https://educational-children-skills.lovable.app/reset-password

Otherwise the email link will send people to the wrong place.

## Native apps
The Android and iPhone apps carry their own copy of the site, so they only get the new link in their next store release. In the meantime, the reset email link opens the reset page on the website. That works for any account, so users of the apps can reset their password there right away.

## Technical details
- `useAuth.ts`: add `resetPassword(email)` → `supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://montessorilifeskillsapp.com/reset-password' })` on native and `${window.location.origin}/reset-password` on the web. Expose it through AuthProvider.
- `AuthPage.tsx` and `AuthModal.tsx`: add a forgot-password mode to each form.
- New `src/pages/ResetPasswordPage.tsx`, added as a public `/reset-password` route in `App.tsx`. It listens for the `PASSWORD_RECOVERY` event (or `type=recovery` in the link) and then calls `supabase.auth.updateUser({ password })` with no current password.
- Verify by sending a real reset email in the preview, setting a new password, and signing in with it. Then run the typecheck and all tests.
