import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import dbConnect from "@/lib/db/connect";
import { User } from "@/lib/db/models/User";
import bcrypt from "bcrypt";

// Password validation schema
const passwordSchema = z
  .string()
  .min(8)
  .regex(/^(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain at least 1 uppercase letter and 1 number",
  });

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({
              email: z.string().email(),
              password: z.string().min(1),
            })
            .safeParse(credentials);

          if (!parsedCredentials.success) {
            console.log("Invalid credentials format");
            return null;
          }

          await dbConnect();

          const { email, password } = parsedCredentials.data;
          const user = await User.findOne({ email });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const isValid = await user.comparePassword(password);

          if (!isValid) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.isAdmin = user.isAdmin as boolean;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
});
