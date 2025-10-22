import {
  performOperation,
  normalizeNumber,
  toggleSign,
  toPercent,
  deleteLast,
  appendDigit,
  appendDecimal
} from '../utils/calcEngine';

describe('calcEngine', () => {
  test('addition', () => {
    const r = performOperation('2', '3', '+');
    expect(r).toEqual({ type: 'ok', value: '5' });
  });

  test('subtraction', () => {
    const r = performOperation('5', '2', '-');
    expect(r).toEqual({ type: 'ok', value: '3' });
  });

  test('multiplication', () => {
    const r = performOperation('2', '4', '×');
    expect(r).toEqual({ type: 'ok', value: '8' });
  });

  test('division', () => {
    const r = performOperation('10', '5', '÷');
    expect(r).toEqual({ type: 'ok', value: '2' });
  });

  test('divide by zero -> error', () => {
    const r = performOperation('1', '0', '÷');
    expect(r.type).toBe('error');
  });

  test('normalize trims trailing zeros', () => {
    expect(normalizeNumber(1.2300000)).toBe('1.23');
    expect(normalizeNumber(2.0)).toBe('2');
  });

  test('toggle sign', () => {
    expect(toggleSign('5')).toBe('-5');
    expect(toggleSign('-5')).toBe('5');
    expect(toggleSign('0')).toBe('0');
  });

  test('percent', () => {
    expect(toPercent('50')).toBe('0.5');
  });

  test('delete last', () => {
    expect(deleteLast('123')).toBe('12');
    expect(deleteLast('1')).toBe('0');
    expect(deleteLast('-1')).toBe('0');
  });

  test('append digit', () => {
    expect(appendDigit('0', '5')).toBe('5');
    expect(appendDigit('12', '3')).toBe('123');
  });

  test('append decimal', () => {
    expect(appendDecimal('0')).toBe('0.');
    expect(appendDecimal('1.2')).toBe('1.2');
  });
});
