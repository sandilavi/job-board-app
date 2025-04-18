import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                //Check credentials against the database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) return null;
        
                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) return null;

                return {id: user.id, email: user.email, role: user.role};
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) token.role = user.role;
            return token;
        },
        async session({session, token}) {
            session.user.role = token.role;
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};