'use client';

import { useState } from 'react';

const accents = [
  { id: 'jamaican', name: 'Jamaican Patois', flag: '🇯🇲' },
  { id: 'trinidadian', name: 'Trinidadian', flag: '🇹🇹' },
  { id: 'barbadian', name: 'Bajun', flag: '🇧🇧' },
  { id: 'guyanese', name: 'Guyanese', flag: '🇬🇾' },
  { id: 'haitian', name: 'Haitian Creole', flag: '🇭🇹' },
  { id: 'cuban', name: 'Cuban Spanish', flag: '🇨🇺' },
  { id: 'dominican', name: 'Dominican', flag: '🇩🇴' },
];

const platforms = ['Instagram', 'TikTok', 'YouTube', 'WhatsApp', 'Facebook'];

export default function InfluencerPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [influencer, setInfluencer] = useState({
    name: '',
    personality: '',
    accent: 'jamaican',
    style: 'modern',
    selectedPlatforms: ['instagram', 'tiktok']
  });
  const [createdInfluencers, setCreatedInfluencers] = useState<any[]>([]);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/services/influencer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          data: influencer
        })
      });
      const json = await res.json();
      setResult(json);
      if (json.influencer) {
        setCreatedInfluencers([...createdInfluencers, json.influencer]);
        setStep(2);
      }
    } catch (e) {
      setResult({ error: 'Failed to create influencer' });
    }
    setLoading(false);
  };

  const handleVoiceClone = async (influencerId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/services/influencer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'voice-clone',
          data: { influencerId, voiceUrl: null }
        })
      });
      const json = await res.json();
      setResult(json);
    } catch (e) {
      setResult({ error: 'Failed to clone voice' });
    }
    setLoading(false);
  };

  const handleGenerateVideo = async (influencerId: string, script: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/services/influencer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-video',
          data: { influencerId, script }
        })
      });
      const json = await res.json();
      setResult(json);
    } catch (e) {
      setResult({ error: 'Failed to generate video' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ocean-900 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm mb-4">
            AI Digital Influencer
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Create Your AI Influencer
          </h1>
          <p className="text-ink-400 max-w-xl mx-auto">
            Design AI-powered influencers with authentic Caribbean accents. 
            Full setup including voice cloning for marketing and social media.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-cyan-500 text-surface-1' : 'bg-surface-2 text-ink-500'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-cyan-500' : 'bg-surface-2'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Create Influencer */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface-1 rounded-xl p-6 border border-surface-2">
              <h3 className="text-xl font-semibold text-white mb-6">Configure Your Influencer</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-ink-400 mb-2">Name</label>
                  <input
                    type="text"
                    value={influencer.name}
                    onChange={(e) => setInfluencer({ ...influencer, name: e.target.value })}
                    placeholder="e.g., Maya Caribbean"
                    className="w-full bg-surface-2 border border-ink-700 rounded-lg p-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-ink-400 mb-2">Personality</label>
                  <input
                    type="text"
                    value={influencer.personality}
                    onChange={(e) => setInfluencer({ ...influencer, personality: e.target.value })}
                    placeholder="e.g., Friendly, professional, enthusiastic"
                    className="w-full bg-surface-2 border border-ink-700 rounded-lg p-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-ink-400 mb-2">Accent</label>
                  <div className="grid grid-cols-2 gap-2">
                    {accents.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setInfluencer({ ...influencer, accent: a.id })}
                        className={`p-3 rounded-lg text-left transition-all ${
                          influencer.accent === a.id
                            ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-400'
                            : 'bg-surface-2 border border-ink-700 text-ink-400 hover:border-ink-600'
                        }`}
                      >
                        <span className="mr-2">{a.flag}</span> {a.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-ink-400 mb-2">Platforms</label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          const plats = influencer.selectedPlatforms.includes(p.toLowerCase())
                            ? influencer.selectedPlatforms.filter(x => x !== p.toLowerCase())
                            : [...influencer.selectedPlatforms, p.toLowerCase()];
                          setInfluencer({ ...influencer, selectedPlatforms: plats });
                        }}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          influencer.selectedPlatforms.includes(p.toLowerCase())
                            ? 'bg-cyan-500 text-surface-1'
                            : 'bg-surface-2 text-ink-400'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  disabled={loading || !influencer.name}
                  className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-ink-700 text-surface-1 font-bold rounded-lg transition-all"
                >
                  {loading ? 'Creating...' : 'Create Influencer'}
                </button>
              </div>
            </div>

            <div className="bg-surface-1 rounded-xl p-6 border border-surface-2">
              <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
              <div className="aspect-square max-w-sm mx-auto bg-gradient-to-br from-cyan-900/30 to-emerald-900/30 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎯</div>
                  <p className="text-white font-medium">
                    {influencer.name || 'Your Influencer'}
                  </p>
                  <p className="text-ink-400 text-sm mt-2">
                    {accents.find(a => a.id === influencer.accent)?.name} accent
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Voice Cloning */}
        {step === 2 && result?.influencer && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface-1 rounded-xl p-6 border border-surface-2">
              <h3 className="text-xl font-semibold text-white mb-4">Voice Cloning</h3>
              <p className="text-ink-400 text-sm mb-4">
                Upload a voice sample to clone the voice. For best results, provide 30+ seconds of clear audio.
              </p>
              <div className="border-2 border-dashed border-ink-700 rounded-lg p-8 text-center mb-4">
                <div className="text-4xl mb-2">🎤</div>
                <p className="text-ink-400 text-sm">Drop audio file or click to upload</p>
                <p className="text-ink-500 text-xs mt-2">MP3, WAV up to 10MB</p>
              </div>
              <button
                onClick={() => handleVoiceClone(result.influencer.id)}
                disabled={loading}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-surface-1 font-bold rounded-lg"
              >
                {loading ? 'Processing...' : 'Clone Voice'}
              </button>
            </div>

            <div className="bg-surface-1 rounded-xl p-6 border border-surface-2">
              <h3 className="text-xl font-semibold text-white mb-4">Generate Video</h3>
              <textarea
                placeholder="Enter your video script..."
                className="w-full h-32 bg-surface-2 border border-ink-700 rounded-lg p-4 text-white mb-4"
              />
              <button
                onClick={() => handleGenerateVideo(result.influencer.id, 'Sample script')}
                disabled={loading}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-surface-1 font-bold rounded-lg"
              >
                {loading ? 'Generating...' : 'Generate Video'}
              </button>
            </div>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="mt-8 bg-surface-1 rounded-xl p-6 border border-surface-2">
            <h3 className="text-lg font-semibold text-white mb-4">Result</h3>
            <pre className="text-sm text-ink-300 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-1/50 rounded-xl p-6 border border-surface-2">
            <div className="text-3xl mb-3">🎤</div>
            <h4 className="font-semibold text-white mb-2">Voice Cloning</h4>
            <p className="text-sm text-ink-400">Clone any voice with open-source AI</p>
          </div>
          <div className="bg-surface-1/50 rounded-xl p-6 border border-surface-2">
            <div className="text-3xl mb-3">🎬</div>
            <h4 className="font-semibold text-white mb-2">Video Generation</h4>
            <p className="text-sm text-ink-400">Create talking head videos from scripts</p>
          </div>
          <div className="bg-surface-1/50 rounded-xl p-6 border border-surface-2">
            <div className="text-3xl mb-3">🌎</div>
            <h4 className="font-semibold text-white mb-2">Multi-Platform</h4>
            <p className="text-sm text-ink-400">Deploy across Instagram, TikTok, YouTube</p>
          </div>
        </div>
      </div>
    </div>
  );
}