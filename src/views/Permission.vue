<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-lx-warn"></i> 权限测试</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avatarUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="权限">
          <template slot-scope="scope">
            <span>{{ scope.row.authority }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
        <el-form :model="form" label-position="left">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="头像" label-width="120px">
            <el-upload
              class="upload-demo"
              action=""
              :auto-upload="false"
              :limit="1"
              ref="upload"
              :http-request="upload"
              :on-change="sbb"
              multiple
              list-type="picture"
            >
            <!-- <img v-if="form.avatarUrl" :src="form.avatarUrl" width="150px" height="150px"> -->
            <el-image v-if="form.avatarUrl" :src="form.avatarUrl" width="150px" height="150px">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <!-- 设置触发更新的方法 -->
          <el-button type="primary" @click="update();">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { select, deletePassword, updateInfo, upload } from '../api/index.js'
export default {
  data() {
    return {
      list: [],
      userid: {},
      form: {},
      msg: '',
      currentIndex: -1,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      fileList: [],
      avatarUrl: ''
    }
  },
  created() {
    this.token = localStorage.getItem('token')
  },
  methods: {
    async allUser() {
      let res = await select({ list: this.list })
      if (res) {
        console.log(res.data.list)
        this.list = res.data.list
        if (res.data.status == 403) {
          this.$router.replace('403')
        }
      }
    },
    handleEdit(index, row) {
      // eslint-disable-line no-unused-vars
      this.form = this.list[index]
      this.currentIndex = index
      this.userid = row.id
      this.dialogFormVisible = true
      // 将数据的index传递过来用于实现数据的回显
    },
    handleDelete(index, row) {
      // eslint-disable-line no-unused-vars
      console.log(row.id)
      // 设置类似于console类型的功能
      this.$confirm('永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // axios.post('/api/delete', { id: row.id }).then(result => {
          //   // this.list.splice(index, 1)
          //   this.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   })
          // })
          let res = await deletePassword({ id: row.id })
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    cancel() {
      // 取消的时候直接设置对话框不可见即可
      this.dialogFormVisible = false
      this.$refs.upload.clearFiles()
      this.fileList = []
    },
    async update() {
      //   this.form.date = reformat(this.form.date);
      //    可以在html上面进行设置日期的格式化
      //   将我们添加的信息提交到总数据里面
      let username = this.form.username
      let password = this.form.password
      let id = this.form.id
      console.log('用户名为' + username)
      console.log('密码' + password)
      console.log('id' + id)
      let res = await updateInfo({ username, password, id })
      this.$refs.upload.submit();
      if (res) {
        this.cancel()
      }
    },
    async upload() {
      const formData = new FormData()
      const file = this.fileList[0]
      formData.append('avatar', file.raw)
      formData.append('id', this.form.id)
      formData.append('username', this.form.username)
      let res2 = await upload(formData)
      this.$refs.upload.clearFiles()
    },
    sbb(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    }
  },
  mounted() {
    this.allUser()
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 30px 0;
}
p {
  line-height: 30px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.logout {
  color: #409eff;
}
</style>
