<template>
    <div class="todos-component">
        <el-tag type="danger" size="medium" class="limit-tag">締め切り24時間以内</el-tag>
        <div class="todo-component" v-bind:key="task.key" v-for="task in tasks">
            <!-- v-ifとv-forの併用はできないのでやり方は後で考える -->
           <Todo v-if="task.level === 4" :task="task"/>
        </div>
        <br>
        <el-tag type="warning" class="limit-tag">締め切り3日以内</el-tag>
        <div class="todo-component"  v-bind:key="task.key" v-for="task in tasks">
          <Todo v-if="task.level === 3" :task="task" />
        </div>
        <br>
        <el-tag type="info" class="limit-tag">締め切り1週間以内</el-tag>
            <div class="todo-component" v-bind:key="task.key" v-for="task in tasks">
                <Todo  v-if="task.level === 2" :task="task" />
            </div>
        <br>
        <el-tag type="success" class="limit-tag">まだまだ余裕!</el-tag>
        <div class="todo-component" v-bind:key="task.key"  v-for="task in tasks" >
            <Todo v-if="task.level === 1" :task="task"/>            
        </div>
        <br>
    </div>
</template>

<script>  
import Todo from '~/components/Todo.vue'
import {db} from '~/plugins/firebase'
export default {
    props: ['channel'],
    props: ['tasks'],
    components:{
        Todo
    },
    mounted(){
        console.log(this.tasks)
    }
}
</script>

<style>

     .limit-tag{
        font-size: 12px;
        border-radius: 10px;
        padding: 4px;
        margin-left: auto;
        margin-right: auto;
        height: auto;
        width: 10em;
        display: block;
    }
    .todos-component{
        padding-bottom: 20px;
        text-align: center;
        width: 100%;
    }
    .todo-component{
        display: inline-block;
        margin-bottom: 0px;
    }

</style>