import { ReactNode, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutsideHandler';
import Text from '../Text/Text';
import  './modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: string;
}

const Modal = ({ header, onClose, children}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  return (
    <div className='modal-container'>
      <div className='modal' ref={modalRef}>
        <button className='close-button' onClick={onClose}>
          &times;
        </button>
        {header && (
          <div className='modal-header'>
            <Text size='title'>{header}</Text>
          </div>
        )}
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
