<template>
<div class="todo-containers">
    <div class="todo-container">
        <!-- <el-button type="success" v-model="checked" icon="el-icon-finished" circle size="mini" @click="done" class="done-btn"></el-button> -->
        <el-button v-model="checked" icon="el-icon-check" circle size="mini" @click="done" class="done-btn"></el-button>
        <el-tag size="medium" type="danger" effect="plain">{{task.subject}}</el-tag>
        <el-tag type="danger">{{task.level}}</el-tag>
        <!-- <el-tag type="warning">三日後</el-tag>
        <el-tag type="info">1週間後</el-tag> -->
        <!-- <el-tag type="success">まだ余裕</el-tag> -->
        <el-button class="el-icon-edit edit" size="mini" circle type="info"></el-button>
        <h5 class="deadline">締め切り：{{task.deadline}}</h5>
            <p>
                <span class="countdown">あと {{task.limit}}</span>
            </p>
            <p class="detail">
                未来の自分へ：{{task.detailText}}
            </p>
    </div>
</div>
</template>

<script>

  export default {
    components:{
        
    },
    data(){
        return{
            type:'info',
            checked: true,
            task:{
                subject:'情報通信工学実験',
                level:'今日中',
                deadline: '2020/06/14',
                limit:'作成中',
                detailText:'未来の自分がんばってね！',
                user:{
                    name: 'SHA256',

                }
            }
        }
    },
    methods:{
        done: function(){
            // this.type = 'success'
           this.$message({
            message: 'タスク完了！よくやった！お疲れ様！！！',
            type: 'success'
        });
        }
    }
  }
</script>

<style>
.todo-containers{
    display: inline-block;
    margin-bottom: 20px;
}

.todo-container{
    margin: 10px 10px;
    border: 0.1px solid rgba(41, 41, 41, .2);
    border-radius: 15px;
    padding: 10px;
    width: 240px;
    position: relative;
}

.todo-conteiner el-tag{
    padding-right: 30px;
}

.done-btn{
    position: absolute;
    top: -8px;
    left: -8px;
}

.deadline{
    display: inline-block;
}

p{
    text-align: center;
    margin: 0;
}

h5{
    color: #a5a5a5;
}


.detail{
    display: inline-block;
}

</style>