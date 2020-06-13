<template>
  <div class="app-layout">
    <div class="sidebar">
      <el-radio-group v-model="isCollapse">
        <el-button class="btn-col" :label="false" icon="el-icon-d-arrow-left" circle @click="isCollapse = !isCollapse" v-bind:class="{isCollapse: isCollapse}"></el-button>
      </el-radio-group>
      <div class="sidebar-down">
      <el-menu default-active="2" class="" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span slot="title">タスクを確認</span>
          </template>
        <el-submenu index="1-1">
          <span slot="title">大学関係</span>
        </el-submenu>
          <el-submenu index="1-2">
            <span slot="title">開発</span>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">設定</span>
        </el-menu-item>
      </el-menu>
      </div>
    </div>
    <div class="main-content">  
      <nuxt />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'

locale.use(lang)
Vue.use(ElementUI)
export default {
  data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    }
}
</script>

<style>
html {
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.app-layout {
 display: flex;
}

.btn-col{
  margin-left: 10px;
}


.isCollapse{
  transform: rotateZ(180deg);

}

.sidebar {
  width: auto;
  /* height: 100vh; */
}

.main-content {
 width: 100%;
 /* background: #f2f2f2; */
 /* height: 100vh; */
}


</style>
