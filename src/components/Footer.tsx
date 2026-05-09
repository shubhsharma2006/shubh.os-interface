import LiveClock from './LiveClock';
import { PROFILE } from '@/lib/profile';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="border-t border-border py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Shubh Sharma · built with care</div>
        <LiveClock />
        <div className="flex items-center gap-5">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-primary">github</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">linkedin</a>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-primary">email</a>
          <button onClick={scrollTop} className="hover:text-primary">↑ top</button>
        </div>
      </div>
    </footer>
  );
}
