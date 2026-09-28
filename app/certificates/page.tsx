import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import CertificateList from "@/components/CertificateList";
import { certificates, certificatesNote } from "@/content/certificates";

export const metadata: Metadata = { title: "Certificates — Caroline Vind" };

export default function CertificatesPage() {
  const sorted = [...certificates].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SiteNav />
      <main className="px-6 pb-40 pt-[28vh] md:px-10 lg:px-[4.5vw]">
        <h1 className="animate-rise text-[clamp(3rem,8vw,6rem)] italic leading-[0.9] tracking-[-0.035em]">
          Certificates{" "}
          <span className="align-top text-[11px] not-italic tracking-normal">({sorted.length})</span>
        </h1>
        <p className="mt-6 max-w-[260px] text-[11px] leading-[1.35]">
          Courses taken alongside my studies at VIA.
        </p>

        <CertificateList certificates={sorted} />

        <p className="mt-10 flex rotate-[-2deg] items-start gap-2 font-script text-[1.5rem] leading-none text-ink/85 md:ml-[16.6%]">
          <svg aria-hidden="true" viewBox="0 0 28 20" className="mt-1 h-4 w-6 shrink-0">
            <path
              d="M2 4c4 9 11 12 21 11m-5-5 5 5-6 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {certificatesNote}
        </p>
      </main>
    </>
  );
}
