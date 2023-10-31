import { error } from "console";
import { STATUS_CODES } from "http";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    session: {
        
        strategy: "jwt",
      
        // Seconds - How long until an idle session expires and is no longer valid.
        //maxAge: 30 * 24 * 60 * 60 // 30 days
        

        
    },
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              login: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied


              //const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
              const findUser = await fetch((process.env.SERVER_URL + '/user/signin') as string, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: credentials?.login, password: credentials?.password })
              })
              const userCookies = cookies();
              

              if(!findUser.ok){
                
                
                return findUser.status
              }

              const user = await findUser.json();


              if (user) {
                userCookies.set('refreshToken', user.refreshToken)
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.

                
                throw new Error('Não foi possível efetuar o login.')
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          }),
    ],
    
    pages: {
      signIn: '/login',
      signOut: '/login',
      // error: '/login',
      // verifyRequest: '/login',
      // newUser: '/login'
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        
        if(user.email){
          return true
        }
        else {
          return false
        }
      },
      async redirect({ url, baseUrl }) {

        return baseUrl
      },
      async session({ session, user, token }) {
        session.userDetails = token
        return session
      },
      async jwt({ token, user, account, profile, isNewUser }) {

        return {...token, ...user}
      }
    },
}


