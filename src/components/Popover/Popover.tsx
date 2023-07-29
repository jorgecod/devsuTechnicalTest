import { ReactNode, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutsideHandler';
import './popover.css';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  content: ReactNode;
}

const Popover = ({ isOpen, onClose, content }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  useClickOutside(popoverRef, onClose);

  return (
    <div
      className={`popover ${isOpen ? 'open' : ''}`}
      ref={popoverRef}
      data-testid='popover'
    >
      <div className={`popover-content`}>
        {content}
      </div>
    </div>
  );
}

export default Popover;
