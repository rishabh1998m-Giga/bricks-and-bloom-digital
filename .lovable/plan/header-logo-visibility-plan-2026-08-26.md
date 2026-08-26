# Header Logo Visibility Plan

## Goal
Make the Brick & Blooms logo read clearly on the dark translucent site header without changing the logo colors.

## Chosen Direction
Add a warm, opaque cream pill / plaque behind the full logo lockup (icon + wordmark + tagline). This is the most predictable fix because it creates contrast for every color in the existing logo, especially the thin “A new way of living” tagline, while keeping the header dark and minimal.

## Work
1. Audit the current `Header` component and logo markup to locate the logo wrapper and existing spacing.
2. Wrap the logo lockup in a new container with:
   - warm cream / sandstone background matching the site’s material palette
   - generous horizontal and vertical padding
   - subtle rounded corners or architectural bevel
   - very soft shadow so it lifts off the dark header
3. Ensure the logo asset colors are not modified or filtered.
4. Adjust header internal spacing so the pill does not collide with navigation links.
5. Maintain scroll state: keep the pill visible when the header condenses on scroll.
6. Verify on mobile, tablet, and desktop (including ultrawide) that the logo remains centered and readable and the nav does not wrap awkwardly.

## Out of Scope
- Redrawing or recoloring the logo asset.
- Changing the dark header theme or nav link styling.
- Restructuring the site’s global layout.
