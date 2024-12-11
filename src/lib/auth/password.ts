import { hash, verify } from '@node-rs/argon2';

export const hassPassword = async (password: string) => {
  return await hash(password);
};

export const verifyPassword = async (hash: string, password: string) => {
  return await verify(hash, password);
};
