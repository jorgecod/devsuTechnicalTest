import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  test('should render the Input component correctly', () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    render(
      <Input
        name='testInput'
        value='Hello'
        placeholder='Enter text'
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveValue('Hello');
    expect(inputElement).not.toBeDisabled();

    fireEvent.change(inputElement, { target: { value: 'Updated value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);

    fireEvent.blur(inputElement);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
