import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "@domain/user";
import { getUser, getUserByEmail, getUsers } from "@infrastructure/db/user";
import { getUserSession } from "@app/session-storage";
import { LoginView } from "@app/ui/login";
import { getAuth } from "@clerk/remix/ssr.server";


export const action: ActionFunction = async (args) => {
  const { user  } = await getAuth(args);
  console.log('user: ', user);

  if (!user) throw new Response("Unauthorized", { status: 401 });
  
  const dbUser = await getUserByEmail(user.emailAddresses[0].emailAddress);
  if (!dbUser) throw new Response("Not Found", { status: 404 });
  
  const userSession = await getUserSession(args);
  userSession.setUser(dbUser.id);

  return redirect("/projects", {
    headers: { "Set-Cookie": await userSession.commit() },
  });
};

export default function LoginRoute() {
  return <LoginView />;
}
