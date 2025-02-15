import { useState, useCallback, useEffect } from 'react';

interface ResizeHandleProps {
  onResize: (delta: number) => void;
}

export const ResizeHandle = ({ onResize }: ResizeHandleProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      onResize(e.movementX);
    }
  }, [isDragging, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className="w-2 hover:bg-border cursor-col-resize active:bg-border-active"
      onMouseDown={handleMouseDown}
    />
  );
}; 