// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  fonts: [{
    provider: fontProviders.google(),
    name: "Figtree",
    cssVariable: "--font-figtree"
  }],

  output: 'static',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare(),
});