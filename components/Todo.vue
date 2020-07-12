<template>
    <div class="todo-container done-yet" v-bind:class="{done:task.done,dead:dead}">
        <el-popconfirm  v-if="dead === false" @onConfirm="done" cancelButtonText='いや...' confirmButtonText='終わった!' icon="el-icon-loading" iconColor="" title="このタスク終わった！？">
            <el-button  v-if="task.done === false" v-model="checked" type="" icon="el-icon-check" circle size="mini"  slot="reference" class="done-btn"></el-button>
        </el-popconfirm>
            <el-button v-if="task.done === true" v-model="checked" type="success" icon="el-icon-check" circle size="mini"  slot="reference" class="done-btn"></el-button>
        <!-- <el-tag size="medium" type="primary" effect="plain" v-bind:style="`color:${task.color}`">{{task.tag}}</el-tag> -->
        <el-tag size="medium" type="primary" effect="plain">{{task.tag}}</el-tag>
        <el-tag type="danger" v-if="task.deadline - now <= 60 * 60 * 24 * 1">今日中</el-tag>
        <el-tag type="warning" v-if="task.deadline - now <= 60 * 60 * 24 * 3 && task.deadline - now > 60 * 60 * 24 * 1">三日後</el-tag>
        <el-tag type="info" v-if="task.deadline - now <= 60 * 60 * 24 * 7 && task.deadline - now > 60 * 60 * 24 * 3 ">1週間後</el-tag>
        <el-tag type="success" v-if="60 * 60 * 24 * 7 < task.deadline - now">まだ余裕</el-tag>
        <!-- <el-button class="el-icon-edit edit" size="mini" circle type="info"></el-button> -->
        <el-link icon="el-icon-edit edit"></el-link>
        <!-- <EditTodo :task="task" /> -->
        <el-popconfirm @onConfirm="deletetask" confirmButtonText='はい' cancelButtonText='いいえ' icon="el-icon-info" iconColor="red" title="本当に削除してもよろしいですか？" class="delete-btn">
            <el-button slot="reference" icon="el-icon-delete" circle size="mini" type="danger"></el-button>
        </el-popconfirm>
        <!-- <h5 class="deadline">締め切り：{{task.deadline.seconds}}</h5> -->
        <h5 class="deadline">締め切り：{{displayDeadline}}</h5>
            <h4>
                        <p class="" v-if="task.done === false && diff > 0">{{ days }}日{{ hours }}時間{{ minutes }}分{{seconds}}秒</p>
                        <p v-else-if="task.done === false && diff <= 0">納期...守れなかったね</p>
                        <p v-if="task.done === true">達成済み</p>
            </h4>
            <p class="detail">
                詳細：{{task.text}}
            </p>
        <!-- <img src="https://www.theexpatfairs.com/wp-content/uploads/2019/07/just-do-it-gif-transparent-1.gif" class="PartyParrot"> -->
    </div>
</template>

<script>
import AddTodo from '~/components/AddTodo.vue'
import EditTodo from '~/components/EditTodo.vue'
import moment from 'moment'
import {db} from '~/plugins/firebase'
moment.locale('ja')
let interval = null;
  export default {
    components:{
        AddTodo,
        EditTodo,
    },
    props:['task'],
    data(){
        return{
            now: Math.trunc((new Date()).getTime() / 1000),
            date: null,
            diff: 0,
            // type:'success',
            checked: true,
            dead:false,
            canDone:true,
            displayDeadline:moment(this.task.deadline*1000).format('YYYY/MM/DD/(ddd) HH:mm'),
        }
    },
    created(){
        this.date = this.task.deadline
        interval = setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000);
        }, 1000);
    },
    computed :{
        seconds() {
            return Math.trunc(this.diff) % 60
        },
        minutes() {
            return Math.trunc(this.diff / 60) % 60
        },
        hours() {
            return Math.trunc(this.diff / 60 / 60) % 24
        },
        days() {
            return Math.trunc(this.diff / 60 / 60 / 24)
        }
    },
    watch:{
        now(value) {
            this.diff = this.date - this.now
            const channelId = this.$route.params.id
            const taskId = this.task.id

            if(this.diff <= 0 && this.dead === false){
                this.diff = -100;
                // Remove interval
                // 提出切れフェーズに移る。
                // clearInterval(interval);
                if(this.task.done === false){
                    this.dead = true
                }
            }else if(this.diff <= 60 * 60 * 24 * 1){
                // db.collection('channels').doc(channelId).collection('tasks').doc(taskId).update({
                //         level:4
                // })
            }else if(this.diff <= 60 * 60 * 24 * 3){
                // db.collection('channels').doc(channelId).collection('tasks').doc(taskId).update({
                //         level:3
                // })
            }else if(this.diff <=  60 * 60 * 24 * 7){
                // db.collection('channels').doc(channelId).collection('tasks').doc(taskId).update({
                //         level:2
                // })               
            }
        }
    },
    destroyed() {
        clearInterval(interval);
    },
    methods:{
        done: function(){
            if(this.task.done === false){
                
                this.$message({
                    message: 'タスク完了！よくやった！お疲れ様！！！',
                    type: 'success'
                });
                this.isDone = true
                const channelId = this.$route.params.id
                const taskId = this.task.id
                db.collection('channels').doc(channelId).collection('tasks').doc(taskId).update({
                    done:true
                })
                    console.log('あと',channelId)
                    console.log('あと',taskId)
                // this.task.done = true
                // alert('タスクを削除しますか？しない場合は締め切り日を過ぎたら自動的に削除されます。')
            }else{
                // this.type = ''
                // this.isDone = false
                // const channelId = this.$route.params.id
                // const taskId = this.task.id
                // db.collection('channels').doc(channelId).collection('tasks').doc(taskId).update({
                //     done:false
                // })
            }
        },
        deletetask(){
            const channelId = this.$route.params.id
            const taskId = this.task.id
            // this.task.splice(index, 1);
            db.collection("channels").doc(channelId).collection('tasks').doc(taskId).delete().then(function(){
            }).catch(function(error) {
            });

            this.$message({
                message: 'タスクが削除されました',
                type: 'info'
            });
        }
    },
  }
</script>

<style>
.todo-container{
    margin: 20px 20px;
    /* border: 0.1px solid rgba(41, 41, 41, .2); */
    border-radius: 15px;
    padding: 20px;
    width: 270px;
    height: auto;
    position: relative;
}
.done-yet{
    /* ニューモーフィズムデザインでやってみる */
    /* background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow:  11px 11px 22px #757575, 
                -11px -11px 22px #ffffff; */
background: linear-gradient(145deg, #fefefe, #d5d5d5);
box-shadow:  5px 5px 15px #5f5f5f, 
             -5px -5px 15px #ffffff;
}

.done{
    /* ニューモーフィズムデザインでやってみる */
              /* background: #d0d0d0;
box-shadow: inset 5px 5px 7px #535353, 
            inset -5px -5px 7px #ffffff; */
            background: #81eeb6;
box-shadow: inset 5px 5px 15px #345f49, 
            inset -5px -5px 15px #ceffff;
}

.dead{
background: linear-gradient(145deg, #d47171, #fd8787);
box-shadow:  5px 5px 15px #5e3232, 
             -5px -5px 15px #ffcaca;
}

.PartyParrot{
    position: absolute;
    width: 30px;
    height: auto;
    top: 110px;
    left: 20px;
}

.todo-conteiner el-tag{
    padding-right: 30px;
}

.delete-btn{
    position: absolute;
    top: -9px;
    right: -9px;
}

p{
    text-align: center;
    margin: 0;
}

h5{
    color: #7f7f7f;
}

/* .countdown li{
    display: inline-block;
    text-align: center;
    position: relative;
    text-decoration: none;
}

.countdown li:after{
    position: absolute;
    right: -40px;
    font-size: 16px;
} */

.detail{
    height: 50px;
    overflow: scroll;
}

</style>