<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 12px 12px 20px;">
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建公告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="messageForm" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="公告标题">
            <el-input type="text" placeholder="请输入标题" v-model="messageForm.title" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="公告主题">
            <el-input type="text" placeholder="请输入主题" v-model="messageForm.theme" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="公告内容">
            <div id="editor"></div>
          </el-form-item>
          <el-form-item label="执行操作">
            <div class="btn-control">
              <el-button type="success" @click="submitMessage">提交审核</el-button>
              <el-button type="primary" @click="saveMessage">保存到草稿</el-button>
              <el-button type="warning" @click="cancel">取消编辑</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
const E = require('wangeditor') 
let editor = null
export default {
  data() {
    return {
      messageForm: {
        title: '',
        theme: ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      editor = new E('#editor')
      editor.create()
    })
  },
  methods: {
    submitMessage() {
      let options = {
        title: this.messageForm.title,
        theme: this.messageForm.theme,
        content: editor.txt.html(),
        type: 1,
        username: sessionStorage.getItem('username')
      }
      this.api.addMessage(options).then(res => {
        console.log(res)
      })
    },
    saveMessage() {
      let options = {
        title: this.messageForm.title,
        theme: this.messageForm.theme,
        content: editor.txt.html(),
        type: 2,
        username: sessionStorage.getItem('username')
      }
      this.api.addMessage(options).then(res => {
        console.log(res)
      })
    },
    cancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.btn-control{
  display: flex;
  justify-content: flex-start;
}
</style>

