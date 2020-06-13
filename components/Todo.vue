<template>
<div class="todo-containers">
    <div class="todo-container">
        <el-button type="info" v-model="checked" icon="el-icon-check" circle size="mini" @click="done"></el-button>
        <el-tag size="medium" type="danger" effect="plain">情報通信工学実験</el-tag>
        <el-tag type="danger">今日中</el-tag>
        <!-- <el-tag type="warning">三日後</el-tag>
        <el-tag type="info">1週間後</el-tag> -->
        <p class="deadline">締め切り：2020/06/14</p>
            <p>
                <span class="countdown">残り時間：</span>
            </p>
            <p class="detail">
                未来の自分へ：
            </p>
            <p class="detail-text">俺は今日遊ぶから頑張れwwwww</p>
    </div>
    <div class="todo-container">
        <el-button type="info" v-model="checked" icon="el-icon-check" circle size="mini" @click="done"></el-button>
        <el-tag size="medium" type="info" effect="plain">プログラミング設計</el-tag>
        <!-- <el-tag type="danger">今日中</el-tag> -->
        <!-- <el-tag type="warning">三日後</el-tag> -->
        <!-- <el-tag type="info">1週間後</el-tag> -->
        <el-tag type="succes">まだ余裕</el-tag>
        <p class="deadline">締め切り：2020/08/19</p>
            <p>
                <span class="countdown">残り時間：</span>
            </p>
            <p class="detail">
                未来の自分へ：
            </p>
            <p class="detail-text">wordファイルでの提出、学籍番号.pdfでも可能</p>
    </div>
    <div class="todo-container">
        <el-button type="info" v-model="checked" icon="el-icon-check" circle size="mini" @click="done"></el-button>
        <el-tag size="medium" type="" effect="plain">アルゴリズム設計</el-tag>
        <el-tag type="warning">三日後</el-tag>
        <p class="deadline">締め切り：2020/06/17</p>
            <p>
                <span class="countdown">残り時間：</span>
            </p>
            <p class="detail">
                未来の自分へ：
            </p>
            <p class="detail-text">めんどくさいから放置しまーす未来の俺に全部たくしまーすよろしくお願いしまーす</p>
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