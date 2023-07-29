import { render, screen } from '@testing-library/react';
import ProductForm from './ProductForm';

describe('ProductForm Component', () => {
  test('should render the input fields and buttons correctly', () => {
    render(<ProductForm product={null} onSubmit={() => {}} />);

    const idInput = screen.getByText('ID');
    const nameInput = screen.getByText('Nombre');
    const descriptionInput = screen.getByText('Descripción');
    const logoInput = screen.getByText('Logo');
    const dateReleaseInput = screen.getByText('Fecha de Liberación');
    const dateRevisionInput = screen.getByText('Fecha de Revisión');

    expect(idInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(logoInput).toBeInTheDocument();
    expect(dateReleaseInput).toBeInTheDocument();
    expect(dateRevisionInput).toBeInTheDocument();

    const resetButton = screen.getByText('Reiniciar');
    const sendButton = screen.getByText('Enviar');

    expect(resetButton).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });
});
