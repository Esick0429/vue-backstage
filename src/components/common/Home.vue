<template>
  <div class="home">
    <div class="HeaderContainer"><vHeader></vHeader></div>
    <!-- <div class="Tag"><v-tag></v-tag></div> -->
    <div class="content">
      <div class="AsideContainer"><vAside></vAside>
      </div>
       
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

  import vHeader from './Header';
  import vAside from './Aside';
  // import vTag from './Tags';
  // import vTag from './tag'
// console.log(params)
export default {
  name: 'Home',
  components: {
    vAside,
    vHeader,
    // vTag
  },
  data (){
    return{
     
    }
  },
  methods: {
      audioAutoPlay() {
      let audio = document.getElementById("audio");
      console.log(audio.muted);
      audio.play();
      console.log(audio.muted);
      audio.muted = true;
      console.log(audio.muted);
      document.removeEventListener("touchstart", this.audioAutoPlay)
        

    }
    
  },
  mounted(){
    // console.log(JSON.parse(this.$Base64.decode(this.$route.params.info)).userId)
   
  }
}
</script>