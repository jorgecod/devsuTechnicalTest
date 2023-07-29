import { Routes, Route  } from 'react-router-dom';
import ProductContainer from './features/Product/ProductContainer';

function App() {

  return (
    <Routes>
      <Route path="/" element={<ProductContainer />} />
    </Routes>
  );
}

export default App;
