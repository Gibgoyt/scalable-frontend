import { defineMiddleware } from 'astro:middleware'

// Hardcoded authentication status - change this to true/false as needed
const isAuthenticated: boolean = false

const publicPaths = [
  '/',
  '/about',
  '/features',
  '/pricing',
  '/frameworks-test',
  '/cloudflare',
  '/api'
]

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'))
}

export const onRequest = defineMiddleware((context, next) => {
  const { url } = context
  const { pathname } = url

  // Debug logging
  console.log('Middleware executing for:', pathname)

  if (!isAuthenticated && pathname === '/demo') {
    return Response.redirect(new URL('/', url), 302)
  }

  // Check if accessing protected app routes
  if (pathname.startsWith('/solid-spa/') && !isAuthenticated) {
    return Response.redirect(new URL('/', url), 302)
  }
  
  return next()
})