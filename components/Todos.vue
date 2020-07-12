<template>
    <div class="todos-component">
        <div class="todo-component" v-bind:key="task.key" v-for="task in tasks">
            <div v-if="user.uid === task.user.uid">
                <!-- <el-tag type="danger" size="medium" class="limit-tag" v-if="task.deadline - now <= 60 * 60 * 24 * 1">締め切り24時間以内</el-tag> -->
                    <div  v-if="task.deadline - now <= 60 * 60 * 24 * 1">
                        <Todo :task="task"/>
                    </div>
                <!-- <el-tag type="warning" class="limit-tag" v-if="task.deadline - now <= 60 * 60 * 24 * 3 && task.deadline - now > 60 * 60 * 24 * 1">締め切り3日以内</el-tag> -->

                <Todo v-if="task.deadline - now <= 60 * 60 * 24 * 3 && task.deadline - now > 60 * 60 * 24 * 1" :task="task" />
              
                <!-- <el-tag type="info" class="limit-tag" v-if="task.deadline - now <= 60 * 60 * 24 * 7 && task.deadline - now > 60 * 60 * 24 * 3 " >締め切り1週間以内</el-tag> -->
            
                        <Todo  v-if="task.deadline - now <= 60 * 60 * 24 * 7 && task.deadline - now > 60 * 60 * 24 * 3 " :task="task" />
                    
                <!-- <el-tag type="success" class="limit-tag" v-if="60 * 60 * 24 * 7 < task.deadline - now">まだまだ余裕!</el-tag> -->
                
                    <Todo v-if="60 * 60 * 24 * 7 < task.deadline - now" :task="task"/>            
                
            </div>
        </div>
    </div>
</template>

<script>  
import Todo from '~/components/Todo.vue'
import {db,firebase} from '~/plugins/firebase'
import { mapActions } from 'vuex'
export default {
    props: ['channel'],
    props: ['tasks'],
    components:{
        Todo
    },
    data(){
        return{
            now: Math.trunc((new Date()).getTime() / 1000),
        }
    },
    methods:{
        ...mapActions(['setUser']),
    },
    mounted(){
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setUser(user)
        //   console.log('今のアカウントはTodos', this.user.uid)
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