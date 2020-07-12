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
        <!-- 編集 -->
        <el-button class="el-icon-edit edit" size="mini" circle type="" @click="drawer = true"></el-button>
            <el-drawer
              title="タスクを編集する"
              :visible.sync="drawer"
              direction="btt"
              size="57%"
              :with-header="false"
            >
              <div class="edit-task__content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px" size="medium">
                <el-form-item label="タグ" required prop="tag"  style="padding-top:30px">
                    <el-select v-model="ruleForm.tag" placeholder="タグを選んでね！">
                      <div v-bind:key="tag.tag" v-for="tag in tags">
                        <el-option  v-if="user.uid === tag.user.uid" v-bind:value="tag.tag" v-bind:label="tag.tag">
                        </el-option>
                      </div>
                    </el-select>
                </el-form-item>
                <el-form-item label="課題締め切り" required>
                    <el-col :span="11">
                        <!-- date1とdate2がdeadlineに変換されてしまったのでどうしよう -->
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="日付を選んでね！" v-model="ruleForm.date1" :picker-options="pickerOptions" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">ー</el-col>
                    <el-col :span="11">
                    <el-form-item prop="time">
                          <el-time-select v-model="ruleForm.time" minTime:nowTime :picker-options="{ start: '0:00', step: '00:15', end: '24:00'}" placeholder="時間を選んでね！" style="width:100%;"></el-time-select>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="未来の自分へ" prop="text">
                    <el-input type="textarea" v-model="ruleForm.text"></el-input>
                </el-form-item>
            </el-form>
                <el-button type="primary" size="mini" @click="editForm('ruleForm'), editTask()">編集</el-button>
                <el-button size="mini" @click="resetForm('ruleForm')">リセット</el-button>
            </div>
          </el-drawer>
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
    </div>
</template>

<script>
import AddTodo from '~/components/AddTodo.vue'
import EditTodo from '~/components/EditTodo.vue'
import moment from 'moment'
import { mapActions } from 'vuex'
import {db, firebase} from '~/plugins/firebase'
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
            checked: true,
            dead:false,
            canDone:true,
            displayDeadline:moment(this.task.deadline*1000).format('YYYY/MM/DD/(ddd) HH:mm'),
            nowTime:'',
            visible:false,
            drawer:false,
            tags:[],
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() < Date.now();
                },
                shortcuts: [{
                  text: '今日',
                  onClick(picker) {
                    picker.$emit('pick', new Date());
                  }
                }, {
                  text: '明日',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() + 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                  }
                },  {
                  text: '三日後',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
                    picker.$emit('pick', date);
                  }
                }, {
                  text: '1週間後',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                  }
                }]
              },
            ruleForm: {
                tag: this.task.tag,
                date1: this.task.deadline*1000,
                time: moment(this.task.deadline*1000).format("HH:mm"),
                text:this.task.text          
            },
            tagForm: {
              color:'#409EFF',
              tag: '',
            },
            rules: {
                    tag: [
                    {required: true, message: 'タグを選択してください！', trigger: 'change' }
                ],
                    date1: [
                    { type: 'date', required: true, message: '日付を選んでください！', trigger: 'change' }
                ],
                    time: [
                    {required: true, message: '時間を選んでください！', trigger: 'change' }
                ],
                    text:  [
                    { required: false, message: '', trigger: 'blur' }
                ],
            }            
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
        },
        user() {
            return this.$store.state.user
        },
    },
    watch:{
        now(value) {
            this.diff = this.date - this.now
            const channelId = this.$route.params.id
            const taskId = this.task.id

            if(this.diff <= 0 && this.dead === false){
                this.diff = -100;
                if(this.task.done === false){
                    this.dead = true
                }
            }
        }
    },
    destroyed() {
        clearInterval(interval);
    },
    methods:{
        ...mapActions(['setUser']),
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
            }
        },
        deletetask(){
            const channelId = this.$route.params.id
            const taskId = this.task.id
            db.collection("channels").doc(channelId).collection('tasks').doc(taskId).delete().then(function(){
            }).catch(function(error) {
            });

            this.$message({
                message: 'タスクが削除されました',
                type: 'info'
            });
        },
    //   edit
        editForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            // date1のformatを日付までにして、timeのformatを時間指定してつなぎ合わせたものをdeadlineとして渡せていない
                const start_time = moment("0:00", 'HH:mm')
                const end_time = moment(this.ruleForm.time, 'HH:mm')
                const deadlineSecond = moment(this.ruleForm.date1).startOf('day').unix() + end_time.diff(start_time)/1000
                const date = new Date();
                const milli = date.getTime()
                const nowSecond =  Math.floor(milli/1000)
                const timeDiff = deadlineSecond - nowSecond
            this.drawer = false
            const channelId = this.$route.params.id
            const taskId = this.task.id
            if(this.ruleForm.tag !== 'タグを追加' && timeDiff > 0){
              db.collection('channels').doc(channelId).collection('tasks').doc(taskId).update({
                text: this.ruleForm.text,
                tag: this.ruleForm.tag,
                // color:this.tagForm.color
                deadline: deadlineSecond,
                done:false,
                user: {
                      name: this.user.displayName,
                      uid:this.user.uid
                      }
              })
            }
          }else{
            return false;
          }
        });
      },
        resetForm(formName){
        this.$refs[formName].resetFields();
      },
        editTask(formName) {
        //   成功した時のみにしなきゃ
                const start_time = moment("0:00", 'HH:mm')
                const end_time = moment(this.ruleForm.time, 'HH:mm')
                const deadlineSecond = moment(this.ruleForm.date1).startOf('day').unix() + end_time.diff(start_time)/1000
                const date = new Date() ;
                const milli = date.getTime()
                const nowSecond =  Math.floor(milli/1000)
                const timeDiff = deadlineSecond - nowSecond
        if( this.ruleForm.tag !== '' && this.ruleForm.date1 !== '' && this.ruleForm.date2 !== '' &&this.ruleForm.tag !== 'タグを追加' &&  timeDiff > 0){
          this.$notify({
            title: '成功！',
            message: 'タスクが編集されました',
            type: 'success'
          });
        }else{
          if(this.ruleForm.tag === 'タグを追加'){
            this.$message({
                type: 'error',
                duration: 5000,
                showClose: true,
                message: 'このタグはタグとして使うことができません。'
              });
          }
          if( timeDiff <= 0){
                this.$message({
                type: 'error',
                duration: 5000,
                showClose: true,
                message: 'この時間は選べないよ！今の時間以降を選んでね！'
              });
          }
        }
      },
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