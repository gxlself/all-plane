<!--
 * @Description:
 * @Version: 1.0
 * @Authoe: gxlself
 * @Date: 2020-04-01 17:36:24
 * @LastRditors: gxlself
 * @LastEditTime: 2020-04-01 18:44:25
 -->
<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div class="filter-container">
      <el-input v-model="listQuery.role_name" placeholder="角色名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.enable" placeholder="启用状态" style="width: 140px" class="filter-item" @change="getList()">
        <el-option label="全部" value="" />
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="addPeople('add')">
        新增
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      element-loading-text="加载中~"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-spinner="el-icon-loading"
      :data="list"
      border
      fit
      highlight-current-row
      size="mini"
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="120">
        <template slot-scope="{ $index }">
          {{ $index + 1 + listQuery.size * (listQuery.page - 1) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="200">
        <template slot-scope="{row}">
          <span>{{ row.role_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" width="300">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="启用状态">
        <template slot-scope="{row}">
          <el-tag :type="row.enable | statusFilter">
            {{ row.enable | enable }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="{row}">
          <span>{{ row.last_modify }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="450">
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editMenu(row)">
            编辑
          </el-button>
          <el-button v-if="row.enable == 0" size="mini" icon="el-icon-success" type="success" @click="updateEnable(row)">
            启用
          </el-button>
          <el-button v-if="row.enable == 1" size="mini" icon="el-icon-warning" type="danger" @click="updateEnable(row)">
            禁用
          </el-button>
          <el-button size="mini" icon="el-icon-setting" type="primary" @click="openAuthDialog(row)">
            角色授权
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delteMenu(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
    <!-- 增加编辑弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="peopleVisible" lock-scroll destroy-on-close width="500px" @closed="sureLoading = false">
      <el-form ref="dataForm" :rules="rules" :model="roleParams" label-position="left" label-width="130px" style="width: 400px;margin-left:30px;">
        <el-form-item label="用户名：" prop="role_name">
          <el-input v-model="roleParams.role_name" />
        </el-form-item>
        <el-form-item label="介绍：">
          <el-input v-model="roleParams.remark" type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 6}" />
        </el-form-item>
        <el-form-item label="头像：">
          <el-input v-model="roleParams.remark" type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 6}" />
        </el-form-item>
        <el-form-item label="：">
          <el-input v-model="roleParams.remark" type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 6}" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">
          取消
        </el-button>
        <el-button :loading="sureLoading" :disabled="sureLoading" type="primary" @click="addOrEditorRole()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryList } from '@/api/people'
export default {
  data() {
    return {
      listLoading: false,
      list: null,
      total: 0,
      dialogStatus: 'add',
      textMap: {
        editor: '编辑角色',
        add: '新增角色'
      },
      listQuery: {
        page: 1,
        size: 10,
        role_name: '',
        enable: ''
      },
      cacheMap: {
        roleParams: null
      },
      rules: { // 规则
        role_name: [{ required: true, message: '角色名称不能为空', trigger: 'change' }]
      },
      roleParams: {
        username: '',
        remark: ''
      },
      sureLoading: false, // 添加、编辑角色时确认按钮
      peopleVisible: false // 新增角色菜单弹框
    }
  },
  methods: {
    // 获取列表数据
    async getList() {
      this.listLoading = true
      try {
        const { data } = await queryList()
        this.list = data.list
        this.total = data.count
      } catch (err) {
        console.log(err)
      }
      this.listLoading = false
    },
    addPeople(status) {
      this.dialogStatus = status
    }
  }
}
</script>

