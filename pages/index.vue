<template>
  <div class="container">
    <div class="todo-title_container">
            <h2>本庶佑</h2>
            <el-badge :value="2" class="item">
                <el-button size="small">タスク数</el-button>
            </el-badge>
            <img src="https://pbs.twimg.com/profile_images/1238812638387163136/xVj9-uVR_400x400.jpg"  class="thumbnail-container">
        </div>
    <div class="todos-container">
      <todos />
    </div>
    <div class="add-todo_container">
      <AddTodo />
    </div>
  </div>
</template>

<script>
import Todos from '~/components/Todos.vue'
import AddTodo from '~/components/AddTodo.vue'

export default {
  components: {
    AddTodo,
    Todos
  }
}
</script>

<style>

.container{
  background: #f2f2f2;
}
.thumbnail-container{
        width: 50px;
        height: 50px;
        border-radius: 10px;
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

    .todo-title_container{
      margin-left: 30px;
    }
  .todos-container{
    height: 70%;
  }

  .add-todo_container{
    height: 30%;
  }
</style>
