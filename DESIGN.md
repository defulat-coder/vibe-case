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
  aqua-blue: "#9bded5"
  coral-link: "#c9442d"
  focus-oxide: "#8f2f24"
typography:
  display:
    fontFamily: "ZCOOL KuaiLe, sans-serif"
    fontSize: "clamp(52px, 6vw, 86px)"
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
    rounded: "{rounded.chip}"
---

# Design System: Vibe Case

## Overview

**Creative North Star: "The Functional Commons"**

Vibe Case is a functional case library made approachable by a friendly illustrated cast. UI structures, bilingual Prompt content, variables, and generated Preview are always the content authority; the 100 hand-drawn people act as compact guide marks that make cases recognizable without competing with the work. A cool mist canvas holds the world, deep black ink gives it confidence, and neutral cream surfaces keep dense catalogs calm while pastel portraits and rare tinted moments preserve warmth.

The functional authority is the case structure and its generated result. The user-pinned `high-quality-100/` portrait collection remains the brand authority: its loose black linework and flat pastel backgrounds inform decisive silhouettes, rounded controls, and the supporting palette. Portraits appear as small guide badges in card metadata rows and detail heroes plus one compact male guide tile in the header wordmark—not as the main artifact or as a reason to tint every container.

The system covers Vibe Case chrome and authored surfaces only. HTML produced by a model and displayed inside a sandboxed iframe is user output, not brand evidence; never extract colors, typography, spacing, components, or rules from that content.

**Key Characteristics:**

- Functional diagrams, Prompt content, and Preview surfaces lead the navigation and storytelling.
- Real black-and-white portrait characters provide secondary identity and human warmth.
- Neutral cream cards and light internal dividers keep repeated browsing surfaces quiet; ink silhouettes preserve confidence.
- ZCOOL KuaiLe makes identity and page-level statements feel loose and human; Manrope Variable owns repeated catalog titles and operational text.
- Pastel color stays concentrated in portrait assets, actions, and rare low-opacity detail or result moments.
- Structural UI diagrams are the primary visual evidence on catalog cards and case detail pages.
- The generated-result iframe is visually and semantically outside the site design system.

## Colors

The palette pairs a cool mist-gray canvas with the portrait collection's uncompromising black ink and cheerful low-chroma pastels. The authoritative values are the second `:root` block in `apps/web/app/globals.css`.

### Primary

- **Portrait Ink** (`portrait-ink`): all major text, strong outer silhouettes, active chips, the preview toolbar, and signature frames. Black establishes action and identity while light dividers organize repeated content internally.
- **Yellow Note** (`yellow-note`): primary actions, the text selection fill, and the record link on the black preview toolbar.

### Secondary

- **Mint Portrait** (`mint-portrait`): the default avatar-tile field, positive or ready states, and low-opacity prompt (12%) or preview-panel (18%) tints.
- **Coral Portrait** (`coral-portrait`): primary-button hover and rare emphasis; it is not a catalog-card background.
- **Peach Portrait** (`peach-portrait`): the case detail hero's 18% tint, never a repeated shell fill.

### Tertiary

- **Sky Portrait** (`sky-portrait`), **Lavender Portrait** (`lavender-portrait`), **Rose Portrait** (`rose-portrait`), **Sage Portrait** (`sage-portrait`): portrait-asset backgrounds and rare authored moments—lavender currently tints the Skill detail hero at 16%. They do not rotate across repeated catalog cards.
- **Aqua Blue** (`aqua-blue`): the `--blue` token, used only as an accent inside legacy case-diagram geometry.
- **Coral Link** (`coral-link`): the darker, readable coral for navigation hover, link underlines, and input carets.
- **Focus Oxide** (`focus-oxide`): the accessible focus outline, active-route text, and active-route underline. Keep it darker than decorative coral.

### Neutral

- **Mist Canvas** (`mist-canvas`): the global page and sticky header; its pale blue-gray keeps long browsing sessions bright without a yellow cast.
- **Deep Mist** (`deep-mist`): the quiet hover fill for secondary actions and neutral interaction feedback.
- **Clean Cream** (`clean-cream`): secondary actions, diagram paper, and all repeated catalog-card shells.
- **Soft Graphite** (`soft-graphite`): explanatory copy and low-priority metadata; it softens hierarchy without losing warmth.
- **Light Divider** (`light-divider`): 1px internal rules around diagrams, fields, prompt columns, result shells, and filter controls.

### Named Rules

**The Black Ink Rule.** Every pastel surface is anchored by portrait ink through text, a border, or an adjacent dark bar; pastel-on-pastel construction is not this system.

**The Cast, Not Status Rule.** Pastel variety belongs primarily to the portrait cast and rare supporting moments. Do not assign permanent meanings such as success, warning, or category to portrait pastels, except for the implemented ready-state mint.

**The Neutral-First Repetition Rule.** Repeated cards, filters, inputs, and result shells start from cream, mist, and light-divider neutrals. Earn pastel only for an avatar, a primary action, or one restrained contextual tint.

**The No Gradient Rule.** Site chrome uses flat color fields. Gradients may appear only inside the legacy abstract case-diagram geometry or inside model-generated iframe content, never as the site's ambient background.

## Typography

**Display Font:** ZCOOL KuaiLe (with sans-serif fallback)

**Body Font:** Manrope Variable (with sans-serif fallback)

**Label Font:** Manrope Variable

**Character:** ZCOOL KuaiLe brings the same irregular, marker-drawn energy as the portrait linework and is reserved for identity, page-level headlines, detail names, and section statements. Manrope Variable supplies a compact, legible working voice for repeated card titles, descriptions, controls, search, metadata, and English terminology.

### Hierarchy

- **Display** (400, fluid 52–86px, 1.03 line-height): page-defining Chinese statements and one-off detail names. Preserve the irregular silhouette and short measure; desktop hero copy stays around 10 characters wide and mobile settles at 48–50px.
- **Headline** (400, fluid 34–64px, 1 line-height): section statements, prompt headings, and generation titles.
- **Title** (850, 20px, 1.2 line-height): repeated UI case-card titles in Manrope Variable; Skills card titles rise to 22px at the same weight. ZCOOL KuaiLe remains available for one-off empty-state and runner headings.
- **Body** (400, 16px, 1.65 line-height): interface copy, descriptions, and prompt prose. Larger introductions rise to 17–20px with 1.7–1.75 line-height and stay near 54–58 characters per line.
- **Label** (900, 11px, 0.07em letter-spacing, uppercase where categorical): category names, prompt language markers, execution-mode badges, and preview chrome.

### Named Rules

**The Drawn Voice / Working Voice Rule.** ZCOOL KuaiLe speaks for identity, invitations, detail names, and section-level ideas; Manrope handles repeated card titles, every operational sentence, form value, filter, count, and long prompt.

**The Mixed-Script Confidence Rule.** Keep recognizable English terms such as Prompt, HTML, Skill, and Vibe Case in place; the display face is deliberately used across Chinese and English headlines.

## Layout

Authored content uses a centered maximum width of 1380px with 20px desktop gutters. The home page is a full-viewport introduction (`min-height: calc(100vh - 60px)`): “从案例开始” sits beside a neutral `home-stage` that shows one real case structure, its category and a direct Prompt entry, followed by two ruled library links (UI 案例 and Skills with live counts). The stage is the first functional proof; it uses one pale contextual tint and does not turn into a rainbow hero. The UI catalog uses a three-column grid and initially renders 18 of 92 cases; the Skills catalog uses two columns and a 12-item page budget. Both use 20px gaps and reveal subsequent batches through one centered Load More action. The case detail hero keeps a `.9 / 1.1` copy-to-structure split inside an 18% peach frame; the Skill detail hero keeps a `.86 / 1.14` copy-to-workflow split inside a 16% lavender frame; the generation studio gives roughly 60% of its width to Preview (`.78 / 1.22`).

At 1040px, the home introduction stacks, UI catalog grids become two columns, detail heroes become single-column, and the generation editor stacks above the preview. At 760px, primary content uses 16px side gutters, catalogs become one compact column, detail and prompt splits become one reading column, form variables stack, and actions become full-width vertical controls. UI cards change composition rather than merely shrinking: each becomes a compact horizontal row with a 132px square diagram and text to its right. Skills cards remain vertically composed but shed their fixed minimum link height so each card follows its clamped content. The mobile header keeps both internal UI and Skills destinations at 44px minimum height. Primary category clusters stay in one horizontally scrollable rail while the specific-category select moves below it at full width.

UI discovery exposes five durable clusters—进入与转化, 营销与增长, 产品结构, 内容与数据, and 系统与状态—plus a 更多分类 select for the 15 exact source categories. Skills discovery uses four clusters—图片与视觉, 界面与体验, 产品方法, and 动效与视频—plus its exact-category select. Search or category changes reset the visible batch to the first page. Search uses `history.replaceState` so typing stays out of browser-history noise; category changes use `history.pushState`, and a `popstate` listener restores query/category and resets the visible batch. Unknown category values fall back to 全部 and are canonicalized out of the URL, including when reached through browser history. Catalog search matches titles, summaries, tags, and category labels, and maps whole-word Chinese synonyms （定价, 页脚, 导航…) back to the English category ids so Chinese-first queries recall the full set.

**Mobile Catalog Density Test.** At a representative 390px viewport, the initial 18-card UI catalog should remain near 5,016px total page height rather than the former roughly 8,753px stack. Preserve the 188px intrinsic card estimate and the three-line summary limit when changing mobile card content.

Vertical space is generous around narrative moments (roughly 62–112px of page padding) and compact inside working controls (8–30px). The sticky header is 60px on desktop and 56px on mobile. Form grids, Prompt text, and result controls stay aligned and predictable.

### Named Rules

**The Functional Area Rule.** Case structures, Prompt text, inputs, and Preview own the largest uninterrupted surfaces. Portraits stay within compact guide badges and never enter functional hit areas.

**The One-Column Work Rule.** Below 760px, every task-oriented split becomes a single column. Only the primary category-cluster rail may keep lateral movement; the exact-category select occupies its own full-width row.

## Elevation & Depth

The system is flat in color but lightly physical in composition. Black ink defines signature outer silhouettes and actions; repeated shells and internal structure use light 1px dividers so dense catalogs do not feel boxed in. Low, tight shadows lift actionable buttons and focused fields just enough to feel placed on the mist canvas; cards, avatars, and large containers cast no shadow at all.

### Shadow Vocabulary

- **Action Rest** (`0 9px 22px -17px rgba(11, 11, 13, .8)`): restrained lift under primary buttons.
- **Action Hover** (`0 13px 26px -17px rgba(11, 11, 13, .9)`): slightly stronger button response, paired with the inherited 1px upward motion.
- **Field Focus** (`0 9px 22px -18px rgba(11, 11, 13, .8)`): small ambient lift on focused Prompt and variable fields.
- **Search Focus** (`0 2px 0 var(--focus)`): a second underline weight that turns the catalog search into one focused control.

### Named Rules

**The Ink Before Shadow Rule.** A signature frame or action earns hierarchy from its ink silhouette before shadow. Repeated cards and internal partitions use 1px ink or light-divider rules; add a shadow only when the object is actionable or focused.

## Shapes

The dominant silhouette is a rounded functional frame. Controls use 12–14px corners, cards use 16px, and detail heroes, studios, and record frames use 18–26px. No circular buttons or medallions remain in the chrome; circular geometry appears only inside abstract case-diagram variants. Primary buttons and avatar badges keep 2px ink outlines; catalog cards use 1px ink, detail heroes and studios use 2px ink, and internal diagrams, prompt columns, fields, and result shells use 1px light-divider rules. The saved-generation record frame (`generation-frame`) keeps the system's only 3px signature outline.

### Named Rules

**The Guide Badge Rule.** Avatars use a square crop, a 2px black outline, 12px corners, and a fixed footprint: 44px in card metadata rows, 64px above detail-hero copy. They identify or accompany a case; they do not replace its structure.

**The Radius Follows Scale Rule.** Small controls stay at 12–14px, cards at 16px, and large portrait or studio frames at 20–26px. Do not apply pill shapes to ordinary containers.

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
- **State:** hover lifts only to deep mist—ink inversion is reserved for the selected chip alone, so a passing cursor never reads as a second selection. Every chip carries `aria-pressed` so the current filter is announced. Counts remain inline and tabular; cluster rails scroll horizontally rather than wrapping. A matching 44px exact-category select sits beside the rail on desktop and below it on mobile. When a leaf category from that select is active, the rail gains a dismissible ink token (label + ×, `aria-label` 清除分类筛选) and its parent cluster keeps an ink border with an inset underline (`has-leaf`) so the current filter and its cluster stay visible outside the select. Pagination progress is announced in the same `aria-live` region as the result count（找到 92 个案例，已显示 36 个）.

### Cards / Containers

- **Corner Style:** case and Skill cards use 16px outer corners; the card diagram frame uses 14px; large detail, studio, and record containers use 18–26px.
- **Background:** repeated UI and Skills catalog cards are clean cream. UI-card hover mixes 45% deep mist into cream; Skill cards keep a quiet neutral shell. Pastel rotation is reserved for portrait assets and rare authored contexts.
- **Shadow Strategy:** cards stay shadowless. Only buttons and focused fields lift.
- **Border:** 1px ink for card shells, 1px light divider for internal functional frames, 2px ink for detail heroes or studios, and 3px ink for the generation record frame alone.
- **Internal Padding:** 12px at the case-card shell (11px on mobile), 18px in a Skill-card link, 28px in the generation editor, and 40–42px in a desktop detail hero.

### Inputs / Fields

- **Style:** mist-canvas fill, 1px light-divider border, 13–14px corners, 13px padding, and Manrope body text. The catalog search is the intentional exception: borderless content on the mist canvas, anchored by a double-weight black underline.
- **Focus:** shift ordinary field borders to ink and add a small black ambient shadow; the global 3px focus-oxide outline with 3px offset remains the keyboard fallback. When the catalog search contains focus, its underline changes to focus oxide and gains a second 2px focus-oxide shadow so the label reads as one focused control rather than a loose icon and input.
- **Help / Error / Disabled:** put concise requirements directly below the field in 12px graphite text. Generation errors stay inline with `role="alert"`; disabled primary actions use 45% opacity and retain explanatory help rather than relying on opacity alone.

### Navigation

The sticky header sits directly on the mist canvas with a 1px black bottom rule and no blur. The wordmark pairs one compact 34px male guide tile with “Vibe Case” in 21px ZCOOL KuaiLe (20px on mobile). Navigation holds exactly two internal links—UI 案例 and Skills—in 13px extra-bold Manrope, 44px minimum height, and 5px horizontal padding. Hover turns darker coral (`#c9442d`); the active route uses focus oxide plus a 2px inset underline and `aria-current="page"`, and the active state extends to case, Skill, and generation sub-pages. The header is 60px on desktop and 56px on mobile; on mobile the nav gap tightens to 2px and link padding grows to 7px, but both destinations remain visible. There is no site footer.

### Avatar Tile

Avatar tiles use the production derivatives of the `high-quality-100/` source set—100 square WebP files under `apps/web/public/avatars/`—cropped square with `object-fit: cover` and the asset's own pastel field intact. Catalog cards and detail heroes pass a `randomKey` (`case:{id}` or `skill:{id}`) to the per-session sampler, which deals portraits without replacement and reshuffles on a hard refresh while keeping the same case/Skill guide consistent during one session. The header passes the stable `dataKey="header"` so its compact male Guide mark remains recognizable.

Placement is deliberately narrow: 44px `card-data-avatar` tiles in case-card and Skill-card metadata rows, 64px `detail-data-avatar` tiles above case and Skill detail-hero copy, and one 34px male Guide tile in the header. The home stage remains functional-first and does not add a portrait to its structure. Functional cards use empty alt text because their link and diagram already name the case; use descriptive alt text only when the person itself carries information. Do not recolor, filter, redraw, or mix unrelated portrait styles into the cast.

### Portrait Case Card

Every case card is a cream, 1px-ink shell whose link leads with a metadata row—the 11px category label on the left that preserves mixed-script casing, the 44px guide avatar on the right—followed by one large structural diagram inside a 1px light-divider frame (1.5 aspect ratio), then the Chinese title and summary. Repeated Chinese titles use Manrope Variable at 20px / 850; summaries are 14px graphite. There is no English source title and no circular arrow on the card. The link keeps a 330px minimum height on desktop, hover mixes deep mist into the cream shell, and `content-visibility: auto` with a 390px intrinsic estimate keeps long catalogs cheap.

Below 760px, preserve the compact horizontal card as a distinct mobile composition:

- **Structure:** use a two-column grid with a fixed 132px visual column, a fluid text column, a 14px column gap, and 11px shell padding. Metadata spans both columns above the row; the card has no fixed minimum height and uses a 188px intrinsic-size estimate.
- **Diagram:** render the structure at exactly 132px square with 12px internal padding. The guide avatar stays in the metadata row at 44px; it is not overlaid on the diagram.
- **Copy:** place text to the right with 5px vertical padding. The title becomes 18px Manrope / 850 and the summary clamps to three lines.
- **Priority:** do not move the avatar or diagram above the copy again on mobile. The horizontal relationship is what preserves rapid scanning across the initial 18 cases.

### Generation Studio

The studio is a 2px black split frame with 24px corners and a 1px ink gutter: a clean-cream editor (28px padding, minimum 360px column) beside a preview softly tinted with 18% mint, capped by a black 50px toolbar. The editor opens with a 40px ZCOOL “生成页面” heading and a clear-result icon button once output exists. The 8-row Prompt textarea (8,000-character cap) and the variable inputs (500-character cap each, two-column grid) use mist fills and light 1px dividers. The `#generation-studio` target is programmatically focusable after hash navigation so keyboard and assistive-technology users land in the work area. Completed HTML and its record id are kept separately from the active request, so a retry can leave the last successful preview and record link available until a new response succeeds.

Prompt help states the 20-character minimum and explicitly says the draft is saved for the current browser session; if session storage is unavailable, the help text swaps to a warning to copy the Prompt before leaving. Reassurance says generation may take tens of seconds and that the reference image is not saved. An oversized image produces an inline 5MB `role="alert"` error, and a selected reference always exposes a 44px 移除 action. The primary action is disabled below 20 characters and swaps 生成效果 for 停止生成 while loading. Generation failures map network, malformed-response, and service errors to actionable Chinese copy instead of exposing provider internals; Prompt, variables, and any previous result remain available.

The preview has three authored states: an empty line (“生成结果会显示在这里”), a loading spinner, and the sandboxed iframe (`sandbox="allow-scripts"`, `referrerPolicy="no-referrer"`) whose `srcDoc` is hardened by `secureSrcDoc`—`<base>` and refresh metas are stripped and a CSP meta locks the document to inline styles/scripts and `data:`/`blob:` images with `connect-src 'none'`. The toolbar names the state (预览 / 正在生成 / 生成完成) and carries a yellow 打开记录 link to `/generations/[id]` once complete. The iframe's visual language is unconstrained model output and must never be treated as part of Vibe Case's component system.

Prompt and variable drafts are scoped per case and versioned in `sessionStorage` under `vibe-case:generation-draft:v1:{caseId}`; they last for the current browser session, survive a reload, and never include the reference image or generated output. Restore only schema-valid version-1 data, with Prompt length capped at 8,000 characters and each variable value capped at 500 characters. Malformed JSON, a version mismatch, or an invalid shape must fail closed to the case defaults without surfacing a blocking error.

Hydration order is part of this UX contract: read and restore the draft on the next animation frame, mark the draft ready only after that pass, and do not write defaults back to storage before readiness. Subsequent Prompt or variable changes may then update the same per-case key. This prevents the initial render from erasing a valid saved draft.

When `AI_GATEWAY_API_KEY` is not configured, `/api/generate` completes the record with a local mock result (`createMockResult`) instead of calling a model, so the full studio flow remains demonstrable without AI credentials.

The saved-record page (`/generations/[id]`) is dynamic: a back link to the case, a ZCOOL display title, the stored HTML in the 3px-ink `generation-frame` (height `min(75vh, 850px)`, same sandbox and CSP treatment), a 本次 Prompt section, and a “结果尚未就绪” empty state while the record is pending.

**Draft Recovery Test.** For `auth-1`, edit both the Prompt and the brand variable, reload, and confirm both values return. A malformed storage value must be ignored and must not break the studio.

### Skills Catalog

The Skills catalog extends the Functional Commons without changing its visual world. Search, category controls, neutral card shells, portrait guides, and Manrope working titles follow the refined catalog system; each card is a compact summary—guide, category, case count, title, and summary—with no functional map.

- **Grid:** two equal columns with a 20px gap inside the 1380px authored width. Below 760px it becomes one column.
- **Card Shell:** clean-cream fill, 1px portrait-ink border, 16px corners, 18px link padding, and no resting shadow. Do not rotate pastel backgrounds across Skill cards.
- **Meta Row:** a three-part grid—44px guide avatar, an 11px / 900 category label that preserves mixed-script casing, and the “N 个案例” count—separated from the copy below.
- **Copy:** the Chinese Skill title uses Manrope Variable at 22px / 850 on desktop and 20px on mobile; the summary is graphite at 1.6 line-height and clamps to three lines on mobile. The desktop link keeps a 230px minimum height; mobile removes it so the card follows its clamped content, with copy padding tightened to 16px 4px 34px.
- **Discovery:** expose four clusters—图片与视觉, 界面与体验, 产品方法, and 动效与视频—plus a specific-category select. The 12-item page budget resets whenever search or category changes.

### Skill Detail

The detail page turns the compact card into an auditable method sheet: a hero pairing the invitation with the full workflow, then use conditions with source attribution, the bilingual Skill source text, and runnable cases. The `#skill-cases` target receives focus after hash navigation so the “运行案例” action has a clear keyboard destination.

- **Hero:** a restrained 16% lavender / cream tint with a 2px ink border, 26px corners, 42px padding, and a 460px minimum height. Desktop uses an approximately `.86 / 1.14` copy-to-workflow split with a fluid 38–76px gap. The 64px guide avatar sits above the copy; the title is ZCOOL KuaiLe at a fluid 54–86px, limited to about 10 characters per line; the summary is 18px Manrope at 1.7 line-height. Actions are a primary 运行案例 anchor to the case grid and a 查看原 Skill external text link. The right column presents 工作流程 as a 34px ZCOOL heading over a complete ordered list ruled by 1px dividers.
- **Use Conditions and Source:** “适用场景” is a `.72 / 1.28` two-column section with 72px vertical padding—a ZCOOL statement beside a lightly ruled trigger list (16px rows at 750 weight). A full-width source line credits the origin repository (linked) and license; there is no separate provenance strip.
- **Skill Source Text:** “Skill 原文” renders the Chinese translation in a 78ch measure with ZCOOL headings (34/28/22/18px), mist code chips, divider-ruled tables, and pre blocks capped at 480px; the English original `SKILL.md` folds into a `details` element below. Relative images and links in the markdown resolve back to the source repository as raw/blob URLs at the pinned commit.
- **Responsive:** below 1040px the hero and method become single-column. Below 760px the page uses 16px side gutters, the hero drops its minimum height and uses 22px padding and 20px corners, the title becomes 50px, and the summary 16px.

### Skill Case Runner

Runnable Skill cases are compact workbenches, not generated-HTML previews. They preserve the site's existing buttons, focus treatment, error style, typography, and neutral internal dividers while making the editable Prompt, execution mode, and returned artifact explicit.

- **Case Grid:** two equal columns with a 20px gap and top alignment. Below 760px it becomes one column. Each case uses a clean-cream fill, 1px light-divider border, 18px corners, and 22px padding. Do not alternate pastel fills. Mobile padding is 18px.
- **Heading and Mode:** use a 28px ZCOOL KuaiLe title with Manrope summary. The execution-mode badge is a compact Manrope label with a 1px ink border, 8px corners, and 6px × 8px padding; it preserves the actual path's casing in Chinese—GPT Image 2, Prompt 提炼, 结构化输出, or 时间线方案—rather than exposing internal enum values or adding a decorative status.
- **Prompt Editor:** the seven-row textarea uses the mist canvas, a 1px light-divider border, 13px corners, 13px padding, and 1.55 line-height. Keep the editable Prompt visually larger than its controls. A dynamic helper below the field states the 20-character minimum (including the remaining count when short) and is associated with the textarea through `aria-describedby`, so a disabled run action always has an explanation.
- **Actions:** align 复制 Prompt and 运行案例 to the right with a 10px gap, reusing the 48px secondary and primary buttons. Copy changes to a check icon and “已复制” for 1.6 seconds; clipboard failure becomes the shared inline error. Loading replaces the run icon with the existing spinner, marks the case `aria-busy`, announces the running/completed state through a polite status region, and the primary action remains disabled while loading or while the Prompt is shorter than 20 characters. Retrying keeps the previous result visible until a new response succeeds; network, non-JSON, and invalid-result failures explain that the Prompt and previous result remain available and offer a retry path. On mobile actions stack and each button spans the card width.
- **Result:** return content inside a 1px light-divider frame with 14px corners and a mist-canvas body. A minimum 42px ink toolbar names the result and carries the clear action. Images render at full card width; structured text uses a scrollable preformatted region capped at 520px with 18px padding and 14px / 1.65 Manrope copy. Preserve the live-region announcement and existing error component. New results enter over 200ms with the shared emphasized easing.

**The Runner Chrome / Output Boundary Rule.** The case frame, Prompt editor, controls, loading, errors, and result toolbar belong to Vibe Case. Generated images and structured result text are case output; they must not feed new colors, typography, or component rules back into the site system.

### Copy Button

The shared copy button (case Prompt columns and Skill Runner Prompt actions) is a standard 48px secondary button whose feedback is semantic rather than spatial: success swaps the Copy icon for a check and “已复制” for 1.6 seconds, announced through `aria-live="polite"`. When the Clipboard API is unavailable (insecure context or denied permission), it falls back to a hidden-textarea `execCommand("copy")`; if that also fails, the label or inline error reads “复制失败，请重试” instead of silently resetting.

### Functional Motion & State Feedback

Motion exists to confirm a data or task transition, never to decorate a resting screen. Filter changes settle the result grid over 200ms using `cubic-bezier(.16, 1, .3, 1)`, fading from 65% opacity and translating upward 5px; each Load More action keeps existing cards mounted and animates only the appended cards from 55% opacity and 6px lower. Skill results use the same 200ms easing. Under `prefers-reduced-motion`, all transitions and animations collapse to 0.01ms, and the loading spinner swaps its rotation for a 1.2s opacity pulse (`spin-pulse`) so “in progress” feedback survives without movement.

Generation swaps Generate for Stop while loading, keeps the spinner local to the action, announces result containers as live regions, and provides a visible clear/reset control after content arrives.

**The Functional Motion Rule.** Animate only the changed result set, newly arrived output, or control state that the user caused. Do not animate neutral cards, pastel tints, or portraits merely to make the page feel active.

### Focus, Touch & Generation Guidance

- **Focus:** every keyboard-focusable control keeps the global 3px focus-oxide outline with 3px offset. Active navigation color and underline supplement `aria-current`; they never replace focus.
- **Touch:** primary and secondary actions remain 48px high. Navigation links, cluster chips, exact-category selects, Load More, and reference-image removal provide at least 44px height. Preserve these targets when labels translate or wrap.
- **Generation Preconditions:** state the 20-character Prompt minimum before the user reaches a disabled action. For reference images, show the 5MB limit as an inline error, retain the file picker, and provide an explicit Remove action after selection.
- **Draft Persistence:** tell users that Prompt and variables are automatically saved only for the current browser session. Scope drafts by case and schema version, restore them before enabling writes, and ignore corrupted or obsolete data safely.
- **Generation Expectation:** tell users that generation may take tens of seconds and that the reference image is used only for the current request and is not persisted by the current version. Loading, stop, retryable error, completion, open-record, and clear-result states must each have visible text, not icon-only meaning.
- **Failure Continuity:** generation failure copy must explicitly state that the current Prompt and variables remain available, then offer a retry path and a second-step suggestion to wait or check AI configuration. Failure must not clear the draft, reference selection, or editable fields.

## Do's and Don'ts

### Do:

- **Do** use case structures and generated Preview as the dominant visual evidence.
- **Do** use the real `high-quality-100/` avatar derivatives as compact, stable guide marks in card metadata rows and detail heroes.
- **Do** start repeated catalog cards and working shells from clean cream or mist, then use 1px light dividers for internal structure.
- **Do** reserve pastel color for portrait assets, primary actions, and rare low-opacity contextual moments.
- **Do** use ZCOOL KuaiLe for identity and large statements, and Manrope Variable for repeated card titles plus every operational or long-reading surface.
- **Do** preserve the 3px focus-oxide outline, meaningful portrait alt text, 48px primary actions, 44px navigation/filter targets, and the reduced-motion override.
- **Do** keep the structural diagram primary and the portrait secondary wherever both appear.
- **Do** keep mobile UI cards in the 132px-diagram horizontal composition and let mobile Skills cards size to their clamped content.
- **Do** restore versioned per-case Prompt and variable drafts before allowing new session writes, and keep them through generation errors.
- **Do** explain Prompt requirements, generation duration, reference-image limits, persistence behavior, and recoverable errors next to the relevant control.

### Don't:

- **Don't** revive the former specimen-ledger identity: no serif declarations, blueprint blue actions, contiguous square ruled grids, or archival-paper metaphor.
- **Don't** substitute stock photography, 3D avatars, emoji, gradients, or a second illustration family for the high-quality-100 cast.
- **Don't** confuse neutral-first with generic white SaaS cards; preserve structural diagrams, decisive ink silhouettes, characterful page-level type, and compact portrait guides.
- **Don't** use pastel color as a data taxonomy unless the product explicitly introduces that meaning.
- **Don't** let decorative portrait overlap obscure text, controls, focus rings, or mobile reading order.
- **Don't** turn a functional catalog into a portrait gallery; the header Guide remains a compact identity mark, and avatars must not set card height or delay search and filters.
- **Don't** restore tall vertical UI cards or a fixed Skills-card link minimum below 760px; both undo the mobile catalog-density gain.
- **Don't** use 2–3px black rules for repeated internal partitions when a 1px light-divider rule communicates the structure.
- **Don't** let first-render defaults overwrite a saved draft, trust unparsed browser storage, or claim persistence beyond the current session.
- **Don't** hide a disabled generation action's requirement, surface upload limits through blocking alerts, or use motion without a user-caused state change.
- **Don't** extract or enforce any visual rule from model-generated HTML inside the sandboxed iframe.
