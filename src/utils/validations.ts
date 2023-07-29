export function validateRequired(
  value: string,
  fieldName: string,
): string | null {
  if (value.trim() === '') {
    return `El campo ${fieldName} es requerido.`;
  }
  return null;
}

export function validateProductId(value: boolean): string | null {
  if (value) {
    return `ID ya existe!`;
  }
  return null;
}

export function validateLength(
  value: string,
  fieldName: string,
  minLength: number,
  maxLength: number,
): string | null {
  if (value.length < minLength || value.length > maxLength) {
    return `El campo ${fieldName} debe tener entre ${minLength} y ${maxLength} caracteres.`;
  }
  return null;
}

export function validateDateGreaterOrEqual(
  selectedDate: string,
  fieldName: string,
): string | null {
  const selectedDateObj = new Date(`${selectedDate}T00:00:00`);
  const currentDate = new Date();
  currentDate.setHours(0,0,0,0);

  if (selectedDateObj < currentDate) {
    return `La fecha seleccionada ${fieldName} debe ser mayor o igual a la fecha actual.`;
  }

  return null;
}
