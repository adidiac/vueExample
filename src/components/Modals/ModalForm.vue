<template>
    <div class="modal" v-if="show">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmit">
              <slot></slot>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">{{ submitButtonText }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    props: {
      show: Boolean,
      onHide: Function,
      onSubmit: Function,
      title: String,
      submitButtonText: String,
    },
    methods: {
      closeModal() {
        if (typeof this.onHide === 'function') {
          this.onHide();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your modal styles here */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-dialog {
    max-width: 600px;
    width: 100%;
  }
  
  .modal-content {
    border-radius: 8px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .modal-title {
    margin: 0;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    border-top: 1px solid #ccc;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  
  .close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #fff;
    outline: none;
  }
  </style>
  