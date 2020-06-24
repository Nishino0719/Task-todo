<template>
    <div class="todo-container done-yet" v-bind:class="{done:task.done}">
            <el-button  v-if="task.done === true" v-model="checked" type="success" icon="el-icon-check" circle size="mini" @click="done" class="done-btn"></el-button>
            <el-button  v-if="task.done === false" v-model="checked" type="" icon="el-icon-check" circle size="mini" @click="done" class="done-btn"></el-button>
        <el-tag size="medium" type="primary" effect="plain" v-bind:style="task.color">{{task.tag}}</el-tag>
        <el-tag type="danger" v-if="task.level === 4">今日中</el-tag>
        <el-tag type="warning" v-if="task.level === 3">三日後</el-tag>
        <el-tag type="info" v-if="task.level === 2">1週間後</el-tag>
        <el-tag type="success" v-if="task.level === 1">まだ余裕</el-tag>
        <!-- <el-button class="el-icon-edit edit" size="mini" circle type="info"></el-button> -->
        <el-link icon="el-icon-edit edit"></el-link>
        <el-popconfirm @onConfirm="deletetask" confirmButtonText='はい' cancelButtonText='いいえ' icon="el-icon-info" iconColor="red" title="本当に削除してもよろしいですか？" class="delete-btn">
            <el-button slot="reference" icon="el-icon-delete" circle size="mini" type="danger"></el-button>
        </el-popconfirm>
        <!-- <h5 class="deadline">締め切り：{{task.deadline.seconds}}</h5> -->
        <h5 class="deadline">締め切り：2020/06/22 24:00</h5>
            <h4>
                <span class="countdown">あと 8時間43分24秒{{task.numberinfo}}</span>
            </h4>
            <p class="detail">
                未来の自分へ：{{task.text}}
            </p>
        <!-- <img src="https://www.theexpatfairs.com/wp-content/uploads/2019/07/just-do-it-gif-transparent-1.gif" class="PartyParrot"> -->
    </div>
</template>

<script>
import AddTodo from '~/components/AddTodo.vue'
import moment from 'moment'
import {db} from '~/plugins/firebase'
moment.locale('ja')
var m = moment()
var output = m.format('YYYY年MM月DD日 HH:mm:ss dddd')
console.log(output)
  export default {
    components:{
        AddTodo
    },
    props:['task'],
    data(){
        return{
            // type:'success',
            checked: true,
            isDone:false
            // task:{
            //     subject:'情報通信工学実験',
            //     deadline: '2020/06/14',
            //     limit:'作成中',
            //     detailText:'未来の自分がんばってね！',
            //     date: moment(60*10*1000),
            //     nowdate:moment().format('DD日HH時間mm分ss秒'),
            //     test:moment().format('YYYY年MM月DD日 HH:mm:ss dddd'),
            //     user:{
            //         name: 'SHA256',
            //     }
            // }
        }
    },
    methods:{
        done: function(){
            if(this.task.done === false){
                // this.type = 'success'
                this.$message({
                    message: 'タスク完了！よくやった！お疲れ様！！！',
                    type: 'success'
                });
                this.isDone = true
                const channelId = this.$route.params.id
                const taskId = this.task.id
                    console.log(this.task.done)
                    console.log(channelId)
                    console.log(taskId)
                db.collection('channels').doc(channelId).collection('tasks').doc(taskId).update({
                    done:true
                })
                    console.log('あと',channelId)
                    console.log('あと',taskId)
                // alert('タスクを削除しますか？しない場合は締め切り日を過ぎたら自動的に削除されます。')
            }else{
                // this.type = ''
                this.isDone = false
                const channelId = this.$route.params.id
                const taskId = this.task.id
                db.collection('channels').doc(channelId).collection('tasks').doc(taskId).update({
                    done:false
                })
            }
        },
        deletetask(){
            const channelId = this.$route.params.id
            const taskId = this.task.id
            console.log('本当に削除してもいいんですね。ドキュメントID', this.task.id)
            // this.task.splice(index, 1);
            db.collection("channels").doc(channelId).collection('tasks').doc(taskId).delete().then(function(){
            console.log("ドキュメントの削除をしました")
            }).catch(function(error) {
            console.error("ドキュメントの削除ができません: ", error)
            });
        }
    },
    computed:{

    }
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
              background: #d0d0d0;
box-shadow:  5px 5px 4px #949494, 
             -5px -5px 4px #ffffff;
}

.done{
    /* ニューモーフィズムデザインでやってみる */
    background: #b6e4e7;
    box-shadow: inset 5px 5px 10px #495b5c, 
                inset -5px -5px 10px #ffffff;
                /* background: #d0d0d0;
box-shadow: inset 5px 5px 4px #949494, 
            inset -5px -5px 4px #ffffff; */
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

.deadline{
    /* display: inline-block; */
}

p{
    text-align: center;
    margin: 0;
}

h5{
    color: #a5a5a5;
}


.detail{
    /* display: inline-block; */
    height: 50px;
    overflow: scroll;
}

</style>