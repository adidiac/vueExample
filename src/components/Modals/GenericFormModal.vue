<template>
    <div>
      <button class="btn btn-primary" @click="handleShow">Add</button>
      <ModalForm :show="show" :onHide="handleClose" :onSubmit="handleSubmit" title="Add" submitButtonText="Add">
        <div v-for="(field, index) in fields" :key="index" class="form-group">
            <label :for="field.name">{{ field.label }}</label>
            <input
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
    },
    components: {
      Modal,
      CustomForm,
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