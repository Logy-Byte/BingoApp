# Production Design System Specification
*(Minimal • Clean • Simple • Professional • Android-First)*

## 1. Core Principles: Less UI, More Clarity
1. **Zero Visual Noise**: No excessive gradients, no heavy glows/neon, no decorative blobs or random particles. Surfaces remain calm and disciplined.
2. **Restrained Color Meaning**: Color communicates meaning, not decoration. The vast majority of the interface is neutral dark; warm amber is reserved strictly for action and focus.
3. **Typography-Led Hierarchy**: Professional rounded typography with high x-height and clear numeric clarity (`Manrope`, `Nunito Sans`, `Plus Jakarta Sans`).
4. **Android-First Usability**: 48dp minimum touch targets, clean back-button support, safe insets, and non-protruding flat navigation.
5. **Zero Emojis & Zero Fake Data**: 100% custom vector SVG icons on a 24×24 grid; authentic empty states when disconnected.

## 2. Refined Color Tokens
- **Primary Background**: `#101214` (Deep neutral)
- **Primary Surface**: `#17191C` (Slightly raised neutral)
- **Raised Surface**: `#1D2023` (Interactive cards and dialogs)
- **Surface Highlight**: `#23272B`
- **Primary Text**: `#F4F1E9` (High-contrast warm white)
- **Secondary Text**: `#AAA79F` (Muted neutral)
- **Muted Metadata**: `#77746E` (Subtle grey)
- **Primary Accent**: `#D5A33A` (Warm gold / amber)
- **Accent Strong**: `#E6B84F`
- **Accent Pressed**: `#B98222`
- **Success**: `#5FA56D` (Reserved for actual victory and confirmed readiness)
- **Error**: `#D76464` (Reserved for actual error states)
- **Warning**: `#D5A33A`
- **Border / Subtle Divider**: `#292D31`
- **Border Strong**: `#363B41`

## 3. Typographic Hierarchy
- **Display (40px, Bold)**: Dominant current called number in gameplay.
- **Heading (20px, Semibold)**: Screen titles.
- **Subheading (15px, Medium/Semibold)**: Section titles and module headings.
- **Body (14px, Regular)**: Explanatory content, rule summaries.
- **Label (12px, Medium)**: Metadata, player stats, and auxiliary tags.
- **Micro (11px, Semibold)**: Compact status badges.

## 4. Radius Policy
- **Control (`8px`)**: Buttons, inputs, and small interactive toggles.
- **Surface (`12px`)**: Cards, modal sheets, and game sections.
- **Board (`14px`)**: 5×5 Game Board container.
- **Pill (`9999px`)**: Compact status badges only (no oversized pill cards).

## 5. Shadow & Elevation Policy
- Flat surfaces are preferred. Elevation is strictly restrained (`elevation: 2`, `shadowOpacity: 0.25`, `shadowRadius: 4`) with zero fluorescent glows.
