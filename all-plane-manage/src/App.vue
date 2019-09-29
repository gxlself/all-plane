<template>
  <div id="app" v-loading.body="this.$store.state.loading" customClass="transparent">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from './views/Index'
export default {
  name: 'App',
  mounted() {
  },
  components: {
    Index
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
}
</style>
