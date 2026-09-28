import Link from "next/link";
import { navItems } from "@/content/site";

export default function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 pt-6 lg:pt-7">
      <nav aria-label="Main">
        <ul className="flex justify-around px-2 text-[10px] font-medium uppercase tracking-[0.04em] sm:text-[11px]">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="underline-offset-4 transition-opacity duration-300 hover:underline hover:opacity-60"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
