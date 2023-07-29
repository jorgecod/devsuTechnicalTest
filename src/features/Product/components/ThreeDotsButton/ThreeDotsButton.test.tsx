import { render, fireEvent } from '@testing-library/react';
import ThreeDotsButton from './ThreeDotsButton';

test('should call the onClick function when the button is clicked', () => {
  const onClick = jest.fn();
  const { getByRole } = render(<ThreeDotsButton onClick={onClick} />);

  const threeDotsButton = getByRole('button');
  expect(threeDotsButton).toBeInTheDocument();

  fireEvent.click(threeDotsButton);
  expect(onClick).toHaveBeenCalledTimes(1);
});
