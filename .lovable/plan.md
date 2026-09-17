# Stabilize and protect the app

## Goal
Lock in the current working state and change how changes are made, so nothing is damaged by fast, unrequested edits.

## Current state (verified live)
- Classroom Setup page shows the full 22-item "Furniture and essentials" list.
- Saved Amazon links resolve and show "Buy" for: child-sized chair, child-sized table, low open shelving, work mat, tray, basket, apron, watering can (9 links total on the page).
- The remaining 14 items show "Use what you have" until links are added in Materials admin → Classroom Setup.
- 51 tests and typecheck were passing before this session's list edits; the restored list file matches the earlier verified version.

## What this plan does
1. **Re-verify the app right now** — run typecheck and the full test suite against the current files to confirm the restored classroom list and everything around it is green. No code changes.
2. **Freeze the classroom basics list** at the current 22 items. No further trimming, renaming, or regrouping without an explicit request.
3. **Change-only-what's-asked rule** — from here on, each request gets the smallest possible edit; no side "improvements", no cleanup, no refactors unless you ask.
4. **Verify before reporting** — every future change is confirmed with tests and a live page check before it's described as done.
5. **Anything touching several pages, shared data files, or images gets a written plan first** for your approval before any edit.

## Technical details
- Checks: `bunx tsgo --noEmit`, `bunx vitest run` (51 tests), and a live Playwright pass over `/classroom-setup`.
- Files confirmed unchanged by this plan: everything except nothing — this plan runs checks only.

## Out of scope
- No changes to content, images, links, navigation, or any other page.
