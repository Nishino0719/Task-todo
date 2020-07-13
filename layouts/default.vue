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
              <span slot="title">チャンネル切り替え</span>
            </template>
            <el-menu-item-group>
              <span slot="title">チャンネルを選んでください</span>
              <el-menu-item v-bind:key="channel.id" v-for="channel in channels" index="1-1" >
                <nuxt-link :to="`/channels/${channel.id}`" class="channel" >{{channel.name}}</nuxt-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2"  disabled>
            <span slot="title">チャンネルの追加</span>
            <i class="el-icon-plus"><el-button  type="text" @click="dialogFormVisible = true"></el-button></i>
            
                     <el-dialog title="チャンネルを新しく追加する" :visible.sync="dialogFormVisible">
                        <el-form :model="channelForm">
                          <el-form-item label="">
                            <el-input v-model="channelForm.name" autocomplete="off"></el-input>
                            <h5>あと {{9 - this.channelForm.name.length}}文字</h5>
                          </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                          <el-button slot="reference"  type="text" @click="dialogFormVisible = false">+ 新しいチャンネル</el-button>
                          <el-button  @click="dialogFormVisible= false">キャンセル</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false,submitChannelForm('channelForm')">追加</el-button>
                        </span>
                    </el-dialog>
          </el-menu-item>
          <el-menu-item index="3">
              <i class="el-icon-user"></i>
              <span slot="title">
                <el-link type="primary" href="/" :underline="false">アカウント切り替え</el-link>
              </span>
          </el-menu-item>
          <el-menu-item index="4">
              <i class="el-icon-question"></i>
              <span slot="title">使い方</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-phone"></i>
            <span slot="title">
                <el-link type="primary" href="https://www.notion.so/77b4747df8ec41df807afd978f3d4f17" target="_blank" :underline="false">ご要望</el-link>
            </span>
          </el-menu-item>
          <!-- <el-menu-item index="5"  disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">設定</span>
          </el-menu-item> -->
        </el-menu>
        </div>
      </div>
      <div class="main-content"> 
        <nuxt />
      </div>
    </div>

    <div class="footer-container">
      <i class="el-icon-location">福岡県</i>
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
import {db,firebase} from '~/plugins/firebase'
import { mapActions } from 'vuex'

locale.use(lang)
Vue.use(ElementUI)
export default {
  data() {
      return {
        dialogFormVisible:false,
        // visible:false,
        isCollapse: true,
        channels: [],
        channelForm: {
              name:'',
        },
      };
    },
    methods: {
      ...mapActions(['setUser']),
      submitChannelForm(channelForm){
        if(this.channelForm.name !== '' && this.tagForm.tag.length < 10){
          const channelId = this.$route.params.id
            console.log(this.tagForm.tag.length)
          db.collection('channels').add({
             name: this.channelForm.name,
             })
              this.$message({
                type: 'success',
                message: 'チャンネルが新たに追加されました！リロードしたら適応されます！'
              });
              this.channelForm.tag = ''
        }else if(this.channelForm.name.length > 9){
                this.$message({
                type: 'warning',
                message: 'ごめんなさい！チャンネル名は9文字以内でお願いします！'
              })
        }else if(this.channelForm.name == ''){
              this.$message({
                type: 'warning',
                message: 'チャンネル名を入力してね！'
              })
        }
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    },
    mounted(){
     firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setUser(user)
        }
      }),
    db.collection('channels').get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc) =>{
        this.channels.push({id: doc.id, ...doc.data()})
      })
    })
  },
  computed:{
          isAuthenticated() {
              return this.$store.getters.isAuthenticated
          },
          user() {
             return this.$store.state.user
           },
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

.channel{
  display: block;
}

.main-content{
  height: 90vh;
  width: 100%;
}

.footer-container{
  text-align: center;
  position: fixed;
  /* height: 25vh; */
  height: 100%;
  width: 100%;
  background-color: #2d3e50;
  color: #fafafa;
}


</style>
