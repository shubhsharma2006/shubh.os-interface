import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import MagneticButton from './MagneticButton';

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
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]"
        >
          Have a project<br />
          in mind? <span className="text-gradient">Let's talk.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="mailto:hello@shubh.dev">
            <MagneticButton>
              <Mail className="mr-2 inline h-4 w-4" />
              hello@shubh.dev
            </MagneticButton>
          </a>
          <MagneticButton variant="ghost" onClick={() => navigator.clipboard?.writeText('hello@shubh.dev')}>
            Copy email
          </MagneticButton>
        </motion.div>

        <div className="mt-20 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5 text-muted-foreground">
            <a href="#" aria-label="GitHub" className="transition-colors hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="transition-colors hover:text-primary">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <div>
              <span className="status-dot mr-2 inline-block align-middle" />
              Available May 2026
            </div>
            <div>Bengaluru · IST (UTC+5:30)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
