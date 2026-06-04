'use client';

import { useState } from 'react';
import { submitServiceInquiry } from '@/lib/api';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service_type: 'general',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await submitServiceInquiry({
      service_type: formData.service_type,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      message: formData.message || undefined,
      source: 'ibt-solutions-contact',
    });

    if (result.success) {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service_type: 'general',
      });
    } else {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-300 mb-2">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white placeholder:text-ink-500 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-300 mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white placeholder:text-ink-500 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-300 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white placeholder:text-ink-500 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="+1 (000) 000-0000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-300 mb-2">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white placeholder:text-ink-500 focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="Your company"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-300 mb-2">Inquiry Type</label>
        <select
          value={formData.service_type}
          onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
          className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
        >
          <option value="general">General Inquiry</option>
          <option value="web-dev">Web Development</option>
          <option value="ai-solutions">AI Solutions</option>
          <option value="business-audit">Business Audit</option>
          <option value="api-integration">API Integration</option>
          <option value="consultation">Consultation</option>
          <option value="partnership">Partnership</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-300 mb-2">Message *</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white placeholder:text-ink-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          placeholder="Tell us about your project or inquiry..."
        />
      </div>

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      {status === 'success' && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
          Message sent successfully! We&apos;ll get back to you within 24 hours.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-surface-1 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}