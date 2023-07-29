import ProductComponent from './ProductComponent';
import './product.css';

const ProductContainer = () => {

  return (
    <div className='container'>
      <div className='container-header'>
        <img src={process.env.REACT_APP_IMAGE_URL} alt='banner logo' height='40' />
      </div>
      <div className='container-body'>
        <ProductComponent />
      </div>
    </ div>
  );
}

export default ProductContainer;
