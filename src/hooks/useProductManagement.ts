import { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/products';
import { Product } from '../features/Product/interfaces';

export function useProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [popoverStates, setPopoverStates] = useState<{ [key: number]: boolean }>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setErrorMessage(error.message);
    }
  };

  const handleCreateOrUpdateProduct = async(data: Product) => {
    try {
      if (editingProduct) {
        await updateProduct(data);
      } else {
        await createProduct(data);
      }

      await fetchProducts();

    } catch (error: any) {
      console.error('Error capture:', error);
      setErrorMessage(error.message);
    }
    handleCloseModal();
  };

  const handleDeleteConfirmed = async () => {
    try {
      if (editingProduct) {
        await deleteProduct(editingProduct.id)
        await fetchProducts();
      }
    } catch (error: any) {
      console.error('Error al eliminar el producto:', error);
      setErrorMessage(error.message);
    }
    setEditingProduct(null);
    setIsModalConfirmOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase()),
    ),
  );

  const handleOpenPopover = (index: number) => {
    setErrorMessage('');
    setPopoverStates((prevStates) => ({ ...prevStates, [index]: true }));
  };

  const handleClosePopover = (index: number) => {
    setPopoverStates((prevStates) => ({ ...prevStates, [index]: false }));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOpenModal = () => {
    setErrorMessage('');
    setIsModalProductOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalProductOpen(false);
    setEditingProduct(null);
  };

  const handleEditRow = (index: number, productId: string) => {
    const [product] = filteredProducts.filter(
      (product) => product.id === productId,
    );

    handleEditProduct(product);
    handleClosePopover(index);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    handleOpenModal();
  };

  const handleDeleteProduct = (index: number, productId: string) => {
    const [product] = filteredProducts.filter(
      (product) => product.id === productId,
    );
    setEditingProduct(product);
    setIsModalConfirmOpen(true);
    handleClosePopover(index);
  };

  return {
    searchValue,
    isModalProductOpen,
    isModalConfirmOpen,
    popoverStates,
    editingProduct,
    errorMessage,
    filteredProducts,
    handleSearch,
    handleOpenModal,
    handleCloseModal,
    handleCreateOrUpdateProduct,
    handleEditRow,
    handleDeleteProduct,
    handleDeleteConfirmed,
    handleOpenPopover,
    handleClosePopover,
    setIsModalConfirmOpen,
    setEditingProduct,
  };
}
