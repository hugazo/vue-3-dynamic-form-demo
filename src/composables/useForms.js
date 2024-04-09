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
    // Note: will work after country selection since i need it's referecence
    // If has reference, use it to get the validation value
    if (field.validationReference) {
      const selectedReference = formValues.value[field.validationReference].value.value;
      if (selectedReference) {
        const selectedValue = field.validation[selectedReference] || field.validation.default;
        const regex = new RegExp(selectedValue);
        const result = regex.test(value.value);
        return result;
      }
      return {
        valid: false,
        message: 'No reference selected',
      };
    }
    return {
      value: true,
    };
  };


  return {
    valid,
    FormData,
    formValues,
  }
};
