import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'avtech UI',
    brandUrl: 'https://avtech.fyi',
    colorPrimary: '#ffa88f',
    colorSecondary: '#3aa5ff',
    appBg: '#0a0b0d',
    appContentBg: '#16181c',
    appPreviewBg: '#0a0b0d',
    appBorderColor: '#2c3038',
    appBorderRadius: 8,
    textColor: '#eee1e0',
    textMutedColor: '#a4a8b0',
    barTextColor: '#a4a8b0',
    barHoverColor: '#ffa88f',
    barSelectedColor: '#ffa88f',
    barBg: '#16181c',
    inputBg: '#1e2126',
    inputBorder: '#2c3038',
    inputTextColor: '#eee1e0',
    fontBase:
      '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontCode:
      '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  }),
})
