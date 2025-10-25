export type ValidationError = {
  field: string;
  message: string;
  code?: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

export type BusinessRule<T> = (entity: T) => ValidationResult;

export type EntityConstraints = {
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  required?: boolean;
  unique?: boolean;
};