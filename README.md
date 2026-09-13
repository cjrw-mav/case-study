# Nourish Operations case study

**Live site:** [https://cjrw-mav.github.io/case-study/](https://cjrw-mav.github.io/case-study/)

A standalone static conversion of the supplied v7 interview case study. All ten sections, copy, chart geometry and original interactions are preserved. No build command, installation, server or external runtime dependency is required.

## Files

- `nourish_v7_reference.html`: unchanged canonical source. Keep it immutable; it is not loaded by the site. Its original embedding environment supplied utility styles, so opening this reference alone does not reproduce those host styles.
- `index.html`: persistent page shell, navigation and footer containers; loads three local files using relative paths.
- `styles.css`: all page styling, including native replacements for the original host utility styles.
- `content.js`: `window.CASE_STUDY`, containing all scene copy and HTML, navigation labels, inline SVGs, detail-panel templates and data arrays.
- `app.js`: renders the content and handles scene navigation, scaling milestones, diagnostic lenses and leverage-map selection.

## Run locally

Open `index.html` in a browser. Keep all files together. No internet connection or local server is needed. Use the sidebar or Previous/Next buttons. Left/right arrow keys navigate when focus is within the application, as in v7. Click scaling milestones, diagnostic lenses or leverage bubbles to see their detail.

## Edit content

Edit `content.js`, save, then reload the page. `scenes` holds each section’s navigation label and preserved HTML. `scalingStages`, `diagnosticLenses` and `leverageOpportunities` hold the selectable detail copy. SVG labels, coordinates and bubble sizes are in the corresponding scene HTML. `detailTemplates` holds panel labels and markup; `{{0}}` and similar tokens refer to positions in the detail arrays.

Preserve valid JavaScript strings and HTML when editing. Use `styles.css` for visual changes. Leave the reference file unchanged.

## Publish with GitHub Pages

1. Upload these files directly to the repository root on `main`, with `index.html` at the top level.
2. Open **Repository → Settings → Pages**.
3. Under Source choose **Deploy from a branch**.
4. Select **main**, then **/(root)**, then **Save**.
5. Wait for GitHub to publish and use the URL shown in Pages settings.

The URL generally looks like `https://USERNAME.github.io/REPOSITORY/`. Relative file paths support this project subdirectory without configuration. Subsequent commits to the publishing branch update the site. No custom build command is needed.

See [GitHub’s publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Preservation notes

The canonical version has eight non-interactive Introduction cards, four scaling stages, seven diagnostic lenses and six leverage opportunities. Its AI Case retains the supplied five-part structure and its existing introductory wording. No additional mode switches, drawers, examples or interactions have been introduced.

## Validation against v7

- The reference copy is byte-for-byte identical to the supplied file.
- All ten rendered sections match the reference text exactly, including the eight Introduction cards and their subtext, all five principles, the complete expanded 30/60/90 progression and all six Experience Library categories.
- Both inline SVGs retain their exact coordinates, paths, colours and labels. All four scaling milestone buttons and graph circles work; the constraint, leading-signals and operating-response copy matches v7. All four cross-cutting tensions and “Systems matter more than heroics as you scale.” remain.
- All seven diagnostic lenses retain their detail, including Employee sentiment. All six leverage bubbles work. Disciplined Release Management retains its exact why-now, value-at-stake and Medium effort copy; the map axes, size explanation and timing principle remain.
- All six prioritisation criteria and the scarce-capacity statement remain. The operating-system flow and Customer value/Data/AI/Culture concepts remain. Mobilise & Scale retains all three cards and the centralise/federate statement. The AI case retains all five stages and the psychology/workflow statement. The complete closing throughline, five outcomes and final statement remain.
- Sidebar, Previous/Next, both navigation boundaries and left/right keyboard navigation were checked in the browser.
- All ten sections were checked at 1440px, 768px and 390px widths, with no horizontal page overflow. Desktop and mobile rendering was visually inspected.
- The localhost browser preview loaded all three runtime files successfully and reported no console errors. No external assets are required. Runtime files contain no framework imports, external scripts or build requirements.
- Direct `file://` browser automation was blocked by the testing environment. Browser validation used a localhost preview; the delivered site uses only relative classic-script and stylesheet links, with no fetch, modules or routing that would require a server. Direct double-click operation remains a manual check.

The original host font and base styles were not included in the source. The standalone stylesheet supplies a system sans-serif baseline and native equivalents of the supplied utility classes; exact matching to the unavailable ChatGPT host styles cannot be measured.
