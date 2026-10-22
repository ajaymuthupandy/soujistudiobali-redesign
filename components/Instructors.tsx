import Image from "next/image";
import { instructors } from "@/lib/content";
import { InstagramIcon } from "./ui/icons";
import Reveal from "./ui/Reveal";

export default function Instructors() {
  return (
    <section id="trainers" className="section screen scroll-mt-[72px] bg-leaf text-cream">
      <div className="shell flex flex-col">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="text-title">Meet your teachers</h2>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <p className="max-w-[26rem] text-[17px] font-medium leading-[1.5] md:ml-auto md:text-[18px]">
              Certified, experienced and patient with every level, from first class to handstand.
            </p>
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-4 mt-6 flex min-h-0 snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:flex-1 md:snap-none md:grid-cols-4 md:gap-x-5 md:gap-y-6 md:overflow-visible md:px-0 lg:mt-[clamp(18px,3vh,32px)] lg:grid-rows-2 lg:gap-y-[clamp(14px,2.4vh,26px)]">
          {instructors.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 4) * 0.07} className="min-h-0 w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto">
              <a
                href={t.ig}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col"
                aria-label={`${t.name} on Instagram`}
              >
                <div className="relative aspect-[256/270] overflow-hidden rounded-[22px] bg-leaf-deep lg:aspect-auto lg:min-h-[120px] lg:flex-1">
                  <Image
                    src={t.image}
                    alt={`${t.name}, ${t.role} instructor`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.06]"
                  />
                  <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-cream text-ink transition-[transform,opacity] duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <InstagramIcon className="size-[18px]" />
                  </span>
                </div>
                <p className="mt-2.5 text-[17px] font-bold leading-tight md:text-[19px]">{t.name}</p>
                <p className="mt-0.5 text-[14px] font-medium text-cream/90 md:text-[15px]">{t.role}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
