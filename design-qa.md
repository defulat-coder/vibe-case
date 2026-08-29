# Design QA — Option 2

- Source visual truth: `/Users/xbjt/.codex/generated_images/01a04cd3-fa5f-7e70-ab2f-c240a1199d07/exec-a9c6259d-4ff1-417d-859a-2842fe685893.png`
- Implementation screenshot: `/tmp/vibe-case-option2-implementation-desktop.png`
- Responsive evidence: `/tmp/vibe-case-option2-implementation-mobile.png`
- Side-by-side comparison: `/tmp/vibe-case-option2-comparison.png`
- Viewport and density: source and implementation are both 1487 × 1058 pixels at 1487 × 1058 CSS pixels and deviceScaleFactor 1. Mobile implementation is 390 × 844 CSS pixels at deviceScaleFactor 1.
- State: homepage, light theme, reduced motion enabled and entrance animation settled.

## Findings

No actionable P0, P1, or P2 differences remain within the user-approved scope.

- Fonts and typography: the existing ZCOOL KuaiLe and Manrope hierarchy, wording, wrapping, weights, and sizes were intentionally preserved. The compact header uses a computed 21px wordmark and 13px navigation text, matching the selected option.
- Spacing and layout rhythm: the selected change is isolated to navigation scale. The desktop header computes to 60px with a 34 × 34px avatar; mobile computes to 56px with a 32 × 32px avatar. Existing hero and content geometry stays unchanged, as required by the edit brief.
- Colors and visual tokens: `--paper` computes to `#eef3f6`, matching the selected mist-blue background. The pale-blue Preview surface, white working canvas, yellow primary action, black ink, and pastel case colors remain unchanged.
- Image quality and asset fidelity: the original production avatar assets are unchanged; no replacement, raster approximation, or new image asset was introduced.
- Copy and content: Chinese copy, English terms, case metadata, navigation labels, and calls to action are unchanged.

The ImageGen reference slightly rescaled the existing hero despite its own edit invariant. That drift is not treated as implementation authority because the user explicitly chose to preserve the current layout and change only background and navigation.

## Focused evidence

A separate crop was unnecessary because the two changed areas are fully visible at original resolution in the side-by-side comparison. Browser-computed measurements provide the focused navigation evidence: background `#eef3f6`, header `60px`, avatar `34px`, wordmark `21px`, and navigation text `13px`.

## Interaction and browser checks

- Header navigation opened `/collections/ui`.
- Searching for `Bento` returned 8 cases and updated the live result count.
- Opening the first filtered case succeeded.
- `生成效果` completed, produced one Preview iframe, and exposed the generation-record link.
- Console and runtime errors observed: 0.
- Desktop and mobile horizontal overflow: none.

## Comparison history

The first comparison found no P0/P1/P2 issue in the approved edit scope, so no visual fix iteration was required.

## Follow-up polish

No P3 item is required for this scoped refinement.

## User-directed avatar refinement

- Source truth: the user requested a clearly male header portrait and more footer portraits while keeping avatars secondary.
- Header evidence: `/tmp/vibe-case-header-male.png`; the header now uses `waker-avatar-hq-005.webp` at the existing 34px size.
- Footer evidence: `/tmp/vibe-case-footer-cast-visible.png`; the footer cast increased from 3 to 8 portraits and occupies 271px.
- Responsive check: the 390px viewport keeps all 8 portraits without page or footer overflow.
- React structure, accessibility semantics, navigation scale, and the feature-first hierarchy are unchanged.

## Refresh-randomized avatar sampling

- Source truth: the user requested random portrait sampling on every refresh, a male-only header pool, and a larger footer sample with a `+N` remainder.
- Three hard reloads produced different 14-image footer signatures; samples contained no duplicate within each footer set.
- The header varied only among `waker-avatar-hq-001`, `002`, and `005`, the inspected male portrait pool.
- Wide layout: 14 visible portraits and `+86`; mobile: 8 visible portraits and `+92`. Neither viewport overflowed horizontally.
- `avatar-random.test.ts` verifies stable per-slot assignment, candidate filtering, and sampling without replacement.

final result: passed
