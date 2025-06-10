// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import solidJs from '@astrojs/solid-js'
import svelte from '@astrojs/svelte'
import qwikdev from '@qwikdev/astro'
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  integrations: [
    qwikdev({
      include: [
        '**/components-qwik/*',
        '**/applications-qwik/**/*'
      ]
    }),
    solidJs({
      devtools: true,
      // all SolidJS components will be put inside 'components-solid' folder if ever other TSX frameworks are ever
      // added to this astro project
      include: [
        '**/components-solid/*',
        '**/applications-solid/**/*'
      ]
    }),
    svelte()
  ],
  adapter: cloudflare(),
  vite: {
    plugins: [
      // DO NOT CHANGE THIS, OFFICIAL DOCS: https://tailwindcss.com/docs/installation/framework-guides/astro
      // THIS **IS** 100% the correct way of adding TailwindCSS to an Astro project
      // @ts-ignore
      tailwindcss(),
    ],
    resolve: {
      conditions: [
        'import',
        'module',
        'browser',
        'default'
      ],
    },
    ssr: {
      external: [
        'node:*'
      ]
    },
    server: {
      cors: {
        origin: '*'
      }
    }
  }
});
