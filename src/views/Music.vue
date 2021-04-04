<template>
<div id="app">
  <el-main>
    <el-container class="wrap">
    <div class="play_wrap" id="player">
      <div class="search_bar">
        <h2 style="color:white" >😄土狗播放器</h2>
        <!-- 搜索歌曲 -->
        <div class="musicName" v-show="isShow">歌名：{{musicName}}</div>
        <input type="text" autocomplete="off" v-model='query' @keyup.enter="searchMusic();" />
      </div>
      <div class="center_con">
        <!-- 搜索歌曲列表 -->
        <div class='song_wrapper' ref='song_wrapper'>
          <ul class="song_list">
            <li v-for="(item,i) in musicList" :key="i">
              <!-- 点击放歌 -->
              <a href="javascript:;" @click='playMusic(item.id)'></a>
              <b>{{item.name}}</b>
              <span>
                <i @click="playMv(item.mvid)" v-if="item.mvid!=0"></i>
              </span>
            </li>
          </ul>
        </div>
        <!-- 歌曲信息容器 -->
        <div class="player_con" :class="{playing:isPlay}">
          <img src="../assets/img/player_bar.png" class="play_bar" />
          <img src="../assets/img/disc.png" class="disc autoRotate" >
          <!-- 黑胶碟片 -->
         <img :src="coverUrl==''?'./assets/img/cover.png':coverUrl" class="cover autoRotate" />

        </div>
        <!-- 评论容器 -->
        <div class="comment_wrapper" ref='comment_wrapper'>
          <h5 class='title'>热门留言</h5>
          <div class='comment_list'>

            <dl v-for="(item,i) in hotComments" :key="i">
              <dt>
                <img :src="item.user.avatarUrl" alt="" />
              </dt>
              <dd class="name">{{item.user.nickname}}</dd>
              <dd class="detail">
                {{item.content}}
              </dd>
            </dl>
          </div>
          <img src="../assets/img/line.png" class="right_line">
        </div>
      </div>
      <div class="audio_con">
        <audio ref='audio' @play="play" @pause="pause" :src="musicUrl" controls autoplay loop class="myaudio"></audio>
      </div>
      <div class="video_con" v-show="showVideo">
        <video ref='video' :src="mvUrl" controls="controls"></video>
        <div class="mask" @click="closeMv"></div>
      </div>
    </div>
    </el-container>
  </el-main>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: '',
  data() { 
    return {
       // 搜索关键字
        query: '',
        // 歌曲列表
        musicList: [],
        //歌曲名字
        musicName:'',
        // 歌曲url
        musicUrl: '',
        // 是否正在播放
        isPlay: false,
        // 歌曲热门评论
        hotComments: [],
        // 歌曲封面地址
        coverUrl: '',
        // 显示视频播放
        showVideo: false,
        // mv地址
        mvUrl: '',
        isShow:false
    }
  },
  props: {

  },
  components:{
  },
  mounted() {

  },
   methods: {
        // 搜索歌曲
        searchMusic() {
          if (this.query == 0) {
            return
          }
          axios.get('/search?keywords=' + this.query).then(response => {
            // 保存内容
            this.musicList = response.data.result.songs;
            console.log(this.musicList)
          })
        
          // 清空搜索
          this.query = ''
        },
        // 播放歌曲
        playMusic(musicId) {
          
          // this.musiuName =  this.musiuName.filter(this.musiuN)
          // 获取歌曲url
          axios.get('/song/url?id=' + musicId).then(response => {
            // 保存歌曲url地址
            this.musicUrl = response.data.data[0].url;
            // console.log(musicName)
          })
          // 获取歌曲热门评论
          axios.get('/comment/hot?type=0&id=' + musicId).then(response => {
            // console.log(response)
            // 保存热门评论
            this.hotComments = response.data.hotComments
            // console.log(musicName)
          })
          // 获取歌曲封面
          axios.get('/song/detail?ids=' + musicId).then(response => {
            console.log(response)
            // 设置封面
            this.coverUrl = response.data.songs[0].al.picUrl
            // console.log(musicName)
            this.musicName =  response.data.songs[0].al.name
          })
          this.isShow = !this.isShow
        },
        // audio的play事件
        play() {
          this.isPlay = true
          // 清空mv的信息
          this.mvUrl = ''
        },
        // audio的pause事件
        pause() {
          this.isPlay = false
        },
        // 播放mv
        playMv(vid) {
          if (vid) {
            this.showVideo = true;
            // 获取mv信息
            axios.get('/mv/url?id=' + vid).then(response => {
              // console.log(response)
              // 暂停歌曲播放
              this.$refs.audio.pause()
              // 获取mv地址
              this.mvUrl = response.data.data.url
            })
          }
        },
        // 关闭mv界面
        closeMv() {
          this.showVideo = false
          this.$refs.video.pause()
        },
        // 搜索历史记录中的歌曲
        historySearch(history) {
          this.query = history
          this.searchMusic()
          this.showHistory = false;
        }
     },
 }
</script>

<style scoped>
@import '../assets/css/music.css';
</style>