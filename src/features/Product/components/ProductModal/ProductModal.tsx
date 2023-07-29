import Modal from '../../../../components/Modal/Modal';
import ProductForm from '../ProductForm/ProductForm';
import { ProductModalProps } from '../../interfaces';

const ProductModal = ({ isOpen, onClose, product, onSubmit }: ProductModalProps) => {
  const modalHeader = product ? 'Formulario de Edición' : 'Formulario de Regitro';

  return (
    <Modal header={modalHeader} isOpen={isOpen} onClose={onClose}>
      <ProductForm product={product} onSubmit={onSubmit} />
    </Modal>
  );
}

export default ProductModal;
