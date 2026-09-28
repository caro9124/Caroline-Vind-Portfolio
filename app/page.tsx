import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import HeroIntro from "@/components/HeroIntro";
import Collage from "@/components/Collage";
import Keywords from "@/components/Keywords";
import ProjectList from "@/components/ProjectList";
import InPractice from "@/components/InPractice";
import ProcessJourney from "@/components/ProcessJourney";
import { desktopJourney, mobileJourney } from "@/components/processDrawing";
import StipplePortrait from "@/components/StipplePortrait";
import { practice, practiceIntro } from "@/content/practice";
import { projects } from "@/content/projects";
import { aboutTeaser, collage, processStages } from "@/content/site";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="relative min-h-svh px-6 pb-20 pt-32 md:px-10 md:pt-40 lg:px-[4.5vw] lg:pb-0 lg:pt-[28vh]">
          <HeroIntro />
          <Collage
            items={collage}
            className="mx-auto mt-20 w-full max-w-md md:ml-auto md:mr-0 md:mt-12 md:w-[60%] md:max-w-none lg:absolute lg:right-[14vw] lg:top-[30vh] lg:mt-0 lg:w-[min(34vw,60vh)]"
          />
        </section>

        {/*
          The portrait develops out of the page. From tablet up the section is a tall scroll track with a
          sticky panel, so the whole figure stays in view while it forms; on phones it simply scrolls past.
        */}
        <section aria-labelledby="about-teaser" data-stipple-track className="relative md:h-[260vh]">
          <div className="flex flex-col gap-16 px-6 pb-32 pt-24 md:sticky md:top-0 md:h-svh md:flex-row md:items-center md:justify-between md:px-10 md:py-0 lg:px-[4.5vw]">
            <div className="max-w-[280px]">
              <p className="text-[10px] italic">({aboutTeaser.label})</p>
              <h2
                id="about-teaser"
                className="mt-4 text-[clamp(2rem,4vw,3.5rem)] italic leading-[0.95] tracking-[-0.03em]"
              >
                {aboutTeaser.heading}
              </h2>
              <p className="mt-6 text-[11px] leading-[1.35]">
                <Keywords text={aboutTeaser.body} />
              </p>
              <Link
                href={aboutTeaser.href}
                className="mt-6 inline-block text-[10px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
              >
                {aboutTeaser.linkLabel} →
              </Link>
            </div>

            <StipplePortrait className="ml-auto h-[85svh] max-h-[760px] md:mr-[6vw] md:h-[92svh] md:max-h-none lg:mr-[14vw]" />
          </div>
        </section>

        {/*
          How an idea travels: one pen line draws each stage as you scroll, pauses while its words
          appear, then carries on, zig-zagging down the page into an arrow at the work below.
        */}
        <section aria-labelledby="process-heading" className="px-6 pt-24 md:px-10 lg:px-[4.5vw] lg:pt-[14vh]">
          <h2 id="process-heading" className="text-[10px] italic">
            (How I work)
          </h2>
          <ProcessJourney journey={desktopJourney} copy={processStages} className="mt-10 hidden md:block" />
          <ProcessJourney journey={mobileJourney} copy={processStages} className="mt-10 md:hidden" />
        </section>

        <section id="work" aria-labelledby="selected-work" className="px-6 pb-32 pt-16 md:px-10 lg:px-[4.5vw]">
          <div className="flex max-w-5xl items-baseline justify-between gap-6">
            <h2
              id="selected-work"
              className="text-[clamp(2.75rem,7vw,5.5rem)] italic leading-[0.9] tracking-[-0.035em]"
            >
              Selected work
            </h2>
            <Link
              href="/work"
              className="shrink-0 text-[10px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
            >
              All work →
            </Link>
          </div>
          <ProjectList projects={projects} />
        </section>

        {/* Experiences outside the project work, kept apart from it: an archive of things learned by doing. */}
        <section id="in-practice" aria-labelledby="in-practice-heading" className="px-6 pb-40 pt-16 md:px-10 lg:px-[4.5vw]">
          <p className="text-[10px] italic">(In practice)</p>
          <h2
            id="in-practice-heading"
            className="mt-4 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] italic leading-[0.9] tracking-[-0.035em]"
          >
            {practiceIntro}
          </h2>
          <InPractice entries={practice} />
        </section>
      </main>
    </>
  );
}
