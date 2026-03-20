// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  fonts: [{
    provider: fontProviders.google(),
    name: "Figtree",
    cssVariable: "--font-figtree"
  }],
  vite: {
    plugins: [tailwindcss()]
  },

  output: 'static',


  // adapter: cloudflare(),
});