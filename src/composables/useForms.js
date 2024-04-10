import { computed, ref } from 'vue';
import FormData from '@/data/form.json';

export default () => {
  const formLoading = ref(false);

  const formValues = ref(FormData.reduce((acc, field) => {
    // Declared as ref for two-way binding
    const value = ref('');
    acc[field.name] = {
      value,
      result: computed(() => handleValidField(field, value)),
    };
    return acc;
  }, {}));

  // Computed property that handles dynamic field validations from json and creates reactive object for component binding
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

  const valid = computed(() => {
    const values = Object.values(formValues.value);
    if (!values.length) return false;
    const validValues = values.every((field) => {
      return field.result.valid ? true : false;
    });
    return validValues;
  });

  const handleFormSubmit = async () => {
    formLoading.value = true;
    try {
      if (!valid.value) throw new Error('Form is invalid');
      const body = Object.keys(formValues.value).reduce((acc, key) => {
        acc[key] = formValues.value[key].value;
        return acc;
      }, {});
      await executeMockApiCall(body)
      cleanForm();
      console.log('Form submitted successfully')
    } catch (e) {
      console.error('Error submitting form', e);
    } finally {
      formLoading.value = false;
    }
  };

  const cleanForm = () => {
    Object.keys(formValues.value).forEach((key) => {
      formValues.value[key].value = '';
    });
  };

  const executeMockApiCall = (body) => {
    console.log('Api Call Begin', body)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject this a 20% of the time
        if (Math.random() > 0.8) {
          return reject('Error fetching data');
        }
        resolve('Data fetched');
      }, Math.floor(Math.random() * 2000) + 2000);
    });
  }

  return {
    valid,
    formLoading,
    handleFormSubmit,
    FormData,
    formValues,
  }
};
