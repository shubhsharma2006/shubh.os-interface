export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="border-t border-border py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row">
        <div className="flex items-center gap-3">
          <span className="status-dot" />
          <span>SHUBH.OS · v1.0.0 · uptime 99.99%</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary">github</a>
          <a href="#" className="hover:text-primary">linkedin</a>
          <a href="mailto:hi@shubh.os" className="hover:text-primary">email</a>
          <button onClick={scrollTop} className="hover:text-primary">↑ top</button>
        </div>
      </div>
      <div className="container-x mt-4 text-center font-mono text-[10px] text-muted-foreground/60">
        © {new Date().getFullYear()} shubh — compiled with intent.
      </div>
    </footer>
  );
}
