import { defineMiddleware } from 'astro:middleware'

// Hardcoded authentication status - change this to true/false as needed
const isAuthenticated: boolean = false

// 'startsWith' should include SPAs, since any reloads of the page, even while client-side router is active, will route
// through the server (i.e. Astro's router)
type Paths = {
  exact: string[],
  startsWith: string[],
} | null

export const onRequest = defineMiddleware((context, next) => {
  const { url } = context
  const { pathname } = url

  const publicPaths: Paths = {
    exact: [
      '/',
      '/frameworks-test',
      '/apps',
      '/about',
      '/cloudflare',
      '/features',
    ],
    startsWith: [
      '/api',
      '/docs',
      '/svelte-spa',
      '/solid-spa',
    ],
  }

  // const protectedPaths: Paths = {
  //   exact: [],
  //   startsWith: [],
  // }

  // const hiddenPaths: Paths = {
  //   exact: [],
  //   startsWith: [],
  // }

  const isPublicPath: boolean = publicPaths.exact.some((item: string): boolean => {
    return pathname === item
  }) || publicPaths.startsWith.some((item: string): boolean => {
    return pathname.startsWith(item + '/')
  })

  if (isPublicPath) {
    return next()
  }

  // hardcoded Astro router rejections will look like this:
  if (!isAuthenticated && pathname === '/demo') {
    return Response.redirect(new URL('/', url), 302)
  }

  // Check if accessing protected app routes
  if (!isAuthenticated && pathname.startsWith('/solid-spa/')) {
    return Response.redirect(new URL('/', url), 302)
  }

  // if unknown path than return to '/' (no/less 404s)
  return Response.redirect(new URL('/', url), 302)
})