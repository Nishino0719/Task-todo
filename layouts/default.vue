<template>
  <div class="">
    <div class="app-layout">
      <div class="sidebar">
        <el-radio-group v-model="isCollapse">
          <el-button class="Collapse-btn" :label="false" icon="el-icon-d-arrow-left" circle @click="isCollapse = !isCollapse" v-bind:class="{isCollapse: isCollapse}"></el-button>
        </el-radio-group>
        <div class="sidebar-down">
        <el-menu default-active="2" class="" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-refresh"></i>
              <span slot="title">タスク切り替え</span>
            </template>
            <el-menu-item-group>
              <span slot="title">君かっこいいね</span>
              <el-menu-item index="1-1"  @click="isCollapse = true" >大学</el-menu-item>
              <el-menu-item index="1-2"  @click="isCollapse = true" >開発</el-menu-item>
              <el-menu-item index="1-3"  @click="isCollapse = true" >仕事</el-menu-item>
              <el-menu-item index="1-4"  @click="isCollapse = true" >プライベート</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
              <i class="el-icon-question"></i>
              <span slot="title">使い方</span>
          </el-menu-item>
          <el-menu-item index="3">
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

    <div class="footer-container">
      <i class="el-icon-location">福岡県飯塚市</i>
      <i class="el-icon-s-promotion">お問い合わせはこちら</i>
      <i class="el-icon-share">シェアする</i>

      <p>&copy;2020 Nishino</p>
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
}

.app-layout {
 display: flex;
}

.Collapse-btn{
  margin-left: 10px;
  margin-top: 15px;
}


.isCollapse{
  transform: rotateZ(180deg);

}

.sidebar {
  height: 90vh;
}

.main-content{
  height: 90vh;
  width: 100%;
}

.footer-container{
  text-align: center;
  position: fixed;
  height: 10vh;
  width: 100%;
  background-color: #2d3e50;
  color: #fafafa;
}


</style>
