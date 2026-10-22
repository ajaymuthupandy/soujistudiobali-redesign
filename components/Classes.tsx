import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BOOKING_URL, classes, prep } from "@/lib/content";
import Reveal from "./ui/Reveal";

export default function Classes() {
  return (
    <section id="classes" className="section screen scroll-mt-[72px] bg-cream">
      <div className="shell flex flex-col">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <Reveal>
            <h2 className="text-title">Find your class</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <a href="#schedule" className="group inline-flex min-h-11 items-center gap-2 text-[16px] font-bold text-ink">
              <span className="underline decoration-cyan decoration-[3px] underline-offset-[6px] transition-[text-decoration-color] group-hover:decoration-ink">
                See the full schedule
              </span>
              <ArrowUpRight
                className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </a>
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-4 mt-6 flex min-h-0 snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:flex-1 md:snap-none md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:mt-[clamp(18px,3vh,32px)] lg:gap-6">
          {classes.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 0.09} className="min-h-0 w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="group relative flex h-full flex-col">
                <div className="relative aspect-[370/270] overflow-hidden rounded-[24px] bg-sand lg:aspect-auto lg:min-h-[160px] lg:flex-1">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-[50%_25%] transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.06]"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.05]">{c.name}</h3>
                    <p className="mt-1 text-[15px] font-medium text-muted md:text-[16px]">
                      with {c.teacher} · {c.day}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-ink transition-colors duration-300 group-hover:bg-cyan">
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
                    <span className="sr-only">Book {c.name}</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 grid gap-3 rounded-[28px] bg-paper p-3 sm:grid-cols-2 lg:mt-[clamp(18px,3vh,32px)] lg:grid-cols-[0.8fr_1fr_1fr] xl:grid-cols-[1.1fr_repeat(4,1fr)] lg:items-stretch">
          <Reveal className="flex items-center px-3 py-2 sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:px-4 xl:row-span-1">
            <h3 className="text-[clamp(1.4rem,1.9vw,1.85rem)] leading-[1.05]">Before your first class</h3>
          </Reveal>
          {prep.map((p, i) => (
            <Reveal
              key={p.title}
              delay={0.06 + i * 0.06}
              className="group flex items-start gap-3 rounded-[20px] bg-cream p-4 transition-colors duration-300 hover:bg-sky"
            >
              <Image
                src={p.icon}
                alt=""
                width={122}
                height={121}
                className="size-12 shrink-0 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-6 group-hover:scale-105"
              />
              <div>
                <p className="text-[16px] font-bold leading-tight">{p.title}</p>
                <p className="mt-1 text-[14px] font-medium leading-[1.4] text-ink/80">{p.short}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
