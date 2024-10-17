import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnChat = nextUrl.pathname.startsWith('/chat')
      const isOnHome = nextUrl.pathname.startsWith('/home')

      if (isOnChat) {
        if (isLoggedIn) return true

        return Response.redirect(new URL('/login', nextUrl))
      }

      if (isOnHome) {
        if (isLoggedIn) return true

        return Response.redirect(new URL('/login', nextUrl))
      }

      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
