import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProjectData, ProjectId } from "@domain/project";
import { fetchProject } from "@infrastructure/db/project";
import { ProjectView } from "@app/views/app/project";

// TODO: Ensure type safety between the loader and the view
type LoaderData = {
  project: ProjectData;
  section: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const projectId = params.projectId as ProjectId;
  const projectSection = url.pathname.split("/").slice(-1)[0];
  console.log("PARAMS: ", params);
  console.log("REQUEST: ", request);

  if (url.pathname === `/projects/${projectId}`) {
    return redirect(`${projectId}/board`);
  }

  const project = await fetchProject(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  return {
    project: project,
    section: projectSection,
  };
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="h-full w-full text-center">
      <h1 className="text-lg mt-[200px] mb-6">/projects/$projectId ERROR</h1>
      <a href="/projects" className="text-primary-main hover:underline">
        Navigate to the projects page
      </a>
    </div>
  );
}

export default function ProjectRoute() {
  const loaderData = useLoaderData();
  const { project, section } = loaderData as LoaderData;
  return <ProjectView projectData={project} section={section} />;
}
