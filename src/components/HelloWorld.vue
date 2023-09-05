<template>
  <div>
    <p>{{ message }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
<script>
import { ref, onMounted } from '@vue/composition-api';
import { watch } from 'vue';

export default {
  setup() {
    // Define reactive data using ref
    const message = ref('Hello, Vue 2 Composition API');

    // Define a function that modifies the data
    const increment = function(){
     this.$store.commit('increment')
     console.log(this.$store.state.count)
    };
    return {
      message,
      increment,
    };
  },
};
</script>




