import { env } from "../env";

export interface User {
  email: string;
  password: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    email: env.DEMO_USER_EMAIL,
    password: env.DEMO_USER_PASSWORD,
    ...overrides,
  };
}

export function createEmptyUser(overrides: Partial<User> = {}): User {
  return createUser({
    email: env.EMPTY_USER_EMAIL,
    password: env.EMPTY_USER_PASSWORD,
    ...overrides,
  });
}

export function createUniqueUser(overrides: Partial<User> = {}): User {
  return createUser({
    email: `testuser_${Date.now()}@example.com`,
    password: env.NEW_USER_PASSWORD,
    ...overrides,
  });
}
