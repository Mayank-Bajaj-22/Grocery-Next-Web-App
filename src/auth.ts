import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug:true,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email..." },
                password: { label: "Password", type: "password", placeholder: "Enter your password..." }
            },
            async authorize(credentials, request) {
                await connectDb()

                const email = credentials.email
                const password = credentials.password as string

                const user = await User.findOne({ email })

                if (!user) {
                    // throw new Error("user does not exists")
                    console.log("user does not exists")
                    return null
                }

                if (!user.password) {
                    console.log("User has no password (Google account)")
                    return null
                }

                const isMatch = await bcrypt.compare(password, user.password)

                if (!isMatch) {
                    // throw new Error("incorrect password")
                    console.log("incorrect password")
                    return null
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        // google hume user karke dega or hume vo database me store karwana hai
    ],
    callbacks: {
        // token ke andar callback ka data dalta hai

        async signIn({ user, account }) {
            // yeh account se hume type ka pata chalega ki yeh kis type ka account hai email, google, github etc kiska hai
            if (account?.provider === "google") {
                await connectDb()
                let dbuser = await User.findOne({ email: user.email })

                if (!dbuser) {
                    dbuser = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image
                    })
                }

                user.id = dbuser._id.toString();
                user.role = dbuser.role
            }

            return true
        },

        jwt({ token, user }) {
            if (user) {
                token.id = user.id,
                token.name = user.name,
                token.email = user.email,
                token.role = user.role
            }
            return token
        },
        
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string,
                session.user.name = token.name as string,
                session.user.email = token.email as string,               
                session.user.role = token.role as string           
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 10*24*60*60
    },
    secret: process.env.AUTH_SECRET
})

// sign in steps -
// connect db
// email check
// password match