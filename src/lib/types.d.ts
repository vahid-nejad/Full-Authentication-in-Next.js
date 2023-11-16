import { NextAuth } from "next-auth";
import { User } from "@prisma/client";
declare module NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    SMTP_EMAIL: string;
    SMTP_PASSWORD: string;
    SMTP_SERVER: string;
    SMTP_PORT: string;
    JWT_USER_ID_SECRET: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
