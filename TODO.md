# Tailwind v4 Migration — Johanna Schwabe Portfolio

## Branch
`tailwind-migration` (create from `josefs-changes`)

## Stack
- React 18 + Vite 5
- Tailwind CSS v4.2.1 + `@tailwindcss/vite`
- No config file in v4 — CSS-first via `@import "tailwindcss"` in `index.css`

## Design Tokens to Preserve (from current `:root`)
```
--color-dark-text:  #1a1a1a
--color-light-text: #f5f3f0
--color-light-bg:   #fafaf8
--color-dark-bg:    #1a1a1a
--font-heading:     'Aileron', sans-serif   (used for h1/h2/h3, logo)
--font-body:        'Montserrat', sans-serif
--h1-size: 140px → 100px → 60px → 48px   (1400px / 768px / 480px)
--h2-size:  70px →  52px → 36px → 30px
--h3-size:  32px →  27px → 22px → 19px
--h4-size:  21px →  19px → 17px → 15px
--body-size: 18px → 16px → 15px → 14px
```
Define as `@theme` variables in `index.css`.

---

## Phase 1 — Setup ✅ / ⬜
- [x] Install `tailwindcss@4.2.1` + `@tailwindcss/vite`
- [ ] Create `tailwind-migration` branch
- [ ] Add `@tailwindcss/vite` plugin to `vite.config.js`
- [ ] Replace `index.css` content: `@import "tailwindcss"` + `@theme {}` tokens
- [ ] Verify dev server builds and `npm run build` passes

## Phase 2 — Global Styles + Typography
- [ ] `@layer base` — body, h1–h4 font/size rules using custom tokens
- [ ] Fluid type scale via Tailwind breakpoint classes (`text-[140px] lg:text-[100px]` etc.)
- [ ] Smooth scroll, box-sizing, reset utilities
- [ ] Font import (@cdnfonts Aileron) kept in `index.css`

## Phase 3 — Header / Navbar (`Header.jsx`)
Current: scroll-aware frosted glass, brand name fade-in, View Work CTA, mobile hamburger
- [ ] Replace all header CSS with Tailwind utilities
- [ ] Frosted glass: `backdrop-blur-xl bg-white/90 border-b border-black/7 shadow-sm`
- [ ] Brand fade-in: keep `useState` scroll logic, toggle Tailwind `opacity-0`/`opacity-100 translate-y-0`
- [ ] Mobile: hamburger in nav flow, dropdown panel (`rounded-2xl shadow-xl bg-white/95 backdrop-blur-xl`)
- [ ] View Work CTA: `border border-white/55 rounded px-3 py-1 hover:bg-dark-text hover:text-light-text`

## Phase 4 — HeroSection
Current: full-viewport video, overlay, centered text, scroll arrow
- [ ] `relative h-screen overflow-hidden` wrapper
- [ ] Video: `absolute inset-0 w-full h-full object-cover scale-115`
- [ ] Overlay: `absolute inset-0 bg-black/45`
- [ ] Hero content: centered via `absolute inset-0 flex flex-col items-center justify-center`
- [ ] Keep `.hero-title` typewriter/animation if present

## Phase 5 — ApproachSection
Current: full-height, image left + text right, fade-in animations
- [ ] `min-h-screen flex items-center py-24`
- [ ] Container: `max-w-7xl mx-auto px-12 w-full flex justify-between items-center gap-8`
- [ ] Keep IntersectionObserver animation classes (add custom `@keyframes` in CSS layer)

## Phase 6 — ArionSection
Current: grid layout, logo, role list, photo grid
- [ ] `py-24 flex items-center`
- [ ] Container: `max-w-7xl mx-auto px-12 grid grid-cols-2 gap-8`
- [ ] Left column text, right column 3-col image grid

## Phase 7 — CaseStudySection
Current: sticky scroll, step-based reveal with video
- [ ] Keep sticky scroll JS as-is (complex animation logic)
- [ ] Replace layout CSS with Tailwind classes
- [ ] Container: `max-w-7xl mx-auto px-12`

## Phase 8 — HighImpactSection
Current: sticky scroll, step-based, mobile video wrappers
- [ ] Same as CaseStudy — preserve JS, migrate layout CSS

## Phase 9 — BeyondSection
Current: horizontal scroll timelines, BTS grid
- [ ] `py-24` section, `max-w-7xl mx-auto px-12` container
- [ ] Timeline: keep animation keyframes in `@layer utilities`

## Phase 10 — PersonalSection
Current: grid, phone mockup, image stack
- [ ] `py-24`, `max-w-7xl mx-auto px-12 grid grid-cols-[1.3fr_1fr] gap-16 items-center`
- [ ] Text column: `flex flex-col gap-10 pl-12`
- [ ] Media column: `flex items-stretch justify-center gap-8 pr-12`

## Phase 11 — PartnershipsSection
Current: logo scroll strip, centered layout
- [ ] `py-24 flex items-center`
- [ ] `max-w-7xl mx-auto px-12 flex flex-col gap-12`
- [ ] Keep `@keyframes scrollLogos` animation in CSS layer

## Phase 12 — FoodCampaignSection
Current: grid, vertical video left, text right
- [ ] `py-24`, `max-w-7xl mx-auto px-12 grid grid-cols-[1fr_1.2fr] gap-20`

## Phase 13 — WHCampaignSection
Current: sticky scroll, step-based like CaseStudy
- [ ] Preserve sticky JS, migrate layout

## Phase 14 — OnCameraSection
Current: 3-col grid layout
- [ ] `py-24 flex items-center min-h-screen`
- [ ] `max-w-7xl mx-auto px-12 grid grid-cols-[1.5fr_1fr_1.5fr] gap-12 items-center`

## Phase 15 — ConceptualSection
Current: 2-col grid, image mosaic
- [ ] `py-24 flex items-center min-h-screen`
- [ ] `max-w-7xl mx-auto px-12 grid grid-cols-[1.5fr_1fr] gap-20`

## Phase 16 — Lightbox
Current: fixed overlay with iframe video
- [ ] `fixed inset-0 bg-black/85 flex items-center justify-center z-50`
- [ ] `relative max-w-[90vw] max-h-[90vh]`

## Phase 17 — Responsive Breakpoints
Tailwind v4 breakpoints to use:
- `sm:` → 640px  (not used currently)
- `md:` → 768px  (mobile breakpoint)
- `lg:` → 1024px (not used)
- `xl:` → 1280px (≈ 1200px breakpoint)
- `2xl:` → 1536px

Map current breakpoints:
- `@media (max-width: 1200px)` → `xl:` inverse (default = desktop, xl:= larger)
  ⚠️ Tailwind is mobile-first. Current CSS is desktop-first. Need to **invert logic**.
- `@media (max-width: 768px)` → `md:` (below md = mobile)
- `@media (max-width: 480px)` → `sm:`

## Phase 18 — Cleanup
- [ ] Delete old `index.css` (or keep for keyframes only)
- [ ] Remove all className strings that mix old CSS class names
- [ ] Run full build, check for visual regressions in browser at 1440px + 390px
- [ ] Commit on `tailwind-migration` branch

---

## Key Tailwind v4 Differences (vs v3)
- No `tailwind.config.js` — use `@theme {}` in CSS
- `@import "tailwindcss"` replaces `@tailwind base/components/utilities`
- Vite plugin: `@tailwindcss/vite` (no PostCSS needed)
- Arbitrary values still work: `text-[140px]`, `max-w-[1400px]`
- `bg-opacity-*` replaced by `bg-white/90` syntax
- Container no longer centered by default — use `mx-auto max-w-7xl px-12`

## Notes
- `max-w-7xl` = 80rem = 1280px. Use `max-w-[1400px]` to match current layout exactly.
- Complex animations (sticky scroll, typewriter) → keep in `@layer utilities` or scoped CSS
- The section structure (all using `max-w-[1400px] mx-auto px-12`) maps perfectly to a reusable `<Container>` component
- Consider extracting `<Container>` and `<SectionWrapper>` to avoid repeating utility strings
