<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {  
  name: 'App',
  components: {
    Home
  },
 created:function() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
</script>
