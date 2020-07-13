<template>
  <div class="container">
      <div class="todos-title_container">
        <div class="title-container">
          <h3 class="channel-name">{{channel}}</h3>
          <el-link type="primary" class="top-link" href="/" :underline="false">TOPへ</el-link>
        </div>
        <div class="tags-container">
          <div v-bind:key="tag.key" v-for="tag in tags">
              <el-tag  v-if="user.uid === tag.user.uid" class="subject-tag" size="medium" type="primary" effect="plain" closable   :disable-transitions="false" @close="deleteTag(tag)">{{tag.tag}}</el-tag>
          </div>
        </div>
        <div class="account-container">
          <img  v-if="isAuthenticated" :src="user.photoURL"  class="thumnail">
          <el-popconfirm @onConfirm="logout" confirmButtonText='はい' cancelButtonText='いいえ' icon="el-icon-info"  title="本当にログアウトしますか">
              <el-button slot="reference" size="mini" v-if="isAuthenticated" type="info" class="logout" plain>ログアウト</el-button>
          </el-popconfirm>
        </div>
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
          tags:[],
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
      /
      db.collection('channels').doc(channelId).collection('tags').onSnapshot((snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
          const doc = change.doc
          const oldIndex = change.oldIndex
          if(change.type === 'added'){
            this.tags.push({id: doc.id, ...doc.data()})
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
          deleteTag(tag){
            const channelId = this.$route.params.id
            const tagId = tag.id
            console.log(tag)
            db.collection("channels").doc(channelId).collection('tags').doc(tagId).delete()
              this.tags.splice(this.tags.indexOf(tag),1)
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
  background: #d0d0d0;
}

  .todos-title_container{
    height: 10vh;
    display: flex;
  }
  .item{
    margin: 20px;
  }
.title-container{
  display: flex;
}
.channel-name{
  margin: 30px;
  margin-top: 20px; 
  width: 160px;
}

.top-link{
  text-align: center;
}
@media screen and (max-width: 480px){
    .title-container{
      display:block;
      width: 80px;
    }
    .channel-name{
        margin: 10px;
        margin-top: 20px; 
        font-size: 10px;
        width: 100px;
    }
    .top-link{
      font-size: 10px;
      width: 50px;
    }
}
.tags-container{
  width: 60vw;
  display: flex;
  overflow-x: scroll;
  margin-left: 10px;
  margin-right: 10px;
}

@media screen and (max-width: 480px){
  .tags-container{
    width: 170px;
    display: flex;
    overflow-x: scroll;
    margin-left: 10px;
    margin-right: 10px;
  }
}
.account-container{
  width: 15vw;
}

.subject-tag{
  margin:20px 15px; 
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
@media screen and (max-width: 480px){
  .account-container{
    position: relative;
    left: 20px;
  }
  .logout{
    margin-top: 36px;
    font-size: 10px;
  }
  .thumnail{
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin-top: 5px;
  }
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
