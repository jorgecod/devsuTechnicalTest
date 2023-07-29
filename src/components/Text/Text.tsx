import { ReactNode } from 'react';
import './text.css';

interface TextProps {
  color?: 'primary' | 'secondary' | 'error';
  size?: 'title' | 'subtitle' | 'normal' | 'small';
  children: ReactNode
}

const Text = ({ color, children, size }: TextProps) => {

  const getColor = () =>{
    switch (color) {
      case 'secondary':
        return 'text-secondary'
      case 'error':
        return 'text-error'
      default:
        return 'text-primary';
    }
  };

  const getSize = () => {
    switch (size) {
      case 'title':
        return 'text-title';
      case 'subtitle':
        return 'text-subtitle';
      case 'small':
        return 'text-small';
      default:
        return 'text-normal';
    }
  };

  return (
    <span className={`text ${getColor()} ${getSize()}`}>
      {children}
    </span>
  );
}

export default Text;
