import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { User, getRandomPastelColor } from "@domain/user";
import { createUser } from "@infrastructure/db/user";
import { getUserSession } from "@app/session-storage";
import { RegisterView } from "@app/ui/register";
import { getAuth } from "@clerk/remix/ssr.server";
import { Prisma } from "@prisma/client";

export const action: ActionFunction = async (args) => {
  const { user } = await getAuth(args);

  if (!user) return redirect("/login");

  const userCreateInput: Prisma.UserCreateInput = {
    email: user.emailAddresses[0].emailAddress,
    firstName: user.firstName!,
    lastName: user.lastName!,
    color: getRandomPastelColor(),
  };

  let newUser: User;
  try {
    newUser = await createUser(userCreateInput);
  } catch (error) {
    throw new Response("Bad Request", {
      status: 500,
    });
  }
  
  const userSession = await getUserSession(args);
  userSession.setUser(newUser.id);

  return redirect("/projects", {
    headers: { "Set-Cookie": await userSession.commit() },
  });
};

export default function RegisterRoute() {
  return <RegisterView />;
}
