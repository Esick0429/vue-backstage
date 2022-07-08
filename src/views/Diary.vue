<template>
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <!-- v-loading 设置加载 -->
    <div class="selectMenu">
      <el-date-picker v-model="value6" type="daterange" range-separator="至" value-format="timestamp" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <!-- 点击触发add方法 -->
      <el-button type="primary" @click="getDiaryData" :style="{ marginLeft: '20px' }">查询</el-button>
      <el-button type="primary" @click="resetDiaryData">重置</el-button>
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="150" :formatter="formatDate"></el-table-column>
        <!-- <el-table-column prop="create_time" label="创建时间" width="150" :formatter="formatDate"></el-table-column> -->
        <el-table-column prop="title" label="标题" width="150"></el-table-column>
        <el-table-column prop="content" label="内容" min-width="800px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" placement="top">
              <div slot="content" v-html="scope.row.content"></div>
              <div
                v-html="scope.row.content"
                :style="{
                  width: '100%',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: '5',
                  WebkitBoxOrient: 'vertical'
                }"
              ></div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后编辑时间" width="180" :formatter="formatDate"></el-table-column>
        <el-table-column prop="userName" label="用户" width="100"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 下面这个用来设置点击添加按钮的弹出框，里面可以进行嵌套表格来展示弹出的表格信息,使用下面的:visible.sync来控制显示与否 -->
    <!-- 里面绑定的是我们新设置的值，填写完成后，将我们这个新值塞到页面中所有的数据当中去 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.content" type="textarea"></el-input> -->
          <newEditor v-model="form.content" @change="changeEditor" />
        </el-form-item>
        <!-- <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { selectDiary, addDiary, updateDiary, deleteDiary } from '../api/index'
import { debounce } from '@/util/debounce'
import newEditor from '@/components/common/newEditor.vue'
export default {
  components: {
    newEditor
  },
  data() {
    return {
      loading: true,
      title: '',
      //   表格的数据
      tableData: [],
      flag: 0,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      // 设置form用于进行添加的时候绑定值
      form: {},
      value6: '',
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  created() {
    //   设置回调函数，进行1.5秒的loading动画显示
    this.getDiaryData()
  },
  mounted() {},
  methods: {
    async getDiaryData() {
      this.loading = true
      let { data } = await selectDiary({ pageIndex: this.currentPage, pageSize: this.pageSize, startTime: this.value6[0] || 0, endTime: this.value6[1] || 0 })
      if (data)
        setTimeout(() => {
          this.loading = false
        }, 200)
      this.tableData = data.list
      this.total = data.total
    },
    async resetDiaryData() {
      this.currentPage = 1
      this.value6 = ''
      await this.getDiaryData()
    },
    // 增加数据的方式，单独的设置一些值，用于增加功能，这些值放在对象里面进行设置，然后将这个新增的对象塞到总数据里面
    add() {
      this.title = '新增日记'
      this.form = {
        title: '',
        content: ''
      }
      //   设置点击按钮之后进行显示对话框
      this.dialogFormVisible = true
    },
    handleEdit(index, row) {
      // eslint-disable-line no-unused-vars
      this.title = '修改日记'
      // 将数据的index传递过来用于实现数据的回显
      let rowData = Object.assign({}, this.tableData[index])
      this.form = rowData
      // 设置对话框的可见
      this.dialogFormVisible = true
      this.flag = 1
    },
    update: debounce(async function (index) {
      //   this.form.date = reformat(this.form.date);
      //    可以在html上面进行设置日期的格式化
      //   将我们添加的信息提交到总数据里面
      console.log(this.userName)
      if (this.flag == 0) {
        let data = {
          userName: this.$store.state.userName,
          ...this.form
        }
        let res = await addDiary(data)
      } else {
        let data = {
          id: this.form.id,
          title: this.form.title,
          content: this.form.content,
          userName: this.form.userName
        }
        let res = await updateDiary(data)
        if (res.status === 403) {
          this.$message.error('修改失败，权限不足')
        } else {
          this.$message.success('修改成功')
        }
        this.flag = 0
      }
      this.getDiaryData()
      this.dialogFormVisible = false
    }, 300),
    handleDelete(index, row) {
      // eslint-disable-line no-unused-vars
      // 设置类似于console类型的功能
      this.$confirm('是否删除该条日记？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
        console.log(row)
        let res = await deleteDiary({ id: row.id, userName: row.userName })
        if (res) {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else if (res.data.status === 403) {
            this.$message.error('删除失败，权限不足')
          }
          await this.getDiaryData()
        }
      })
    },
    cancel() {
      // 取消的时候直接设置对话框不可见即可
      this.dialogFormVisible = false
      this.flag = 0
      // this.getDiaryData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getDiaryData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getDiaryData()
    },
    formatDate(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      if (date == 0) {
        return ''
      }
      return this.dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    changeEditor(e) {
      this.form.content = e
    }
  },
  computed: {
    userName: {
      get() {
        return this.$store.state.userName
      },
      set() {}
    }
  }
}
</script>
<style lang="scss">
.basetable {
  .tableMain {
    margin: {
      top: 10px;
    }
  }
  .page {
    float: left;
    margin: {
      top: 10px;
    }
  }
}
@media only screen and (max-width: 768px) {
  .el-dialog {
    width: 100%;
  }
  .el-pagination {
    white-space: inherit;
  }
}
</style>
