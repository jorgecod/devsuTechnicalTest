import { ChangeEvent, FocusEvent } from 'react';
import './input.css';

interface InputProps {
  disabled?: boolean;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const Input = ({
  disabled,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  type,
}: InputProps) => {
  const formattedValue = type === 'date' ? value.split('T')[0] : value;

  return (
    <input
      className='input'
      disabled={disabled}
      type={type || 'text'}
      value={formattedValue}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
