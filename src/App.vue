<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
 created:function() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
</script>
