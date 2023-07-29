import { render, screen, fireEvent } from '@testing-library/react';
import Popover from './Popover';

describe('Popover Component', () => {
  test('should add "open" className when isOpen is true', () => {
    render(
      <Popover
        isOpen={true}
        onClose={() => {}}
        content={<div>Popover Content</div>}
      />
    );
  
    const popover = screen.getByTestId('popover');
    expect(popover).toHaveClass('open');
  });

  test('should NOT add "open" className when isOpen is false', () => {
    render(
      <Popover
        isOpen={false}
        onClose={() => {}}
        content={<div>Popover Content</div>}
      />
    );
  
    const popover = screen.getByTestId('popover');
    expect(popover).not.toHaveClass('open');
  });


  test('should NOT call onClose when clicking inside the popover', () => {
    const handleClose = jest.fn();
    render(
      <Popover
        isOpen={true}
        onClose={handleClose}
        content={<div>Popover Content</div>}
      />
    );

    const popoverContent = screen.getByText('Popover Content');
    fireEvent.click(popoverContent);

    expect(handleClose).not.toHaveBeenCalled();
  });
});
