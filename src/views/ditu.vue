<template>
  <div class="amap-page-container">
    <div :style="{width:'100%',height:'80vh'}">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>
    </div>
    <div id="info">
        <span v-if="loaded">
          location: lng = {{ lng }} lat = {{ lat }}
        </span>
      <span v-else>正在定位</span>
    </div>
    
  </div>
</template>
<script>
 export default {
        data(){
          const self = this;
          return {
            center: [114.055235, 22.543778],
            lng: 0,
            lat: 0,
            loaded: false,
            plugin: [{
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 100,          //超过10秒后停止定位，默认：无穷大
              maximumAge: 0,           //定位结果缓存0毫秒，默认：0
              convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true,        //显示定位按钮，默认：true
              buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
              showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
              extensions:'all',
              pName: 'Geolocation',
              events: {
                init(o) {
                  // o 是高德地图定位插件实例
                  o.getCityInfo((status, result) => {
                    console.log(result)
                       if (status === 'complete' && result.info === 'SUCCESS') {
                           console.log('通过ip获取当前城市：',  result.bounds);
                            if (result && result.city && result.bounds) {
                                var cityinfo = result.city;
                                var citybounds = result.center;
                                document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo+'<br>坐标为：'+'北纬：'+citybounds[0]+'东经：'+citybounds[1];
                                //地图显示当前城市
                            
                            }
                        } else {
                            document.getElementById('info').innerHTML = result.info;
                        }
                                
                    // console.log(result)
                    // if (result && result.position) {
                    //     self.load = result.city;
                    //     self.lng = result.center[0];
                    //     self.lat = result.center[1];
                    //     self.center = [self.lng, self.lat];
                    //     self.loaded = true;
                    //     self.$nextTick();
                    // document.getElementById('info').innerHTML = '您当前所在城市：'+self.lng;
                    // }
                  });
                }
              },
              
            }]
          }
        },
   }
</script>
<style>
  .amap-demo {
    height: 300px;
  }
</style>