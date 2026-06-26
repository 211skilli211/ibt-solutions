'use client';

interface RoleCardProps {
  title: string;
  description: string;
  icon: string;
  responsibilities: string[];
  requirements?: string[];
}

export default function RoleCard({ title, description, icon, responsibilities, requirements }: RoleCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-surface-1 border border-surface-2">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-ink-400 mb-4">{description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-emerald-400 mb-2">Responsibilities:</h4>
        <ul className="space-y-2">
          {responsibilities.map((resp, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-300">
              <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {resp}
            </li>
          ))}
        </ul>
      </div>
      
      {requirements && requirements.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-amber-400 mb-2">Ideal For:</h4>
          <div className="flex flex-wrap gap-2">
            {requirements.map((req) => (
              <span key={req} className="px-2 py-1 text-xs rounded-full bg-surface-2 text-ink-400">
                {req}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}