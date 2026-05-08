export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Shubh moves like a small team. Architecture, motion, copy — all dialed in within days.",
    name: 'Anika Rao',
    role: 'Head of Product',
    company: 'Lumen Labs',
  },
  {
    quote:
      "The most polished engineer I've worked with. He thinks like a designer and ships like a senior IC.",
    name: 'Marcus Lee',
    role: 'Founding Engineer',
    company: 'Vector.so',
  },
  {
    quote:
      'Our marketing site went from blah to "wait, who built this?" in two weeks. Wild output.',
    name: 'Priya Shah',
    role: 'CMO',
    company: 'Northwind',
  },
  {
    quote:
      'Genuine craft. Performance budget respected, animations buttery, no flaky edges.',
    name: 'Diego Alvarez',
    role: 'Staff Engineer',
    company: 'Stripe',
  },
  {
    quote:
      'Took our compiler visualizer from concept to production in a sprint. Hire him yesterday.',
    name: 'Hannah Kim',
    role: 'CTO',
    company: 'Parsewave',
  },
  {
    quote:
      'Communicates crisply, scopes ruthlessly, ships beautifully. Rare combo.',
    name: 'Tomás Ferreira',
    role: 'Design Director',
    company: 'Field Studio',
  },
  {
    quote:
      'A force multiplier. Every detail, from hover states to error toasts, has intention.',
    name: 'Sara Bennett',
    role: 'VP Engineering',
    company: 'Cohere',
  },
  {
    quote:
      'Best portfolio I\u2019ve reviewed this year — and the work behind it is even better.',
    name: 'Jordan Patel',
    role: 'Recruiter',
    company: 'Linear',
  },
];
