<template>
  <div class="container">
      <div class="todos-title_container">
          <h3>大学</h3>
        <el-badge :value="12" class="item"  type="primary">
          <el-tag size="medium" type="danger" effect="plain" class="subject-tag">情報通信工学実験</el-tag>
        </el-badge>
        <el-badge :value="5" class="item"  type="primary">
          <el-tag size="medium" type="info" effect="plain" class="subject-tag">確率統計</el-tag>
        </el-badge>
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
          tasks: []
      }
  },
  mounted(){
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('tasks').get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) =>{
              this.tasks.push({id: doc.id, ...doc.data()})
          })
        //   console.log(this.tasks)
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

  .todos-title_container img{
    border-radius: 10px;
    width: 90px;
    margin-left: 47%;
  }

  .todos-container{
    height: 40vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .add-todo_container{
    height: 40vh;
  }

  .todo-side{
    width: 140px;
    background: #fafafa;
  }

  .todo-main{
    width: 100%;
  }
</style>
