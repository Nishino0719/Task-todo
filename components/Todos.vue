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

<style>
    .todos-container{
        padding-left: 30px;
        padding-bottom: 20px;
        height: 20vw;
    }

</style>