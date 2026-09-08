# `@harrydiamond/signal-ui`

Phosphor console chrome for React — plus an `editorial` theme for content sites. Install from GitHub (not the npm registry):

```bash
bun add github:harrydiamond/signal-ui
# or: npm install github:harrydiamond/signal-ui
```

## CSS

Import kit CSS once at the app root (order matters — theme tokens before chrome):

```css
@import '@harrydiamond/signal-ui/fonts.css';
@import '@harrydiamond/signal-ui/theme.css';
@import '@harrydiamond/signal-ui/styles.css';
```

Skip `fonts.css` for editorial-only apps unless you also want Doto + IBM Plex Mono.

## Theme

Wrap the page (or mount on `body`) so atmosphere, type, and focus rules apply:

```tsx
import { Theme, Button } from '@harrydiamond/signal-ui'

export function App() {
  return (
    <Theme asPage theme="phosphor">
      <Button variant="primary">Calculate</Button>
    </Theme>
  )
}
```

Or attach the class directly:

```html
<body class="av-theme"></body>
```

`ThemeName` is `'phosphor' | 'editorial'`.

- **`phosphor`** — phosphor console (grain, Doto display, kit palette). Default.
- **`editorial`** — solid page color, soft-elevation cards, system light/dark via `prefers-color-scheme`.

### Editorial fonts (consumer-owned)

Editorial defaults to system stacks. Load your faces, then override:

```css
@import '@harrydiamond/signal-ui/theme.css';
@import '@harrydiamond/signal-ui/styles.css';

.av-theme[data-av-theme='editorial'] {
  --av-font: 'Your Sans', ui-sans-serif, system-ui, sans-serif;
  --av-font-body: 'Your Sans', ui-sans-serif, system-ui, sans-serif;
}
```

### Editorial page shell

```tsx
import {
  Theme,
  SiteNav,
  NavLink,
  PageShell,
  SiteFooter,
  MetaLabel,
  SectionHeader,
  PreviewCard,
  ExternalLink,
  BackLink,
} from '@harrydiamond/signal-ui'

export function Site() {
  return (
    <Theme asPage theme="editorial">
      <SiteNav
        brand={<MetaLabel tone="ink">Brand</MetaLabel>}
        links={
          <>
            <NavLink href="/" active>
              Home
            </NavLink>
            <NavLink href="/posts">Posts</NavLink>
          </>
        }
      />
      <PageShell>
        <BackLink href="/">Home</BackLink>
        <SectionHeader title="Featured" />
        <PreviewCard>
          <MetaLabel tone="accent">Note</MetaLabel>
        </PreviewCard>
        <ExternalLink href="https://example.com">example.com</ExternalLink>
      </PageShell>
      <SiteFooter copyright="©" />
    </Theme>
  )
}
```

## Local override

While developing the kit next to an app:

```json
{
  "dependencies": {
    "@harrydiamond/signal-ui": "file:../signal-ui"
  }
}
```

## Storybook

```bash
bun run storybook
bun run build:storybook
bun run deploy
```

Use the **Theme** toolbar to switch `phosphor` / `editorial`. Chromatic captures phosphor, editorial (light), and editorial-dark via [modes](https://www.chromatic.com/docs/modes/) (`.storybook/modes.ts`).

- Local MCP: http://localhost:6006/mcp
- Published main MCP: https://main--6a9ecc9629e322e1385e7b36.chromatic.com/mcp
- Hosted Storybook Worker: https://signal-ui.harrydiamond.workers.dev
- Chromatic publishes from `bun run build:storybook:chromatic` (`CHROMATIC_PROJECT_TOKEN` on this repo). Kit CI owns Storybook visual review — not avtech.fyi.

### Continuous deploy (Workers Builds)

The Worker is live. To redeploy on every push to `main`, connect Git in the dashboard:

1. [Workers → signal-ui → Settings → Builds → Connect](https://dash.cloudflare.com/518219b906fb0db47fc25f5f5bd2724b/workers/services/view/signal-ui/production/settings)
2. Select `harrydiamond/signal-ui`
3. Build command: `bun run build:storybook`
4. Deploy command: `npx wrangler deploy`

Until Builds is connected, deploy manually with `bun run deploy` (requires wrangler login).

## Import

```ts
import {
  AV,
  AV_STAGGER_MS,
  BackLink,
  Button,
  Choice,
  ExternalLink,
  Heading,
  MetaLabel,
  NavLink,
  PageShell,
  PreviewCard,
  SectionHeader,
  SiteNav,
  TagLink,
  Theme,
  type ThemeName,
} from '@harrydiamond/signal-ui'
```

`Container` / `Stack` handle column width and section gaps. `PageShell` is the wider main rhythm. Content recipes: `NavLink`, `PreviewCard`, `ExternalLink`, `BackLink`, `SectionHeader`, `PulseDot`. Type helpers (`doto`, `plex`, `prose`, …) match the classes the primitives use.

Motion: `animate-fade-in-up` + `AV_STAGGER_MS`. Shadows: `shadow-av-card` (soft elevation under editorial).

## Files

- `src/tokens.ts` — JS palette (`AV`, `AV_RGB`) + `AV_STAGGER_MS`
- `src/type.ts` — shared type-face class strings
- `src/tailwind.css` — Tailwind `@theme` tokens (`theme.css` export)
- `src/styles.css` — theme assignment, atmosphere, focus rings, phosphor / editorial type
- `src/fonts.css` — self-hosted Doto + IBM Plex Mono
- `src/components` — React primitives
- `src/stories` — CSF specimens (every primitive needs a story for MCP docs)
- `wrangler.jsonc` — Storybook Worker (`signal-ui`)
