// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { imagetools } from "vite-imagetools";

// https://astro.build/config
export default defineConfig({

  output: 'static',
  site: 'https://berth-ortiz.pages.dev',
  vite: {
    plugins: [tailwindcss(), imagetools()],
  },

  integrations: [icon()],
});