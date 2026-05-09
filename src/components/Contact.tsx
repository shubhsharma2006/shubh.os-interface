import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import UptimePanel from './UptimePanel';
import ContactForm from './ContactForm';
import { PROFILE } from '@/lib/profile';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="container-x">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          06 — contact
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]"
        >
          All systems<br />
          <span className="text-gradient">operational</span>.
        </motion.h2>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Looking for a software / AI engineering intern who ships? Let&apos;s talk.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <UptimePanel />
          <ContactForm />
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5 text-muted-foreground">
            <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="transition-colors hover:text-primary">
              <Mail className="h-5 w-5" />
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <div><span className="status-dot mr-2 inline-block align-middle" />Available · summer 2026</div>
            <div>{PROFILE.location}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
