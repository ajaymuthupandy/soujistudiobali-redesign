"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { BOOKING_URL } from "@/lib/content";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

const facts = [
  { value: "30 min", label: "full-body intro class" },
  { value: "8", label: "certified teachers" },
  { value: "4 days", label: "of classes every week" },
];

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="intro" className="section screen bg-paper">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-8">
        <div className="flex flex-col justify-center lg:col-span-6">
          <Reveal>
            <h2 className="text-title">A studio for every body</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[30rem] text-[18px] font-medium leading-[1.55]">
              New here? Start with our intro class. It is the easiest way to meet our teachers and feel the studio.
            </p>
          </Reveal>

          <dl className="mt-8 grid grid-cols-3 gap-3 lg:mt-10">
            {facts.map((f, i) => (
              <Reveal key={f.value} delay={0.14 + i * 0.07} className="rounded-[20px] bg-cream p-4 md:p-5">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block whitespace-nowrap text-[clamp(1.3rem,3vw,2.6rem)] font-extrabold leading-none tracking-[-0.04em] text-leaf">
                    {f.value}
                  </span>
                  <span className="mt-2 block text-[14px] font-medium leading-snug text-muted md:text-[15px]">{f.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.3} className="mt-8 lg:mt-10">
            <Button href={BOOKING_URL}>Book your intro class</Button>
          </Reveal>
        </div>

        <div ref={ref} className="relative min-h-0 lg:col-span-6">
          <Reveal className="relative h-full overflow-hidden rounded-[32px] bg-sky">
            <motion.div style={{ y }} className="relative aspect-[811/578] w-full lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src="/images/background/register.webp"
                alt="A woman balances in crow pose above misty green hills"
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="scale-[1.14] object-contain object-center"
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
