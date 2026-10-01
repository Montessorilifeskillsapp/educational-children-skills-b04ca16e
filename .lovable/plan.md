# Walk through the add-child flow end to end

## Goal
Confirm the whole "add a child" experience works as built, in the live preview, with a real signed-in account — not just in code.

## Why a test account is needed
This project uses your own external Supabase, so I cannot mint a session for an existing member. The walkthrough therefore creates a fresh test account through the app's own signup form. It writes only to the new account (one or two test children), and I will give you its email afterwards so you can remove it from Supabase Auth → Users whenever you like.

## Steps
1. **Sign up** in the preview with a clearly labelled test email (e.g. `walkthrough-test@montessorilifeskills.com`) and confirm the signed-in state.
2. **Free-plan view** — check the coverage panel says the free plan includes one child.
3. **Add the first child** — create a child profile and confirm it is covered and appears on the Family Dashboard.
4. **Try a second child** — attempt to add another profile and confirm the app blocks it with the "Needs a child add-on" message while keeping the child's spot safe.
5. **Manage Child Profiles** — confirm the "$24.99/month" add-child card, then click "Add a child" and confirm it opens the website checkout for the add-on. I will cancel there — no payment is made.
6. **Report back** — screenshots of each step plus anything that does not match what was agreed.

## What this does not cover
- A real $24.99 charge (deliberately not completed).
- The iPhone/Android apps — that needs a store build; the web checkout path is what app members are directed to.

## If something fails
I will diagnose and fix it in the same session, then re-run the failing step to confirm.
