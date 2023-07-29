import {
  validateRequired,
  validateProductId,
  validateLength,
  validateDateGreaterOrEqual,
} from './validations';

describe('Validation Functions', () => {
  test('should validate required fields', () => {
    expect(validateRequired('', 'Name')).toBe('El campo Name es requerido.');
    expect(validateRequired('  ', 'Description')).toBe(
      'El campo Description es requerido.',
    );
    expect(validateRequired('Hello', 'Title')).toBeNull();
  });

  test('should validate product ID existence', () => {
    expect(validateProductId(true)).toBe('ID ya existe!');
    expect(validateProductId(false)).toBeNull();
  });

  test('should validate field length', () => {
    expect(validateLength('Short', 'Description', 10, 20)).toBe(
      'El campo Description debe tener entre 10 y 20 caracteres.',
    );
    expect(
      validateLength('This is a very long description', 'Description', 10, 20),
    ).toBe('El campo Description debe tener entre 10 y 20 caracteres.');
    expect(validateLength('Valid length', 'Title', 5, 15)).toBeNull();
  });

  test('should validate date is greater or equal to current date', () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    expect(validateDateGreaterOrEqual('2023-07-27', 'Date')).toBe(
      `La fecha seleccionada Date debe ser mayor o igual a la fecha actual.`
    );
    expect(validateDateGreaterOrEqual(formattedCurrentDate, 'Date')).toBeNull();
  });
});
