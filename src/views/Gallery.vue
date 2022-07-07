<template>
  <div>
    <el-container style="flex-direction: column">
      <div>
        <el-upload
          class="upload-demo"
          action
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :auto-upload="true"
          :limit="4"
          ref="upload"
          :http-request="upload"
          :on-change="sbb"
          :before-upload="beforeUpload"
          multiple
          :show-file-list="false"
        >
          <el-button>上传图片</el-button>
        </el-upload>
      </div>
      <el-main v-loading="loading">
        <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
          <el-col :span="6" v-for="item in imgList" :key="item.id" style="margin-bottom: 20px">
            <el-card
              :body-style="{
                padding: '0px',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between'
              }"
              style="height: 100%"
            >
              <div :style="{ width: '100%' }">
                <el-button icon="el-icon-close" style="float: right" circle :plain="true" @click="deleteImg(item)"></el-button>
              </div>
              <el-image :src="item.imgUrl" fit="cover" lazy :preview-src-list="bigImgList"></el-image>
              <span :style="{ position: 'relative', 'font-size': '0.7vw' }">{{ item.imgName }}</span>
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
      loading: true,
      bigImgList: []
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
      this.imgList = res.data.list
      for (let i of this.imgList) {
        this.bigImgList.push(i.imgUrl)
      }
    },
    async upload() {
      const formData = new FormData()
      const file = this.fileList[0]
      formData.append('image', file.raw)
      let res2 = await upload(formData)
      if (res2.data.status !== 700) {
        this.getImgs()
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传文件格式错误，请检查')
      }
      this.$refs.upload.clearFiles()
    },
    sbb(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    beforeUpload(file) {
      const isJPG = file.type.split('/')[0] === 'image'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('只能上传图片')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
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
