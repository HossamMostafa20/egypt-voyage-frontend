// import { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// export const authOptions: NextAuthOptions = {
//     session: {
//         strategy: "jwt",
//     },

//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },

//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     return null
//                 }

//                 const res = await fetch("http://egyptvoyage.runasp.net/api/Auth/login", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         email: credentials.email,
//                         password: credentials.password,
//                     }),
//                 })

//                 const user = await res.json()

//                 if (!res.ok || !user) return null

//                 return {
//                     id: user.id,
//                     name: user.name,
//                     email: user.email,
//                     accessToken: user.token,
//                 }
//             },
//         }),
//     ],

//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.accessToken = (user as any).accessToken
//             }
//             return token
//         },

//         async session({ session, token }) {
//             ; (session as any).accessToken = token.accessToken
//             return session
//         },
//     },

//     secret: process.env.NEXTAUTH_SECRET,
// }