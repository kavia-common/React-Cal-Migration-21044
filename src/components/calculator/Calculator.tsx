import React, { useMemo } from 'react';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { useCalculator } from '../../hooks/useCalculator';

// PUBLIC_INTERFACE
export const Calculator: React.FC = () => {
  /** Calculator container: manages state via useCalculator and renders Display and Keypad. */
  const { state, actions } = useCalculator();

  const expression = useMemo(() => {
    if (state.previous !== null && state.operator) {
      return `${state.previous} ${state.operator} ${state.current !== '0' ? state.current : ''}`.trim();
    }
    return null;
  }, [state.previous, state.operator, state.current]);

  const hasError = Boolean(state.error);

  return (
    <section className="calculator" aria-label="Calculator">
      <Display expression={expression} value={state.current} error={state.error} />
      <Keypad
        onDigit={actions.inputDigit}
        onDecimal={actions.inputDecimal}
        onOperator={actions.chooseOperator}
        onEvaluate={actions.evaluate}
        onClear={actions.clear}
        onDelete={actions.del}
        onToggleSign={actions.sign}
        onPercent={actions.percent}
        disabled={hasError}
      />
      {hasError && (
        <div className="error-actions">
          <button className="btn btn-action" onClick={actions.clear}>
            Clear
          </button>
        </div>
      )}
    </section>
  );
};
