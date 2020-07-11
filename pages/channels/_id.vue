<template>
  <div class="container">
      <div class="todos-title_container">
        <!-- <el-badge :value="12" class="item"  type="primary">
          <el-tag size="medium" type="danger" effect="plain" class="subject-tag">情報通信工学実験</el-tag>
        </el-badge>
        <el-badge :value="5" class="item"  type="primary">
          <el-tag size="medium" type="info" effect="plain" class="subject-tag">確率統計</el-tag>
        </el-badge> -->
        <h2>{{channel.name}}</h2>
        <img  v-if="isAuthenticated" :src="user.photoURL"  class="thumnail">
             <p class="logout" v-if="isAuthenticated"  v-on:click="logout">ログアウト</p>
      </div>
      <div class="todos-container">
        <Todos :tasks="tasks"/>
      </div>
      <div  class="add-todo_container">
        <AddTodo />
      </div>
  </div>
</template>

<script>
import Todos from '~/components/Todos.vue'
import AddTodo from '~/components/AddTodo.vue'
import {db,firebase} from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  components: {
    AddTodo,
    Todos
  },
  data(){
      return {
          tasks: [],
          channel:{},
          channelName:''
      }
  },
  mounted(){
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('tasks').orderBy('deadline').onSnapshot((snapshot)=>{
          snapshot.docChanges().forEach((change)=>{
              const doc = change.doc
              const oldIndex = change.oldIndex
              const newIndex = change.newIndex
              if(change.type === 'added'){
                   this.tasks.push({id: doc.id, ...doc.data()})
              }if(change.type === 'modified'){
                    this.tasks.splice(oldIndex,1)
                    this.tasks.splice(newIndex, 0, doc.data())
              }if(change.type === 'removed'){
                    this.tasks.splice(oldIndex,1)
              }
          })
      })
      // const docRef = db.collection('channels').doc(channelId)
      // docRef.get().then(function(doc) {
      //   if (doc.exists) {
      //       console.log("ドキュメントでーた:", doc.data().name)
      //       this.channel.push({id: doc.id, ...doc.data()})
      //   } else {
      //       // doc.data() will be undefined in this case
      //       console.log("ドキュメントが存在しません")
      //       }
      //   }).catch(function(error) {
      //       console.log("Errorだよーんwwww:", error)
      //   })
        },
        computed:{
          isAuthenticated() {
              return this.$store.getters.isAuthenticated
          },
          user() {
             return this.$store.state.user
           },
        },
        methods:{
          ...mapActions(['setUser']),
          logout() {
              firebase.auth().signOut()
                .then(() => {
                  this.setUser(null)
                  window.alert('ログアウトに成功！')
                })
                .catch((e) => {
                  window.alert('ログアウトに失敗しました')
                  console.log(e)
                })
            }
        }
}
</script>

<style>

.container{
  background: #d0d0d0;
}

  .todos-title_container{
    height: 10vh;
    display: flex;
  }
  .item{
    margin: 20px;
  }

  .thumnail{
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: 10px;
    position: absolute;
    right: 10px;
  }

  .todos-container{
    height: 70vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .add-todo_container{
    min-height: 30vh;
  }

  .todo-side{
    width: 140px;
    background: #fafafa;
  }

  .todo-main{
    width: 100%;
  }
</style>
