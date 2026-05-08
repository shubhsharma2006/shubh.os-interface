import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CursorFollower } from '@/components/ui/CursorFollower';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
import Playground from '@/components/Playground';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = 'Shubh — Creative Engineer & Designer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'Shubh — creative engineer crafting cinematic interfaces, 3D experiences and developer tools.'
      );
  }, []);

  // Scroll to hash on mount/back-navigation (e.g. /#work)
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hash]);

  return (
    <>
      <CursorFollower />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Process />
        <Experience />
        <Testimonials />
        <Playground />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
