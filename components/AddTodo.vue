<template>
    <div class="add-todo_box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px" size="medium">
                <el-form-item label="科目" required prop="subject">
                    <el-select v-model="ruleForm.subject" placeholder="科目を選んでね！">
                    <el-option label="情報通信工学実験" value="Ex"></el-option>
                    <el-option label="アルゴリズム設計" value="AD"></el-option>
                    <el-option label="プログラム設計" value="PD"></el-option>
                    <el-option label="科学技術の社会史" value="Sc"></el-option>
                    <el-option label="ゲーム理論" value="GT"></el-option>
                    <el-option label="確率統計" value="PS"></el-option>
                    <el-option label="中国語" value="Ch"></el-option>
                    <el-option label="論理設計" value="LD"></el-option>
                    <el-option label="英語ⅤC" value="En"></el-option>
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
                <el-form-item label="未来の自分へ" required  prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary"  @click="submitForm('ruleForm'), open1()">追加</el-button>
                    <el-button @click="resetForm('ruleForm')">リセット</el-button>
                </el-form-item>
            </el-form>

    </div>
</template>

<script>
export default {
    data(){
        return {
            ruleForm: {
                subject: '',
                date1: '',
                date2: '',
                desc:''          
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
                    desc:  [
                        {type: 'desc', required:false, message: 'eheheheh', trigger: 'blur'}
                ],
            }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            alert('submit!');
          }else{
            console.log('error submit!!');
            return false;
          }
        });
      },
      open1() {
        //   成功した時のみにしなきゃ
        this.$notify({
          title: '成功！',
          message: 'タスクが新たに追加されました！',
          type: 'success'
        });
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
    margin: 20px 20vw;
  }
</style>