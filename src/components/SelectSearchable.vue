<template>
  <div class="form-group">
    <div class="dropdown">
      <label v-if="field.label">{{ field.label }}</label>
      <a
        class="btn btn-secondary dropdown-toggle form-control"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ selectedOption }}
      </a>

      <ul class="dropdown-menu">
        <li>
          <input
            v-model="formValue"
            placeholder="Search..."
            type="text"
          >
        </li>
        <li
          v-for="option in filteredOptions"
          :key="option.value"
        >
          <a
            href="#"
            class="dropdown-item"
            :class="{ active: value === option.value }"
            @click="handleSelection(option)"
          >
            {{ option.flag }} {{ option.label }}
          </a>
        </li>
        <li v-if="filteredOptions.length === 0">
          <a
            href="#"
            class="dropdown-item disabled"
          >
            No results found
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const formValue = ref('');

const selectedOption = computed(() => {
  const option = props.field.options.find((option) => option.value === value.value);
  return option ? `${option.flag} ${option.label}` : 'Select...';
});

const filteredOptions = computed(() => {
  return props.field.options.filter((option) => {
    const searchValue = formValue.value.toLowerCase()
    return option.label.toLowerCase().includes(searchValue)
  });
});

const handleSelection = (option) => {
  value.value = option.value;
  formValue.value = '';
};

const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const value = defineModel('value', {
  type: String,
});

const result = defineModel('result', {
  type: Object,
  required: true,
});
</script>