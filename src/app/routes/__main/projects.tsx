import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProjectId, ProjectSummary } from "@domain/project";
import { getProjectsSummary, deleteProject } from "@infrastructure/db/project";
import { getUserSession } from "@app/session-storage";
import { ProjectsView } from "@app/ui/main/projects";
import { getAuth } from "@clerk/remix/ssr.server";
import { getUserByEmail } from "@infrastructure/db/user";

export const meta: MetaFunction = () => {
  const title = "Jira clone - Projects";
  const description =
    "See all your projects in one place. Create new ones and assigne team members.";
  const image = "https://jira-clone.fly.dev/static/images/readme/projects.png";
  const url = "https://jira-clone.fly.dev/projects";

  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    title: title,
    description: description,
    "og:url": url,
    "og:type": "website",
    "og:site_name": title,
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "twitter:card": "summary_large_image",
    "twitter:site": url,
    "twitter:domain": "jira-clone.fly.dev",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:image:width": "1297",
    "twitter:image:height": "635",
    "twitter:image:alt": title,
    "twitter:creator": "@Jack_DanielSG",
    "twitter:creator:id": "Jack_DanielSG",
  };
};

type LoaderData = {
  projectsSummary: ProjectSummary[];
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
  } else {
    const projectsSummary = await getProjectsSummary(userId);

    return json<LoaderData>(
      { projectsSummary },
      {
        headers: { "Set-Cookie": await userSession.commit() },
      }
    );
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const _action = formData.get("_action") as string;

  if (_action === "delete") {
    const projectId = formData.get("projectId") as unknown as ProjectId;
    if (typeof projectId !== "number") throw new Error("Invalid project ID");

    projectId
      ? await deleteProject(projectId)
      : console.error("Project id not found: ", projectId);
  }
  return redirect("/projects");
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="h-full w-full text-center">
      <h1 className="mt-[200px] mb-6 text-lg">/projects ERROR</h1>
      <a href="/" className="text-primary-main hover:underline">
        Navigate to home
      </a>
    </div>
  );
}

export default function ProjectsRoute() {
  const { projectsSummary } = useLoaderData() as LoaderData;
  return <ProjectsView projectsSummary={projectsSummary} />;
}
