export interface Config {
  port: number;
  host: string;
  nodeEnv: string;
  corsOrigin: string;
  betterAuthSecret: string;
  databaseUrl: string;
  internalKey: string;
}
