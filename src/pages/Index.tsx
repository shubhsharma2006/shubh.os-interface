import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CursorFollower } from '@/components/ui/CursorFollower';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import LogStream from '@/components/LogStream';
import StatsGrid from '@/components/StatsGrid';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Work from '@/components/Work';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = 'Shubh Sharma — Full-Stack & AI Engineer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'Shubh Sharma — pre-final year CS (Data Science) student & full-stack engineer. Production systems, RBAC, Docker, AI/ML, RAG.'
      );
  }, []);

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
        <LogStream />
        <StatsGrid />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
