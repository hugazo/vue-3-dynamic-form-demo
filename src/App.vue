<script setup>
import FormField from '@/components/FormField.vue';
import useForms from '@/composables/useForms';

const { FormData, formValues } = useForms();
</script>

<template>
  <div class="container">
    <template
      v-for="field, index in FormData"
      :key="index"
    >
      <FormField
        v-model:value="formValues[field.name].value"
        v-model:result="formValues[field.name].result"
        :field
      />
    </template>
  </div>
</template>
