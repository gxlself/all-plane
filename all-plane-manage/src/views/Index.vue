<template>
  <div>1</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    let data = {
      username: 'jnkl',
      password: '1564541'
    }
    console.log(data)
    this.api.login(data).then(res => {
      console.log(res)
    })
  },
  mounted() {
    console.log(11)
  }
}
</script>

<style lang="less" scoped>

</style>
