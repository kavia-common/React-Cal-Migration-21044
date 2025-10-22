import React, { useEffect, useRef } from 'react';

type DisplayProps = {
  expression?: string | null;
  value: string;
  error?: string | null;
};

// PUBLIC_INTERFACE
export const Display: React.FC<DisplayProps> = ({ expression, value, error }) => {
  /** Displays current expression and value; announces updates via aria-live. */
  const liveRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to end on value change
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [value]);

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = error ? `Error: ${error}` : `Value ${value}`;
    }
  }, [value, error]);

  return (
    <div className="display" role="region" aria-label="Calculator display">
      <div className="display-expression" aria-live="off">
        {expression || '\u00A0'}
      </div>
      <div className="display-value" ref={scrollRef} tabIndex={0} aria-label="Current value">
        {value}
      </div>
      <div ref={liveRef} className="visually-hidden" aria-live="polite" aria-atomic="true" />
      {error && (
        <div className="display-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
