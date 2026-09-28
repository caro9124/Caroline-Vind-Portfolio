import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import ProjectList from "@/components/ProjectList";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work — Caroline Vind" };

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main className="px-6 pb-32 pt-[28vh] md:px-10 lg:px-[4.5vw]">
        <h1 className="animate-rise text-[clamp(3rem,8vw,6rem)] italic leading-[0.9] tracking-[-0.035em]">
          Work <span className="align-top text-[11px] not-italic tracking-normal">({projects.length})</span>
        </h1>
        <ProjectList projects={projects} />
      </main>
    </>
  );
}
