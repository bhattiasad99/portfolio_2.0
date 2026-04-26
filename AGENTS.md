<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Background Architecture

All reusable visual backgrounds should be abstracted behind a template-level background component instead of being imported directly into feature/use-case components.

Use `src/components/custom/templates/HeroBackground.tsx` as the current example of this pattern.

- Feature/use-case components should own their content, layout, state, and foreground animation only.
- Feature/use-case components should render their content inside a named background template, for example `<HeroBackground>...</HeroBackground>`.
- Background template files should act as the switching layer for that area. Add or change available backgrounds there by importing the concrete background, wrapping it in a small adapter component, and registering it in a local background map such as `BACKGROUNDS`.
- Every registered background adapter must accept `children: React.ReactNode` and render those children above or inside the visual background.
- Keep background-specific props inside the adapter component, for example size, margin, colors, density, animation options, or interaction options.
- If a visual background component does not support `children`, adapt it in the template file with a relative container, an absolute background layer, and a foreground children layer.
- Concrete visual implementations should live outside use-case components, such as under `src/components/animate-ui/components/backgrounds/` or another shared/custom background location.
- To change the active background for an area, prefer changing the selected entry in that area's background template instead of editing the feature/use-case component.
- Remove stale direct imports of background implementations from pages or feature/use-case components when the background is already routed through a background template.
