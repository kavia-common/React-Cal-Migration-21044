import React from 'react';
import { Button } from './Button';
import { Operator } from '../../utils/calcEngine';

type KeypadProps = {
  onDigit: (d: string) => void;
  onDecimal: () => void;
  onOperator: (op: Operator) => void;
  onEvaluate: () => void;
  onClear: () => void;
  onDelete: () => void;
  onToggleSign: () => void;
  onPercent: () => void;
  disabled?: boolean;
};

// PUBLIC_INTERFACE
export const Keypad: React.FC<KeypadProps> = ({
  onDigit,
  onDecimal,
  onOperator,
  onEvaluate,
  onClear,
  onDelete,
  onToggleSign,
  onPercent,
  disabled = false
}) => {
  /** Renders calculator keypad with digits, operators, and actions. */
  return (
    <div className="keypad" role="group" aria-label="Calculator keypad">
      <Button label="AC" ariaLabel="All clear" onPress={() => onClear()} variant="action" disabled={disabled} />
      <Button label="+/-" ariaLabel="Toggle sign" onPress={() => onToggleSign()} variant="action" disabled={disabled} />
      <Button label="%" ariaLabel="Percent" onPress={() => onPercent()} variant="action" disabled={disabled} />
      <Button label="÷" ariaLabel="Divide" onPress={() => onOperator('÷')} variant="operator" disabled={disabled} />

      <Button label="7" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="8" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="9" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="×" ariaLabel="Multiply" onPress={() => onOperator('×')} variant="operator" disabled={disabled} />

      <Button label="4" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="5" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="6" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="-" ariaLabel="Minus" onPress={() => onOperator('-')} variant="operator" disabled={disabled} />

      <Button label="1" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="2" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="3" onPress={(v) => onDigit(v as string)} variant="digit" disabled={disabled} />
      <Button label="+" ariaLabel="Plus" onPress={() => onOperator('+')} variant="operator" disabled={disabled} />

      <Button
        label="0"
        onPress={(v) => onDigit(v as string)}
        variant="digit"
        className="keypad-zero"
        disabled={disabled}
      />
      <Button label="." ariaLabel="Decimal point" onPress={() => onDecimal()} variant="digit" disabled={disabled} />
      <Button label="⌫" ariaLabel="Delete" onPress={() => onDelete()} variant="action" disabled={disabled} />
      <Button label="=" ariaLabel="Equals" onPress={() => onEvaluate()} variant="equal" disabled={disabled} />
    </div>
  );
};
