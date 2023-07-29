import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import Text from '../../../../components/Text/Text';
import { ConfirmModalProps } from '../../interfaces';
import './confirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Text size='subtitle'>{message}</Text>
      <div className='modal-footer-container'>
        <Button color='secondary' onClick={onClose}>No</Button>
        <Button onClick={onConfirm}>Si</Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
