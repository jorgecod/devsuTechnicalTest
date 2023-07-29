import { Dispatch, SetStateAction } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

export interface ProductFormProps {
  product: Product | null;
  onSubmit: (data: Product) => void;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmit: (data: Product) => void;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}
