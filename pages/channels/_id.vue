<template>
  <div class="container">
      <div class="todos-title_container">
          <h2>{{channel.name}}</h2>
          <h2>ｱﾊﾊﾊﾊ</h2>
        <!-- <el-badge :value="12" class="item"  type="primary">
          <el-tag size="medium" type="danger" effect="plain" class="subject-tag">情報通信工学実験</el-tag>
        </el-badge>
        <el-badge :value="5" class="item"  type="primary">
          <el-tag size="medium" type="info" effect="plain" class="subject-tag">確率統計</el-tag>
        </el-badge> -->
        <img src="https://pbs.twimg.com/profile_images/1238812638387163136/xVj9-uVR_400x400.jpg" alt="thumnail" class="thumnail">
      </div>
      <div class="todos-container">
        <Todos :tasks="tasks"/>
      </div>
      <div class="add-todo_container">
        <AddTodo />
      </div>
  </div>
</template>

<script>
import Todos from '~/components/Todos.vue'
import AddTodo from '~/components/AddTodo.vue'
import {db} from '~/plugins/firebase'

export default {
  components: {
    AddTodo,
    Todos
  },
  data(){
      return {
          tasks: [],
          channel:[]
      }
  },
  mounted(){
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('tasks').orderBy('deadline').onSnapshot((snapshot)=>{
          snapshot.docChanges().forEach((change)=>{
              const doc = change.doc
              if(change.type === 'added' || change.type === 'removed'){
                   this.tasks.push({id: doc.id, ...doc.data()})
              }
          })
      })
      const docRef = db.collection('channels').doc(channelId)
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("ドキュメントでーた:", doc.data().name)
            this.channel.push({id: doc.id, ...doc.data()})
            console.log('ohyes',this.channel)
           
        } else {
            // doc.data() will be undefined in this case
            console.log("ドキュメントが存在しません")
            }
        }).catch(function(error) {
            console.log("Errorです:", error)
        })
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
    min-height: 10vh;
  }

  .todo-side{
    width: 140px;
    background: #fafafa;
  }

  .todo-main{
    width: 100%;
  }
</style>
