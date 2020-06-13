<template>
  <div class="container">

      <div class="todos-container">
        <Todos />
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
  .todos-container{
    height: 55vh;
    overflow: scroll;
  }

  .add-todo_container{
    height: 45vh;
  }

  .todo-side{
    width: 140px;
    background: #fafafa;
  }

  .todo-main{
    width: 100%;
    background: #f2f2f2;
  }
</style>
