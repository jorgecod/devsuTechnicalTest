import { render } from '@testing-library/react';
import Text from './Text';

describe('Text Component', () => {
  test('should render the text with the correct color and size', () => {
    const { getByText } = render(
      <Text color='primary' size='title'>
        Hello, World!
      </Text>
    );

    const textElement = getByText('Hello, World!');

    expect(textElement).toHaveClass('text');
    expect(textElement).toHaveClass('text-primary');
    expect(textElement).toHaveClass('text-title');
  });

  test('should render the text with default color and size if no props provided', () => {
    const { getByText } = render(<Text>Hello, World!</Text>);

    const textElement = getByText('Hello, World!');

    expect(textElement).toHaveClass('text');
    expect(textElement).toHaveClass('text-primary');
    expect(textElement).toHaveClass('text-normal');
  });

  test('should render the text with secondary color when color prop is "secondary"', () => {
    const { getByText } = render(
      <Text color='secondary'>Hello, World!</Text>
    );

    const textElement = getByText('Hello, World!');

    expect(textElement).toHaveClass('text');
    expect(textElement).toHaveClass('text-secondary');
  });

  test('should render the text with error color when color prop is "error"', () => {
    const { getByText } = render(<Text color='error'>Hello, World!</Text>);

    const textElement = getByText('Hello, World!');

    expect(textElement).toHaveClass('text');
    expect(textElement).toHaveClass('text-error');
  });

  test('should render the text with title size when size prop is "title"', () => {
    const { getByText } = render(<Text size='title'>Hello, World!</Text>);

    const textElement = getByText('Hello, World!');

    expect(textElement).toHaveClass('text');
    expect(textElement).toHaveClass('text-title');
  });

  test('should render the text with subtitle size when size prop is "subtitle"', () => {
    const { getByText } = render(
      <Text size='subtitle'>Hello, World!</Text>
    );

    const textElement = getByText('Hello, World!');

    expect(textElement).toHaveClass('text');
    expect(textElement).toHaveClass('text-subtitle');
  });

  test('should render the text with small size when size prop is "small"', () => {
    const { getByText } = render(<Text size='small'>Hello, World!</Text>);

    const textElement = getByText('Hello, World!');

    expect(textElement).toHaveClass('text');
    expect(textElement).toHaveClass('text-small');
  });
});
