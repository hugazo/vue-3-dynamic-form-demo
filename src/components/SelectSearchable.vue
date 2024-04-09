<template>
  <p>I am a searchable</p>
  <input
    v-model="formValue"
    type="text"
  >
  <!-- <pre>{{ filteredOptions }}</pre> -->
</template>

<script setup>
import { ref, computed } from 'vue';

const formValue = ref('');

const filteredOptions = computed(() => {
  return props.field.options.filter((option) => {
    const searchValue = formValue.value.toLowerCase()
    return option.label.toLowerCase().includes(searchValue)
  });
});

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
</script>