'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that returns `true` once the component has been mounted on the client.
 * This is useful for avoiding hydration mismatches when rendering content that
 * should only be visible on the client (e.g., components that rely on `window` or `localStorage`).
 * @returns {boolean} `true` if the component is mounted, otherwise `false`.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
