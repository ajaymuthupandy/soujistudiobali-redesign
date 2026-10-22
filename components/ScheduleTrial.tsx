"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { BOOKING_URL, schedule } from "@/lib/content";
import { useNextSession } from "@/lib/useNextSession";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

export default function ScheduleTrial() {
  const next = useNextSession();

  return (
    <section id="schedule" className="section screen scroll-mt-[72px] bg-paper">
      <div className="shell grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="flex flex-col rounded-[32px] bg-cream p-4 sm:p-8 lg:col-span-8 lg:min-h-0 lg:p-[clamp(16px,3vh,40px)]">
          <div className="flex flex-col gap-3 px-2 sm:px-0 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 className="text-title [@media(min-width:1024px)_and_(max-height:820px)]:text-[clamp(2rem,3.3vw,3rem)]">This week at Souji</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="whitespace-nowrap text-[16px] font-semibold text-muted md:pb-2" aria-live="polite">
                {next ? `Next up: ${next.when}, ${next.time}` : "All classes at Souji Studio"}
              </p>
            </Reveal>
          </div>

          <ul className="mt-6 flex flex-col gap-2.5 lg:gap-[clamp(4px,1vh,8px)] md:mt-8 lg:mt-[clamp(10px,2.2vh,32px)] lg:min-h-0 lg:flex-1">
            {schedule.map((d, i) => (
              <Reveal
                as="li"
                key={d.short}
                delay={0.08 + i * 0.07}
                style={{ flexGrow: d.sessions.length }}
                className="grid gap-2 rounded-[22px] bg-paper p-2 sm:grid-cols-[96px_1fr] sm:gap-4 lg:basis-0 lg:grid-cols-[64px_1fr] lg:gap-2 lg:p-1.5 xl:grid-cols-[96px_1fr] xl:gap-4"
              >
                <p className="self-center px-3 pt-2 text-[17px] font-extrabold tracking-[-0.02em] sm:px-4 sm:pt-0 sm:text-[20px]">
                  <span className="sm:hidden">{d.day}</span>
                  <span className="hidden sm:inline">{d.short}</span>
                </p>
                <ul className="flex flex-col gap-1.5 lg:h-full lg:gap-1">
                  {d.sessions.map((s) => {
                    const isNext = next?.dayShort === d.short && next.time === s.time;
                    return (
                      <li
                        key={s.time}
                        className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-[16px] px-3 py-3 transition-colors duration-500 sm:grid-cols-[auto_1fr_auto] sm:gap-5 sm:px-4 lg:flex-1 lg:py-1.5 [@media(min-width:1024px)_and_(max-height:820px)]:py-0.5 ${
                          isNext ? "bg-cyan" : "bg-cream"
                        }`}
                      >
                        <span
                          className={`hidden w-[4.6ch] text-[clamp(1.35rem,2vw,1.75rem)] font-extrabold tabular-nums leading-none tracking-[-0.04em] sm:block ${
                            s.tbc ? "text-muted" : ""
                          }`}
                        >
                          {s.time}
                        </span>
                        <span className="min-w-0 lg:flex lg:flex-wrap lg:items-baseline lg:gap-x-2">
                          <span className={`block text-[15px] font-extrabold tabular-nums sm:hidden ${s.tbc ? "text-muted" : ""}`}>
                            {s.tbc ? "Time TBC" : s.time}
                          </span>
                          <span className="block text-[16px] font-bold leading-snug sm:text-[18px]">{s.name}</span>
                          <span className={`block text-[14px] font-medium lg:inline ${isNext ? "text-ink" : "text-muted"}`}>
                            with {s.teacher}
                            {s.tbc ? <span className="lg:hidden xl:inline"> · time on request</span> : null}
                          </span>
                        </span>
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.tbc ? `Book ${s.name} on ${d.day}, time on request` : `Book ${s.name} on ${d.day} at ${s.time}`}
                          className={`inline-flex min-h-11 items-center rounded-full px-4 text-[14px] font-bold transition-[background-color,transform] duration-200 active:scale-95 ${
                            isNext ? "bg-ink text-cream hover:bg-black" : "bg-paper text-ink hover:bg-cyan"
                          }`}
                        >
                          Book
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal
          delay={0.1}
          className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[32px] bg-cyan sm:min-h-[460px] p-6 sm:p-8 lg:col-span-4 lg:min-h-0 lg:p-[clamp(24px,4vh,40px)]"
        >
          <h3 className="max-w-[11ch] text-[clamp(2.25rem,3.4vw,3.1rem)] leading-[0.98] text-ink">Your first class is free</h3>
          <p className="mt-4 max-w-[17rem] text-[17px] font-semibold leading-snug text-ink">
            Register today. All fitness levels welcome.
          </p>
          <ul className="relative z-10 mt-5 flex flex-col gap-2 text-[15px] font-bold text-ink">
            {["Any class on the schedule", "Yoga mat provided", "No experience needed"].map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <Check className="size-4 shrink-0" strokeWidth={3} aria-hidden />
                {perk}
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-auto pt-6">
            <Button href={BOOKING_URL} variant="ink" ariaLabel="Register for your free first class">
              Register
            </Button>
          </div>
          <Image
            src="/images/background/happy-yoga.webp"
            alt="A smiling woman dancing with her arms raised"
            width={362}
            height={447}
            sizes="320px"
            className="pointer-events-none absolute -bottom-1 -right-4 h-auto max-w-[300px] w-[54%] sm:w-[40%] lg:w-[66%]"
          />
        </Reveal>
      </div>
    </section>
  );
}
