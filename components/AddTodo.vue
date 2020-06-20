<template>
    <div class="add-todo_box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px" size="medium">
                <el-form-item label="タグ" required prop="tag">
                    <el-select v-model="ruleForm.tag" placeholder="タグを選んでね！">
                    <el-option v-bind:key="tag.tag" v-for="tag in tags" v-bind:value="tag.tag" v-bind:label="tag.tag"></el-option>
                    <el-option label="タグを追加" value="タグを追加">
                      <el-button type="text" @click="openAddTag">タグを追加</el-button>
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
                        <!-- <el-time-picker placeholder="時間を選んでね！" v-model="ruleForm.time" style="width: 100%;"></el-time-picker> -->
                          <el-time-select v-model="ruleForm.time" :picker-options="{ start: '0:00', step: '00:15', end: '23:45'}" placeholder="時間を選んでね！" style="width:100%;"></el-time-select>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="未来の自分へ" prop="text">
                    <el-input type="textarea" v-model="ruleForm.text"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" size="mini" @click="submitForm('ruleForm'), addTask()">追加</el-button>
                    <el-button size="mini" @click="resetForm('ruleForm')">リセット</el-button>
                </el-form-item>
            </el-form>

    </div>
</template>

<script>
import {db} from '~/plugins/firebase'
export default {
    data(){
        return {
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
      openAddTag() {
        this.$prompt('自分だけのコンパクトなタグを作ろう！', 'タグの追加方法', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'info',
          center: true,
          // inputPattern:10文字以内とか制限つけたい
          inputErrorMessage: 'そのタグは追加できません'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'タグが新たに追加されました！'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'キャンセルしました。'
          });
        });
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
              done:false
            })
          }else{
            return false;
          }
        });
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
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('tags').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
          this.tags.push({id: doc.id, ...doc.data()})
        })
      })
    }
}
</script>

<style>
  .add-todo_box{
    border: 0.4px solid rgba(41, 41, 41, .8);
    border-radius: 40px;
    padding: 10px;
    /* margin:15px 5vw; */
    margin: 10px 5px;
  }

  .add-tag_btn{
    display: block;
  }
</style>