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
                    <el-option label="タグを追加" value="タグを追加">
                      <el-button type="text" @click="openAddTag" class="add-tag_btn">タグを追加</el-button>
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="課題締め切り" required>
                    <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="日付を選んでね！" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">ー</el-col>
                    <el-col :span="11">
                    <el-form-item prop="time">
                          <el-time-select v-model="ruleForm.time" :picker-options="{ start: '0:00', step: '00:15', end: '23:45'}" placeholder="時間を選んでね！" style="width:100%;"></el-time-select>
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
import {db} from '~/plugins/firebase'
export default {
    data(){
        return {
            drawer:false,
            tags:[],
            ruleForm: {
                tag: '',
                date1: '',
                time: '',
                text:''          
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
      openAddTag(event) {
        this.$prompt('自分だけのコンパクトなタグを作ろう！', 'タグの追加方法', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'info',
          center: true,
          showInput:true,
          // inputPattern:10文字以内とか制限つけたい
          inputErrorMessage: 'そのタグは追加できません'
        }).then(({value}) => {
          if (this.keyDownedForJPConversion(event)) { return }
          const channelId = this.$route.params.id
          db.collection('channels').doc(channelId).collection('tags').add({ tag: value })
          this.$message({
            type: 'success',
            message: 'タグが新たに追加されました！'
          });
          console.log(value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'キャンセルしました。'
          });
        });
      },
      keyDownedForJPConversion(event){
      const codeForConversion = 229
      return event.keyCode === codeForConversion
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            // date1のformatを日付までにして、timeのformatを時間指定してつなぎ合わせたものをdeadlineとして渡せていない
            const channelId = this.$route.params.id
            db.collection('channels').doc(channelId).collection('tasks').add({
              text: this.ruleForm.text,
              tag: this.ruleForm.tag,
              deadline: this.ruleForm.date1,
              level:1,
              done:false
            })
            this.drawer = false
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
        if( this.ruleForm.tag !== '' && this.ruleForm.date1 !== '' && this.ruleForm.date2 !== '' &&this.ruleForm.tag !== 'タグを追加'){
          this.$notify({
            title: '成功！',
            message: 'タスクが新たに追加されました！',
            type: 'success'
          });
        }else{
          console.log('errorですよ')
          if(this.ruleForm.tag === 'タグを追加'){
            alert('「タグを追加」はタグとして使うことができません。')
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
    }
}
</script>

<style>
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