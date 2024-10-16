export interface EnvDefinition {
  PORT: string;
  WEB_CLIENT_URL: string;

  DATABASE_URL: string;

  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_PASSWORD: string;

  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;

  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_SECRET: string;
}
