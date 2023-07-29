import './threeDotsButton.css';

interface ThreeDotsButtonProps {
  onClick: () => void;
}

const ThreeDotsButton = ({ onClick }: ThreeDotsButtonProps) => {
  return (
    <button className='three-dots-button' onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

export default ThreeDotsButton;
