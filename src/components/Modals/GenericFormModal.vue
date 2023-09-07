<template>
    <div>
      <button class="btn btn-primary dark" @click="handleShow">
        <slot></slot>
      </button>
      <ModalForm :show="show" :onHide="handleClose" :onSubmit="handleSubmit" :title="title" :submitButtonText="title">
        <div v-for="(field, index) in fields" :key="index" class="form-group">
          <!-- check if select -->
            <label v-if="field.type === 'select'" :for="field.name">{{ field.label }}</label> 
            <select v-if="field.type === 'select'" :id="field.name" :name="field.name" v-model="field.value" class="form-input">
              <option v-for="(option, index) in field.options" :key="index" :value="option.value">{{ option.text }}</option>
            </select>
            <label v-if="field.type != 'select'" :for="field.name">{{ field.label }}</label>
            <input
                v-if="field.type != 'select'"
                :id="field.name"
                :name="field.name"
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="field.value"
                class="form-input"
            />
        </div>
      </ModalForm>
    </div>
  </template>
  
  <script>
  import ModalForm from './ModalForm.vue';

  export default {
    props: {
      formsInputs: Array,
      submitForm: Function,
      title: String,
    },
    components: {
      ModalForm,
    },
    data() {
      return {
        show: false,
        fields: this.formsInputs,
      };
    },
    methods: {
      handleClose() {
        this.show = false;
      },
      handleShow() {
        this.show = true;
      },
      handleSubmit() {
        this.submitForm(this.fields); // Submit the form
        this.handleClose(); // Close the modal
      },
    },
    components: { ModalForm },
  };
  </script>
  
<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>