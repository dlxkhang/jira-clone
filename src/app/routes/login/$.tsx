import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "@domain/user";
import { getUsers } from "@infrastructure/db/user";
import { getUserSession } from "@app/session-storage";
import { LoginView } from "@app/ui/login";
import { getAuth } from "@clerk/remix/ssr.server";

type LoaderData = {
  users: User[];
};

export const loader: LoaderFunction = async () => {
  const users = await getUsers();
  return json<LoaderData>({ users });
};

export const action: ActionFunction = async (args) => {
  const { userId, sessionId } = await getAuth(args);

  if (!userId) {
    return redirect("/login");
  }

  return redirect("/projects");
};

export default function LoginRoute() {
  return <LoginView />;
}
