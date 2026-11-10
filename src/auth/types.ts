import type { User } from '../db/schemas/users/users.schema.js';

export type UserRole = 'user' | 'admin';

export type SafeUser = Omit<User, 'password'>;

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export type AuthResponse = {
  user: SafeUser;
  accessToken: string;
};
