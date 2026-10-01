import About from "../components/About";
import Achievements from "../components/Achievements";
import BlogPreview from "../components/BlogPreview";
import Connect from "../components/Connect";
import Experience from "../components/Experience";
import Expertise from "../components/Expertise";
import Hero from "../components/Hero";
import Quote from "../components/Quote";
import Reveal from "../components/Reveal";
import Stats from "../components/Stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Expertise />
      </Reveal>
      <Reveal>
        <Achievements />
      </Reveal>
      <Reveal>
        <BlogPreview limit={3} />
      </Reveal>
      <Reveal>
        <Quote />
      </Reveal>
      <Reveal>
        <Connect />
      </Reveal>
    </>
  );
}
