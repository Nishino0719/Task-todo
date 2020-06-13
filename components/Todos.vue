<template>
    <div class="todos-container">
            <Todo />
            <Todo /> 
            <Todo /> 
            <Todo /> 
            <Todo /> 
            <Todo /> 
    </div>
</template>

<script>
import Todo from '~/components/Todo.vue'
export default {
    components:{
        Todo
    }
}
</script>

<style scoped>
    .todos-container{
        margin-left: 30px;
    }

</style>