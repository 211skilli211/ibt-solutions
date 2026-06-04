'use client';

import { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    topic: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  ];

  const topics = [
    'Business Digital Transformation',
    'AI Integration',
    'Website & App Development',
    'API & Integration Services',
    'Co-operative Federation',
    'General Consultation',
  ];

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        preferredDate: '',
        preferredTime: '',
        topic: '',
      });
    }, 1000);
  };

  return (
    <div>
      <p className="text-ink-400 text-sm mb-6">
        Select your preferred date, time, and topic. We&apos;ll send a calendar invitation to confirm.
      </p>

      {status === 'success' ? (
        <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
          <svg className="w-12 h-12 text-emerald-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-white mb-2">Request Received!</h3>
          <p className="text-ink-400 text-sm">
            We&apos;ll confirm your booking within a few hours. Check your email for a calendar invite.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 text-sm text-cyan-400 hover:text-cyan-300"
          >
            Book another time →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-2">Topic *</label>
            <select
              required
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="">Select a topic...</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-300 mb-2">Preferred Date *</label>
              <input
                type="date"
                required
                min={getMinDate()}
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-300 mb-2">Preferred Time *</label>
              <select
                required
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="">Select time...</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-surface-1 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Booking...
              </>
            ) : (
              'Request Consultation'
            )}
          </button>

          <p className="text-xs text-ink-500 text-center">
            Free 30-minute consultation. We&apos;ll confirm via email within 24 hours.
          </p>
        </form>
      )}
    </div>
  );
}