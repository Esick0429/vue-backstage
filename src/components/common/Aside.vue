<template>
  <el-container>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="isCollapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        
    </div>
    <el-main>
          <v-tag></v-tag>
          <router-view/>
          </el-main>
  </el-container>
</template>


<script>

import bus from './bus';
 import vTag from './Tags';
export default {
  title: '',
  components: {
  vTag
  },
  data() { 
    return {
      isCollapse:false,
      items: [
                {
                    icon: 'el-icon-s-order',
                    index: 'rc',
                    title: '日常行程'
                },
                {
                    icon: 'el-icon-eleme',
                    index: 'cc',
                    title: '川菜'
                },
                {
                    icon: 'el-icon-eleme',
                    index: 'yc',
                    title: '粤菜'
                },
                {
                    icon: 'el-icon-s-order',
                    index: '3',
                    title: '表单相关',
                    subs: [
                        {
                            index: 'from',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: '404',
                                    title: '404页面'
                                },
                                {
                                    index: '500',
                                    title: '500页面'
                                }
                            ]
                        },
                    ]
                },
                {
                    icon: 'el-icon-eleme',
                    index: 'xc',
                    title: '湘菜'
                },
                {
                    icon: 'el-icon-eleme',
                    index: 'jzc',
                    title: '江浙菜'
                },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-position',
                    index: 'ditu',
                    title: '地图'
                },
                {
                     icon: 'el-icon-headset',
                    index: 'music',
                    title: '盗版云音乐'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '其他',
                    subs: [
                        {
                            icon: 'el-icon-headset',
                            index: 'music',
                            title: '盗版云音乐'
                        },
                        {
                            index: 'Permission',
                            title: '权限测试',
                        }
                    ]
                },
            ]
    }
  },
  props: {

  },
  created(){
    bus.$on('collapse', msg => {
      this.isCollapse = msg;
    });
  },
  mounted() {

  },
  methods:{
    
  },
  computed:{
    onRoutes() {
            return this.$route.path.replace('/', '');
        }
  }
 }
</script>

<style scoped>
</style>