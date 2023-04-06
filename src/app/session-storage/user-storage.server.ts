import { DataFunctionArgs, createCookieSessionStorage } from "@remix-run/node";
import { UserId } from "@domain/user";
import { SESSION_SECRET } from "./shared";
import { getAuth } from "@clerk/remix/ssr.server";

const _30daysInSeconds = 60 * 60 * 24 * 30;
const USER_SESSION_KEY = "userId";

const userStorage = createCookieSessionStorage({
  cookie: {
    name: "user_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: _30daysInSeconds,
    httpOnly: true,
  },
});

export const getUserSession = async (args: DataFunctionArgs) => {
  const { request } = args;
  const session = await userStorage.getSession(request.headers.get("Cookie"));

  // Check if the third-party session is still valid, in this case we use Clerk's session
  const { sessionId } = await getAuth(args);
  if (!sessionId) {
    userStorage.destroySession(session);
  }

  return {
    getUser: (): UserId | null => {
      const userId = session.get(USER_SESSION_KEY) as UserId | undefined;
      return isValidUserId(userId) ? userId : null;
    },
    setUser: (userId: UserId) => {
      if (isValidUserId(userId)) session.set(USER_SESSION_KEY, userId);
    },
    destroyUser: () => userStorage.destroySession(session),
    commit: () => userStorage.commitSession(session),
  };
};

const isValidUserId = (userId: unknown): userId is UserId => {
  return Boolean(userId) && typeof userId === "string";
};
