<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 12px 12px 20px;">
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建公告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="messageForm" label-width="160px" size="small">
      <el-row>
        <el-col :span="13">
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
              <el-button type="success" round @click="submitMessage(1)">提交审核</el-button>
              <el-button type="primary" round @click="submitMessage(2)">保存到草稿</el-button>
              <el-button type="primary" round @click="saveLocal()">保存到本地</el-button>
              <el-button type="warning" round @click="cancel">取消编辑</el-button>
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
      },
      viewInitCache: {
        messageForm: null
      }
    }
  },
  mounted() {
    let localMessage = localStorage.getItem('localMessage')
    this.$nextTick(() => {
      editor = new E('#editor')
      editor.create()
      if (localMessage) {
        localMessage = JSON.parse(localMessage)
        editor.txt.html(localMessage.content)
        this.initPage()
        this.messageForm.title = localMessage.title
        this.messageForm.theme = localMessage.theme
      } else {
        editor.txt.html('<p style="text-align: left"">(在此输入公告)</p>')
        this.initPage()
      }
    })
  },
  methods: {
    // 提交审核
    submitMessage(status) {
      if (!this.messageForm.title) {
        this.$message({ message: '请输入标题', type: 'warning' })
        return
      }
      if (!this.messageForm.theme) {
        this.$message({ message: '请输入主题', type: 'warning' })
        return
      }
      let userContent = editor.txt.html()
      if (userContent.length < 1) {
        this.$message({ message: '请输入内容', type: 'warning' })
        return
      }
      let options = {
        title: this.messageForm.title,
        theme: this.messageForm.theme,
        content: editor.txt.html(),
        status: status,
        username: sessionStorage.getItem('username')
      }
      this.api.addMessage(options).then(res => {
        if (res.code === 0) {
          this.$message({ message: res.msg, type: 'success' })
          this.initPage()
          editor.txt.html('<p style="text-align: left"">(在此输入公告)</p>')
        } else {
          this.$message({ message: res.msg, type: 'error' })
        }
      })
    },
    // 取消返回上级页面
    cancel() {
      this.$router.back()
    },
    // 初始化
    initPage() {
      if (!this.viewInitCache.messageForm) {
        this.viewInitCache.messageForm = JSON.parse(JSON.stringify(this.messageForm))
      } else {
          this.messageForm = JSON.parse(JSON.stringify(this.viewInitCache.messageForm))
      }
    },
    // 保存到本地
    saveLocal() {
      let options = {
        title: this.messageForm.title,
        theme: this.messageForm.theme,
        content: editor.txt.html(),
      }
      localStorage.setItem('localMessage', JSON.stringify(options))
      this.$message({ message: '本地存储成功', type: 'success' })
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

