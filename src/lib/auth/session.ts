import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import { prisma } from '../prisma';

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2; // 30 days

export const generateRandomSessionToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

const fromSessionTokenToSessionId = (sessionToken: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
};

export const createSession = async (sessionToken: string, userId: string) => {
  // We are not using session token as session id because if the sessionToken is leaked, the session id is not.
  const sessionId = fromSessionTokenToSessionId(sessionToken);

  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  await prisma.session.create({
    data: session,
  });

  return session;
};

export const validateSession = async (sessionToken: string) => {
  // Regenerate sessionId from sessionToken
  const sessionId = fromSessionTokenToSessionId(sessionToken);

  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  // if there is no session, return null
  if (!result) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  // if the session is expired, return null
  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    return { session: null, user: null };
  }

  // If fewer than 15 days remain before the session expires, refresh it
  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);

    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
};

// We use this method when log out
export const invalidateSession = async (sessionId: string) => {
  // or your ORM of choice
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};
