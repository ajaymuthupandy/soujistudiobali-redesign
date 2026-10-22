"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import {
  BOOKING_URL,
  DAILY_PRICE,
  MONTHLY_CLASSES,
  MONTHLY_PRICE,
  UNLIMITED_PRICE,
  plans,
} from "@/lib/content";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

type PlanId = (typeof plans)[number]["id"];

/** What a month of n classes costs on each plan (thousands of IDR). Extra Monthly classes are paid as drop-ins. */
function costs(n: number): Record<PlanId, number> {
  return {
    daily: n * DAILY_PRICE,
    monthly: MONTHLY_PRICE + Math.max(0, n - MONTHLY_CLASSES) * DAILY_PRICE,
    unlimited: UNLIMITED_PRICE,
  };
}

function bestPlan(n: number): PlanId {
  const c = costs(n);
  // On a tie, the plan with more included wins.
  if (c.unlimited <= c.monthly && c.unlimited <= c.daily) return "unlimited";
  if (c.monthly <= c.daily) return "monthly";
  return "daily";
}

const MAX = 20;

export default function Pricing() {
  const [n, setN] = useState(8);
  const best = bestPlan(n);
  const c = costs(n);
  const perClass = Math.round(c[best] / n);

  return (
    <section id="pricing" className="section screen scroll-mt-[72px] bg-cream">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col lg:col-span-5">
          <Reveal>
            <h2 className="text-title">Find your plan</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-[26rem] text-[18px] font-medium leading-[1.5]">
              Tell us how often you will come. Prices are per person, in Indonesian rupiah.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="mt-8 flex flex-col rounded-[28px] bg-paper p-3 lg:mt-[clamp(18px,3vh,32px)] lg:min-h-0 lg:flex-1">
            <div className="relative aspect-[370/220] overflow-hidden rounded-[20px] bg-sand lg:aspect-auto lg:min-h-[90px] lg:flex-1">
              <Image
                src="/images/class/kids-yoga.webp"
                alt="A class stretching arms overhead on teal mats at Souji Studio"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="px-3 pb-3 pt-5 md:px-5 md:pb-4 lg:pt-[clamp(12px,2.4vh,24px)]">
            <p className="flex items-baseline gap-3">
              <output htmlFor="classes-per-month" className="text-[clamp(3rem,min(6vw,9vh),5.5rem)] font-extrabold leading-[0.85] tracking-[-0.05em] tabular-nums">
                {n}
              </output>
              <label htmlFor="classes-per-month" className="text-[18px] font-bold">
                {n === 1 ? "class" : "classes"} a month
              </label>
            </p>
            <input
              id="classes-per-month"
              type="range"
              min={1}
              max={MAX}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="range mt-2"
              style={{ "--fill": `${((n - 1) / (MAX - 1)) * 100}%` } as React.CSSProperties}
            />
            <p className="mt-3 text-[16px] font-medium leading-snug" aria-live="polite">
              <span className="font-bold">{plans.find((p) => p.id === best)?.name}</span> suits you best, about{" "}
              <span className="font-bold">IDR {perClass}K</span> a class.
            </p>
            </div>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-3 lg:col-span-7 lg:min-h-0">
          {plans.map((p, i) => {
            const on = p.id === best;
            return (
              <Reveal as="li" key={p.id} delay={0.08 + i * 0.08} className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
                <div
                  className={`relative flex flex-col justify-center overflow-hidden rounded-[28px] p-6 transition-colors duration-500 md:p-8 lg:flex-1 lg:px-8 lg:py-[clamp(14px,2.6vh,30px)] ${
                    on ? "text-ink" : "bg-paper text-ink"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="plan-highlight"
                      className="absolute inset-0 bg-cyan"
                      transition={{ type: "spring", stiffness: 300, damping: 34 }}
                    />
                  )}
                  <div className="relative grid gap-5 md:grid-cols-[1fr_auto] md:gap-8 lg:grid-cols-1 lg:gap-3 xl:grid-cols-[1fr_auto] xl:gap-8">
                    <div>
                      <h3 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[clamp(2.4rem,4vw,3.4rem)] leading-none tracking-[-0.05em]">
                        <span>{p.price}K</span>{" "}
                        <span className="text-[18px] font-bold tracking-normal">
                          {p.name}
                          <span className="font-semibold">, {p.period}</span>
                        </span>{" "}
                        {on && (
                          <span className="self-center rounded-full bg-ink px-3 py-1 text-[14px] font-bold tracking-normal text-cream">
                            Best for you
                          </span>
                        )}
                      </h3>
                      <ul className="mt-4 grid gap-1.5 lg:mt-3 lg:grid-cols-2 lg:gap-x-6 xl:grid-cols-1 xl:[@media(max-height:820px)]:grid-cols-2">
                        {p.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-2 text-[15px] font-medium leading-snug">
                            <Check className={`mt-0.5 size-4 shrink-0 ${on ? "text-ink" : "text-leaf"}`} strokeWidth={3} />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-end gap-4 md:items-end md:text-right lg:flex-row lg:items-center lg:justify-between lg:text-left xl:flex-col xl:items-end xl:justify-end xl:text-right">
                      <p className={`text-[15px] font-semibold ${on ? "text-ink" : "text-muted"}`}>
                        {n} {n === 1 ? "class" : "classes"} on this plan: <span className="font-bold text-ink">IDR {c[p.id]}K</span>
                      </p>
                      <Button href={BOOKING_URL} variant={on ? "ink" : "cyan"} ariaLabel={`Grab Now: ${p.name} plan`}>
                        Grab Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
