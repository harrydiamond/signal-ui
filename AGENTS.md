## Development

```
bun run storybook
```

Other useful commands: `bun run test`, `bun run build:storybook`, `bun run deploy`, `bun run format`.

## Storybook MCP

- Local (branch in progress): `signal-ui-storybook` → http://localhost:6006/mcp (`bun run storybook`)
- Published `main`: `signal-ui-storybook-main` → https://main--6a9ecc9629e322e1385e7b36.chromatic.com/mcp

Prefer local when editing the kit so docs match your branch; use Chromatic when local Storybook is not running.

- Never guess component props. Query `docs-list` / `docs-show` first.
- Use `get-storybook-story-instructions` before creating or updating stories.
- Check work with `test-run` when Storybook Test is available (local Storybook).
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
