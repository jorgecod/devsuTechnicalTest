import { render, fireEvent } from '@testing-library/react';
import ProductModal from './ProductModal';

describe('ProductModal Component', () => {
  test('should render the product modal with correct header and form', () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    const product = {
      id: '1',
      name: 'Product 1',
      description: 'This is a product',
      date_revision: '2022-07-28',
      date_release: '2023-07-28',
      logo: 'product1.jpg',
    };

    const { getByText } = render(
      <ProductModal
        isOpen={true}
        onClose={onClose}
        product={product}
        onSubmit={onSubmit}
      />,
    );

    const modalHeader = getByText('Formulario de Edición');
    const productNameInput = getByText('Nombre');
    const productDescriptionInput = getByText('Descripción');
    const productDateReleaseInput = getByText('Fecha de Liberación');
    const productDateRevisionInput = getByText('Fecha de Revisión');
    const submitButton = getByText('Enviar');

    expect(modalHeader).toBeInTheDocument();
    expect(productNameInput).toBeInTheDocument();
    expect(productDescriptionInput).toBeInTheDocument();
    expect(productDateReleaseInput).toBeInTheDocument();
    expect(productDateRevisionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
