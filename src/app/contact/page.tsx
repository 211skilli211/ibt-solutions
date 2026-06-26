import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { Section, Card, Badge } from '@/components/ui';
import ContactForm from '@/components/ContactForm';
import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: 'Contact | IBT Solutions',
  description: 'Get in touch with IBT Solutions — business inquiries, service requests, and consultation bookings.',
};

const contactMethods = [
  {
    icon: '📧',
    label: 'Email',
    value: 'businesstrends869@gmail.com',
    href: 'mailto:businesstrends869@gmail.com',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+1 (869) 763-9919',
    href: 'tel:+186****9919',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/18697639919',
  },
  {
    icon: '🏝️',
    label: 'IBT Co-ops',
    value: 'Join WhatsApp Community',
    href: 'https://chat.whatsapp.com/IfkJFCpgKRn9dOLaAUzOxW',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface-0">
      <PageHero
        pageKey="ibt-contact"
        fallback={{
          badge: 'Get in Touch',
          badgeVariant: 'teal',
          title: 'Contact Us',
          subtitle: "Ready to transform your business? Let's discuss how IBT Solutions can help.",
          ctaPrimary: { label: 'Get in Touch', href: '#contact-form' },
        }}
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info + Booking */}
          <div>
            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-2 border border-surface-3 hover:border-teal-500/30 transition-colors group"
                  >
                    <span className="text-3xl">{method.icon}</span>
                    <div>
                      <div className="text-sm text-ink-400">{method.label}</div>
                      <div className="text-white group-hover:text-teal-400 transition-colors">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Schedule a Consultation</h2>
              <p className="text-ink-400 mb-6">
                Book a free 30-minute consultation to discuss your business needs.
              </p>
              <BookingForm />
            </Card>
          </div>

          {/* Right: Contact Form */}
          <div id="contact-form">
            <Card className="p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              <ContactForm />
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/founder" className="text-sm text-ink-500 hover:text-teal-400 transition-colors">
            Meet the Founder →
          </Link>
        </div>
      </Section>
    </div>
  );
}
