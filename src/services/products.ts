import { Product } from '../features/Product/interfaces';
import { fecthResponse } from './apiService';

export const getProducts = async () => {
  return fecthResponse(`${process.env.REACT_APP_API_BASE}/bp/products`, 'GET');
};

export const verificationProduct = async (productId: string) => {
  return fecthResponse(
    `${process.env.REACT_APP_API_BASE}/bp/products/verification?id=${productId}`,
    'GET',
  );
};

export const createProduct = async (productData: Product) => {
  return fecthResponse(
    `${process.env.REACT_APP_API_BASE}/bp/products`,
    'POST',
    productData,
  );
};

export const updateProduct = async (productData: Product) => {
  return fecthResponse(
    `${process.env.REACT_APP_API_BASE}/bp/products`,
    'PUT',
    productData,
  );
};

export const deleteProduct = async (productId: string) => {
  return fecthResponse(
    `${process.env.REACT_APP_API_BASE}/bp/products?id=${productId}`,
    'DELETE',
  );
};
