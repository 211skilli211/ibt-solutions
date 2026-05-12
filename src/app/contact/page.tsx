import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: 'Contact | IBT Solutions',
  description: 'Get in touch with IBT Solutions - business inquiries, service requests, and consultation bookings.',
};

const contactMethods = [
  {
    icon: '📧',
    label: 'Email',
    value: 'contact@ibtsolutions.app',
    href: 'mailto:contact@ibtsolutions.app',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: 'Join Community',
    href: 'https://chat.whatsapp.com/example',
  },
  {
    icon: '📱',
    label: 'Telegram',
    value: 'Join Channel',
    href: 'https://t.me/example',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ready to transform your business? Let&apos;s discuss how IBT Solutions can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors group"
                  >
                    <span className="text-3xl">{method.icon}</span>
                    <div>
                      <div className="text-sm text-slate-400">{method.label}</div>
                      <div className="text-white group-hover:text-cyan-400 transition-colors">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-4">Schedule a Consultation</h2>
              <p className="text-slate-400 mb-6">
                Book a free 30-minute consultation to discuss your business needs and explore how we can help.
              </p>
              <BookingForm />
            </div>
          </div>

          <div>
            <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/founder" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            About the founder →
          </Link>
        </div>
      </div>
    </div>
  );
}