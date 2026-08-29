---
name: Vibe Case
description: A Chinese-first functional AI case library with a friendly supporting cast of hand-drawn portrait guides.
colors:
  mist-canvas: "#eef3f6"
  deep-mist: "#e3ebef"
  portrait-ink: "#0b0b0d"
  soft-graphite: "#35333a"
  light-divider: "#8a929a"
  clean-cream: "#fffdf8"
  mint-portrait: "#bcebdc"
  peach-portrait: "#ffd4bc"
  sky-portrait: "#c9e4ff"
  lavender-portrait: "#dfcff7"
  rose-portrait: "#f8cfdb"
  yellow-note: "#ffe793"
  sage-portrait: "#d8dfc9"
  coral-portrait: "#ff9d83"
  sand-portrait: "#f9ecd2"
  aqua-portrait: "#c8ece7"
  coral-link: "#c9442d"
  focus-oxide: "#8f2f24"
typography:
  display:
    fontFamily: "ZCOOL KuaiLe, sans-serif"
    fontSize: "clamp(52px, 6.3vw, 90px)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "ZCOOL KuaiLe, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 64px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "20px"
    fontWeight: 850
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "11px"
    fontWeight: 900
    lineHeight: 1.5
    letterSpacing: "0.07em"
rounded:
  sm: "10px"
  chip: "12px"
  control: "14px"
  card: "16px"
  preview: "20px"
  studio: "24px"
  portrait: "26px"
  hero: "28px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  control: "12px"
  md: "16px"
  grid-gap: "20px"
  lg: "24px"
  panel: "30px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.yellow-note}"
    textColor: "{colors.portrait-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.coral-portrait}"
    textColor: "{colors.portrait-ink}"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "{colors.clean-cream}"
    textColor: "{colors.portrait-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.deep-mist}"
    textColor: "{colors.portrait-ink}"
    rounded: "{rounded.control}"
  category-chip:
    backgroundColor: "{colors.clean-cream}"
    textColor: "{colors.portrait-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "9px 11px"
  category-chip-active:
    backgroundColor: "{colors.portrait-ink}"
    textColor: "{colors.clean-cream}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "9px 11px"
  text-field:
    backgroundColor: "{colors.mist-canvas}"
    textColor: "{colors.portrait-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "13px"
  case-card:
    backgroundColor: "{colors.clean-cream}"
    textColor: "{colors.portrait-ink}"
    rounded: "{rounded.card}"
    padding: "12px"
  avatar-tile:
    backgroundColor: "{colors.mint-portrait}"
    rounded: "{rounded.control}"
---

# Design System: Vibe Case

## Overview

**Creative North Star: "The Functional Commons"**

Vibe Case is a functional case library made approachable by a friendly illustrated cast. UI structures, bilingual Prompt content, variables, and generated Preview are always the content authority; the 100 hand-drawn people act as compact guide marks that make cases recognizable without competing with the work. A cool mist canvas holds the world, deep black ink gives it confidence, and neutral cream surfaces keep dense catalogs calm while pastel portraits and rare tinted moments preserve warmth.

The functional authority is the case structure and its generated result. The user-pinned `high-quality-100/` portrait collection remains the brand authority: its loose black linework and flat pastel backgrounds inform decisive silhouettes, rounded controls, and the supporting palette. Portraits appear as small guide badges in headers, cards, details, empty states, and the wordmark—not as the main artifact or as a reason to tint every container.

The system covers Vibe Case chrome and authored surfaces only. HTML produced by a model and displayed inside a sandboxed iframe is user output, not brand evidence; never extract colors, typography, spacing, components, or rules from that content.

**Key Characteristics:**

- Functional diagrams, Prompt content, and Preview surfaces lead the navigation and storytelling.
- Real black-and-white portrait characters provide secondary identity and human warmth.
- Neutral cream cards and light internal dividers keep repeated browsing surfaces quiet; ink silhouettes preserve confidence.
- ZCOOL KuaiLe makes identity and page-level statements feel loose and human; Manrope Variable owns repeated catalog titles and operational text.
- Pastel color stays concentrated in portrait assets, actions, and rare low-opacity detail or result moments.
- Structural UI diagrams are the primary visual evidence on home, catalog, case cards, and detail pages.
- The generated-result iframe is visually and semantically outside the site design system.

## Colors

The palette pairs a cool mist-gray canvas with the portrait collection's uncompromising black ink and cheerful low-chroma pastels.

### Primary

- **Portrait Ink** (`portrait-ink`): all major text, strong outer silhouettes, active chips, the preview toolbar, and the footer. Black establishes action and identity while light dividers organize repeated content internally.
- **Yellow Note** (`yellow-note`): primary actions, the circular 92-case note, highlighted links on black surfaces, and restrained output-map emphasis.

### Secondary

- **Mint Portrait** (`mint-portrait`): the most frequent friendly field for portraits, positive or ready states, and low-opacity prompt or preview tints.
- **Coral Portrait** (`coral-portrait`): primary-button hover and rare emphasis; it is not a catalog-card background.
- **Peach Portrait** (`peach-portrait`): a source for restrained detail-hero and execution-boundary tints, never a repeated shell fill.

### Tertiary

- **Sky Portrait** (`sky-portrait`), **Lavender Portrait** (`lavender-portrait`), **Rose Portrait** (`rose-portrait`), **Sage Portrait** (`sage-portrait`), **Sand Portrait** (`sand-portrait`), and **Aqua Portrait** (`aqua-portrait`): portrait backgrounds and rare authored moments such as the home demo or a low-opacity detail tint. They do not rotate across repeated catalog cards.
- **Coral Link** (`coral-link`): the darker, readable coral for navigation hover and hand-drawn-style underlines.
- **Focus Oxide** (`focus-oxide`): the accessible focus outline, active-route text, and active-route underline. Keep it darker than decorative coral.

### Neutral

- **Mist Canvas** (`mist-canvas`): the global page and sticky header; its pale blue-gray keeps long browsing sessions bright without the former yellow cast.
- **Deep Mist** (`deep-mist`): the quiet hover fill for secondary actions and neutral interaction feedback.
- **Clean Cream** (`clean-cream`): secondary actions, diagram paper, and all repeated catalog-card shells.
- **Soft Graphite** (`soft-graphite`): explanatory copy and low-priority metadata; it softens hierarchy without losing warmth.
- **Light Divider** (`light-divider`): 1px internal rules around diagrams, fields, prompt columns, provenance cells, result shells, and filter controls.

### Named Rules

**The Black Ink Rule.** Every pastel surface is anchored by portrait ink through text, a border, or an adjacent dark bar; pastel-on-pastel construction is not this system.

**The Cast, Not Status Rule.** Pastel variety belongs primarily to the portrait cast and rare supporting moments. Do not assign permanent meanings such as success, warning, or category to portrait pastels, except for the implemented ready-state mint.

**The Neutral-First Repetition Rule.** Repeated cards, filters, inputs, provenance cells, and result shells start from cream, mist, and light-divider neutrals. Earn pastel only for an avatar, a primary action, or one restrained contextual tint.

**The No Gradient Rule.** Site chrome uses flat color fields. Gradients may appear only inside the legacy abstract case-diagram geometry or inside model-generated iframe content, never as the site's ambient background.

## Typography

**Display Font:** ZCOOL KuaiLe (with sans-serif fallback)

**Body Font:** Manrope Variable (with sans-serif fallback)

**Label Font:** Manrope Variable

**Character:** ZCOOL KuaiLe brings the same irregular, marker-drawn energy as the portrait linework and is reserved for identity, page-level headlines, detail names, and section statements. Manrope Variable supplies a compact, legible working voice for repeated card titles, descriptions, controls, search, metadata, and English terminology.

### Hierarchy

- **Display** (400, fluid 52–90px, 1.03 line-height): page-defining Chinese statements and one-off detail names. Preserve the irregular silhouette and short measure; desktop hero copy stays around 12 characters wide and mobile remains an unapologetic 50–52px.
- **Headline** (400, fluid 34–64px, 1 line-height): section statements, workflow headings, prompt headings, and generation titles.
- **Title** (850, 20px, 1.2 line-height): repeated UI case-card titles in Manrope Variable; Skills card titles rise to 22px at the same weight. ZCOOL KuaiLe remains available for one-off empty-state and runner headings.
- **Body** (400, 16px, 1.65 line-height): interface copy, descriptions, and prompt prose. Larger introductions rise to 17–20px with 1.7–1.75 line-height and stay near 54–58 characters per line.
- **Label** (900, 11px, 0.07em letter-spacing, uppercase where categorical): case numbers, category names, prompt language markers, status badges, and preview chrome.

### Named Rules

**The Drawn Voice / Working Voice Rule.** ZCOOL KuaiLe speaks for identity, invitations, detail names, and section-level ideas; Manrope handles repeated card titles, every operational sentence, form value, filter, count, and long prompt.

**The Mixed-Script Confidence Rule.** Keep recognizable English terms such as Prompt, HTML, Magic Link, and Vibe Case in place; the display face is deliberately used across Chinese and English headlines.

## Layout

Authored content uses a centered maximum width of 1380px with 20px desktop gutters. The home hero pairs concise product copy with a larger functional demo containing a real case structure, Prompt context, and generation flow. The UI catalog uses a three-column grid and initially renders 18 of 92 cases; the Skills catalog uses two columns and a 12-item page budget. Both use 20px gaps and reveal subsequent batches through one centered Load More action. Detail heroes keep their existing `.9 / 1.1` or `.86 / 1.14` copy-to-structure splits inside restrained pastel-tinted frames, and the generation studio gives roughly 60% of its width to Preview.

At 1040px, UI catalog grids become two columns, the functional demo follows the hero copy, collection introductions stack, and the generation editor stacks above the preview. At 760px, primary content uses 16px side gutters, catalogs become one compact column, detail and prompt splits become one reading column, form variables stack, and actions become full-width vertical controls. UI cards change composition rather than merely shrinking: each becomes a compact horizontal row with a 132px square diagram and text to its right. Skills cards remain vertically composed but shed fixed height and tighten their functional maps. The mobile header keeps both internal UI and Skills destinations at 44px minimum height and hides the external source link. Primary category clusters stay in one horizontally scrollable rail while the specific-category select moves below it at full width.

UI discovery exposes five durable clusters—Entering & Conversion, Marketing & Growth, Product Structure, Content & Data, and System & State—plus a More Categories select for the 15 exact source categories. Skills discovery uses four clusters—Image & Visual, Interface & Experience, Product Methods, and Motion & Video—plus its exact-category select. Search or category changes reset the visible batch to the first page.

**Mobile Catalog Density Test.** At a representative 390px viewport, the initial 18-card UI catalog should remain near 5,016px total page height rather than the former roughly 8,753px stack. Preserve the 188px intrinsic card estimate, three-line summary limit, and single-line English title when changing mobile card content.

Vertical space is generous around narrative moments (roughly 66–120px) and compact inside working controls (8–30px). The sticky header is 60px on desktop and 56px on mobile. Form grids, Prompt text, and result controls stay aligned and predictable.

### Named Rules

**The Functional Area Rule.** Case structures, Prompt text, inputs, and Preview own the largest uninterrupted surfaces. Portraits stay within compact guide badges and never enter functional hit areas.

**The One-Column Work Rule.** Below 760px, every task-oriented split becomes a single column. Only the primary category-cluster rail may keep lateral movement; the exact-category select occupies its own full-width row.

## Elevation & Depth

The system is flat in color but lightly physical in composition. Black ink defines signature outer silhouettes and actions; repeated shells and internal structure use light 1px dividers so dense catalogs do not feel boxed in. Low, tight shadows lift the home demo, small portrait guide badges, and actionable buttons just enough to feel placed on the mist canvas; large generic card shadows are absent.

### Shadow Vocabulary

- **Action Rest** (`0 9px 22px -17px rgba(11, 11, 13, .8)`): restrained lift under primary buttons and focused fields.
- **Action Hover** (`0 13px 26px -17px rgba(11, 11, 13, .9)`): slightly stronger button response, paired with the inherited 1px upward motion.
- **Demo Lift** (`0 24px 46px -34px rgba(11, 11, 13, .85)`): the functional demo's restrained elevation.
- **Guide Badge** (`0 12px 22px -18px rgba(11, 11, 13, .8)`): compact avatar marks placed over a functional surface.

### Named Rules

**The Ink Before Shadow Rule.** A signature frame or action earns hierarchy from its ink silhouette before shadow. Repeated cards and internal partitions use 1px ink or light-divider rules; add a shadow only when the object is physically overlapping, actionable, or temporarily lifted.

## Shapes

The dominant silhouette is a rounded functional frame. Controls use 12–14px corners, cards use 16px, and large demos, detail frames, and studios use 20–26px. Circular geometry is reserved for the case-card arrow and footer portrait medallions. Primary buttons and avatars keep 2px ink outlines; catalog cards use 1px ink, detail heroes and studios use 2px ink, and internal diagrams, prompt columns, fields, provenance, briefs, and result shells use 1px light-divider rules. The home demo remains the rare 3px signature frame.

### Named Rules

**The Guide Badge Rule.** Avatars use a square crop, full black outline, and 38–58px footprint in functional contexts. They identify or accompany a case; they do not replace its structure.

**The Radius Follows Scale Rule.** Small controls stay at 12–14px, cards at 16px, and large portrait or studio frames at 20–28px. Do not apply pill shapes to ordinary containers.

## Components

Components feel like sturdy illustrated props after a neutral-first refinement: cream and mist shells carry repeated work, light dividers organize interiors, and strong ink, pastel portraits, or tinted moments appear only where they clarify action or identity.

### Buttons

- **Shape:** 48px minimum touch height, a 2px portrait-ink border, 14px corners, and 10px × 16px padding.
- **Primary:** yellow-note fill, portrait-ink text, Manrope at 900 weight, and restrained action lift.
- **Hover / Focus:** hover switches to coral while preserving black text and strengthens the shadow; focus uses a visible 3px focus-oxide outline with a 3px offset. Existing motion is 180ms ease-out and respects reduced-motion preferences.
- **Secondary:** clean-cream fill with the same black border; hover moves only to deep mist, keeping routine actions neutral.
- **Disabled:** preserve the silhouette, reduce opacity to 45%, and remove pointer affordance.

### Chips

- **Style:** clean-cream fill, 1px light-divider border, 12px corners, 44px minimum height, and compact extra-bold Manrope labels.
- **State:** hover and selected states invert to portrait ink with clean-cream text. Counts remain inline and tabular; cluster rails scroll horizontally rather than wrapping. A matching 44px exact-category select sits beside the rail on desktop and below it on mobile.

### Cards / Containers

- **Corner Style:** case cards use 16px outer corners; the primary structure frame uses 14px; large detail and studio containers use 20–26px.
- **Background:** repeated UI and Skills catalog cards are clean cream. UI-card hover mixes deep mist into cream; Skills retain a neutral shell around their functional map. Pastel rotation is reserved for portrait assets and rare authored contexts.
- **Shadow Strategy:** cards stay shadowless. Only the main demo, compact guide badges, and active controls lift.
- **Border:** 1px ink for card shells, 1px light divider for internal functional frames, and 2px ink for detail heroes or studios. The home demo alone keeps a 3px signature outline.
- **Internal Padding:** 12px at the card shell, 18px around card copy, 30px in the generation editor, and 42px in a desktop detail hero.

### Inputs / Fields

- **Style:** mist-canvas fill, 1px light-divider border, 13–14px corners, 13px padding, and Manrope body text. The catalog search is the intentional exception: borderless content on the mist canvas, anchored by a double-weight black underline.
- **Focus:** shift the internal border to ink and add a small black ambient shadow; the global 3px focus-oxide outline with 3px offset remains the keyboard fallback.
- **Help / Error / Disabled:** put concise requirements directly below the field in 12px graphite text. Generation errors stay inline with `role="alert"`; disabled primary actions use 45% opacity and retain explanatory help rather than relying on opacity alone.

### Navigation

The sticky header sits directly on the mist canvas with a 1px black bottom rule and no blur. The wordmark pairs a 34px rounded male-guide avatar tile with a 21px ZCOOL KuaiLe name; the guide is sampled from an approved male portrait pool on each refresh. Navigation uses 13px extra-bold Manrope, 44px minimum-height links, and 5px horizontal padding. Hover turns darker coral; the active internal route uses focus oxide plus a 2px inset underline and `aria-current="page"`. On mobile the header becomes 56px, the avatar 32px, both internal UI and Skills links remain, spacing tightens, and the external source link is hidden.

### Avatar Tile

Avatar tiles use the production derivatives of the `high-quality-100/` source set, cropped square with `object-fit: cover`. A client-side sampler assigns portraits without replacement where possible: assignments remain stable during one page session and reshuffle on a hard refresh. The asset's own pastel field must remain intact. Functional cards use empty alt text because their link and diagram already name the case; use descriptive alt text only when the person itself carries information. Do not recolor, filter, redraw, or mix unrelated portrait styles into the cast.

The footer shows a denser sample of the cast without turning into a gallery: 14 portraits plus `+86` on wide screens, 10 plus `+90` on intermediate screens, and 8 plus `+92` on mobile.

### Portrait Case Card

Every case card leads with one large structural diagram inside a 1px light-divider frame. Metadata sits above it, while the Chinese title, summary, English source title, and circular arrow form a compact lower caption. Repeated Chinese titles use Manrope Variable at 20px / 850; ZCOOL KuaiLe is reserved for page-level and detail statements. One 46–52px avatar badge identifies the guide without interrupting comparison between structures.

Below 760px, preserve the compact horizontal card as a distinct mobile composition:

- **Structure:** use a two-column grid with a fixed 132px visual column, a fluid text column, a 14px column gap, and 11px shell padding. Metadata spans both columns above the row; the card has no fixed minimum height and uses a 188px intrinsic-size estimate.
- **Diagram:** render the structure at exactly 132px square with 12px internal padding. The guide avatar becomes 38px, uses a 1px outline, and sits 7px from the diagram's right and bottom edges.
- **Copy:** place text to the right with 5px vertical padding and 24px reserved on the trailing edge for the arrow. The title becomes 18px Manrope / 850; clamp the summary to three lines; keep the English source title to one ellipsized line with an 8px top gap.
- **Priority:** do not move the avatar or diagram above the copy again on mobile. The horizontal relationship is what preserves rapid scanning across the initial 18 cases.

### Generation Studio

The studio is a 2px black split frame with a 1px ink gutter: a clean-cream editor beside a preview softly tinted with 18% mint, capped by a black 50px toolbar. Inputs use mist fills and light 1px dividers. Prompt help states the 20-character minimum; reassurance says generation may take tens of seconds and that a reference image is not persisted. Oversized images produce an inline 5MB error, and a selected reference always exposes a 44px removal action. Before generation, the case structure fills the empty state and a small portrait guide supports the explanatory copy. During generation, the primary control becomes Stop with a spinner; after generation, the sandboxed iframe replaces the authored empty state. The iframe's visual language is unconstrained model output and must never be treated as part of Vibe Case's component system.

### Skills Catalog

The Skills catalog extends the Functional Commons without changing its visual world. Search, category controls, collection metrics, neutral card shells, portrait guides, and Manrope working titles follow the refined catalog system; the distinctive artifact is a functional map that makes each Skill legible as `SKILL.md → workflow → output` before the user opens it.

- **Grid:** two equal columns with a 20px gap inside the 1380px authored width. Below 760px it becomes one column. Cards keep a 520px minimum height on desktop; mobile removes the fixed minimum so each card follows its clamped content.
- **Card Shell:** clean-cream fill, 1px portrait-ink border, 16px corners, 14px link padding, and no resting shadow. Do not rotate pastel backgrounds across Skill cards.
- **Functional Map:** a near-neutral mix of mist and clean cream with a 1px light-divider border, 14px corners, 18px padding, and a 276px minimum height. Its upper row splits approximately `.82 / 1.18` between the source block and workflow; the output spans the full lower row. On mobile the map tightens to 13px padding and a 210px minimum height without changing the source-to-outcome order.
- **Source:** the `SKILL.md` origin is a solid ink block with cream text, 12px corners, and 15px padding. Preserve the English source title even when it wraps.
- **Workflow:** show the first three steps as a centered vertical sequence with 22px numbered markers, 9px row gaps, and compact 12px graphite copy. This is a method preview, not a generic feature list.
- **Output:** use a full-width 68% yellow-note tint with a 1px light-divider border, 11px corners, a 44px minimum height, and reserved right padding for the guide avatar.
- **Guide and Caption:** the approved portrait guide is 52px square, ink-outlined, and anchored to the output corner with the Guide Badge shadow. The Chinese Skill title uses Manrope Variable at 22px / 850 on desktop and 20px on mobile; summary, install count, runnable-case count, and the 32px circular arrow stay in Manrope. Mobile summary copy is clamped to three lines and the caption padding tightens to 16px 4px 34px. Hover moves only the arrow 2px right and 2px up.
- **Discovery:** expose four clusters—Image & Visual, Interface & Experience, Product Methods, and Motion & Video—plus a specific-category select. The 12-item page budget resets whenever search or category changes.

**The Source-to-Outcome Rule.** A Skill preview must reveal where the method came from, what it does, and what it produces in that order. Do not replace the functional map with a decorative thumbnail or let the portrait become the card's main image.

### Skill Detail

The detail page turns the compact map into an auditable method sheet. It pairs a large invitation and runnable-case action with a full source/workflow/output map, then follows with use conditions, provenance, parsing boundaries, and runnable examples.

- **Hero:** a restrained 16% lavender / cream tint with a 2px ink border, 26px corners, 42px padding, and a 560px minimum height. Desktop uses an approximately `.86 / 1.14` copy-to-map split with a fluid 38–76px gap. The title is ZCOOL KuaiLe at a fluid 54–86px, limited to about 10 characters per line; the summary is 18px Manrope at 1.7 line-height.
- **Detail Map:** a clean-cream frame with a 1px light-divider border, 20px corners, 22px padding, and 14px vertical gaps. The source is an ink block, the complete workflow is a softly ruled list, and the output is a 68% yellow-note tint with a 1px divider. Preserve repository and Skill path text with anywhere wrapping rather than clipping or truncating provenance.
- **Guide Placement:** the 58px portrait guide sits in the source block's reserved upper-right space. At mobile size it becomes 48px and the source block keeps extra right padding so text never runs beneath it.
- **Method and Provenance:** “什么时候使用” is a `.72 / 1.28` two-column explanation and lightly ruled trigger list with 72px vertical padding. Beneath it, a cream provenance strip exposes Status, Repository, License, Commit, and Installs in five 1px divider-separated cells. The small green status mark is semantic availability, while an 18% peach / cream boundary panel explains what the parser will not execute.
- **Responsive:** below 1040px the hero and method become single-column and provenance becomes two columns. Below 760px the page uses 16px side gutters, the hero uses 22px padding and 20px corners, the title becomes 50px, provenance becomes one column, and every former vertical divider becomes a horizontal 1px rule.

**The Provenance Is Product Rule.** Repository, path, license, commit, install count, sync status, and execution boundary are part of the usable Skill—not secondary legal copy. Keep them readable, linkable where implemented, and adjacent to the method they qualify.

### Skill Case Runner

Runnable Skill cases are compact workbenches, not generated-HTML previews. They preserve the site's existing buttons, focus treatment, error style, typography, and neutral internal dividers while making the editable Prompt, execution mode, and returned artifact explicit.

- **Case Grid:** two equal columns with a 20px gap and top alignment. Below 760px it becomes one column. Each case uses a clean-cream fill, 1px light-divider border, 18px corners, and 22px padding. Do not alternate pastel fills. Mobile padding is 18px.
- **Heading and Mode:** use a 28px ZCOOL KuaiLe title with Manrope summary. The execution-mode badge is compact uppercase Manrope with a 1px ink border, 8px corners, and 6px × 8px padding; it names the actual path such as GPT Image 2 rather than adding a decorative status.
- **Input / Output Brief:** present example input and expected output in two equal cells between 1px top and bottom dividers. Labels use the existing 11px uppercase metadata style; cell copy is 13px Manrope. On mobile the cells stack and the divider changes from vertical to horizontal.
- **Prompt Editor:** the seven-row textarea uses the mist canvas, a 1px light-divider border, 13px corners, 13px padding, and 1.55 line-height. Keep the editable Prompt visually larger than its controls.
- **Actions:** align Copy Prompt and Run Case to the right with a 10px gap, reusing the 48px secondary and primary buttons. Copy changes to a check icon and “已复制” for 1.6 seconds; clipboard failure becomes the shared inline error. Loading replaces the run icon with the existing spinner, and the primary action remains disabled while loading or while the Prompt is shorter than 20 characters. On mobile actions stack and each button spans the card width.
- **Result:** return content inside a 1px light-divider frame with 14px corners and a mist-canvas body. A minimum 42px ink toolbar names the result and carries the clear action. Images render at full card width; structured text uses a scrollable preformatted region capped at 520px with 18px padding and 14px / 1.65 Manrope copy. Preserve the live-region announcement and existing error component. New results enter over 200ms with the shared emphasized easing.

**The Runner Chrome / Output Boundary Rule.** The case frame, Prompt editor, controls, loading, errors, and result toolbar belong to Vibe Case. Generated images and structured result text are case output; they must not feed new colors, typography, or component rules back into the site system.

### Functional Motion & State Feedback

Motion exists to confirm a data or task transition, never to decorate a resting screen. Filter changes and each Load More batch settle over 200ms using `cubic-bezier(.16, 1, .3, 1)`, fading from 65% opacity and translating upward 5px. Skill results use the same 200ms easing from 50% opacity and 6px lower. All transitions collapse to the global reduced-motion override.

Copy feedback is semantic rather than spatial: replace Copy with a check and “已复制” for 1.6 seconds, announce through `aria-live="polite"`, and expose failure text instead of silently resetting. Generation swaps Generate for Stop while loading, keeps the spinner local to the action, announces result containers as live regions, and provides a visible clear/reset control after content arrives.

**The Functional Motion Rule.** Animate only the changed result set, newly arrived output, or control state that the user caused. Do not animate neutral cards, pastel tints, or portraits merely to make the page feel active.

### Focus, Touch & Generation Guidance

- **Focus:** every keyboard-focusable control keeps the global 3px focus-oxide outline with 3px offset. Active navigation color and underline supplement `aria-current`; they never replace focus.
- **Touch:** primary and secondary actions remain 48px high. Navigation links, cluster chips, exact-category selects, Load More, and reference-image removal provide at least 44px height. Preserve these targets when labels translate or wrap.
- **Generation Preconditions:** state the 20-character Prompt minimum before the user reaches a disabled action. For reference images, show the 5MB limit as an inline error, retain the file picker, and provide an explicit Remove action after selection.
- **Generation Expectation:** tell users that generation may take tens of seconds and that the reference image is used only for the current request and is not persisted by the current version. Loading, stop, retryable error, completion, open-record, and clear-result states must each have visible text, not icon-only meaning.

## Do's and Don'ts

### Do:

- **Do** use case structures and generated Preview as the dominant visual evidence.
- **Do** use the real `high-quality-100/` avatar derivatives as compact, provenance-bearing guide marks.
- **Do** start repeated catalog cards and working shells from clean cream or mist, then use 1px light dividers for internal structure.
- **Do** reserve pastel color for portrait assets, primary actions, and rare low-opacity contextual moments.
- **Do** use ZCOOL KuaiLe for identity and large statements, and Manrope Variable for repeated card titles plus every operational or long-reading surface.
- **Do** preserve the 3px focus-oxide outline, meaningful portrait alt text, 48px primary actions, 44px navigation/filter targets, and the reduced-motion override.
- **Do** keep the structural diagram primary and the portrait secondary wherever both appear.
- **Do** keep mobile UI cards in the 132px-diagram horizontal composition and let mobile Skills cards size to their clamped content.
- **Do** explain Prompt requirements, generation duration, reference-image limits, persistence behavior, and recoverable errors next to the relevant control.

### Don't:

- **Don't** revive the former specimen-ledger identity: no serif declarations, blueprint blue actions, contiguous square ruled grids, or archival-paper metaphor.
- **Don't** substitute stock photography, 3D avatars, emoji, gradients, or a second illustration family for the high-quality-100 cast.
- **Don't** confuse neutral-first with generic white SaaS cards; preserve functional maps, decisive ink silhouettes, characterful page-level type, and compact portrait guides.
- **Don't** use pastel color as a data taxonomy unless the product explicitly introduces that meaning.
- **Don't** let decorative portrait overlap obscure text, controls, focus rings, or mobile reading order.
- **Don't** turn a functional catalog into a portrait gallery; avatars must not set card height or delay search and filters.
- **Don't** restore tall vertical UI cards or a fixed 480px Skills-card minimum below 760px; both undo the mobile catalog-density gain.
- **Don't** use 2–3px black rules for repeated internal partitions when a 1px light-divider rule communicates the structure.
- **Don't** hide a disabled generation action's requirement, surface upload limits through blocking alerts, or use motion without a user-caused state change.
- **Don't** extract or enforce any visual rule from model-generated HTML inside the sandboxed iframe.
