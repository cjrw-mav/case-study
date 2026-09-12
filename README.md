# Nourish Care — Operations Director case study

First iteration of an interactive interview presentation. Includes ten scenes, presentation/explore modes, keyboard navigation, flashcards, scaling milestones, diagnostic lenses, assumptions, operating-model diagrams and experience placeholders.

## Run locally

Use Node.js 22.12+ and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Verify and build

```sh
pnpm lint
node check-content.mjs
pnpm build
pnpm preview
```

The deployable static output is `dist/`. No backend, credentials, remote fonts or external APIs are needed at runtime. Host at the root of a domain; this initial build does not configure a GitHub Pages subdirectory. Hosting and access control remain to be configured before sharing with the panel. `noindex` is not access control.

## Content boundary

`BUILD_BRIEF.md` is the exact supplied brief. `src/content/caseStudy.ts` extracts its narrative into structured objects; all substantive content originates there. `check-content.mjs` checks required datasets and that extracted narrative exists verbatim in the brief. Preserve the source headings or update the extraction and checks together.

Career stories, numeric AI results, later scaling signals and supporting evidence remain placeholders. Prioritisation sliders work as controls, but ranking is intentionally deferred: the brief supplies initiative names, not scores. Nothing is presented as an actual Nourish priority ranking.

`public/narrative.html` is a JavaScript-free copy of the supplied brief, including build instructions. Keep it in sync when the brief changes. It is a resilience fallback, not the final panel leave-behind.

## Interactions

- Left navigation, Previous/Next and left/right arrow keys move between scenes.
- Arrow keys stay with native inputs and do not navigate while a modal is open.
- Presentation and Explore share one URL; `?mode=explore#diagnosis` is a deep link.
- Escape closes dialogs; focus returns to their opening control.
- Explore reveals additional notes and expandable content.
- Responsive layouts allow scrolling on smaller displays; core desktop scenes target 1280×720 and larger.

## Next iteration

Review the architecture and interaction flow before visual polish. Supply final flashcard stories, the AI example and results, experience evidence, missing milestone signals, assumption validation and approved initiative scores. Then configure private preview hosting and test the final content in Chrome and Safari before the live session.

## Visual direction

The live Nourish site was inspected for warm, people-centred visual cues. This iteration retains the brief's working palette, uses local system fonts and original CSS shapes, and does not copy proprietary assets or claim exact brand matching.
