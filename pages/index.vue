<template>
  <div class="container">
  <img  v-if="isAuthenticated" :src="user.photoURL"  class="thumnail">
  <el-popconfirm @onConfirm="logout" confirmButtonText='はい' cancelButtonText='いいえ' icon="el-icon-info"  title="本当にログアウトしますか">
    <el-button slot="reference" size="mini" v-if="isAuthenticated" class="logout" plain>ログアウト</el-button>
  </el-popconfirm>
  <button v-on:click="login">Googleアカウントでログイン</button>


  <img src="~/assets/image/demo.png" class="img-demo">
  </div>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  components: {
  },
  computed:{
      isAuthenticated() {
          return this.$store.getters.isAuthenticated
      },
      user() {
       return this.$store.state.user
      },
  },
  // mounted(){
  //   console.log(this.$store.state.user)
  // },
  methods:{
    ...mapActions(['setUser']),
    login(){
     const provider = new firebase.auth.GoogleAuthProvider()
     firebase.auth().signInWithPopup(provider)
            .then((result) => {
         const user = result.user
          this.setUser(user)
          console.log(this.$store.state.user)
       }).catch((error) => {
         window.alert(error)
       })
    },
          logout:function(){
              firebase.auth().signOut()
                .then(() => {
                  this.setUser('')
                  this.$message({
                    message: 'ログアウトに成功しました！',
                    type: 'success'
                  })
                })
                .catch((e) => {
                  this.$message({
                    message: 'ログアウトに失敗しました',
                    type: 'danger'
                  })
                })
                
            },
  }
}
</script>

<style>

.container{
  background:#d0d0d0;
  height: 100vh;
}

  .thumnail{
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin-top: 5px;
    position: absolute;
    right: 40px;
  }

.img-demo{
  margin-top: 100px;
  width: 100vw;
}
.logout{
  margin-left:30px;
  position: absolute;
  right: 5px;
  margin-top: 36px;
}

</style>
