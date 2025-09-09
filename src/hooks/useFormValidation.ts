"use client";

import { useState, useCallback } from "react";

interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

interface UseFormValidationProps<T> {
  initialValues: T;
  validationRules: Partial<Record<keyof T, ValidationRule<T[keyof T]>[]>>;
}

export function useFormValidation<T extends Record<string, any>>({
  initialValues,
  validationRules,
}: UseFormValidationProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      const rules = validationRules[field];
      if (!rules) return "";

      for (const rule of rules) {
        if (!rule.validate(value)) {
          return rule.message;
        }
      }
      return "";
    },
    [validationRules]
  );

  const setValue = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      
      // Validate on change if field has been touched
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error || undefined }));
      }
    },
    [touched, validateField]
  );

  const setTouchedField = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validate on blur
    const error = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: error || undefined }));
  }, [validateField, values]);

  const validateAll = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const field in values) {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(
      Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>
      )
    );

    return isValid;
  }, [values, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    setTouchedField,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}
