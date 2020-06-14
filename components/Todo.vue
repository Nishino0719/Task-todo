<template>
<div class="todo-containers">
    <div class="todo-container">
        <el-button type="info" v-model="checked" icon="el-icon-check" circle size="mini" @click="done"></el-button>
        <el-tag size="medium" type="danger" effect="plain">{{task.subject}}</el-tag>
        <el-tag type="danger">{{task.level}}</el-tag>
        <!-- <el-tag type="warning">三日後</el-tag>
        <el-tag type="info">1週間後</el-tag> -->
        <!-- <el-tag type="success">まだ余裕</el-tag> -->
        <p class="deadline">締め切り：{{task.deadline}}</p>
            <p>
                <span class="countdown">あと{{task.limit}}</span>
            </p>
            <p class="detail">
                未来の自分へ：
            </p>
            <p class="detail-text">{{task.detailText}}</p>
    </div>
</div>
</template>

<script>

  export default {
    components:{
        
    },
    data(){
        return{
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
}

.todo-container{
    margin: 10px 10px;
    border: 0.1px solid rgba(41, 41, 41, .2);
    border-radius: 15px;
    padding: 10px;
    width: 250px;
}

.todo-conteiner el-tag{
    padding-right: 30px;
}

.deadline{
    display: inline-block;
}

p{
    text-align: center;
    margin: 0;
}

.detail{
    display: inline-block;
}

.detail-text{
    display: inline;
}
</style>