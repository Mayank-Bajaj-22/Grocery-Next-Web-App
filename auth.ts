import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [],
})

// User -> /api/auth/signin (NextAuth route)
// Provider (Google, Credentials)
// JWT Token Generate
// Session create hoti hai
// frontend: useSession() se access karte ho
