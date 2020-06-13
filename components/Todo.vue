<template>
<div class="todo-containers">
    <div class="todo-container">
        <el-button type="info" v-model="checked" icon="el-icon-check" circle size="mini" @click="done"></el-button>
        <el-tag size="medium" type="danger">情報通信工学実験</el-tag>
        <p class="deadline">締め切り：2020/06/14 12:00:00</p>
            <h4>
                <span class="countdown">残り時間</span>
            </h4>
            <p class="detail">
                未来の自分へ：
            </p>
            <p class="detail-text">頑張ってね！</p>
    </div>
</div>
</template>

<script>

  export default {
    components:{
        
    },
    data(){
        return{
            checked: true
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
    margin-left: 30px;
    margin-right: 50px;
    /* display: flex; */
    border: 0.1px solid rgba(41, 41, 41, .2);
    border-radius: 15px;
    padding-left:10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 250px;
}

.todo-conteiner el-tag{
    padding-right: 30px;
}

.deadline{
    display: inline-block;
}

h4{
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