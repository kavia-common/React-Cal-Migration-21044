export type Operator = '+' | '-' | '×' | '÷';

export type EvaluateResult =
  | { type: 'ok'; value: string }
  | { type: 'error'; message: string };

// PUBLIC_INTERFACE
export function performOperation(a: string, b: string, op: Operator): EvaluateResult {
  /** Performs a basic arithmetic operation on two numeric strings. Returns 'Error' for invalid operations like divide by zero. */
  const x = parseFloat(a);
  const y = parseFloat(b);

  if (!isFinite(x) || !isFinite(y)) {
    return { type: 'error', message: 'Error' };
  }

  let result: number;
  switch (op) {
    case '+':
      result = x + y;
      break;
    case '-':
      result = x - y;
      break;
    case '×':
      result = x * y;
      break;
    case '÷':
      if (y === 0) return { type: 'error', message: 'Error' };
      result = x / y;
      break;
    default:
      return { type: 'error', message: 'Error' };
  }
  return { type: 'ok', value: normalizeNumber(result) };
}

// PUBLIC_INTERFACE
export function normalizeNumber(n: number): string {
  /** Normalizes a number to a user-friendly string, trimming trailing zeros and handling large/small values. */
  if (!isFinite(n)) return 'Error';
  const str = n.toString();
  if (Math.abs(n) >= 1e12 || (Math.abs(n) > 0 && Math.abs(n) < 1e-6)) {
    return n.toExponential(6).replace(/\.?0+e/, 'e');
  }
  // Round to avoid floating point artifacts, then trim trailing zeros
  const rounded = Math.round(n * 1e10) / 1e10;
  let s = rounded.toString();
  if (s.includes('.')) {
    s = s.replace(/\.?0+$/, '');
  }
  return s;
}

// PUBLIC_INTERFACE
export function toggleSign(value: string): string {
  /** Toggles the sign of the current numeric string, returning string value. */
  if (value === '0') return '0';
  if (value.startsWith('-')) return value.slice(1);
  return `-${value}`;
}

// PUBLIC_INTERFACE
export function toPercent(value: string): string {
  /** Converts a numeric string to percent (divide by 100), returning a normalized string. */
  const n = parseFloat(value);
  if (!isFinite(n)) return 'Error';
  return normalizeNumber(n / 100);
}

// PUBLIC_INTERFACE
export function deleteLast(value: string): string {
  /** Deletes the last character in the current string; returns '0' if empty or single char left (excluding negative sign handling). */
  if (value.length <= 1) return '0';
  if (value.length === 2 && value.startsWith('-')) return '0';
  return value.slice(0, -1);
}

// PUBLIC_INTERFACE
export function appendDigit(current: string, digit: string): string {
  /** Appends a digit to the current string respecting leading zeros and error states. */
  if (current === 'Error') return digit;
  if (current === '0') return digit;
  return `${current}${digit}`;
}

// PUBLIC_INTERFACE
export function appendDecimal(current: string): string {
  /** Appends a decimal point if not already present; handles starting decimal input. */
  if (current === 'Error') return '0.';
  if (current.includes('.')) return current;
  return `${current}.`;
}
