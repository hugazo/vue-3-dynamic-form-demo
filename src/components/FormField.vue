
<template>
  <component
    :is="selectedField"
    v-if="selectedField"
    v-model:value="value"
    v-model:result="result"
    :field="field"
    :disabled
    :error-message="errorMessage"
  />
</template>

<script setup>
import { computed } from 'vue';
import SelectSearchable from '@/components/SelectSearchable.vue';
import TextInput from '@/components/TextInput.vue';

const selectedField = computed(() => {
  switch (props.field.type) {
    case 'searchableSelection':
      return SelectSearchable;
    case 'text':
      return TextInput;
    default:
      return false;
  }
});

const value = defineModel('value', {
  type: String,
  default: '',
});

const result = defineModel('result', {
  type: Object,
  required: true,
});

// Read-only props
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
</script>
