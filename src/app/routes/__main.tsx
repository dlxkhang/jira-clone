import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "@domain/user";
import { getUserSession } from "@app/session-storage/user-storage.server";
import { getUser } from "@infrastructure/db/user";
import { MainLayout } from "@app/ui/main";
import { getAuth } from "@clerk/remix/ssr.server";

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async (args) => {
  const userSession = await getUserSession(args);
  const userId = userSession.getUser();

  if (!userId) {
    const { user } = await getAuth(args);

    if (!user) {
      redirect("/login");
      return null;
    }

    const dbUser = await getUserByEmail(user.emailAddresses[0].emailAddress);
    if (!dbUser) throw new Response("Not Found", { status: 404 });
    userSession.setUser(dbUser.id);
    return json<LoaderData>(
      { user },
      {
        headers: { "Set-Cookie": await userSession.commit() },
      }
    );
  } 
  return json<LoaderData>(
    { user },
    {
      headers: { "Set-Cookie": await userSession.commit() },
    }
  );

};

export default function AppRoute() {
  const { user } = useLoaderData() as LoaderData;
  return <MainLayout user={user} />;
}
