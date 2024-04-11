<script setup>
import FormField from '@/components/FormField.vue';
import useForms from '@/composables/useForms';

// Imports useForms composable, handles business logic for form
const {
  FormData,
  formValues,
  valid,
  formLoading,
  handleFormSubmit
} = useForms();
</script>

<template>
  <div class="main-container container-fluid d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-body">
        <!-- Iterates over FormData array and renders FormField component for each field -->
        <template
          v-for="field, index in FormData"
          :key="index"
        >
          <FormField
            v-model:value="formValues[field.name].value"
            v-model:result="formValues[field.name].result"
            class="py-2"
            :field
          />
        </template>
        <!-- Form Submit -->
        <div class="form-group py-4">
          <button
            class="form-control btn btn-primary"
            :disabled="!valid || formLoading"
            @click="handleFormSubmit"
          >
            <span
              v-if="formLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            {{ formLoading ? 'Loading...' : 'Submit' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  height: 100vh;
}
.card {
  width: 400px;
}
</style>