import { useState, useCallback } from 'react';

export function useCommandState() {
  const [open, setOpen] = useState(false);
  
  const safeSetOpen = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    // Ensure we're not updating state during render
    if (typeof value === 'function') {
      setOpen(prev => value(prev));
    } else {
      setOpen(value);
    }
  }, []);

  return {
    open,
    setOpen: safeSetOpen
  };
}