import { useCallback, useEffect, useReducer } from 'react';
import {
  Operator,
  performOperation,
  toggleSign,
  toPercent,
  deleteLast,
  appendDigit,
  appendDecimal
} from '../utils/calcEngine';

type CalcState = {
  current: string;
  previous: string | null;
  operator: Operator | null;
  error: string | null;
  lastOp: { operator: Operator; operand: string } | null; // for repeated equals
};

type Action =
  | { type: 'digit'; payload: string }
  | { type: 'decimal' }
  | { type: 'operator'; payload: Operator }
  | { type: 'evaluate' }
  | { type: 'clear' }
  | { type: 'delete' }
  | { type: 'toggleSign' }
  | { type: 'percent' }
  | { type: 'resetError' };

const initialState: CalcState = {
  current: '0',
  previous: null,
  operator: null,
  error: null,
  lastOp: null
};

function reducer(state: CalcState, action: Action): CalcState {
  if (state.error && action.type !== 'clear' && action.type !== 'resetError') {
    // Lock until cleared or resetError
    return state;
  }

  switch (action.type) {
    case 'digit': {
      const next = appendDigit(state.current, action.payload);
      return { ...state, current: next };
    }
    case 'decimal': {
      const next = appendDecimal(state.current);
      return { ...state, current: next };
    }
    case 'operator': {
      // Replace operator if user presses operator consecutively
      if (state.operator && state.previous !== null && state.current === '0') {
        return { ...state, operator: action.payload };
      }

      // If there's a previous and operator, evaluate first
      if (state.previous !== null && state.operator) {
        const res = performOperation(state.previous, state.current, state.operator);
        if (res.type === 'error') {
          return { ...state, current: 'Error', error: res.message, previous: null, operator: null, lastOp: null };
        }
        return {
          ...state,
          previous: res.value,
          current: '0',
          operator: action.payload,
          lastOp: null
        };
      }

      // Set previous from current and reset current for next entry
      return {
        ...state,
        previous: state.current,
        current: '0',
        operator: action.payload,
        lastOp: null
      };
    }
    case 'evaluate': {
      // If we have operator and previous, evaluate using current
      if (state.operator && state.previous !== null) {
        const res = performOperation(state.previous, state.current, state.operator);
        if (res.type === 'error') {
          return { ...state, current: 'Error', error: res.message, previous: null, operator: null, lastOp: null };
        }
        return {
          ...state,
          current: res.value,
          previous: null,
          operator: null,
          lastOp: { operator: state.operator, operand: state.current }
        };
      }
      // Support repeated equals: re-apply lastOp on current
      if (state.lastOp) {
        const res = performOperation(state.current, state.lastOp.operand, state.lastOp.operator);
        if (res.type === 'error') {
          return { ...state, current: 'Error', error: res.message, previous: null, operator: null, lastOp: null };
        }
        return { ...state, current: res.value };
      }
      return state;
    }
    case 'clear': {
      return { ...initialState };
    }
    case 'delete': {
      return { ...state, current: deleteLast(state.current) };
    }
    case 'toggleSign': {
      return { ...state, current: toggleSign(state.current) };
    }
    case 'percent': {
      const p = toPercent(state.current);
      if (p === 'Error') {
        return { ...state, current: 'Error', error: 'Error', previous: null, operator: null, lastOp: null };
      }
      return { ...state, current: p };
    }
    case 'resetError': {
      return { ...state, error: null, current: '0' };
    }
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function useCalculator() {
  /**
   * Provides calculator state and action dispatchers, along with keyboard handling.
   */
  const [state, dispatch] = useReducer(reducer, initialState);

  const inputDigit = useCallback((d: string) => dispatch({ type: 'digit', payload: d }), []);
  const inputDecimal = useCallback(() => dispatch({ type: 'decimal' }), []);
  const chooseOperator = useCallback((op: Operator) => dispatch({ type: 'operator', payload: op }), []);
  const evaluate = useCallback(() => dispatch({ type: 'evaluate' }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const del = useCallback(() => dispatch({ type: 'delete' }), []);
  const sign = useCallback(() => dispatch({ type: 'toggleSign' }), []);
  const percent = useCallback(() => dispatch({ type: 'percent' }), []);
  const resetError = useCallback(() => dispatch({ type: 'resetError' }), []);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (state.error) {
        if (key === 'Escape' || key.toLowerCase() === 'c') {
          e.preventDefault();
          clear();
        }
        return;
      }

      if (/\d/.test(key)) {
        e.preventDefault();
        inputDigit(key);
        return;
      }
      if (key === '.' || key === ',') {
        e.preventDefault();
        inputDecimal();
        return;
      }
      if (key === '+' || key === '-') {
        e.preventDefault();
        chooseOperator(key as Operator);
        return;
      }
      if (key === '*' || key === 'x' || key === 'X') {
        e.preventDefault();
        chooseOperator('×');
        return;
      }
      if (key === '/' || key === '÷') {
        e.preventDefault();
        chooseOperator('÷');
        return;
      }
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        evaluate();
        return;
      }
      if (key === 'Escape') {
        e.preventDefault();
        clear();
        return;
      }
      if (key === 'Backspace') {
        e.preventDefault();
        del();
        return;
      }
      if (key === '%') {
        e.preventDefault();
        percent();
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [clear, chooseOperator, del, evaluate, inputDecimal, inputDigit, percent, state.error]);

  return {
    state,
    actions: { inputDigit, inputDecimal, chooseOperator, evaluate, clear, del, sign, percent, resetError }
  };
}
