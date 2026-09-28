"use client";

import { useEffect, useState } from "react";
import {
  calendarCategories,
  calendarNotes,
  type CalendarCategory,
  type CalendarEvent,
} from "@/content/about";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FIRST_HOUR = 7;
const LAST_HOUR = 22;
const HOUR_PX = 46;

const byId = Object.fromEntries(calendarCategories.map((c) => [c.id, c])) as Record<
  CalendarCategory,
  (typeof calendarCategories)[number]
>;

const fmt = (t: number) => `${String(Math.floor(t)).padStart(2, "0")}:${t % 1 ? "30" : "00"}`;

/** Weekday (0 = Monday) and decimal hour in Copenhagen, where the calendar lives. */
function copenhagenNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Copenhagen",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: DAYS.indexOf(get("weekday")), hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

/**
 * The colour-coded week, redrawn in the site's palette. Categories toggle on and off like the
 * calendar list in Google Calendar, and a small "now" line marks the current time in Copenhagen.
 */
export default function WeekCalendar({ events }: { events: CalendarEvent[] }) {
  const [hidden, setHidden] = useState<Set<CalendarCategory>>(new Set());
  const [now, setNow] = useState<{ day: number; hour: number } | null>(null);

  useEffect(() => {
    const tick = () => setNow(copenhagenNow());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  function toggle(id: CalendarCategory) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const hours = Array.from({ length: LAST_HOUR - FIRST_HOUR }, (_, i) => FIRST_HOUR + i);
  const showNow = now && now.day >= 0 && now.hour >= FIRST_HOUR && now.hour <= LAST_HOUR;

  return (
    <div>
      {/* Legend: each calendar can be switched off, like the checkboxes in Google Calendar. */}
      <ul className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Calendars">
        {calendarCategories.map((cat) => {
          const on = !hidden.has(cat.id);
          return (
            <li key={cat.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(cat.id)}
                className="flex items-center gap-2 text-[11px] transition-opacity duration-300 hover:opacity-70"
              >
                <span
                  aria-hidden="true"
                  className={`grid h-3.5 w-3.5 place-items-center border ${
                    "dashed" in cat ? "border-dashed border-ink" : "border-transparent"
                  }`}
                  style={{ backgroundColor: on ? cat.color : "transparent", borderColor: on ? undefined : "#0A0A0A" }}
                >
                  {on && (
                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" style={{ color: cat.text }}>
                      <path d="M2 5.2 4.2 7.4 8 2.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span className={on ? "" : "line-through decoration-ink/60"}>{cat.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-10">
        <p className="absolute -top-7 left-0 rotate-[-3deg] font-script text-[1.2rem] leading-none md:left-12">
          {calendarNotes.wake} ↓
        </p>

        {/* Wide enough to stay legible; on phones the week scrolls sideways inside its frame. */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[3rem_repeat(7,minmax(0,1fr))] border-b border-ink/15 pb-3 text-[10px] font-medium uppercase tracking-[0.04em]">
              <span />
              {DAYS.map((d, i) => (
                <span key={d} className="flex items-center gap-2 pl-2">
                  {d}
                  {now?.day === i && <span aria-label="today" className="h-1.5 w-1.5 rounded-full bg-ink" />}
                </span>
              ))}
            </div>

            <div
              className="relative grid grid-cols-[3rem_repeat(7,minmax(0,1fr))]"
              style={{ height: (LAST_HOUR - FIRST_HOUR) * HOUR_PX }}
            >
              {/* Hour lines and labels */}
              {hours.map((h, i) => (
                <div
                  key={h}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 border-t border-ink/10"
                  style={{ top: i * HOUR_PX }}
                >
                  <span className="absolute -top-2 left-0 bg-paper pr-2 text-[9px] tabular-nums text-ink/60">{fmt(h)}</span>
                </div>
              ))}

              <span />
              {DAYS.map((d, day) => (
                <div key={d} className="relative border-l border-ink/10">
                  {events
                    .filter((e) => e.day === day)
                    .map((e) => (
                      <EventBlock key={`${e.title}-${e.start}`} event={e} off={hidden.has(e.category)} />
                    ))}

                  {showNow && now.day === day && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 z-20 border-t border-ink"
                      style={{ top: (now.hour - FIRST_HOUR) * HOUR_PX }}
                    >
                      <span className="absolute -left-[5px] -top-[5px] h-2.5 w-2.5 rounded-full border border-ink bg-blush" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventBlock({ event, off }: { event: CalendarEvent; off: boolean }) {
  const cat = byId[event.category];
  const duration = event.end - event.start;
  const short = duration <= 0.5;
  // Short routines sit on top, slightly inset, the way Google stacks overlapping events.
  const inset = short ? "left-1.5 right-0.5 z-10" : "left-0.5 right-0.5";

  return (
    <div
      className={`group absolute overflow-hidden px-1.5 transition-[opacity,transform] duration-300 hover:z-30 hover:-translate-y-px ${inset} ${
        "dashed" in cat ? "border border-dashed border-ink" : ""
      } ${off ? "opacity-[0.08]" : "opacity-100"}`}
      style={{
        top: (event.start - FIRST_HOUR) * HOUR_PX + 1,
        height: duration * HOUR_PX - 2,
        backgroundColor: cat.color,
        color: cat.text,
      }}
      title={`${event.title}, ${fmt(event.start)}–${fmt(event.end)}`}
    >
      {short ? (
        <p className="truncate pt-[3px] text-[10px] leading-tight">
          {event.title}, <span className="tabular-nums">{fmt(event.start)}</span>
        </p>
      ) : (
        // Title and time run on as one paragraph, clamped to the lines the block has room for,
        // so a long title never spills out of its slot at narrower widths.
        <p
          className="overflow-hidden pt-1 text-[10px] leading-[12px] [-webkit-box-orient:vertical] [display:-webkit-box]"
          style={{ WebkitLineClamp: Math.max(1, Math.floor((duration * HOUR_PX - 6) / 12)) }}
        >
          <span className="font-medium">{event.title}</span>{" "}
          <span className="whitespace-nowrap tabular-nums opacity-80">
            {fmt(event.start)}–{fmt(event.end)}
          </span>
        </p>
      )}
    </div>
  );
}
