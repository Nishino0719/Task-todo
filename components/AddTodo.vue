<template>
    <div class="add-todo_box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px" size="medium">
                <el-form-item label="科目" required prop="subject">
                    <el-select v-model="ruleForm.subject" placeholder="科目を選んでね！">
                    <el-option label="情報通信工学実験" value="情報通信工学実験"></el-option>
                    <el-option label="アルゴリズム設計" value="アルゴリズム設計"></el-option>
                    <el-option label="プログラム設計" value="プログラム設計"></el-option>
                    <el-option label="科学技術の社会史" value="科学技術の社会史"></el-option>
                    <el-option label="ゲーム理論" value="ゲーム理論"></el-option>
                    <el-option label="確率統計" value="確率統計"></el-option>
                    <el-option label="中国語" value="中国語"></el-option>
                    <el-option label="論理設計" value="論理設計"></el-option>
                    <el-option label="英語ⅤC" value="英語ⅤC"></el-option>
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
                    <el-form-item prop="date2">
                        <el-time-picker placeholder="時間を選んでね！" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
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
                {{nishino}}
            </el-form>

    </div>
</template>

<script>
import {db} from '~/plugins/firebase'
export default {
    data(){
        return {
            nishino:'hogehoge',
            ruleForm: {
                subject: '',
                date1: '',
                date2: '',
                text:''          
            },
            rules: {
                    subject: [
                    {required: true, message: '課題を選択してください！', trigger: 'change' }
                ],
                    date1: [
                    { type: 'date', required: true, message: '日付を選んでください！', trigger: 'change' }
                ],
                    date2: [
                    { type: 'date', required: true, message: '時間を選んでください！', trigger: 'change' }
                ],
                    text:  [
                    { required: false, message: '', trigger: 'blur' }
                ],
            }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            alert('submit!');
            console.log(this.ruleForm.subject)
            console.log(this.ruleForm.date1)
            console.log(this.ruleForm.date2)
            console.log(this.ruleForm.text)
            const channelId = this.$route.params.id
            db.collection('channels').doc(channelId).collection('tasks').add({
              text: this.ruleForm.text,
              subject: this.ruleForm.subject,
              deadline: this.ruleForm.date1,
              done:false
            })
          }else{
            return false;
          }
        });
      },
      addTask() {
        //   成功した時のみにしなきゃ
        if( this.ruleForm.subject !== '' && this.ruleForm.date1 !== '' && this.ruleForm.date2 !== ''){
          this.$notify({
            title: '成功！',
            message: 'タスクが新たに追加されました！',
            type: 'success'
          });
        }else{
          console.log('errorですよ')
        }
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
  .add-todo_box{
    border: 0.4px solid rgba(41, 41, 41, .8);
    border-radius: 40px;
    padding: 15px;
    margin:15px 5vw;
  }
</style>