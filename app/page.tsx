import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Classes from "@/components/Classes";
import Instructors from "@/components/Instructors";
import ScheduleTrial from "@/components/ScheduleTrial";
import Pricing from "@/components/Pricing";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Classes />
        <Instructors />
        <ScheduleTrial />
        <Pricing />
      </main>
      <ContactFooter />
    </>
  );
}
