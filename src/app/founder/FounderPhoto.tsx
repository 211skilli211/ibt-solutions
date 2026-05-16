'use client';

import { useState } from 'react';

export default function FounderPhoto() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border-2 border-surface-3 flex items-center justify-center overflow-hidden">
        <span className="text-6xl">👨‍💻</span>
      </div>
    );
  }

  return (
    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border-2 border-surface-3 flex items-center justify-center overflow-hidden">
      <img
        src="/images/nj-robin.jpg"
        alt="N. J. Robin"
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
