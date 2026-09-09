# Reposition the homepage: a tool for the adult, not an app for the child

## The problem

Visitors assume the app is something you hand to a child to keep them busy or let them self-learn. The current copy feeds that: a "One app. Two experiences" section describes a "calm place to work — for the child" inside the app, implying the child is a user. Nothing states plainly that the adult is the user and the app is their teaching guide.

## The message shift

One idea, stated early and repeated: **this app is for you — the parent, teacher or caregiver. It gives you the exact presentation to guide your child, then the screen goes away.** The child never uses the app; they use real materials with you.

## Proposed homepage changes (copy and layout, no new features)

1. **New hero statement.** Replace the current headline/subline with adult-facing wording, e.g.:
   - Headline: "You guide. They grow."
   - Subline: "Step-by-step AMI Montessori presentations for parents, teachers and caregivers — so you can confidently teach your child real skills with real materials. The child never uses the app."
   - Keep the existing CTA buttons and trust marks.
2. **A short "how it actually works" strip** directly under the hero, three steps in plain words: *You read the presentation → You set it up on a tray → You show your child — hands-on, off-screen.* This kills the screen-time assumption where it forms.
3. **Rewrite the "Two experiences" section** into a single-adult message: "Built for the adult. Designed around the child." Explain briefly that everything in the app is prepared for the adult's eye, and the activities themselves happen away from the screen. Remove the "For the child" card that describes in-app use by children.
4. **Explicit audience line** in the intro: "Made for parents, homeschoolers, teachers, assistants and caregivers — no Montessori training required."
5. **Adjust supporting copy** where it currently implies child-facing app use (phrases like "your child chooses work" inside the app flow, "distraction-free activity pages for the child"). Any wording that suggests the child interacts with the app gets rephrased to adult-guided language.
6. **FAQ addition**: "Does my child use this app?" — answered plainly: no; it is a guide for the adult, activities happen with real materials.
7. **Testimonials/role labels** stay, since they already name the adult (parent, educator, teacher).

## What does not change

- Colours, fonts, imagery, pricing, curriculum areas, navigation and page structure stay as they are.
- No changes to activity pages, the dashboard, or anything behind sign-in.
- The video archive work is unaffected.

## Build order

1. Rewrite hero headline/subline and the three-step strip.
2. Replace the "Two experiences" section with the single-adult section.
3. Sweep the remaining homepage copy for child-as-user phrasing and fix each instance.
4. Add the FAQ entry.
5. Visual check of the page and a typecheck.

## Technical notes

- All edits confined to `src/components/Home.tsx` (and its `HeroAppPreview` only if its captions imply child use).
- Alt text and SEO description updated to match the adult-tool positioning.
- Before publishing, worth re-reading the home meta description in `index.html` / `useSEO` so search results carry the same message.
