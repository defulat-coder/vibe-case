---
name: Vibe Case
description: A Chinese-first functional AI case library with a friendly supporting cast of hand-drawn portrait guides.
colors:
  mist-canvas: "#eef3f6"
  portrait-ink: "#0b0b0d"
  soft-graphite: "#35333a"
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
    fontFamily: "ZCOOL KuaiLe, sans-serif"
    fontSize: "25px"
    fontWeight: 400
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
    backgroundColor: "{colors.mint-portrait}"
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
    backgroundColor: "{colors.clean-cream}"
    textColor: "{colors.portrait-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "13px"
  case-card:
    backgroundColor: "{colors.mint-portrait}"
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

Vibe Case is a functional case library made approachable by a friendly illustrated cast. UI structures, bilingual Prompt content, variables, and generated Preview are always the content authority; the 100 hand-drawn people act as compact guide marks that make cases recognizable without competing with the work. A cool mist canvas holds the world, heavy black ink gives it confidence, and pastel fields keep a dense catalog inviting.

The functional authority is the case structure and its generated result. The user-pinned `high-quality-100/` portrait collection remains the brand authority: its loose black linework and flat pastel backgrounds inform heavy outlines, rounded controls, and the palette. Portraits appear as small guide badges in headers, cards, details, empty states, and the wordmark—not as the main artifact.

The system covers Vibe Case chrome and authored surfaces only. HTML produced by a model and displayed inside a sandboxed iframe is user output, not brand evidence; never extract colors, typography, spacing, components, or rules from that content.

**Key Characteristics:**

- Functional diagrams, Prompt content, and Preview surfaces lead the navigation and storytelling.
- Real black-and-white portrait characters provide secondary identity and human warmth.
- Cream canvas and full black outlines unify an intentionally broad pastel rotation.
- ZCOOL KuaiLe makes Chinese and mixed-script headlines feel loose and human; Manrope Variable keeps operational text precise.
- Rounded, bordered cards and controls retain the tactile character of the portrait collection.
- Structural UI diagrams are the primary visual evidence on home, catalog, case cards, and detail pages.
- The generated-result iframe is visually and semantically outside the site design system.

## Colors

The palette pairs a cool mist-gray canvas with the portrait collection's uncompromising black ink and cheerful low-chroma pastels.

### Primary

- **Portrait Ink** (`portrait-ink`): all major text, 2–3px outlines, active chips, the preview toolbar, and the footer. Black is the common structural color that lets many pastels coexist.
- **Yellow Note** (`yellow-note`): primary actions, the circular 92-case note, the generation editor, and highlighted links on black surfaces.

### Secondary

- **Mint Portrait** (`mint-portrait`): the most frequent friendly field for portraits, positive or ready states, prompt surfaces, and the empty preview canvas.
- **Coral Portrait** (`coral-portrait`): primary-button hover, rare emphasis, and one step in the case-card rotation.
- **Peach Portrait** (`peach-portrait`): detail heroes, empty search results, and a warm card step.

### Tertiary

- **Sky Portrait** (`sky-portrait`), **Lavender Portrait** (`lavender-portrait`), **Rose Portrait** (`rose-portrait`), **Sage Portrait** (`sage-portrait`), **Sand Portrait** (`sand-portrait`), and **Aqua Portrait** (`aqua-portrait`): recurring card and portrait fields. Rotate them to create a cast, not to encode data semantics.
- **Coral Link** (`coral-link`): the darker, readable coral for navigation hover and hand-drawn-style underlines.

### Neutral

- **Mist Canvas** (`mist-canvas`): the global page and sticky header; its pale blue-gray keeps long browsing sessions bright without the former yellow cast.
- **Clean Cream** (`clean-cream`): input fills, secondary actions, diagram paper, and quiet card surfaces.
- **Soft Graphite** (`soft-graphite`): explanatory copy and low-priority metadata; it softens hierarchy without losing warmth.

### Named Rules

**The Black Ink Rule.** Every pastel surface is anchored by portrait ink through text, a border, or an adjacent dark bar; pastel-on-pastel construction is not this system.

**The Cast, Not Status Rule.** The multi-color rotation expresses human variety and catalog rhythm. Do not assign permanent meanings such as success, warning, or category to the portrait pastels, except for the implemented ready-state mint.

**The No Gradient Rule.** Site chrome uses flat color fields. Gradients may appear only inside the legacy abstract case-diagram geometry or inside model-generated iframe content, never as the site's ambient background.

## Typography

**Display Font:** ZCOOL KuaiLe (with sans-serif fallback)

**Body Font:** Manrope Variable (with sans-serif fallback)

**Label Font:** Manrope Variable

**Character:** ZCOOL KuaiLe brings the same irregular, marker-drawn energy as the portrait linework and is especially important in large Chinese headlines and the Vibe Case wordmark. Manrope Variable supplies a compact, legible counterweight for descriptions, controls, search, metadata, and English terminology.

### Hierarchy

- **Display** (400, fluid 52–90px, 1.03 line-height): page-defining Chinese statements and case names. Preserve the irregular silhouette and short measure; desktop hero copy stays around 12 characters wide and mobile remains an unapologetic 50–52px.
- **Headline** (400, fluid 34–64px, 1 line-height): section statements, workflow headings, prompt headings, and generation titles.
- **Title** (400, 25px, 1.2 line-height): case-card titles and compact functional empty-state headings.
- **Body** (400, 16px, 1.65 line-height): interface copy, descriptions, and prompt prose. Larger introductions rise to 17–20px with 1.7–1.75 line-height and stay near 54–58 characters per line.
- **Label** (900, 11px, 0.07em letter-spacing, uppercase where categorical): case numbers, category names, prompt language markers, status badges, and preview chrome.

### Named Rules

**The Drawn Voice / Working Voice Rule.** ZCOOL KuaiLe speaks for identity, invitations, and section-level ideas; Manrope handles every operational sentence, form value, filter, count, and long prompt.

**The Mixed-Script Confidence Rule.** Keep recognizable English terms such as Prompt, HTML, Magic Link, and Vibe Case in place; the display face is deliberately used across Chinese and English headlines.

## Layout

Authored content uses a centered maximum width of 1380px with 20px desktop gutters. The home hero pairs concise product copy with a larger functional demo containing a real case structure, Prompt context, and generation flow. Catalogs use a three-column grid, or four columns for the compact featured set, with a 20px gap. Detail heroes use a `.9 / 1.1` copy-to-structure split inside one large peach frame, and the generation studio gives roughly 60% of its width to Preview.

At 1040px, catalog grids become two columns, the functional demo follows the hero copy, collection introductions stack, and the generation editor stacks above the preview. At 760px, primary content uses 16px side gutters, catalogs become one compact column, detail and prompt splits become one reading column, form variables stack, and actions become full-width vertical controls. The first internal navigation link disappears while the source link and compact avatar wordmark remain. Category filters stay in a single horizontally scrollable row.

Vertical space is generous around narrative moments (roughly 66–120px) and compact inside working controls (8–30px). The sticky header is 60px on desktop and 56px on mobile. Form grids, Prompt text, and result controls stay aligned and predictable.

### Named Rules

**The Functional Area Rule.** Case structures, Prompt text, inputs, and Preview own the largest uninterrupted surfaces. Portraits stay within compact guide badges and never enter functional hit areas.

**The One-Column Work Rule.** Below 760px, every task-oriented split becomes a single column. Only the category rail may keep lateral movement.

## Elevation & Depth

The system is flat in color but lightly physical in composition. Thick black borders establish most hierarchy. Low, tight shadows lift the home demo, small portrait guide badges, and actionable buttons just enough to feel placed on the cream canvas; large generic card shadows are absent.

### Shadow Vocabulary

- **Action Rest** (`0 9px 22px -17px rgba(11, 11, 13, .8)`): restrained lift under primary buttons and focused fields.
- **Action Hover** (`0 13px 26px -17px rgba(11, 11, 13, .9)`): slightly stronger button response, paired with the inherited 1px upward motion.
- **Demo Lift** (`0 24px 46px -34px rgba(11, 11, 13, .85)`): the functional demo's restrained elevation.
- **Guide Badge** (`0 12px 22px -18px rgba(11, 11, 13, .8)`): compact avatar marks placed over a functional surface.

### Named Rules

**The Ink Before Shadow Rule.** A surface earns its hierarchy from a 2–3px black outline first. Add a shadow only when the object is physically overlapping, actionable, or temporarily lifted.

## Shapes

The dominant silhouette is a rounded functional frame. Controls use 12–14px corners, cards use 16px, and large demos, detail frames, and studios use 20–26px. Circular geometry is reserved for the case-card arrow and footer portrait medallions. Borders are almost always full black and 2px; large demos, heroes, and studios increase to 3px.

### Named Rules

**The Guide Badge Rule.** Avatars use a square crop, full black outline, and 38–58px footprint in functional contexts. They identify or accompany a case; they do not replace its structure.

**The Radius Follows Scale Rule.** Small controls stay at 12–14px, cards at 16px, and large portrait or studio frames at 20–28px. Do not apply pill shapes to ordinary containers.

## Components

Components feel like sturdy illustrated props: flat pastel fills, heavy ink, softened corners, and concise motion.

### Buttons

- **Shape:** 48px minimum touch height, a 2px portrait-ink border, 14px corners, and 10px × 16px padding.
- **Primary:** yellow-note fill, portrait-ink text, Manrope at 900 weight, and restrained action lift.
- **Hover / Focus:** hover switches to coral while preserving black text and strengthens the shadow; focus uses a visible 3px coral outline with a 3px offset. Existing motion is 180ms ease-out and respects reduced-motion preferences.
- **Secondary:** clean-cream fill with the same black border; hover changes to mint without introducing a new color family.
- **Disabled:** preserve the silhouette, reduce opacity to 45%, and remove pointer affordance.

### Chips

- **Style:** clean-cream fill, 2px portrait-ink border, 12px corners, 9px × 11px padding, and compact extra-bold Manrope labels.
- **State:** hover and selected states invert to portrait ink with clean-cream text. Counts remain inline and tabular; the full rail scrolls horizontally rather than wrapping.

### Cards / Containers

- **Corner Style:** case cards use 16px outer corners; the primary structure frame uses 14px; large detail and studio containers use 20–26px.
- **Background:** catalog cards rotate through the defined portrait pastels. Copy and imagery live inside one color family per card; a translucent clean-cream wash is allowed only on hover.
- **Shadow Strategy:** cards stay shadowless. Only the main demo, compact guide badges, and active controls lift.
- **Border:** 2px portrait ink for cards and 3px for hero or studio frames.
- **Internal Padding:** 12px at the card shell, 18px around card copy, 30px in the generation editor, and 42px in a desktop detail hero.

### Inputs / Fields

- **Style:** clean-cream fill, 2px portrait-ink border, 14px corners, 13px padding, and Manrope body text. The catalog search is the intentional exception: borderless content on the cream canvas, anchored by a double-weight black underline.
- **Focus:** keep the black border and add a small black ambient shadow; the global 3px coral focus-visible outline remains the keyboard fallback.
- **Error / Disabled:** generation errors use dark coral text on pale coral with a 1px coral border and 9px corners. Disabled primary actions use 45% opacity.

### Navigation

The sticky header sits directly on the mist canvas with a 1px black bottom rule and no blur. The wordmark pairs a 34px rounded male-guide avatar tile with a 21px ZCOOL KuaiLe name; the guide is sampled from an approved male portrait pool on each refresh. Navigation uses 13px extra-bold Manrope; hover turns darker coral. On mobile the header becomes 56px, the avatar 32px, and the collection link is removed to preserve the source link without crowding.

### Avatar Tile

Avatar tiles use the production derivatives of the `high-quality-100/` source set, cropped square with `object-fit: cover`. A client-side sampler assigns portraits without replacement where possible: assignments remain stable during one page session and reshuffle on a hard refresh. The asset's own pastel field must remain intact. Functional cards use empty alt text because their link and diagram already name the case; use descriptive alt text only when the person itself carries information. Do not recolor, filter, redraw, or mix unrelated portrait styles into the cast.

The footer shows a denser sample of the cast without turning into a gallery: 14 portraits plus `+86` on wide screens, 10 plus `+90` on intermediate screens, and 8 plus `+92` on mobile.

### Portrait Case Card

Every case card leads with one large structural diagram. Metadata sits above it, while the Chinese title, summary, English source title, and circular arrow form a compact lower caption. One 46–52px avatar badge identifies the guide without interrupting comparison between structures.

### Generation Studio

The studio is a 3px black split frame: a yellow editor beside a larger mint preview, capped by a black 50px preview toolbar. Before generation, the case structure fills the empty state and a small portrait guide supports the explanatory copy. After generation, the sandboxed iframe replaces that authored empty state. The iframe's visual language is unconstrained model output and must never be treated as part of Vibe Case's component system.

### Skills Catalog

The Skills catalog extends the Functional Commons without changing its visual world. Search, category chips, collection metrics, pastel rotation, heavy portrait-ink outlines, ZCOOL KuaiLe titles, and Manrope operational copy follow the existing catalog system; the distinctive artifact is a functional map that makes each Skill legible as `SKILL.md → workflow → output` before the user opens it.

- **Grid:** two equal columns with a 20px gap inside the 1380px authored width. Below 760px it becomes one column. Cards keep a 520px minimum height on desktop and 480px on mobile so maps and summaries remain comparable.
- **Card Shell:** 2px portrait-ink border, 16px corners, 14px link padding, no resting shadow, and a seven-step pastel rotation through mint, sky, yellow, lavender, peach, sage, and rose. The rotation supplies community rhythm only; it does not encode category or status.
- **Functional Map:** a clean-cream inset with a 2px ink border, 14px corners, 18px padding, and a 276px minimum height. Its upper row splits approximately `.82 / 1.18` between the source block and workflow; the output spans the full lower row. On mobile the map uses 14px padding and a 240px minimum height.
- **Source:** the `SKILL.md` origin is a solid ink block with cream text, 12px corners, and 15px padding. Preserve the English source title even when it wraps.
- **Workflow:** show the first three steps as a centered vertical sequence with 22px numbered markers, 9px row gaps, and compact 12px graphite copy. This is a method preview, not a generic feature list.
- **Output:** use a full-width yellow-note bar with a 2px ink border, 11px corners, a 44px minimum height, and reserved right padding for the guide avatar.
- **Guide and Caption:** the approved portrait guide is 52px square, ink-outlined, and anchored to the output corner with the Guide Badge shadow. The Chinese Skill title uses ZCOOL KuaiLe at 29px; summary, install count, runnable-case count, and the 32px circular arrow stay in Manrope. Hover moves only the arrow 2px right and 2px up.

**The Source-to-Outcome Rule.** A Skill preview must reveal where the method came from, what it does, and what it produces in that order. Do not replace the functional map with a decorative thumbnail or let the portrait become the card's main image.

### Skill Detail

The detail page turns the compact map into an auditable method sheet. It pairs a large invitation and runnable-case action with a full source/workflow/output map, then follows with use conditions, provenance, parsing boundaries, and runnable examples.

- **Hero:** a lavender field with a 3px ink border, 26px corners, 42px padding, and a 560px minimum height. Desktop uses an approximately `.86 / 1.14` copy-to-map split with a fluid 38–76px gap. The title is ZCOOL KuaiLe at a fluid 54–86px, limited to about 10 characters per line; the summary is 18px Manrope at 1.7 line-height.
- **Detail Map:** a clean-cream frame with a 3px ink border, 20px corners, 22px padding, and 14px vertical gaps. The source is an ink block, the complete workflow is a ruled list, and the output is a yellow-note block with a 2px ink border. Preserve repository and Skill path text with anywhere wrapping rather than clipping or truncating provenance.
- **Guide Placement:** the 58px portrait guide sits in the source block's reserved upper-right space. At mobile size it becomes 48px and the source block keeps extra right padding so text never runs beneath it.
- **Method and Provenance:** “什么时候使用” is a `.72 / 1.28` two-column explanation and ruled trigger list with 72px vertical padding. Beneath it, a cream provenance strip exposes Status, Repository, License, Commit, and Installs in five ink-separated cells. The small green status mark is semantic availability, while a peach full-width boundary panel explains what the parser will not execute.
- **Responsive:** below 1040px the hero and method become single-column and provenance becomes two columns. Below 760px the page uses 16px side gutters, the hero uses 22px padding and 20px corners, the title becomes 50px, provenance becomes one column, and every former vertical divider becomes a horizontal 2px rule.

**The Provenance Is Product Rule.** Repository, path, license, commit, install count, sync status, and execution boundary are part of the usable Skill—not secondary legal copy. Keep them readable, linkable where implemented, and adjacent to the method they qualify.

### Skill Case Runner

Runnable Skill cases are compact workbenches, not generated-HTML previews. They preserve the site's existing buttons, focus treatment, error style, typography, and heavy outlines while making the editable Prompt, execution mode, and returned artifact explicit.

- **Case Grid:** two equal columns with a 20px gap and top alignment. Below 760px it becomes one column. Each case uses a 2px ink border, 18px corners, and 22px padding; alternating cases may use mint instead of clean cream. Mobile padding is 18px.
- **Heading and Mode:** use a 28px ZCOOL KuaiLe title with Manrope summary. The execution-mode badge is compact uppercase Manrope with a 1px ink border, 8px corners, and 6px × 8px padding; it names the actual path such as GPT Image 2 rather than adding a decorative status.
- **Input / Output Brief:** present example input and expected output in two equal cells between 2px top and bottom rules. Labels use the existing 11px uppercase metadata style; cell copy is 13px Manrope. On mobile the cells stack and the divider changes from vertical to horizontal.
- **Prompt Editor:** the seven-row textarea uses the mist canvas, a 2px ink border, 13px corners, 13px padding, and 1.55 line-height. Keep the editable Prompt visually larger than its controls.
- **Actions:** align Copy Prompt and Run Case to the right with a 10px gap, reusing the 48px secondary and primary buttons. Loading replaces the run icon with the existing spinner, and the primary action remains disabled while loading or while the Prompt is shorter than the implemented minimum. On mobile actions stack and each button spans the card width.
- **Result:** return content inside a 2px ink frame with 14px corners and a mist-canvas body. A minimum 42px ink toolbar names the result and carries the clear action. Images render at full card width; structured text uses a scrollable preformatted region capped at 520px with 18px padding and 14px / 1.65 Manrope copy. Preserve the live-region announcement and existing error component.

**The Runner Chrome / Output Boundary Rule.** The case frame, Prompt editor, controls, loading, errors, and result toolbar belong to Vibe Case. Generated images and structured result text are case output; they must not feed new colors, typography, or component rules back into the site system.

## Do's and Don'ts

### Do:

- **Do** use case structures and generated Preview as the dominant visual evidence.
- **Do** use the real `high-quality-100/` avatar derivatives as compact, provenance-bearing guide marks.
- **Do** anchor every pastel composition with portrait ink, usually through a 2–3px border and black typography.
- **Do** rotate pastels across adjacent case cards to create a varied community while keeping all functional states legible.
- **Do** use ZCOOL KuaiLe for identity and large statements, and Manrope Variable for every operational or long-reading surface.
- **Do** preserve visible keyboard focus, meaningful portrait alt text, 48px primary touch targets, and the reduced-motion override.
- **Do** keep the structural diagram primary and the portrait secondary wherever both appear.

### Don't:

- **Don't** revive the former specimen-ledger identity: no serif declarations, blueprint blue actions, contiguous square ruled grids, or archival-paper metaphor.
- **Don't** substitute stock photography, 3D avatars, emoji, gradients, or a second illustration family for the high-quality-100 cast.
- **Don't** reduce the interface to generic white SaaS cards; cream, heavy black outlines, pastel fields, and human portraits must remain visible.
- **Don't** use pastel color as a data taxonomy unless the product explicitly introduces that meaning.
- **Don't** let decorative portrait overlap obscure text, controls, focus rings, or mobile reading order.
- **Don't** turn a functional catalog into a portrait gallery; avatars must not set card height or delay search and filters.
- **Don't** extract or enforce any visual rule from model-generated HTML inside the sandboxed iframe.
