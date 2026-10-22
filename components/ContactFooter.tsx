import Image from "next/image";
import { Phone } from "lucide-react";
import { BOOKING_URL, contact, nav } from "@/lib/content";
import { FacebookIcon, InstagramIcon } from "./ui/icons";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

const YEAR = 2026;

/** Contact + footer share one frame: on desktop they fill exactly the last screen. */
export default function ContactFooter() {
  return (
    <footer id="contact" className="screen-frame flex scroll-mt-[72px] flex-col">
      <div className="relative flex flex-1 items-center overflow-hidden bg-sky">
        <Image
          src="/images/background/contact-bali.webp"
          alt=""
          fill
          sizes="(max-width: 767px) 380vw, (max-width: 1279px) 160vw, 110vw"
          quality={90}
          className="object-cover object-[28%_50%] md:object-[50%_60%]"
        />
        <div className="shell relative grid gap-8 py-14 lg:grid-cols-12 lg:items-end lg:py-[clamp(24px,5vh,56px)]">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-[clamp(2.75rem,min(7vw,11vh),6.5rem)] leading-[0.94] tracking-[-0.045em]">Ready when you are</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[30rem] text-[18px] font-semibold leading-[1.5] md:text-[20px]">
                Your first class is free. All fitness levels welcome.
              </p>
            </Reveal>
            <Reveal delay={0.14} className="mt-8 flex flex-wrap gap-3">
              <Button href={BOOKING_URL} variant="ink" ariaLabel="Register now for your free first class">
                Register now
              </Button>
              <Button href={contact.phoneHref} variant="cream" arrow={false} ariaLabel={`Call ${contact.phone}`}>
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4" strokeWidth={2.5} aria-hidden />
                  {contact.phone}
                </span>
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="flex gap-3 lg:col-span-4 lg:justify-end">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Souji Studio on Instagram"
              className="grid size-14 place-items-center rounded-full bg-paper text-ink transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-cyan"
            >
              <InstagramIcon className="size-6" />
            </a>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Souji Studio on Facebook"
              className="grid size-14 place-items-center rounded-full bg-paper text-ink transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-cyan"
            >
              <FacebookIcon className="size-6" />
            </a>
          </Reveal>
        </div>
      </div>

      <div className="bg-forest text-cream">
        <div className="shell pt-8 lg:pt-[clamp(20px,4vh,44px)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Image src="/images/footer-logo.png" alt="Souji Studio" width={343} height={100} className="h-10 w-auto self-start md:h-11 md:self-auto" />
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="inline-flex min-h-11 items-center text-[15px] font-semibold text-cream transition-opacity hover:opacity-80">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <p
            aria-hidden
            className="mt-6 select-none whitespace-nowrap text-[clamp(2.6rem,min(12.85vw,21vh),11.55rem)] font-black leading-[0.8] tracking-[-0.06em] text-forest-mark lg:mt-[clamp(14px,3vh,32px)]"
          >
            SOUJI STUDIO
          </p>

          <div className="flex flex-col gap-1 py-4 text-[14px] font-medium text-cream md:flex-row md:items-center md:justify-between">
            <p>© {YEAR} Souji Studio Bali. All rights reserved.</p>
            <p>
              Part of{" "}
              <a
                href={contact.parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-bold text-cream underline-offset-4 hover:underline"
              >
                {contact.parent.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
