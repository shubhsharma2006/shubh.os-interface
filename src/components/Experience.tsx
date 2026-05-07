import { motion } from 'framer-motion';

const ROLES = [
  {
    period: '2024 — Now',
    company: 'Independent',
    role: 'Creative Engineer · Freelance',
    body: 'Building cinematic brand sites, 3D product launches and interactive prototypes for startups and agencies worldwide.',
  },
  {
    period: '2022 — 2024',
    company: 'Lumen Labs',
    role: 'Senior Frontend Engineer',
    body: 'Led the design system and motion language. Shipped flagship marketing site and internal developer tools used by 200+ engineers.',
  },
  {
    period: '2021 — 2022',
    company: 'Northwind Studio',
    role: 'Product Designer + Engineer',
    body: 'Hybrid design/engineering role. Designed and shipped onboarding for a fintech app reaching 1M+ users.',
  },
  {
    period: '2019 — 2021',
    company: 'Freelance · Various',
    role: 'Frontend Developer',
    body: 'Cut my teeth on agency work — landing pages, e-commerce, dashboards. Learned the value of polish.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="container-x">
        <div className="mb-16">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            04 — experience
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            A short <span className="text-gradient">history</span>.
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-1/2" />
          {ROLES.map((r, i) => (
            <motion.div
              key={r.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`relative mb-10 flex gap-6 md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}
            >
              <div
                className={`absolute top-2 h-3 w-3 rounded-full border-2 border-primary bg-background ${
                  i % 2 ? 'left-2 md:-left-[7px]' : 'left-2 md:-right-[7px] md:left-auto'
                }`}
              />
              <div className="ml-10 md:ml-0">
                <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  {r.period}
                </div>
                <div className="mt-2 font-display text-xl font-semibold text-foreground">
                  {r.role}
                </div>
                <div className="text-sm text-muted-foreground">{r.company}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
