import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import MagneticButton from './MagneticButton';

type State = 'idle' | 'transmit' | 'ok';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<State>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setLogs((l) => [...l, '✗ validation: required fields missing']);
      return;
    }
    setState('transmit');
    setLogs([
      '> uplink --target shubh@os',
      '✓ payload.encoded',
      '✓ tls.handshake',
      '… transmitting',
    ]);
    setTimeout(() => {
      setLogs((l) => [...l, '✓ ack 200 · message received', '> end of stream']);
      setState('ok');
    }, 1400);
  };

  const Field = ({ label, name, type = 'text', textarea = false }: any) => (
    <label className="block">
      <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">$</span>
        <span>{label}</span>
      </div>
      {textarea ? (
        <textarea
          rows={4}
          name={name}
          value={(form as any)[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full resize-none rounded-md border border-border bg-background/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/60"
          placeholder={`> ${label}…`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={(form as any)[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full rounded-md border border-border bg-background/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/60"
          placeholder={`> ${label}…`}
        />
      )}
    </label>
  );

  return (
    <section id="contact" className="relative py-32">
      <div className="container-x">
        <div className="mb-14">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            // chapter 04 · terminal uplink
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Open a <span className="text-gradient">channel</span>.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Terminal form */}
          <div className="overflow-hidden rounded-2xl glass holo-border">
            <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[11px] uppercase tracking-widest">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-destructive/70" />
                <span className="h-2 w-2 rounded-full bg-accent/70" />
                <span className="h-2 w-2 rounded-full bg-primary/70" />
                <span className="ml-3">shubh@os ~ connect --hire</span>
              </div>
              <span className="text-primary">● live</span>
            </div>

            <form onSubmit={submit} className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
              <Field label="name" name="name" />
              <Field label="email" name="email" type="email" />
              <div className="md:col-span-2"><Field label="message" name="message" textarea /></div>

              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-[11px] text-muted-foreground">
                  encryption: <span className="text-primary">aes-256-gcm</span> · status: <span className="text-primary">{state}</span>
                </div>
                <MagneticButton type="submit" disabled={state === 'transmit'}>
                  {state === 'transmit' ? 'transmitting…' : state === 'ok' ? 'sent ✓' : 'transmit'}
                </MagneticButton>
              </div>

              {logs.length > 0 && (
                <div className="md:col-span-2 mt-2 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed">
                  {logs.map((l, i) => (
                    <div key={i} className={l.startsWith('✓') ? 'text-primary' : l.startsWith('✗') ? 'text-destructive' : 'text-muted-foreground'}>
                      {l}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Side rail */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl glass holo-border p-6">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="status-dot" /> available · q3 2026
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Open to staff/principal-level work on compilers, AI infra, and dev tools. Remote · global. Selectively taking advisory.
              </p>
            </div>

            <a href="mailto:hi@shubh.os" className="group flex items-center justify-between rounded-2xl glass holo-border p-5 transition-colors hover:border-primary/60">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary" />
                <span className="font-mono text-sm">hi@shubh.os</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground group-hover:text-primary">→</span>
            </a>

            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="rounded-2xl glass holo-border p-5 transition-colors hover:border-primary/60">
                <Github size={16} className="text-primary" />
                <div className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">github</div>
                <div className="font-mono text-sm">@shubh</div>
              </a>
              <a href="#" className="rounded-2xl glass holo-border p-5 transition-colors hover:border-primary/60">
                <Linkedin size={16} className="text-primary" />
                <div className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">linkedin</div>
                <div className="font-mono text-sm">in/shubh</div>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
