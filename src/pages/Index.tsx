import { useEffect, useState } from 'react';
import BootIntro from '@/components/BootIntro';
import CustomCursor from '@/components/CustomCursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SectionDivider from '@/components/SectionDivider';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const SEEN_KEY = 'shubhos.booted';

const Index = () => {
  const [booting, setBooting] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem(SEEN_KEY);
  });

  useEffect(() => {
    if (!booting) sessionStorage.setItem(SEEN_KEY, '1');
    document.title = 'SHUBH.OS — Architect of Intelligent Systems';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'SHUBH.OS — portfolio of Shubh, building compilers, AI interfaces and developer tools.');
  }, [booting]);

  useEffect(() => {
    if (!booting) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setBooting(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [booting]);

  return (
    <>
      {booting && <BootIntro onDone={() => setBooting(false)} />}
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <SectionDivider />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
