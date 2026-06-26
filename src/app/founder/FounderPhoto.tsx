'use client';

import { useState, useEffect } from 'react';

export default function FounderPhoto() {
  const [hasError, setHasError] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await fetch('/api/site-settings');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const founderSetting = data.find((s: any) => s.setting_key === 'founder_photo_url');
            if (founderSetting?.setting_value) {
              setPhotoUrl(founderSetting.setting_value);
              setLoading(false);
              return;
            }
          }
        }
      } catch {
        // silent fail — use fallback
      }
      setLoading(false);
    };
    fetchPhoto();
  }, []);

  // Resolve URL: route /uploads/ filenames through IslandHub media API
  // because Render disk is ephemeral and files disappear on redeploy
  const resolvedUrl = photoUrl?.startsWith('/uploads/')
    ? `https://islandhub.onrender.com/api/media/file/${photoUrl.replace('/uploads/', '')}`
    : photoUrl || '/images/nj-robin.jpg';

  if (hasError || (!photoUrl && !loading)) {
    return (
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border-2 border-surface-3 flex items-center justify-center overflow-hidden">
        <span className="text-6xl">👨‍💻</span>
      </div>
    );
  }

  return (
    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border-2 border-surface-3 flex items-center justify-center overflow-hidden">
      {loading ? (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" />
      ) : (
        <img
          src={resolvedUrl}
          alt="N. J. Robin"
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
