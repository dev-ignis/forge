import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "./.storybook/addons/ai-panel/register.tsx"
  ],
  "framework": {
    "name": "@storybook/web-components-vite",
    "options": {}
  }
};
export default config;