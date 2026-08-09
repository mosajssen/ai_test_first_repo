export interface User {
  email: string;
  password: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    email: process.env.DEMO_USER_EMAIL!,
    password: process.env.DEMO_USER_PASSWORD!,
    ...overrides,
  };
}

export function createEmptyUser(overrides: Partial<User> = {}): User {
  return createUser({
    email: process.env.EMPTY_USER_EMAIL!,
    password: process.env.EMPTY_USER_PASSWORD!,
    ...overrides,
  });
}

export function createUniqueUser(overrides: Partial<User> = {}): User {
  return createUser({
    email: `testuser_${Date.now()}@example.com`,
    password: process.env.NEW_USER_PASSWORD!,
    ...overrides,
  });
}
