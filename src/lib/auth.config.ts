import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {z} from "zod";
import {getUserByEmail} from "@/lib/actions";

export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt", // Використовуємо JWT, бо у нас немає таблиць для сесій
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const schema = z.object({
                    email: z.string().email("Invalid email"),
                    password: z.string().min(6, "Password must be at least 6 characters"),
                });

                const parsed = schema.safeParse(credentials);

                if (!parsed.success) {
                    console.error("Validation failed:", parsed.error);
                    throw new Error("Invalid credentials");
                }

                const { email, password } = parsed.data;

                if (!email || !password) {
                    throw new Error("Email та пароль обов'язкові");
                }

                // Знайти користувача в базі
                const user = await getUserByEmail(email);

                if (!user.rows.length) {
                    throw new Error("Користувача не знайдено");
                }

                // Перевірити пароль
                const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
                if (!isPasswordValid) {
                    throw new Error("Невірний пароль");
                }

                // Повернути користувача (без пароля)
                return { id: user.rows[0].id, email: user.rows[0].email, name: user.rows[0].name };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                email: token.email as string,
                name: token.name as string,
            };
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};
