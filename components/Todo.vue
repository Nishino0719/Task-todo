<template>
<div class="todo-component">
    <div class="todo-container done-yet">
        <el-button v-model="checked" v-bind:type="type" icon="el-icon-check" circle size="mini" @click="done" class="done-btn"></el-button>
        <el-tag size="medium" type="primary" effect="plain">{{task.tag}}</el-tag>
        <el-tag type="danger" v-if="task.level === 4">今日中</el-tag>
        <el-tag type="warning" v-if="task.level === 3">三日後</el-tag>
        <el-tag type="info" v-if="task.level === 2">1週間後</el-tag>
        <el-tag type="success" v-if="task.level === 1">まだ余裕</el-tag>
        <!-- <el-button class="el-icon-edit edit" size="mini" circle type="info"></el-button> -->
        <el-link icon="el-icon-edit edit"></el-link>
        <el-popconfirm @onConfirm="deletetask" confirmButtonText='はい' cancelButtonText='いいえ' icon="el-icon-info" iconColor="red" title="本当に削除してもよろしいですか？" class="delete-btn">
            <el-button slot="reference" icon="el-icon-delete" circle size="mini" type="danger"></el-button>
        </el-popconfirm>
        <h5 class="deadline">締め切り：{{task.deadline.seconds}}</h5>
            <h4>
                <span class="countdown">あと task.nowdate</span>
            </h4>
            <p class="detail">
                未来の自分へ：{{task.text}}
            </p>
        <!-- <img src="https://www.theexpatfairs.com/wp-content/uploads/2019/07/just-do-it-gif-transparent-1.gif" class="PartyParrot"> -->
    </div>
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
            type:'',
            checked: true,
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
            if(this.type == ''){
                this.type = 'success'
                this.$message({
                 message: 'タスク完了！よくやった！お疲れ様！！！',
                 type: 'success'
                });
            }else{
                this.type = ''
            }
        },
        deletetask(){
            const channelId = this.$route.params.id
            console.log('本当に削除してもいいんですね。ドキュメントID', this.task.id)
            db.collection("channels").doc(channelId).collection('tasks').doc(this.task.id).delete().then(function() {
            console.log("ドキュメントの削除をしました");
            }).catch(function(error) {
            console.error("ドキュメントの削除ができません: ", error);
            });
        }
    },
  }
</script>

<style>
.todo-component{
    display: inline-block;
    margin-bottom: 20px;
}

.todo-container{
    margin: 20px 20px;
    border: 0.1px solid rgba(41, 41, 41, .2);
    border-radius: 15px;
    padding: 20px;
    width: 270px;
    height: auto;
    position: relative;
}
.done-yet{
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow:  11px 11px 22px #757575, 
                -11px -11px 22px #ffffff;
}

.done{
    /* background: linear-gradient(145deg, #ffffff, #e6e6e6);
    box-shadow:  11px 11px 22px #757575, 
                -11px -11px 22px #ffffff; */
    background: linear-gradient(145deg, #c3f4f7, #a4cdd0);
    box-shadow:  11px 11px 22px #54696a, 
                -11px -11px 22px #ffffff;
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