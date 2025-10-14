# Design Guidelines: Fake and Real News Detection System

## Design Approach
**Hybrid Approach**: Drawing inspiration from Linear's clean tech aesthetic and Stripe's trust-building patterns, combined with analytics dashboard design principles. The design emphasizes credibility, clarity, and professional authority appropriate for a news verification tool.

## Core Design Principles
- **Trust First**: Professional, authoritative aesthetic that builds confidence in the ML predictions
- **Data Clarity**: Clear hierarchy for displaying analysis results and feature insights
- **Purposeful Interaction**: Interactive elements serve functional goals, not decoration
- **Responsive Intelligence**: Adapt layouts seamlessly across devices

## Color Palette

**Dark Mode Primary:**
- Background Base: 222 15% 8% (deep charcoal)
- Surface: 222 15% 12% (elevated cards)
- Surface Elevated: 222 15% 16% (interactive elements)

**Brand Colors:**
- Primary (Trust Blue): 217 91% 60% (verification actions)
- Success (Real News): 142 71% 45% (authentic content indicator)
- Danger (Fake News): 0 84% 60% (fake content warning)
- Accent (Insights): 271 81% 56% (feature highlights)

**Text:**
- Primary: 0 0% 98%
- Secondary: 0 0% 71%
- Muted: 0 0% 45%

## Typography

**Font Families:**
- Primary: 'Inter' (via Google Fonts) - clean, modern, highly legible
- Monospace: 'JetBrains Mono' - for technical data, confidence scores

**Type Scale:**
- Hero Headline: text-5xl font-bold (Home page banner)
- Section Heading: text-3xl font-semibold
- Card Title: text-xl font-medium
- Body: text-base
- Caption/Meta: text-sm text-secondary
- Confidence Score: text-2xl font-mono font-bold

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 24 for consistency
- Component padding: p-6 to p-8
- Section spacing: gap-8 to gap-12
- Page margins: px-4 md:px-8 lg:px-16

**Container Strategy:**
- Max width: max-w-6xl mx-auto
- Feature grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

## Component Library

### Home Page (Page 1)
**Hero Section:**
- Full-width banner with gradient overlay (from primary to accent at 20% opacity)
- Hero image: Abstract visualization of data/network analysis, truth vs misinformation concept
- Centered content with headline + subtitle
- Large EXPLORE button (primary color, rounded-lg, px-12 py-4)

**About Section:**
- Two-column layout on desktop (text + supporting visual/icon)
- Clear value proposition with bullet points
- Professional, trust-building copy emphasis

### Detection Page (Page 2)
**Input Section:**
- Large textarea with border focus state (border-primary)
- Character count indicator
- "Analyze News" primary button below input
- Loading state with subtle animation during prediction

**Results Display:**
- Prominent result card with color-coded background (success for REAL, danger for FAKE)
- Confidence percentage in large monospace font
- Clear visual indicator (checkmark or warning icon)

**Feature Boxes Grid:**
Six interactive cards in 3-column grid (2 rows):
1. Each card: h-32, rounded-lg, border, hover:border-primary transition
2. Icon + title visible by default
3. Click to expand showing detailed content
4. Smooth height expansion animation
5. Close button to collapse

**Feature Box Content Patterns:**
- Source Credibility: Progress bars, domain reputation scores
- Keyword Highlighting: Tag-style highlighted words with color coding
- Prediction Explanation: Bullet list of reasoning factors
- Trend Analysis: Mini line chart or sparkline
- Propagation Visualizer: Burst intensity indicator (visual gauge)
- Emotion-Headline Mismatch: Split view comparison with mismatch percentage

## Navigation
- Top navigation bar: Logo left, page links center, minimal design
- Active page indicator with underline (border-b-2 border-primary)
- Mobile: Hamburger menu pattern

## Interactive States
**Buttons:**
- Primary: bg-primary hover:brightness-110 transition
- Outline on images: backdrop-blur-md bg-white/10 border-white/30

**Cards:**
- Default: border border-surface-elevated
- Hover: border-primary shadow-lg
- Active/Selected: bg-surface-elevated

**Input Fields:**
- Default: border-surface-elevated
- Focus: border-primary ring-2 ring-primary/20

## Animations
**Minimal, Purposeful Only:**
- Feature box expand/collapse: duration-300 ease-in-out
- Loading prediction: subtle pulse on analyze button
- Result reveal: fade-in from opacity-0
- No decorative animations

## Images

**Hero Image (Home Page):**
- Placement: Full-width hero section background
- Description: Abstract network/node visualization representing information flow, data analysis, or truth verification. Modern, tech-forward aesthetic with subtle blue/purple gradients. Should convey trust, technology, and insight.
- Treatment: Dark overlay gradient for text legibility

**Supporting Visuals:**
- About section: Optional icon or simplified illustration of ML/AI process
- Detection page: No background images, focus on data clarity

## Responsive Behavior
- Mobile: Single column, stacked layout, touch-friendly tap targets (min 44px)
- Tablet: 2-column feature grid
- Desktop: 3-column feature grid, side-by-side layouts

## Accessibility
- WCAG AA contrast ratios maintained
- Focus indicators on all interactive elements
- Semantic HTML structure
- Clear loading and error states
- Screen reader friendly labels

This design creates a professional, trustworthy interface that positions the ML detection system as authoritative while maintaining excellent usability for analyzing news content.