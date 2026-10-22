"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { BOOKING_URL, contact, nav } from "@/lib/content";
import { InstagramIcon } from "./ui/icons";
import Button from "./ui/Button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Sections that are not nav targets (hero, intro) clear the highlight.
    const ids = ["top", "intro", ...nav.map((n) => n.href.slice(1))];
    const tracked = new Set(nav.map((n) => n.href));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const href = `#${e.target.id}`;
          setActive(tracked.has(href) ? href : null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  // Escape closes the menu; focus moves into it on open and back to the toggle on close.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button") ?? []).concat(toggleRef.current ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      } else if (e.key === "Tab") {
        const list = focusables();
        const i = list.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          list[list.length - 1]?.focus();
        } else if (!e.shiftKey && i === list.length - 1) {
          e.preventDefault();
          list[0]?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-cream" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <a href="#top" aria-label="Souji Studio, back to top" className="shrink-0">
          <Image src="/images/logo-souji.png" alt="Souji Studio" width={343} height={100} priority className="h-10 w-auto md:h-11" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold transition-colors duration-200 ${
                    active === item.href ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={BOOKING_URL}>Register now</Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-12 place-items-center rounded-full bg-ink text-cream transition-transform active:scale-95 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] bottom-0 bg-cream lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="shell flex h-full flex-col justify-between pb-10 pt-6">
              <ul className="flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-[2.5rem] font-extrabold leading-tight tracking-[-0.03em]"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1 text-[17px] font-semibold">
                  <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-3">
                    <Phone className="size-5" strokeWidth={2.25} aria-hidden />
                    {contact.phone}
                  </a>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-3"
                  >
                    <InstagramIcon className="size-5" />
                    {contact.instagramHandle}
                  </a>
                </div>
                <Button href={BOOKING_URL} className="w-full">
                  Register now
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
