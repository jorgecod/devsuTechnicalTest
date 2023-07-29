import { useState, ChangeEvent, FocusEvent } from 'react';
import { Product, ProductFormProps } from '../../interfaces';
import Input from '../../../../components/Input/Input';
import {
  validateDateGreaterOrEqual,
  validateLength,
  validateProductId,
  validateRequired,
} from '../../../../utils/validations';
import Button from '../../../../components/Button/Button';
import Text from '../../../../components/Text/Text';
import './productForm.css';
import { verificationProduct } from '../../../../services/products';

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Product>({
    id: '',
    logo: '',
    name: '',
    description: '',
    date_release: '',
    date_revision: '',
    ...product,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValidationErrors: Record<string, string> = {};

    if (name === 'id') {
      newValidationErrors.id =
        (validateRequired(value, 'ID') ?? '') ||
        (validateLength(value, 'ID', 3, 10) ?? '');
    }

    if (name === 'name') {
      newValidationErrors.name =
        (validateRequired(value, 'Nombre') ?? '') ||
        (validateLength(value, 'Nombre', 5, 100) ?? '');
    }

    if (name === 'description') {
      newValidationErrors.description =
        (validateRequired(value, 'Descripción') ?? '') ||
        (validateLength(value, 'Descripción', 10, 200) ?? '');
    }

    if (name === 'logo') {
      newValidationErrors.logo = validateRequired(value, 'Logo') ?? '';
    }

    if (name === 'date_release') {
      if (value) {
        const selectedDateObj = new Date(value);
        const oneYearLater = new Date(selectedDateObj);
        oneYearLater.setFullYear(selectedDateObj.getFullYear() + 1);
    
        setSelectedDate(oneYearLater);
        setFormData((prevData) => ({
          ...prevData,
          date_revision: oneYearLater.toISOString().split('T')[0],
        }));
        
        newValidationErrors.date_release = validateDateGreaterOrEqual(value, 'Fecha de Liberación') ?? '';
      } else {
        newValidationErrors.date_release = validateRequired(value, 'Fecha de Liberación') ?? '';
        setSelectedDate(null);
        setFormData((prevData) => ({
          ...prevData,
          date_revision: '',
        }));
      }
    }

    setValidationErrors((prevValidationErrors) => ({
      ...prevValidationErrors,
      ...newValidationErrors,
    }));
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSubmit(formData);
  };

  const handleReset = () => {
    const resetData = {
      id: product ? product.id : '',
      logo: '',
      name: '',
      description: '',
      date_release: '',
      date_revision: '',
    };
    setFormData(resetData);
    setSelectedDate(null);
    setValidationErrors({});
  };

  const handleBlur = async(event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const isExistProduct = await verificationProduct(event.target.value);
      const msgToError = validateProductId(isExistProduct);
      setValidationErrors((prevValidationErrors) => ({
        ...prevValidationErrors,
        id: msgToError !== null ? msgToError : '',
      }));
    }
  };

  const isFormFilled = Object.values(formData).every((value) => value !== '');
  const isButtonDisabled =
    Object.values(validationErrors).some((error) => !!error) || !isFormFilled;

  return (
    <>
      <div className='inputs-container'>
        <div className='input-wrap'>
          <Text>ID</Text>
          <Input disabled={!!product} name='id' value={formData.id} onChange={handleChange} onBlur={handleBlur} />
          {validationErrors.id && <Text color='error' size='small'>{validationErrors.id}</Text>}
        </div>
        <div className='input-wrap'>
          <Text>Nombre</Text>
          <Input name='name' value={formData.name} onChange={handleChange} />
          {validationErrors.name && <Text color='error' size='small'>{validationErrors.name}</Text>}
        </div>
      </div>
      <div className='inputs-container'>
        <div className='input-wrap'>
          <Text>Descripción</Text>
          <Input name='description' value={formData.description} onChange={handleChange} />
          {validationErrors.description && <Text color='error' size='small'>{validationErrors.description}</Text>}
        </div>
        <div className='input-wrap'>
          <Text>Logo</Text>
          <Input name='logo' value={formData.logo} onChange={handleChange} />
          {validationErrors.logo && <Text color='error' size='small'>{validationErrors.logo}</Text>}
        </div>
      </div>
      <div className='inputs-container'>
        <div className='input-wrap'>
          <Text>Fecha de Liberación</Text>
          <Input
            type='date'
            name='date_release'
            value={formData.date_release}
            onChange={handleChange}
          />
          {
            validationErrors.date_release && (
              <Text color='error' size='small'>
                {validationErrors.date_release}
              </Text>
            )
          }
        </div>
        <div className='input-wrap'>
          <Text>Fecha de Revisión</Text>
          <Input
            disabled
            type='date'
            name='date_revision'
            value={selectedDate ? selectedDate.toISOString() : formData.date_revision}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='buttons-container'>
        <Button color='secondary' onClick={handleReset}>
          <span>Reiniciar</span>
        </Button>
        <Button disabled={isButtonDisabled} onClick={handleSave}>
          <span>Enviar</span>
        </Button>
      </div>
    </>
  );
}

export default ProductForm;