import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), clerk()],
  output: 'server',
  adapter: node({ mode: "standalone" }),
  devToolbar: {
    enabled: false
  }
});