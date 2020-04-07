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
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="openRolesForm('add')">
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
    <!-- 增加编辑弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="roleFormVisible" lock-scroll destroy-on-close width="500px" @closed="sureLoading = false">
      <el-form ref="dataForm" :rules="rules" :model="roleParams" label-position="left" label-width="130px" style="width: 400px;margin-left:30px;">
        <el-form-item label="角色名称：" prop="role_name">
          <el-input v-model="roleParams.role_name" />
        </el-form-item>
        <el-form-item label="描述：">
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
    <!-- 角色授权弹框 -->
    <el-dialog title="角色授权" :visible.sync="roleAuthVisible" lock-scroll destroy-on-close width="500px" @closed="closeAuthDialog">
      <el-tree
        ref="menuTree"
        show-checkbox
        node-key="id"
        check-strictly
        highlight-current
        :data="menuTree"
        :default-checked-keys="checkedData"
        :props="defaultProps"
        @check="getMyNode"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleAuthVisible = false">
          取消
        </el-button>
        <el-button :loading="authLoading" :disabled="authLoading" type="primary" @click="sureAuth()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { getRoles, addRole, updateRole, deleteRole, updateEnable, rolesAuth } from '@/api/role'
import { getMenuTree } from '@/api/menu'
import waves from '@/directive/waves' // waves directive
import { Message } from 'element-ui'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MenuList',
  directives: { waves },
  filters: {
    enable(type) {
      const enableMap = {
        0: '否',
        1: '是'
      }
      return enableMap[type]
    },
    statusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success'
      }
      return statusMap[status]
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: true, // 表格loading
      list: null, // 表格数据
      listQuery: {
        page: 1,
        size: 10,
        role_name: '',
        enable: ''
      },
      total: 0, // 所有数据
      roleParams: {
        role_name: '',
        remark: ''
      },
      textMap: {
        editor: '编辑角色',
        add: '新增角色'
      },
      roleFormVisible: false, // 新增角色菜单弹框
      dialogStatus: 'add', // 弹框类型
      rules: { // 规则
        role_name: [{ required: true, message: '角色名称不能为空', trigger: 'change' }]
      },
      cacheMap: {
        roleParams: null
      },
      roleAuthVisible: false, // 授权弹框控制
      sureLoading: false, // 添加、编辑角色时确认按钮
      authLoading: false, // 授权loading
      menuTree: null, // 菜单树
      checkedData: [], // 默认勾选
      defaultProps: {
        children: 'childrens',
        label: 'menu_name'
      },
      authId: null // 授权id
    }
  },
  created() {
    this.init()
    this.getList()
    this.getMenuTree()
  },
  methods: {
    // 获取列表
    async getList() {
      this.listLoading = true
      try {
        const { data } = await getRoles(this.listQuery)
        this.list = data.list
        this.total = data.count
      } catch (err) {
        console.log(err)
      }
      this.listLoading = false
    },
    // 编辑
    editMenu(row) {
      this.openRolesForm('editor', row)
    },
    // 删除
    async delteMenu(row) {
      this.listLoading = true
      try {
        await deleteRole({ id: row.id })
        this.listLoading = false
        this.openMsg('删除成功')
        this.getList()
      } catch (err) {
        console.log(err)
      }
    },
    // 添加角色
    async addOrEditorRole() {
      if (!this.roleParams.role_name) {
        this.openMsg('请输入菜单名称', 'warning')
        return
      }
      this.sureLoading = true
      this.listLoading = true
      try {
        this.dialogStatus === 'add' ? await addRole(this.roleParams) : await updateRole(this.roleParams)
        this.roleFormVisible = false
        this.openMsg('添加成功')
        this.getList()
      } catch (err) {
        console.log(err)
      }
      this.listLoading = false
    },
    // 启用禁用
    async updateEnable(row) {
      this.listLoading = true
      const options = {
        id: row.id,
        enable: row.enable === 1 ? 0 : 1
      }
      try {
        const { msg } = await updateEnable(options)
        this.openMsg(msg)
        await this.getList()
      } catch (err) {
        console.log(err)
      }
      this.listLoading = false
    },
    // 二次封装消息提示
    openMsg(message, type = 'success') {
      Message({ message, type, duration: 2.5 * 1000 })
    },
    // 准备弹框前初始化
    openRolesForm(status, row) {
      this.dialogStatus = status
      if (status === 'editor') {
        this.roleParams = Object.assign({}, row)
      } else {
        this.init()
      }
      this.roleFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.sureLoading = false
      })
    },
    // 初始化
    init() {
      if (this.cacheMap.roleParams) {
        this.roleParams = JSON.parse(JSON.stringify(this.cacheMap.roleParams))
      } else {
        this.cacheMap.roleParams = JSON.parse(JSON.stringify(this.roleParams))
      }
    },
    // 获取可操作的菜单树
    async getMenuTree() {
      try {
        const { data } = await getMenuTree()
        this.menuTree = data.treeData
      } catch (err) {
        console.log(err)
      }
    },
    // 打开授权弹框
    openAuthDialog(row) {
      this.authId = row.id
      this.roleAuthVisible = true
      this.checkedData = row.menus
    },
    // 确认授权
    async sureAuth() {
      this.authLoading = true
      const menus = await this.$refs['menuTree'].getCheckedKeys()
      const option = {
        menus,
        id: this.authId
      }
      try {
        await rolesAuth(option)
        this.roleAuthVisible = false
        this.listLoading = true
        await this.getList()
        this.listLoading = false
      } catch (err) {
        console.log(err)
        this.roleAuthVisible = false
      }
    },
    // 关闭授权弹框
    closeAuthDialog() {
      this.authLoading = false
      this.$refs['menuTree'].setCheckedKeys([])
    },
    // 获取需要的节点信息
    getMyNode(currentNode, choiceNodes) {
      const checkedKeys = choiceNodes.checkedKeys
      if (checkedKeys.includes(currentNode.id)) {
        if (currentNode.parent_id !== 0) {
          let tempNode = JSON.parse(JSON.stringify(currentNode))
          while (tempNode.parent_id !== 0) {
            tempNode = this.$refs['menuTree'].getNode(tempNode.id).parent.data
            this.$refs['menuTree'].setChecked(tempNode, true)
          }
          if (currentNode.type !== 1) {
            currentNode.childrens.forEach(menuItem => {
              this.$refs['menuTree'].setChecked(menuItem.id, true)
            })
          }
        } else {
          currentNode.childrens.forEach(firstItem => {
            this.$refs['menuTree'].setChecked(firstItem.id, true)
            firstItem.childrens.forEach(btnItem => {
              this.$refs['menuTree'].setChecked(btnItem.id, true)
            })
          })
        }
      } else {
        // 取消选择  如果当前节点不是按钮，则需要进行处理
        if (currentNode.type !== 1) {
          // 如果是一级菜单，那么这个一级菜单对应的子菜单需要全部取消选中
          if (currentNode.parent_id === 0) {
            currentNode.childrens.forEach((item) => {
              this.$refs['menuTree'].setChecked(item.id, false)
              item.childrens.forEach(childItem => {
                this.$refs['menuTree'].setChecked(childItem.id, false)
              })
            })
          } else {
            // 如果是二级菜单首先要把菜单对应的按钮全部取消
            currentNode.childrens.forEach((item) => {
              this.$refs['menuTree'].setChecked(item.id, false)
            })
            // 然后要判断同级菜单是否有选中了
            const parentNodes = this.$refs['menuTree'].getNode(currentNode.id).parent.data
            let tempFlag = true
            parentNodes.childrens.forEach(lineMenu => {
              if (tempFlag && checkedKeys.indexOf(lineMenu.id) >= 0) {
                tempFlag = false
              }
            })
            if (tempFlag) {
              this.$refs['menuTree'].setChecked(parentNodes.id, false)
            }
          }
        }
      }
    }
  }
}
</script>
