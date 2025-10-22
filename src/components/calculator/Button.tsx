import React from 'react';

type ButtonProps = {
  label: string;
  value?: string;
  onPress: (value?: string) => void;
  variant?: 'digit' | 'operator' | 'action' | 'equal';
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

// PUBLIC_INTERFACE
export const Button: React.FC<ButtonProps> = ({
  label,
  value,
  onPress,
  variant = 'digit',
  ariaLabel,
  disabled = false,
  className
}) => {
  /** Accessible calculator button component. */
  const handleClick = () => !disabled && onPress(value ?? label);

  return (
    <button
      type="button"
      className={['btn', `btn-${variant}`, className].filter(Boolean).join(' ')}
      onClick={handleClick}
      aria-label={ariaLabel || label}
      disabled={disabled}
    >
      <span aria-hidden="true">{label}</span>
    </button>
  );
};
