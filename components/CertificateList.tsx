import Image from "next/image";
import type { Certificate } from "@/content/certificates";
import HandUnderline from "./HandUnderline";

/** Each certificate as an entry in a ledger: date, what and who, and a small paper slip beside it. */
export default function CertificateList({ certificates }: { certificates: Certificate[] }) {
  return (
    <ol className="mt-16 border-t border-ink/15">
      {certificates.map((cert, i) => (
        <li
          key={cert.slug}
          className="group grid gap-y-10 border-b border-ink/15 py-12 md:grid-cols-12 md:gap-x-8 lg:py-16"
        >
          <div className="flex items-baseline gap-4 text-[10px] tabular-nums md:col-span-2 md:block">
            <p>{String(i + 1).padStart(2, "0")}</p>
            <p className="italic md:mt-2">{cert.issued}</p>
          </div>

          <div className="md:col-span-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.04em]">{cert.issuer}</p>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.75rem)] italic leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                {cert.title}
                <HandUnderline />
              </span>
            </h2>
            <p className="mt-6 max-w-[380px] text-[12px] leading-[1.45]">{cert.description}</p>

            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[10px] italic">
              {cert.skills.map((skill) => (
                <li key={skill}>({skill})</li>
              ))}
            </ul>

            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-[10px] font-medium uppercase tracking-[0.04em] underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
              >
                View certificate ↗
              </a>
            )}
          </div>

          <div className="md:col-span-4">
            <div className="w-full max-w-[340px] rotate-[-2deg] transition-transform duration-500 ease-out group-hover:rotate-[-0.5deg] group-hover:-translate-y-1 motion-reduce:transition-none md:ml-auto">
              {cert.image ? (
                <div className="print-grain relative shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                  <Image
                    src={cert.image.src}
                    alt={`${cert.title} certificate`}
                    width={cert.image.width}
                    height={cert.image.height}
                    sizes="340px"
                    className="h-auto w-full"
                  />
                </div>
              ) : (
                <CertificateSlip cert={cert} />
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A typeset stand-in for the certificate: paper, a hairline frame and the essentials. */
function CertificateSlip({ cert }: { cert: Certificate }) {
  return (
    <div
      aria-hidden="true"
      className="@container print-grain relative aspect-[1.414] bg-[#f1eee8] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute inset-[4cqw] flex flex-col border border-ink/20 p-[5cqw]">
        <p className="text-[3cqw] uppercase tracking-[0.12em]">Certificate</p>
        <p className="mt-auto text-[10cqw] italic leading-[0.95] tracking-[-0.03em]">{cert.title}</p>
        <div className="mt-[4cqw] flex items-end justify-between text-[3cqw] uppercase tracking-[0.06em]">
          <span>{cert.issuer}</span>
          <span className="normal-case italic tracking-normal">{cert.issued}</span>
        </div>
      </div>
      <div className="absolute right-[9cqw] top-[8cqw] h-[11cqw] w-[11cqw] rotate-[8deg] rounded-full bg-blush" />
    </div>
  );
}
