## Development

```
bun run storybook
```

Storybook MCP: http://localhost:6006/mcp

Other useful commands: `bun run test`, `bun run build:storybook`, `bun run deploy`, `bun run format`.

## Storybook MCP

When creating or updating primitives and stories:

- Never guess component props. Query `docs-list` / `docs-show` first.
- Use `get-storybook-story-instructions` before creating or updating stories.
- Check work with `test-run` when Storybook Test is available.
- Export new primitives from `src/index.ts` and add a CSF story under `src/stories/`.

## Package contract

Source package (no `dist/`). Consumers import:

```ts
import { Button, Theme } from '@harrydiamond/signal-ui'
```

```css
@import '@harrydiamond/signal-ui/theme.css';
@import '@harrydiamond/signal-ui/styles.css';
@import '@harrydiamond/signal-ui/fonts.css';
```

Install: `"@harrydiamond/signal-ui": "github:harrydiamond/signal-ui"`.
