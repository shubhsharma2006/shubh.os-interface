import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  const cards = [
    {
      title: 'Systems Thinking',
      description:
        'I architect intelligent systems by thinking in layers: from compiler primitives to AI inference pipelines. Every decision compounds.',
      icon: '⚙️',
    },
    {
      title: 'Execution Mindset',
      description:
        'Code is thought made manifest. I obsess over performance, scalability, and the invisible infrastructure that makes magic feel effortless.',
      icon: '⚡',
    },
    {
      title: 'Intelligent Interfaces',
      description:
        'The best tools feel alive. I merge AI with UI to create interfaces that anticipate, adapt, and empower developers and users.',
      icon: '🧠',
    },
  ];

  return (
    <section id="about" className="relative py-32">
      <div className="container-x">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            // chapter 01 · system narrative
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Building <span className="text-gradient">intelligent systems</span>.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-white/10"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-2xl" />
              </div>

              <div className="mb-4 text-4xl">{card.icon}</div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom narrative */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20 max-w-3xl"
        >
          <motion.p variants={itemVariants} className="font-mono text-sm leading-relaxed text-muted-foreground">
            <span className="text-primary">{'>'}</span> I don't just build websites. I engineer digital systems that feel intelligent, intentional, and
            alive. From compilers that parse human intent into executable functions, to AI interfaces that anticipate user needs, to
            developer tools that make complex systems feel simple—every project is a step toward building the future of intelligent
            computing.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
