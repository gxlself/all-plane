<template>
  <div>
    123
  </div>
</template>

<script>
export default {
  mounted() {
    this.request.post('http://localhost:3333/manage/login', {username: 'gxlself', password: '123456'}, res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
    console.log(this.request)
  }
}
</script>

<style lang="less" scoped>

</style>
