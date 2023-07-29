import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('should render the button with the correct label', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click Me</Button>);
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('should call the onClick function when the button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click Me</Button>);
    const buttonElement = getByText('Click Me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  test('should disable the button when the disabled prop is true', () => {
    const { getByText } = render(<Button onClick={() => {}} disabled>Click Me</Button>);
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toBeDisabled();
  });

  test('should apply the "small" size class when the size prop is set to "small"', () => {
    const { getByText } = render(
      <Button onClick={() => {}} size='small'>
        Click Me
      </Button>,
    );
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toHaveClass('btn-small');
  });

  test('should apply the "btn-primary" class when the color prop is not provided', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click Me</Button>);
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toHaveClass('btn-primary');
  });

  test('should apply the "btn-secondary" class when the color prop is set to "secondary"', () => {
    const { getByText } = render(
      <Button onClick={() => {}} color='secondary'>
        Click Me
      </Button>,
    );
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toHaveClass('btn-secondary');
  });

  test('should apply the "btn-none" class when the color prop is set to "none"', () => {
    const { getByText } = render(
      <Button onClick={() => {}} color='none'>
        Click Me
      </Button>,
    );
    const buttonElement = getByText('Click Me');
    expect(buttonElement).toHaveClass('btn-none');
  });
});
