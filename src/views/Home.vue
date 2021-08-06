<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import tokenChange from '../mixins/tokenChange'
export default {
  name: 'Home',
  mixins:[tokenChange],
  components: {
    // HelloWorld
  }
}
</script>
