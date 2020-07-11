<template>
    <div class="add-todo_box">
            <el-button type="primary" @click="drawer = true" class="el-icon-plus" circle></el-button>
            <el-drawer
              title="タスクを追加する"
              :visible.sync="drawer"
              direction="btt"
              size="57%"
              :with-header="false"
            >
              <div class="add-task__content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px" size="medium">
                <el-form-item label="タグ" required prop="tag"  style="padding-top:30px">
                    <el-select v-model="ruleForm.tag" placeholder="タグを選んでね！">
                    <el-option v-bind:key="tag.tag" v-for="tag in tags" v-bind:value="tag.tag" v-bind:label="tag.tag">
                    </el-option>
                    <el-option label="このタグは使用禁止" value="タグを追加" class="add-tag_popover">
                      <el-popover
                        placement="top"
                        width="235"
                        trigger="click"
                         v-model="visible" class="">
                        <el-form :model="tagForm">
                          <el-form-item label="">
                            <el-color-picker v-model="tagForm.color" size="small"></el-color-picker>
                            <el-input v-model="tagForm.tag" autocomplete="off"></el-input>
                            <h5>あと {{9 - this.tagForm.tag.length}}文字</h5>
                          </el-form-item>
                        </el-form>
                        <el-button slot="reference"  type="text">+ 新しいタグ</el-button>
                        <el-button  @click="visible = false">キャンセル</el-button>
                          <el-button type="primary" @click="visible = false,submitTagForm('tagForm')">追加</el-button>
                      </el-popover>
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="課題締め切り" required>
                    <el-col :span="11">
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
                <el-button type="primary" size="mini" @click="submitForm('ruleForm'), addTask()">追加</el-button>
                <el-button size="mini" @click="resetForm('ruleForm')">リセット</el-button>
            </div>
          </el-drawer>

    </div>
</template>

<script>
import {db,firebase} from '~/plugins/firebase'
import { mapActions } from 'vuex'
import moment from 'moment'
moment.locale('ja')
export default {
    data(){
        return {
            nowTime:'',
            visible:false,
            drawer:false,
            tags:[],
            level:1,
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
                tag: '',
                date1: '',
                time: '',
                text:''          
            },
            tagForm: {
              color:'#409EFF',
              tag: '',
            },
            rules: {
                    tag: [
                    {required: true, message: '課題を選択してください！', trigger: 'change' }
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
      };
    },
    methods: {
      ...mapActions(['setUser']),
      submitTagForm(tagForm){
        if(this.tagForm.tag !== '' && this.tagForm.color !== '' && this.tagForm.tag.length < 10){
          const channelId = this.$route.params.id
          // console.log(this.tagForm.tag)
          // console.log(this.tagForm.color)
            console.log(this.tagForm.tag.length)
          db.collection('channels').doc(channelId).collection('tags').add({
             tag: this.tagForm.tag,
             color:'color:'+ this.tagForm.color
             })
              this.$message({
                type: 'success',
                message: 'タグが新たに追加されました！'
              });
              this.ruleForm.tag = this.tagForm.tag
              this.tagForm.tag = ''
        }else if(this.tagForm.tag.length > 9){
                this.$message({
                type: 'warning',
                message: 'ごめんなさい！タグは9文字以内でお願いします！'
              })
              this.tagForm.tag = ''
              this.ruleForm.tag = ''
        }else if(this.tagForm.tag == ''){
              this.$message({
                type: 'warning',
                message: 'タグを入力してね！'
              })
              this.ruleForm.tag = ''
        }else if(this.tagForm.color == ''){
              this.$message({
                type: 'warning',
                message: '色を入力してね！'
              })
              this.ruleForm.tag = ''
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            // date1のformatを日付までにして、timeのformatを時間指定してつなぎ合わせたものをdeadlineとして渡せていない
                const start_time = moment("0:00", 'HH:mm')
                const end_time = moment(this.ruleForm.time, 'HH:mm')
                const deadlineSecond = moment(this.ruleForm.date1).startOf('day').unix() + end_time.diff(start_time)/1000
                const date = new Date() ;
                const milli = date.getTime()
                const nowSecond =  Math.floor(milli/1000)
                const timeDiff = deadlineSecond - nowSecond
                // console.log('msで出てる？→', end_time.diff(start_time)/1000)
                // console.log('format変えてる', moment(this.ruleForm.date1).format('l'))
                // console.log('startOf',moment(this.ruleForm.date1).startOf('day'))
                // console.log('startOf.unix',moment(this.ruleForm.date1).startOf('day').unix())
                // console.log('deadlineの秒数はこっちになります！',moment(this.ruleForm.date1).startOf('day').unix() + end_time.diff(start_time)/1000)
                // console.log('今の秒数',nowSecond)
                // console.log('残り',timeDiff)

                // if(timeDiff <= 60 * 60 * 24 * 1){
                //   this.level = 4
                // }else if(timeDiff <= 60 * 60 * 24 * 3){
                //   this.level = 3
                // }else if(timeDiff <= 60 * 60 * 24 * 7){
                //   this.level = 2
                // }else{
                //   this.level = 1
                // }
            this.drawer = false
            const channelId = this.$route.params.id
            if(this.ruleForm.tag !== 'タグを追加' && timeDiff > 0){
              db.collection('channels').doc(channelId).collection('tasks').add({
                text: this.ruleForm.text,
                tag: this.ruleForm.tag,
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
      addTask(formName) {
        //   成功した時のみにしなきゃ
                const  start_time = moment("0:00", 'HH:mm')
                const  end_time = moment(this.ruleForm.time, 'HH:mm')
                const deadlineSecond = moment(this.ruleForm.date1).startOf('day').unix() + end_time.diff(start_time)/1000
                const date = new Date() ;
                const milli = date.getTime()
                const nowSecond =  Math.floor(milli/1000)
                const timeDiff = deadlineSecond - nowSecond
        if( this.ruleForm.tag !== '' && this.ruleForm.date1 !== '' && this.ruleForm.date2 !== '' &&this.ruleForm.tag !== 'タグを追加' &&  timeDiff > 0){
          this.$notify({
            title: '成功！',
            message: 'タスクが新たに追加されました！',
            type: 'success'
          });
        }else{
          console.log('errorですよ')
          if(this.ruleForm.tag === 'タグを追加'){
            // alert('「タグを追加」はタグとして使うことができません。')
            this.$message({
                type: 'error',
                duration: 5000,
                showClose: true,
                message: 'このタグはタグとして使うことができません。'
              });
          }
          if( timeDiff <= 0){
            // alert('Oops!! 今の時間以降を入力してね！')
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
    mounted(){
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('tags').onSnapshot((snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
          const doc = change.doc
          if(change.type === 'added'){
            this.tags.push({id: doc.id, ...doc.data()})
          }
        })
      })       
    },
    computed:{
      user() {
       return this.$store.state.user
      },
    }

}
</script>

<style>
  /* .el-icon-plus{
    background: #83c5e2;
    box-shadow:  5px 5px 11px #73adc7, 
                -5px -5px 11px #93ddfd;
  } */
  .add-todo_box{
    border-radius: 40px;
    padding: 10px;
    margin: 10px 5px;
    text-align: center;
  }

  .add-tag_btn{
    display: block;
  }
</style>