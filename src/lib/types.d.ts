declare module NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    SMTP_EMAIL: string;
    SMTP_PASSWORD: string;
    SMTP_SERVER: string;
    SMTP_PORT: string;
    JWT_USER_ID_SECRET;
  }
}
