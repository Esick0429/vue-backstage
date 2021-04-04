<template>
   <header >
     <el-row justify="space-between" type="flex">
     <el-col class="header-left " :xs='12' :sm='12' :lg='12' :md='12' >
      <div class="logo-icon hidden-xs-and-down" @click="isC" v-loading.fullscreen.lock="fullscreenLoading">
        <i v-show="!isCollapse" class="el-icon-s-fold"></i>
        <i v-show="isCollapse" class="el-icon-s-unfold"></i>
      </div>
      <div class="logo">菜单管理系统</div>
      <span class="isPlaymusic hidden-sm-and-down"
       @click="audioPlay">
        <i v-show="playMusic" class="el-icon-video-play"></i>
        <i v-show="!playMusic" class="el-icon-video-pause"></i>
      </span>
     </el-col>
      <audio  id="audio" :src="require('../../assets/audio/给我一首歌的时间-周杰伦.mp3')" ></audio>
      <div class="header-right hidden-xs-and-down" :xs='3'>
        <div class="header-user-con">
          <div class="btn-fullscreen hidden-xs-only" @click='clickFullscreen'>
            <i class="el-tooltip el-icon-rank"></i>
          </div>
          <div class="btn-bell hidden-xs-only">
            <i class="el-icon-bell"></i>
          </div>
          <div class="user-avatar">
            <img src="../../assets/img/user-avatar.jpg">
          </div>
          <!-- <div class="user-name el-dropdown" trigger="click"> -->
          <el-dropdown trigger="click" class="user-name hidden-xs-only ">
            <span class="el-dropdown-link">
              {{userId}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="exitLogin">切换账号</el-dropdown-item>
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
import screenfull from 'screenfull';
import bus from './bus'
export default {
  name: 'vHeader',
  data() { 
    return {
      playMusic:true,
      fullscreenLoading: false,
      userId:JSON.parse(this.$Base64.decode(this.$route.params.info)).userId,
      // userId:this.$route.params.info,
      isCollapse: false,
      isFullscreen: false,
    }
  },
  props: {

  },
  components:{
  },
  mounted() {
  //   let winWidth = document.documentElement.clientWidth;
  //   if(winWidth>=768 && winWidth<=999){ 
  //   window.onresize = () => {
  //     return (() => {
  //      this.isC()
  //     })()
  //   }
  //   }
  },
  methods:{
      isC(){
      this.isCollapse = !this.isCollapse;
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 300);
        bus.$emit('collapse',this.isCollapse)
    },
    clickFullscreen(){
        if (!screenfull.isEnabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },
      exitLogin(){
        this.$router.replace('/login'),
        console.log('111')
      },
       audioPlay() {
      let audio = document.getElementById("audio"); 
      audio.muted = false;
      this.playMusic = !this.playMusic;
      if(this.playMusic == false){
        audio.play()
      }else{
        audio.pause()
      }
    }
  },
 }
</script>

<style scoped>
</style>