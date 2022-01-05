<template>
  <div>
    <el-container style="
    flex-direction: column;">
      <div>
        <el-upload
          class="upload-demo"
          action
          :auto-upload="true"
          :limit="4"
          ref="upload"
          :http-request="upload"
          :on-change="sbb"
          multiple
          :show-file-list="false"
        >
          <el-button>上传图片</el-button>
        </el-upload>
      </div>
      <el-main v-loading="loading">
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in imgList" :key="item.id" style="margin-bottom:20px">
            <el-card
              :body-style="{
                padding: '0px',
                height: '100%',
                width: '100%',
                textAlign: 'center'
              }"
            >
              <el-button
                icon="el-icon-close"
                style="float:right;"
                circle
                :plain="true"
                @click="deleteImg(item)"
              ></el-button>
              <div>
                <el-image :src="`http://127.0.0.1:4000${item.imgUrl}`" fit="cover" lazy></el-image>
                <div>{{ item.imgName }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { upload, getImgs, deleteImg } from '../api/index.js'

export default {
  data() {
    return {
      fileList: [],
      imgList: [],
      loading: true
    }
  },
  mounted() {
    this.getImgs()
  },
  methods: {
    async getImgs() {
      this.loading = true
      let res = await getImgs()
      if (res) {
        setTimeout(() => {
          this.loading = false
        }, 200)
      }
      this.imgList = res.data.data.list
    },
    async upload() {
      const formData = new FormData()
      const file = this.fileList[0]
      formData.append('avatar', file.raw)
      let res2 = await upload(formData)
      if (res2) {
        this.getImgs()
        this.$message.success('上传成功')
      }
      this.$refs.upload.clearFiles()
    },
    sbb(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    deleteImg(item) {
      this.$confirm('是否删除此图片', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await deleteImg(item)
          if (res.data.status === 200) {
            this.$message.success('删除成功')
            this.getImgs()
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style>
.imgBox {
  height: 300px;
  width: 250px;
}
</style>
