---
name: Vibe Case
description: A Chinese-first AI case library inhabited by a friendly cast of hand-drawn pastel portrait guides.
colors:
  creamy-canvas: "#fff8e9"
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

**Creative North Star: "The Pastel Portrait Commons"**

Vibe Case is a friendly illustrated community of ideas. A real cast of 100 hand-drawn people turns an abstract prompt library into a place where each case has a recognizable guide: warm cream holds the world, heavy black ink gives it confidence, and alternating pastel portrait fields keep a dense catalog social and inviting. The mood is playful, direct, and handmade without becoming childish.

The visual authority is the user-pinned `high-quality-100/` portrait collection and its production WebP derivatives. Their loose black linework, large black clothing and hair shapes, unfilled skin, simple expressions, and flat mint, peach, blue, lavender, rose, yellow, sage, and coral backgrounds define the identity. The interface echoes those images through heavy outlines, generous rounded rectangles, compact structural insets, and slightly rotated portrait groups. It is not a technical ledger, a generic SaaS gallery, or an imitation of VibeUI.

The system covers Vibe Case chrome and authored surfaces only. HTML produced by a model and displayed inside a sandboxed iframe is user output, not brand evidence; never extract colors, typography, spacing, components, or rules from that content.

**Key Characteristics:**

- Real black-and-white portrait characters are the primary navigation and storytelling device.
- Cream canvas and full black outlines unify an intentionally broad pastel rotation.
- ZCOOL KuaiLe makes Chinese and mixed-script headlines feel loose and human; Manrope Variable keeps operational text precise.
- Rounded, bordered cards and controls feel like physical portrait prints and notes.
- Structural UI diagrams remain small supporting insets; they never displace the character.
- The generated-result iframe is visually and semantically outside the site design system.

## Colors

The palette comes directly from the portrait backgrounds: a warm cream room, uncompromising black ink, and cheerful low-chroma pastels that rotate across people and cases.

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

- **Creamy Canvas** (`creamy-canvas`): the global page, sticky header, and warm negative space.
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
- **Title** (400, 25px, 1.2 line-height): case-card titles and compact portrait-led empty-state headings.
- **Body** (400, 16px, 1.65 line-height): interface copy, descriptions, and prompt prose. Larger introductions rise to 17–20px with 1.7–1.75 line-height and stay near 54–58 characters per line.
- **Label** (900, 11px, 0.07em letter-spacing, uppercase where categorical): case numbers, category names, prompt language markers, status badges, and preview chrome.

### Named Rules

**The Drawn Voice / Working Voice Rule.** ZCOOL KuaiLe speaks for identity, invitations, and section-level ideas; Manrope handles every operational sentence, form value, filter, count, and long prompt.

**The Mixed-Script Confidence Rule.** Keep recognizable English terms such as Prompt, HTML, Magic Link, and Vibe Case in place; the display face is deliberately used across Chinese and English headlines.

## Layout

Authored content uses a centered maximum width of 1380px with 20px desktop gutters. The home hero deliberately breaks a conventional split: copy occupies roughly 58% while an absolutely positioned portrait cast overlaps the right 62% and encroaches toward the statement. Catalogs use a three-column grid, or four columns for the compact featured set, with a 20px gap. Detail heroes use a `.9 / 1.1` copy-to-portrait split inside one large peach frame, and the generation studio uses a `.88 / 1.12` editor-to-preview split.

At 1040px, catalog grids become two columns, the portrait cast returns to normal document flow, collection introductions stack, and the generation editor stacks above the preview. At 760px, primary content uses 16px side gutters, catalogs become one column, detail and prompt splits become one reading column, form variables stack, and actions become full-width vertical controls. The first internal navigation link disappears while the source link and avatar wordmark remain. Category filters stay in a single horizontally scrollable row.

Vertical space is generous around narrative moments (roughly 66–120px) and compact inside working controls (8–30px). The sticky header is 82px on desktop and 74px on mobile. Portrait clusters may overlap and rotate; form grids, prompt text, and result controls must stay aligned and predictable.

### Named Rules

**The Encroaching Cast Rule.** Portraits may overlap, rotate a few degrees, and enter the copy's visual territory when they make the community feel present; functional text and controls must retain a clear reading path and hit area.

**The One-Column Work Rule.** Below 760px, every task-oriented split becomes a single column. Only portrait compositions and the category rail may keep lateral movement.

## Elevation & Depth

The system is flat in color but lightly physical in composition. Thick black borders establish most hierarchy. Low, tight shadows lift portrait prints, diagram insets, and actionable buttons just enough to feel placed on the cream canvas; large generic card shadows are absent. Rotation and overlap provide more depth than blur.

### Shadow Vocabulary

- **Action Rest** (`0 9px 22px -17px rgba(11, 11, 13, .8)`): restrained lift under primary buttons and focused fields.
- **Action Hover** (`0 13px 26px -17px rgba(11, 11, 13, .9)`): slightly stronger button response, paired with the inherited 1px upward motion.
- **Portrait Print** (`0 18px 34px -25px rgba(11, 11, 13, .8)`): the hero cast's tactile portrait lift.
- **Inset Note** (`0 12px 22px -18px rgba(11, 11, 13, .8)`): the small structural diagram attached to a case card.
- **Detail Note** (`0 16px 30px -23px rgba(11, 11, 13, .9)`): the rotated diagram pinned over a detail portrait.

### Named Rules

**The Ink Before Shadow Rule.** A surface earns its hierarchy from a 2–3px black outline first. Add a shadow only when the object is physically overlapping, actionable, or temporarily lifted.

## Shapes

The dominant silhouette is a friendly rounded portrait print. Controls use 12–14px corners, cards use 16px, studios and hero portraits use 20–26px, and the largest detail frame uses 28px. Circular geometry is reserved for the central 92-case note, the case-card arrow, and footer portrait medallions. Borders are almost always full black and 2px; large heroes and studios increase to 3px. Slight rotations of roughly 2–7 degrees make clustered objects feel hand-placed, never messy.

### Named Rules

**The Portrait Frame Rule.** When a real avatar is a focal object, give it a square crop, a full black outline, and rounded corners; never mask a primary portrait into an anonymous decorative blob.

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

- **Corner Style:** case cards use 16px outer corners; the full-bleed portrait inside uses 14px; large detail and studio containers use 24–28px.
- **Background:** catalog cards rotate through the defined portrait pastels. Copy and imagery live inside one color family per card; a translucent clean-cream wash is allowed only on hover.
- **Shadow Strategy:** cards stay shadowless. Only overlapping portrait prints, the small structural inset, and active controls lift.
- **Border:** 2px portrait ink for cards and 3px for hero or studio frames.
- **Internal Padding:** 12px at the card shell, 18px around card copy, 30px in the generation editor, and 42px in a desktop detail hero.

### Inputs / Fields

- **Style:** clean-cream fill, 2px portrait-ink border, 14px corners, 13px padding, and Manrope body text. The catalog search is the intentional exception: borderless content on the cream canvas, anchored by a double-weight black underline.
- **Focus:** keep the black border and add a small black ambient shadow; the global 3px coral focus-visible outline remains the keyboard fallback.
- **Error / Disabled:** generation errors use dark coral text on pale coral with a 1px coral border and 9px corners. Disabled primary actions use 45% opacity.

### Navigation

The sticky header sits directly on the creamy canvas with a 2px black bottom rule and no blur. The wordmark pairs a 48px rounded avatar tile with a 26px ZCOOL KuaiLe name. Navigation uses compact extra-bold Manrope; hover turns darker coral. On mobile the avatar becomes 44px and the collection link is removed to preserve the source link without crowding.

### Avatar Tile

Avatar tiles use the production derivatives of the `high-quality-100/` source set, cropped square with `object-fit: cover`. The asset's own pastel field must remain intact. Use descriptive alt text when a portrait identifies a case; use empty alt text or `aria-hidden` when a cast is purely atmospheric. Do not recolor, filter, redraw, or mix unrelated portrait styles into the cast.

### Portrait Case Card

Every case card leads with one real avatar and overlays a small structural case diagram at the lower right. Metadata sits above the portrait, while the Chinese title, summary, English source title, and circular arrow form a compact lower caption. The avatar is the guide and the diagram is evidence of structure; never reverse their visual priority.

### Generation Studio

The studio is a 3px black split frame: a yellow editor beside a mint preview, capped by a black 50px preview toolbar. Before generation, a smaller portrait holds the empty state. After generation, the sandboxed iframe replaces that authored empty state. The iframe's visual language is unconstrained model output and must never be treated as part of Vibe Case's component system.

## Do's and Don'ts

### Do:

- **Do** use the real `high-quality-100/` avatar cast or its provenance-bearing production derivatives as the dominant visual evidence.
- **Do** anchor every pastel composition with portrait ink, usually through a 2–3px border and black typography.
- **Do** rotate pastels across adjacent case cards to create a varied community while keeping all functional states legible.
- **Do** use ZCOOL KuaiLe for identity and large statements, and Manrope Variable for every operational or long-reading surface.
- **Do** preserve visible keyboard focus, meaningful portrait alt text, 48px primary touch targets, and the reduced-motion override.
- **Do** keep the portrait primary and the structural diagram secondary wherever both appear.

### Don't:

- **Don't** revive the former specimen-ledger identity: no serif declarations, blueprint blue actions, contiguous square ruled grids, or archival-paper metaphor.
- **Don't** substitute stock photography, 3D avatars, emoji, gradients, or a second illustration family for the high-quality-100 cast.
- **Don't** reduce the interface to generic white SaaS cards; cream, heavy black outlines, pastel fields, and human portraits must remain visible.
- **Don't** use pastel color as a data taxonomy unless the product explicitly introduces that meaning.
- **Don't** let decorative portrait overlap obscure text, controls, focus rings, or mobile reading order.
- **Don't** extract or enforce any visual rule from model-generated HTML inside the sandboxed iframe.
