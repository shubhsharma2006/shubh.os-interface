import { useEffect, useState } from 'react';
import { CursorFollower } from '@/components/ui/CursorFollower';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Experience from '@/components/Experience';
import Playground from '@/components/Playground';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = 'Shubh — Creative Engineer & Designer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'Shubh — creative engineer crafting cinematic interfaces, 3D experiences and developer tools.'
      );
  }, []);

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
        <Playground />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
