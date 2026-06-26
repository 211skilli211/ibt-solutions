import Link from 'next/link';

export default function ThreeDDesignPage() {
  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <h1 className="text-2xl font-bold text-white mb-3">3D Design Tools</h1>
        <p className="text-ink-secondary mb-6">
          Text-to-CAD generation — describe any 3D object and get a parametric model.
          Browser-based, no installation required.
        </p>
        <div className="bg-surface-elevated rounded-2xl border border-white/10 p-6 mb-6">
          <p className="text-sm text-ink-tertiary">Coming Soon — This service is under development.</p>
        </div>
        <Link href="/services" className="text-accent-500 font-medium hover:underline">
          ← Back to Services
        </Link>
      </div>
    </div>
  );
}
