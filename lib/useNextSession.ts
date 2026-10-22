"use client";

import { useSyncExternalStore } from "react";
import { schedule } from "./content";

const noop = () => () => {};

/** true only after hydration, so time-based UI never mismatches the server render. */
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Current weekday and minutes since midnight in Bali (WITA, UTC+8). */
function baliNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Makassar",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(".").map(Number);
  return h * 60 + m;
};

export type NextSession = {
  when: string;
  dayShort: string;
  time: string;
  name: string;
  teacher: string;
};

export function getNextSession(): NextSession | null {
  const { day, minutes } = baliNow();
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    const entry = schedule.find((s) => s.index === d);
    if (!entry) continue;
    const session = entry.sessions.find((s) => !s.tbc && (offset > 0 || toMinutes(s.time) > minutes));
    if (!session) continue;
    const when = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : DAY_NAMES[d];
    return { when, dayShort: entry.short, ...session };
  }
  return null;
}

export function useNextSession() {
  const mounted = useMounted();
  return mounted ? getNextSession() : null;
}
