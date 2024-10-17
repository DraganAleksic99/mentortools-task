import NextAuth from 'next-auth'

import Credentials from 'next-auth/providers/credentials'

// eslint-disable-next-line
import z from 'zod'

import { authConfig } from './auth.config'

function getUser() {
  return {
    email: 'test@mentortools.com',
    password: '123456789'
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // eslint-disable-next-line
        const parsedCredentials = z
          // eslint-disable-next-line
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = getUser()

          const passwordsMatch = password === user.password ? true : false
          const emailsMatch = email === user.email ? true : false

          if (passwordsMatch && emailsMatch) return user
        }

        console.log('Invalid credentials')

        return null
      }
    })
  ]
})
