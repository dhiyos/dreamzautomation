import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { z } from 'zod';
import Nav from '@/components/Nav';
import Footer from '@/components/sections/Footer';
import SEO from '@/components/shared/SEO';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const FONT_HEAD: React.CSSProperties = {};
const FONT_BODY: React.CSSProperties = {};

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Enter a valid email').max(255),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a bit more').max(2000),
});

const Contact = () => {
  const reduce = useReducedMotion();
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      company: String(fd.get('company') ?? ''),
      message: String(fd.get('message') ?? ''),
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Frontend-only: simulate send. Hook this up to Cloud / form provider when ready.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast({
      title: 'Brief received',
      description: 'A founder will get back to you within one working day.',
    });
    (e.target as HTMLFormElement).reset();
  };

  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };

  return (
    <div className="theme-indigo min-h-screen bg-[hsl(var(--bg-primary))] text-white" style={FONT_BODY}>
      <SEO
        title="Contact — Request an Assessment | Dreamz Automation"
        description="Tell us about your plant, line, or training need. Founder-led response within one working day."
        path="/contact"
      />
      <Nav />
      <main>
        <header className="relative px-6 md:px-20 pt-40 pb-16 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(79,70,229,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.12) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              maskImage:
                'radial-gradient(ellipse at 30% 30%, rgba(0,0,0,0.6), transparent 70%)',
            }}
          />
          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-[1100px] mx-auto"
          >
            <h1
              id="contact-heading"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-[-0.03em]"
              style={FONT_HEAD}
            >
              <span style={{ color: 'hsl(var(--accent-blue-hover))', fontStyle: 'italic', fontWeight: 600 }}>
                Tell us about
              </span>
              <br />
              the plant.
            </h1>
            <p className="mt-8 max-w-[640px] text-base md:text-lg leading-relaxed text-white/75">
              Brownfield migration, new line, training kit, or just a second opinion — share the
              brief and a founder will respond within one working day.
            </p>
          </motion.div>
        </header>

        <section
          aria-labelledby="contact-heading"
          className="px-6 md:px-20 pb-24 md:pb-32"
        >
          <div className="max-w-[1100px] mx-auto grid gap-12 md:gap-16 md:grid-cols-[1.3fr_1fr]">
            <motion.form
              onSubmit={onSubmit}
              noValidate
              initial={initial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/10 bg-white/[0.02] p-7 md:p-10 space-y-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[11px] uppercase tracking-[0.25em] text-white/60" style={FONT_HEAD}>
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    className="bg-transparent border-white/15 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--accent-blue))] focus-visible:ring-offset-0"
                  />
                  {errors.name ? (
                    <p className="text-xs text-red-400">{errors.name}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.25em] text-white/60" style={FONT_HEAD}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={255}
                    required
                    className="bg-transparent border-white/15 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--accent-blue))] focus-visible:ring-offset-0"
                  />
                  {errors.email ? (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-[11px] uppercase tracking-[0.25em] text-white/60" style={FONT_HEAD}>
                  Company <span className="normal-case tracking-normal text-white/30">(optional)</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  maxLength={120}
                  className="bg-transparent border-white/15 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--accent-blue))] focus-visible:ring-offset-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-[11px] uppercase tracking-[0.25em] text-white/60" style={FONT_HEAD}>
                  Brief
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={2000}
                  required
                  placeholder="Plant, scope, timeline, anything we should know…"
                  className="bg-transparent border-white/15 text-white placeholder:text-white/30 focus-visible:ring-[hsl(var(--accent-blue))] focus-visible:ring-offset-0"
                />
                {errors.message ? (
                  <p className="text-xs text-red-400">{errors.message}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-3 bg-[hsl(var(--accent-blue))] hover:bg-[hsl(var(--accent-blue))] disabled:opacity-60 text-white font-bold uppercase tracking-[0.18em] text-[12px] px-8 py-4 transition-colors"
                style={FONT_HEAD}
              >
                {submitting ? 'Sending…' : 'Send brief'}
                <span aria-hidden="true">→</span>
              </button>
            </motion.form>

            <motion.aside
              initial={initial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 text-sm leading-relaxed text-white/70"
            >
              <div>
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3 text-[hsl(var(--accent-blue-hover))]"
                  style={FONT_HEAD}
                >
                  Where we are
                </div>
                <p>
                  Dreamz Automation Systems Pvt. Ltd.
                  <br />
                  Ghaziabad, Delhi NCR — India
                </p>
              </div>
              <div>
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3 text-[hsl(var(--accent-blue-hover))]"
                  style={FONT_HEAD}
                >
                  Response window
                </div>
                <p>
                  One working day, founder-led. Briefs that include drawings or P&amp;IDs get
                  routed straight to the relevant lead engineer.
                </p>
              </div>
              <div>
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3 text-[hsl(var(--accent-blue-hover))]"
                  style={FONT_HEAD}
                >
                  Already a partner?
                </div>
                <p>
                  Existing clients with active AMC — please reach out through your usual project
                  channel for priority response.
                </p>
              </div>
            </motion.aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
