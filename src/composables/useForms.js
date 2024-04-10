import { computed, ref } from 'vue';
import FormData from '@/data/form.json';

export default () => {
  const valid = ref(false);

  const formValues = ref(FormData.reduce((acc, field) => {
    // Declared as ref for two-way binding
    const value = ref('');
    acc[field.name] = {
      value,
      result: computed(() => handleValidField(field, value)),
    };
    return acc;
  }, {}));

  const handleValidField = (field, value) => {
    // Required field
    if (field.required && value.value.length === 0) {
      return {
        valid: false,
        message: field.requiredMessage,
      };
    }
    // If validation is a string, use regex
    if (typeof field.validation === 'string') {
      const regex = new RegExp(field.validation);
      const valid = regex.test(value.value);
      if (!valid) {
        return {
          valid,
          message: field.validationMessage,
        };
      }
    }
    // If has reference, use it to get the validation value
    if (field.validationReference) {
      const selectedReference = formValues.value[field.validationReference].value;
      if (selectedReference) {
        const selectedValue = field.validation[selectedReference] || field.validation.default;
        const regex = new RegExp(selectedValue);
        const result = regex.test(value.value);
        return {
          valid: result,
          message: field.validationMessage[selectedReference],
        };
      }
      return {
        valid: false,
        disabled: true,
        message: 'No reference selected',
      };
    }
    return {
      valid: true,
    };
  };


  return {
    valid,
    FormData,
    formValues,
  }
};
