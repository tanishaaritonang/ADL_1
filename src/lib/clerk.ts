// src/lib/clerk.ts
import { auth, currentUser } from '@clerk/nextjs/server';

export const getClerkUser = async () => {
  const user = await currentUser();
  return user;
};

export const getClerkAuth = () => {
  return auth();
};