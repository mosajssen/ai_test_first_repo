import "dotenv/config";

// Central place for reading & validating all project environment variables (fail fast at import time).
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Define it in .env or environment variables.`);
  }
  return value;
}

// Falls back to a default instead of throwing, for vars that may be absent (e.g. forked PR runs without secrets).
function envWithDefault(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

export const env = {
  BASE_URL: requireEnv("BASE_URL"),
  DEMO_USER_EMAIL: envWithDefault("DEMO_USER_EMAIL", "demo@example.com"),
  DEMO_USER_PASSWORD: envWithDefault("DEMO_USER_PASSWORD", "demo123"),
  EMPTY_USER_EMAIL: envWithDefault("EMPTY_USER_EMAIL", "emptyuser@rolnopol.demo.pl"),
  EMPTY_USER_PASSWORD: envWithDefault("EMPTY_USER_PASSWORD", "demoPass123"),
  NEW_USER_PASSWORD: envWithDefault("NEW_USER_PASSWORD", "Test1234!"),
} as const;
