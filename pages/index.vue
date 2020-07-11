<template>
  <div class="container">
    <h2>ようこそ</h2>
    <p>初めてですか？初めての方はこちらから説明を読んでね</p>
  <button v-on:click="login">Googleアカウントでログイン</button>
  <img  v-if="isAuthenticated" :src="user.photoURL"  class="thumnail">
  </div>
</template>

<script>
// import {db} from '~/plugins/firebase'
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
    }
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
    width: 50px;
    height: 50px;
    margin-top: 10px;
    position: absolute;
    right: 10px;
}

</style>
