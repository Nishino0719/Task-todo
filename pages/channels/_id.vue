<template>
  <div class="container">
      <div class="todos-title_container">
        <h3 class="channel-name">{{channel}}</h3>
        <el-link type="primary" class="top-link" href="/" :underline="false">TOPへ</el-link>
        <img  v-if="isAuthenticated" :src="user.photoURL"  class="thumnail">
        <el-popconfirm @onConfirm="logout" confirmButtonText='はい' cancelButtonText='いいえ' icon="el-icon-info"  title="本当にログアウトしますか">
            <el-button slot="reference" size="mini" v-if="isAuthenticated" type="info" class="logout" plain>ログアウト</el-button>
        </el-popconfirm>
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
          channel:[],
          channelName:[],
          visible: false,
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
      const docRef = db.collection('channels').doc(channelId)
      docRef.get().then((doc)=>{
        if(doc.exists){
          this.channel.push(doc.data().name)
        }
        })
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
  background: #d0d0d0;
}

  .todos-title_container{
    height: 10vh;
    display: flex;
  }
  .item{
    margin: 20px;
  }

.channel-name{
  margin: 30px;
  margin-top: 20px; 
}
.top-link{
  text-align: center;
}
.logout{
  margin-left:30px;
  position: absolute;
  right: 5px;
  margin-top: 36px;
  
}
  .thumnail{
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin-top: 5px;
    position: absolute;
    right: 40px;
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
