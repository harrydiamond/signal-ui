# `@harrydiamond/signal-ui`

Phosphor console chrome for React. Install from GitHub (not the npm registry):

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

## Theme

Wrap the page (or mount on `body`) so atmosphere, type, and focus rules apply:

```tsx
import { Theme, Button } from '@harrydiamond/signal-ui'

export function App() {
  return (
    <Theme asPage>
      <Button variant="primary">Calculate</Button>
    </Theme>
  )
}
```

Or attach the class directly:

```html
<body class="av-theme">
```

Only the `dark` theme ships today (`ThemeName`).

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

Chromatic publishes from `bun run build:storybook:chromatic` (`CHROMATIC_PROJECT_TOKEN`). `bun run deploy` ships the Storybook build to Worker `signal-ui`. With Storybook running, the MCP endpoint is `http://localhost:6006/mcp`.

## Import

```ts
import {
  AV,
  Button,
  Choice,
  ChoiceGroup,
  Container,
  Field,
  Heading,
  plex,
  Stack,
  Theme,
  type ThemeName,
} from '@harrydiamond/signal-ui'
```

`Container` / `Stack` handle column width and section gaps. Type helpers (`doto`, `plex`, `prose`, `proseMuted`, `meta`, `fieldLabel`, `fieldHint`, `fieldError`, `ledText`, `ledHot`) match the classes the primitives use.

## Files

- `src/tokens.ts` — JS palette (`AV`, `AV_RGB`)
- `src/type.ts` — shared type-face class strings
- `src/tailwind.css` — Tailwind `@theme` tokens (`theme.css` export)
- `src/styles.css` — atmosphere, focus rings, phosphor type, native range thumbs
- `src/fonts.css` — self-hosted Doto + IBM Plex Mono
- `src/components` — React primitives
- `src/stories` — CSF specimens (every primitive needs a story for MCP docs)
- `wrangler.jsonc` — Storybook Worker (`signal-ui`)
