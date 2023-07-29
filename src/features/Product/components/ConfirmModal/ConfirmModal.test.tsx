import { render, fireEvent } from '@testing-library/react';
import ConfirmModal from './ConfirmModal';

describe('ConfirmModal Component', () => {
  test('should render the confirm modal with correct message and buttons', () => {
    const message = 'Are you sure you want to delete this item?';
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    const { getByText } = render(
      <ConfirmModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        message={message}
      />,
    );

    const modalMessage = getByText(message);
    const cancelButton = getByText('No');
    const confirmButton = getByText('Si');

    expect(modalMessage).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});