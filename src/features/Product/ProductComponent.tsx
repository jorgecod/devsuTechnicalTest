import Table from '../../components/Table/Table';
import Input from '../../components/Input/Input';
import Popover from '../../components/Popover/Popover';
import Button from '../../components/Button/Button';
import ProductModal from './components/ProductModal/ProductModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import ThreeDotsButton from './components/ThreeDotsButton/ThreeDotsButton';
import { useProductManagement } from '../../hooks/useProductManagement';
import './product.css';
import Text from '../../components/Text/Text';

const ProductComponent = () => {
  const columns = [
    {
      key: 'logo',
      label: 'Logo',
    },
    {
      key: 'name',
      label: 'Nombre del Producto',
    },
    {
      key: 'description',
      label: 'Descripción',
    },
    {
      key: 'date_release',
      label: 'Fecha de Liberación',
    },
    {
      key: 'date_revision',
      label: 'Fecha de Reestructuración',
    },
  ];

  const {
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
  } = useProductManagement();

  const popoverContent = (index: number, productId: string) => (
    <>
      <Button color='none' size='small' onClick={() => handleEditRow(index, productId)}>
        Editar
      </Button>
      <Button
        color='none'
        size='small'
        onClick={() => handleDeleteProduct(index, productId)}
      >
        Eliminar
      </Button>
    </>
  );  

  const renderActionsTable = (rowIndex: number, productId: string) => {
    const isOpen = popoverStates[rowIndex] || false;

    return (
      <>
        <ThreeDotsButton onClick={() => handleOpenPopover(rowIndex)} />
        {isOpen && (
          <Popover
            isOpen={isOpen}
            onClose={() => handleClosePopover(rowIndex)}
            content={popoverContent(rowIndex, productId)}
          />
        )}
      </>
    );
  };

  return (
    <>
      <div className='search-container'>
        <Input placeholder='Search..' name='search' value={searchValue} onChange={handleSearch} />
        <Button onClick={handleOpenModal}>
          <>Agregar</>
        </Button>
      </div>
      <Table columns={columns} data={filteredProducts} actions={renderActionsTable} />
      {isModalProductOpen && (
        <ProductModal
          isOpen
          onClose={handleCloseModal}
          product={editingProduct}
          onSubmit={handleCreateOrUpdateProduct}
        />
      )}
      {isModalConfirmOpen && (
        <ConfirmModal
          isOpen
          onClose={() => {
            setIsModalConfirmOpen(false);
            setEditingProduct(null);
          }}
          onConfirm={handleDeleteConfirmed}
          message={`Deseas eliminar ${editingProduct?.name}?`}
        />
      )}
      {errorMessage && <Text color='error'>{errorMessage}</Text>}
    </>
  )
}

export default ProductComponent;
