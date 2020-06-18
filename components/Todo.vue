<template>
<div class="todo-component">
    <div class="todo-container">
        <el-button v-model="checked" v-bind:type="type" icon="el-icon-check" circle size="mini" @click="done" class="done-btn"></el-button>
        <el-tag size="medium" type="danger" effect="plain">{{task.subject}}</el-tag>
        <el-tag type="danger">{{task.level}}</el-tag>
        <!-- <el-tag type="warning">三日後</el-tag>
        <el-tag type="info">1週間後</el-tag> -->
        <!-- <el-tag type="success">まだ余裕</el-tag> -->
        <el-button class="el-icon-edit edit" size="mini" circle type="info"></el-button>
        <el-popconfirm confirmButtonText='はい' cancelButtonText='いいえ' icon="el-icon-info" iconColor="red" title="本当に削除してもよろしいですか？" class="delete-btn">
            <el-button slot="reference" icon="el-icon-close" circle size="mini" type="danger"></el-button>
        </el-popconfirm>
        <h3>{{task.test}}</h3>
        <h5 class="deadline">締め切り：{{task.deadline}}</h5>
            <h4>
                <span class="countdown">あと {{task.nowdate}}</span>
            </h4>
            <p class="detail">
                未来の自分へ：{{task.detailText}}
            </p>
        <img src="https://www.theexpatfairs.com/wp-content/uploads/2019/07/just-do-it-gif-transparent-1.gif" class="PartyParrot">
    </div>
</div>
</template>

<script>
import AddTodo from '~/components/AddTodo.vue'
import moment from 'moment'
moment.locale('ja')
var m = moment()
var output = m.format('YYYY年MM月DD日 HH:mm:ss dddd')
console.log(output)
  export default {
    components:{
        AddTodo
    },
    data(){
        return{
            type:'',
            checked: true,
            task:{
                subject:'情報通信工学実験',
                level:'今日中',
                deadline: '2020/06/14',
                limit:'作成中',
                detailText:'未来の自分がんばってね！',
                date: moment(60*10*1000),
                nowdate:moment().format('DD日HH時間mm分ss秒'),
                test:moment().format('YYYY年MM月DD日 HH:mm:ss dddd'),
                user:{
                    name: 'SHA256',

                }
            }
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
        }
    },
    // computed:{
    //     time: function(){
    //         return this.task.date.format('mm:ss')
    //     }
    // },
    // mounted: function(){
    //     setInterval(() =>{
    //         this.task.date = moment(this.task.date.subtract(1, 'second'))
    //     }, 1000)
    // }
  }
</script>

<style>
.todo-component{
    display: inline-block;
    margin-bottom: 20px;
}

.todo-container{
    margin: 10px 10px;
    border: 0.1px solid rgba(41, 41, 41, .2);
    border-radius: 15px;
    padding: 10px;
    width: 250px;
    height: auto;
    position: relative;
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
}

</style>