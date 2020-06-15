<template>
    <div class="todos-container">
        <el-tag type="danger" size="medium" class="limit-tag">締め切り24時間以内</el-tag>
        <div class="limit-today">
            <Todo />
            <Todo /> 
            <Todo /> 
            <Todo />
        </div>
        <el-tag type="warning" class="limit-tag">締め切り3日以内</el-tag>
        <div class="limit-3days_after">
            <Todo /> 
            <Todo /> 
        </div>
        <el-tag type="info" class="limit-tag">締め切り1週間以内</el-tag>
        <div class="limit-1week_after">
            <Todo /> 

        </div>
        <el-tag type="success" class="limit-tag">まだまだ余裕!</el-tag>
        <div class="limit-more_than">
            <Todo /> 
            
        </div>
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

     .limit-tag{
        font-size: 24px;
        border-radius: 15px;
        padding: 6px;
        height: auto;
    }
    .todos-container{
        padding-left:   10px;
        padding-bottom: 20px;
        display: inline-block;
        text-align: center;
        width: 100%;
    }

</style>