"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Award, Flower2, Users } from "lucide-react";
import { BOOKING_URL } from "@/lib/content";
import { useNextSession } from "@/lib/useNextSession";
import Button from "./ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;
const lines = ["Keeping Your Mind", "in Best Condition"];

const stats = [
  { icon: Flower2, value: "500+", label: "Hours of training" },
  { icon: Users, value: "Certified", label: "Instructors" },
  { icon: Award, value: "Yoga, Pilates", label: "& Muay Thai" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const next = useNextSession();

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-cream pt-[72px] lg:h-[100svh] lg:min-h-[680px]"
    >
      {/* Arched photo, bleeding off the right edge on desktop */}
      <motion.div
        data-reveal
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.15, ease }}
        className="absolute bottom-0 right-0 top-[104px] hidden w-[42%] overflow-hidden rounded-tl-[clamp(200px,21vw,340px)] bg-sand lg:block"
      >
        <motion.div className="absolute inset-[-6%_0_-6%_0]" style={{ y }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, delay: 0.15, ease }}
          >
            <Image
              src="/images/background/homepage-one-banner.webp"
              alt="A woman holds a low lunge with hands in prayer beside potted plants"
              fill
              priority
              sizes="(min-width: 1024px) 1600px, 100vw"
              className="object-cover object-[68%_40%]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="shell relative flex flex-col lg:h-full lg:justify-center">
        <div className="flex flex-1 flex-col justify-center pt-8 lg:max-w-[60%] lg:flex-none lg:pt-0">
          <h1 className="text-[clamp(2.1rem,9.2vw,4.6rem)] leading-[0.95] tracking-[-0.045em] lg:text-[clamp(2.1rem,5.4vw,5rem)]">
            {lines.map((line, i) => (
              <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.16em]">
                <motion.span
                  data-reveal
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            <p className="mt-5 max-w-[34rem] text-[17px] font-medium leading-[1.5] md:text-[20px] lg:mt-6">
              Yoga, Pilates and Muay Thai in Bali, taught by certified instructors with 500+ hours of training.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8">
              <Button href={BOOKING_URL} className="w-full sm:w-auto">
                Make Appointment
              </Button>
              <Button href="#schedule" variant="ghost" arrow={false} className="w-full sm:w-auto">
                View Schedule
              </Button>
            </div>
          </motion.div>

          <motion.ul
            data-reveal
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-9 grid grid-cols-3 gap-3 sm:gap-0 lg:mt-[clamp(28px,5vh,52px)]"
          >
            {stats.map((s, i) => (
              <li
                key={s.value}
                className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 sm:pr-4 lg:flex-col lg:items-start lg:gap-2 xl:flex-row xl:items-center xl:gap-3 ${
                  i > 0 ? "sm:border-l sm:border-ink/10 sm:pl-4 xl:pl-6" : ""
                }`}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sky text-cyan-deep md:size-12">
                  <s.icon className="size-5 md:size-[22px]" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-[15px] font-bold md:text-[17px]">{s.value}</span>
                  <span className="block text-[14px] font-medium text-muted md:text-[15px]">{s.label}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Arched photo on phones and tablets */}
        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative mt-8 h-[min(420px,62vw)] min-h-[300px] overflow-hidden rounded-t-[999px] bg-sand md:mx-auto md:w-[70%] lg:hidden"
        >
          <Image
            src="/images/background/homepage-one-banner.webp"
            alt=""
            fill
            sizes="(min-width: 768px) 120vw, 240vw"
            className="object-cover object-[66%_30%]"
          />
        </motion.div>

        <motion.a
          data-reveal
          href="#schedule"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="group relative z-10 mx-3 -mt-12 mb-6 flex items-center gap-4 self-stretch rounded-[22px] bg-paper p-3 pr-4 sm:mx-auto sm:w-[420px] sm:self-center lg:mx-0 lg:self-start lg:mb-0 lg:mt-[clamp(28px,4.5vh,48px)] lg:w-[460px] lg:max-w-[40%] lg:min-w-[400px]"
        >
          <span className="grid size-14 shrink-0 place-items-center rounded-[14px] bg-cyan text-[15px] font-extrabold leading-none text-ink md:size-16 md:text-[17px]">
            {next ? next.time : "7d"}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold text-muted">
              {next ? `Next class · ${next.when}` : "Classes all week"}
            </span>
            <span className="block truncate text-[16px] font-bold leading-snug md:text-[18px]">
              {next ? `${next.name} with ${next.teacher}` : "See this week at Souji"}
            </span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sky text-cyan-deep transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="size-5" strokeWidth={2.25} aria-hidden />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
