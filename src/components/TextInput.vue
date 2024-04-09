<template>
  <div class="form-group">
    <label v-if="field.label">{{ field.label }}</label>
    <input
      v-model="value"
      class="form-control"
      type="text"
      :disabled
    >
    <small
      v-if="result.valid === false"
      class="form-text text-error"
    >
      {{ result.message }}
    </small>
  </div>
</template>

<script setup>
const value = defineModel('value', {
  type: String,
});

const result = defineModel('result', {
  type: Object,
  required: true,
});

const props = defineProps({
  field: {
    type: Object,
    required: true,
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