'use client';

import { useState } from 'react';

interface AvatarProject {
  id: string;
  name: string;
  status: 'draft' | 'generating' | 'ready';
  characterBoard?: string;
  masterRef?: string;
}

export default function AvatarPage() {
  const [projects, setProjects] = useState<AvatarProject[]>([
    { id: '1', name: 'Caribbean Lifestyle Influencer', status: 'ready' },
    { id: '2', name: 'Business Coach Avatar', status: 'draft' },
  ]);
  const [selectedProject, setSelectedProject] = useState<AvatarProject | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const workflowSteps = [
    { step: 1, title: 'Character Concept', desc: 'Upload inspiration, get unique prompt' },
    { step: 2, title: 'Initial Generation', desc: 'Use Google Flow Nano Banana 2' },
    { step: 3, title: 'Character Board', desc: 'Generate angles, outfits, details' },
    { step: 4, title: 'Master Reference', desc: 'Create collage for consistency' },
    { step: 5, title: 'Upscale', desc: '2K resolution before video' },
    { step: 6, title: 'Video Generation', desc: 'Vo 3.1 model with script' },
    { step: 7, title: 'Monetize', desc: 'Deploy to Room 11 platform' },
  ];

  const generateCharacter = () => {
    if (!prompt) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink-100 mb-2">AI Avatar & Influencer</h1>
        <p className="text-ink-400">Create consistent AI influencers with Google Flow</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-1/50 border border-surface-2 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-ink-200 mb-4">Create New Character</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-300 mb-2">
                  Character Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your influencer: appearance, style, personality..."
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-2 border border-ink-700 rounded-lg text-ink-200"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={generateCharacter}
                  disabled={!prompt || generating}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-ink-700 text-surface-1 font-medium rounded-lg transition-colors"
                >
                  {generating ? 'Generating...' : 'Generate with Google Flow'}
                </button>
                <button className="px-6 py-2 bg-surface-2 hover:bg-ink-700 text-ink-100 font-medium rounded-lg transition-colors">
                  Upload Reference
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-1/50 border border-surface-2 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-ink-200 mb-4">Workflow</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflowSteps.map((w) => (
                <div
                  key={w.step}
                  className="p-4 bg-surface-2/50 rounded-lg border border-ink-700"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500 text-surface-1 text-sm font-bold flex items-center justify-center">
                      {w.step}
                    </span>
                    <h4 className="font-medium text-ink-200">{w.title}</h4>
                  </div>
                  <p className="text-xs text-ink-400">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-surface-1/50 border border-surface-2 rounded-xl p-4">
            <h3 className="font-semibold text-ink-200 mb-3">Your Projects</h3>
            <div className="space-y-2">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full p-3 text-left rounded-lg ${
                    selectedProject?.id === project.id
                      ? 'bg-cyan-500/20 border border-cyan-500'
                      : 'bg-surface-2/50 hover:bg-surface-2'
                  }`}
                >
                  <p className="text-sm text-ink-200">{project.name}</p>
                  <span className={`text-xs ${
                    project.status === 'ready' ? 'text-emerald-400' :
                    project.status === 'generating' ? 'text-amber-400' :
                    'text-ink-500'
                  }`}>
                    {project.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-4">
            <h4 className="font-medium text-emerald-400 mb-2">Monetization</h4>
            <p className="text-sm text-ink-400 mb-3">
              Deploy to Room 11 for 90% payout, built-in CRM, and managed chat.
            </p>
            <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-surface-1 font-medium rounded-lg transition-colors">
              Connect Room 11
            </button>
          </div>

          <div className="bg-surface-1/30 border border-surface-2 rounded-xl p-4">
            <h4 className="font-medium text-ink-200 mb-2">Required Tools</h4>
            <ul className="text-xs text-ink-400 space-y-1">
              <li>• Google AI Studio (Flow)</li>
              <li>• Pinterest (inspiration)</li>
              <li>• Claude/ChatGPT (prompt)</li>
              <li>• Room 11 (monetization)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}