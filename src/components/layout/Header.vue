<template>
  <header>
    <el-row justify="space-between" type="flex">
      <el-col class="header-left" :xs="12" :sm="12" :lg="12" :md="12">
        <div class="logo-icon hidden-xs-and-down" @click="isC" v-loading.fullscreen.lock="fullscreenLoading">
          <i v-show="!isCollapse" class="el-icon-s-fold"></i>
          <i v-show="isCollapse" class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">日记管理系统</div>
        <span class="isPlaymusic hidden-sm-and-down" @click="audioPlay">
          <i v-show="playMusic" class="el-icon-video-play"></i>
          <i v-show="!playMusic" class="el-icon-video-pause"></i>
        </span>
      </el-col>
      <audio id="audio" src="http://119.91.27.40:4000/audio/zty.mp3"></audio>
      <div class="header-right hidden-xs-and-down" :xs="3">
        <div class="header-user-con">
          <div class="btn-fullscreen hidden-xs-only" @click="clickFullscreen">
            <i class="el-tooltip el-icon-rank"></i>
          </div>
          <div class="btn-bell hidden-xs-only">
            <i class="el-icon-bell"></i>
          </div>

          <!-- <div class="user-name el-dropdown" trigger="click"> -->
          <el-dropdown trigger="click">
            <div class="user-name">
              <div class="user-avatar">
                <el-avatar size="medium" :src="userInfo.avatarUrl"></el-avatar>
              </div>
              <span class="el-dropdown-link hidden-xs-only"> {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goRegister">注册账号</el-dropdown-item>
              <el-dropdown-item @click.native="exitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- </div> -->
        </div>
      </div>
    </el-row>
  </header>
</template>

<script>
import screenfull from 'screenfull'
import { getUserInfo } from '../../api/index'
// import bus from './bus'
export default {
  name: 'VHeader',
  data() {
    return {
      playMusic: true,
      fullscreenLoading: false,
      // userId:JSON.parse(this.$Base64.decode(this.$route.params.info)).userId,
      userInfo: {},
      // isCollapse: false,
      isFullscreen: false
      // screenWidth:document.body.clientWidth
    }
  },
  props: {},
  components: {},
  async created() {
    // //页面初始化获取页面的宽度,小于500 show为true
    // this.screenWidth = document.body.clientWidth
    // if (this.screenWidth < 768) {
    //   this.isCollapse = true
    // } else {
    //   this.isCollapse = false
    // }
    let res = await getUserInfo()
    this.userInfo = res.data
    let getUserRole = this.userInfo.authority === 1 ? 'admin' : 'user'
    localStorage.setItem('UserRole', getUserRole)
    this.$store.commit('changeUserName', this.userInfo.username)
  },
  mounted() {
    this.ssWidth = document.documentElement.clientWidth
    if (this.ssWidth < 900) {
      // this.isCollapse = true
      this.$store.commit('openIsc')
    }
    this.watchWidth()
  },
  methods: {
    isC() {
      // this.isCollapse = !this.isCollapse;
      this.$store.commit('changeIsc')

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 300)
      // bus.$emit('collapse',this.isCollapse)
    },
    clickFullscreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    exitLogin() {
      localStorage.clear()
      this.$router.replace({ path: '/login' })
    },
    goRegister() {
      this.$router.replace('/Register'), console.log('111')
    },
    audioPlay() {
      let audio = document.getElementById('audio')
      audio.muted = false
      this.playMusic = !this.playMusic
      if (this.playMusic == false) {
        audio.play()
      } else {
        audio.pause()
      }
    },
    closeCollapse() {
      // this.isCollapse = true
      this.$store.commit('openIsc')
    },
    openCollapse() {
      // this.isCollapse = false
      this.$store.commit('closeIsc')
    },
    watchWidth() {
      window.onresize = () => {
        window.screenWidth = window.innerWidth
        this.screenWidth = window.screenWidth
        return (() => {
          if (this.screenWidth < 900) {
            this.closeCollapse()
          } else if (this.screenWidth > 900) {
            this.openCollapse()
          }
        })()
      }
    }
  },
  // watch: {
  //   // 监听浏览器窗口宽度,当浏览器窗口小于500时,显示详情
  //   screenWidth(val) {
  //     if (val < 768) {
  //       this.isCollapse = false
  //       console.log(111)
  //     } else {
  //       this.isCollapse = true
  //     }
  //   }
  // },
  computed: {
    isCollapse: {
      get() {
        return this.$store.state.isCollapse
      },
      set() {}
    }
  }
}
</script>

<style scoped>
.user-name {
  display: flex;
  align-items: center;
}
</style>
