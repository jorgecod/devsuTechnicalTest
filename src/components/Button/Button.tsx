import { ReactNode } from 'react';
import './button.css';

interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
  size?: 'normal' | 'small';
  color?: 'primary' | 'secondary' | 'none';
}

const Button = ({ color, disabled, children, onClick, size }: ButtonProps) => {
  const getSize = () => {
    return size === 'small' ? 'btn-small' : '';
  };
  const getColor = () => {
    switch (color) {
      case 'secondary':
        return 'btn-secondary';
      case 'none':
        return 'btn-none';
      default:
        return 'btn-primary';
    }
  };

  return (
    <button
      className={`btn ${getColor()} ${getSize()}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
