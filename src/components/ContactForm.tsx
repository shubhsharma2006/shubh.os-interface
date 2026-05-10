import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import MagneticButton from './MagneticButton';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { supabase } from '@/integrations/supabase/client';

const schema = z.object({
  name: z.string().trim().min(1, 'Required').max(80),
  email: z.string().trim().email('Invalid email').max(160),
  message: z.string().trim().min(10, 'At least 10 chars').max(2000),
});

export default function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.errors.forEach((er) => { errs[er.path[0] as string] = er.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const id = crypto.randomUUID();
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert({ id, ...parsed.data });
      if (insertError) throw insertError;

      // Notify owner + auto-reply visitor. These run in parallel and are
      // non-blocking for the success state (submission is already stored).
      const submittedAt = new Date().toISOString();
      await Promise.allSettled([
        supabase.functions.invoke('send-transactional-email', {
          body: {
            templateName: 'contact-notification',
            recipientEmail: 'shubh4880@gmail.com',
            idempotencyKey: `notify-${id}`,
            templateData: { ...parsed.data, submittedAt },
          },
        }),
        supabase.functions.invoke('send-transactional-email', {
          body: {
            templateName: 'contact-confirmation',
            recipientEmail: parsed.data.email,
            idempotencyKey: `confirm-${id}`,
            templateData: parsed.data,
          },
        }),
      ]);

      setSent(true);
      setForm({ name: '', email: '', message: '' });
      toast({ title: 'Message sent', description: "I'll get back to you within 24h." });
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Please email me directly at shubh4880@gmail.com',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur md:p-8"
    >
      <div className="mb-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        POST /contact · auto-reply enabled
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">name</label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Doe"
            maxLength={80}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">email</label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="jane@company.com"
            maxLength={160}
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">message</label>
          <Textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me about the role / project…"
            maxLength={2000}
          />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {sent ? '✓ delivered · check your inbox' : 'avg response · < 24h'}
          </span>
          <MagneticButton type="submit" disabled={loading}>
            {loading ? 'sending…' : 'send message →'}
          </MagneticButton>
        </div>
      </div>
    </motion.form>
  );
}
