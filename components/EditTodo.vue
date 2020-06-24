<template>
    <div class="edit-todo_box">
            <el-button @click="drawer = true" icon="el-icon-edit" circle></el-button>
            <el-drawer
              title="タスクを編集する"
              :visible.sync="drawer"
              direction="btt"
              size="57%"
              :with-header="false"
            >
              <div class="add-task__content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px" size="medium">
                <el-form-item label="タグ" required prop="tag"  style="padding-top:30px">
                    <el-select v-model="ruleForm.tag" placeholder="タグを選んでね！">
                    <!-- <el-option v-bind:key="tag.tag" v-for="tag in tags" v-bind:value="tag.tag" v-bind:label="tag.tag"> -->
                    <!-- </el-option> -->
                    <!-- <el-option label="タグを追加" value="タグを追加" class="add-tag_popover">
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
                        <el-button slot="reference">タグを追加</el-button>
                        <el-button  @click="visible = false">キャンセル</el-button>
                          <el-button type="primary" @click="visible = false,submitTagForm('tagForm')">追加</el-button>
                      </el-popover>
                    </el-option> -->
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
                          <el-time-select v-model="ruleForm.time" :picker-options="{ start: '0:00', step: '00:15', end: '24:00'}" placeholder="時間を選んでね！" style="width:100%;"></el-time-select>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="未来の自分へ" prop="text">
                    <el-input type="textarea" v-model="ruleForm.text"></el-input>
                </el-form-item>
            </el-form>
                <el-button type="primary" size="mini" @click="editForm('ruleForm'), addTask()">編集</el-button>
                <el-button size="mini" @click="editForm('ruleForm')">リセット</el-button>
            </div>
          </el-drawer>

    </div>
</template>

<script>
import {db} from '~/plugins/firebase'
export default {
    props:['task'],
    data(){
        return {
            visible:false,
            drawer:false,
            tags:[],
            level:1,
            ruleForm: {
                tag: task.tag,
                date1: task.deadline,
                time: '',
                text: task.text          
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
    //   submitTagForm(tagForm){
    //     if(this.tagForm.tag !== '' && this.tagForm.color !== '' && this.tagForm.tag.length < 10){
    //       const channelId = this.$route.params.id
    //         console.log(this.tagForm.tag.length)
    //       db.collection('channels').doc(channelId).collection('tags').add({
    //          tag: this.tagForm.tag,
    //          color:'color:'+ this.tagForm.color
    //          })
    //           this.$message({
    //             type: 'success',
    //             message: 'タグが新たに追加されました！'
    //           });
    //           this.ruleForm.tag = this.tagForm.tag
    //           this.tagForm.tag = ''
    //     }else if(this.tagForm.tag.length > 9){
    //             this.$message({
    //             type: 'warning',
    //             message: 'ごめんなさい！タグは9文字以内でお願いします！'
    //           });
    //           this.tagForm.tag = ''
    //           this.ruleForm.tag = ''
    //     }else if(this.tagForm.tag == ''){
    //           this.$message({
    //             type: 'warning',
    //             message: 'タグを入力してね！'
    //           });
    //           this.ruleForm.tag = ''
    //     }else if(this.tagForm.color == ''){
    //           this.$message({
    //             type: 'warning',
    //             message: '色を入力してね！'
    //           });
    //           this.ruleForm.tag = ''
    //     }
    //   },
      editForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            // date1のformatを日付までにして、timeのformatを時間指定してつなぎ合わせたものをdeadlineとして渡せていない
            const channelId = this.$route.params.id
            // if(this.ruleForm.tag !== 'タグを追加'){
              db.collection('channels').doc(channelId).collection('tasks').set({
                text: this.ruleForm.text,
                tag: this.ruleForm.tag,
                deadline: this.ruleForm.date1,
                level:this.level,
                done:false,
              })
            // }
            this.drawer = false
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
        if( this.ruleForm.tag !== '' && this.ruleForm.date1 !== '' && this.ruleForm.date2 !== '' &&this.ruleForm.tag !== 'タグを追加'){
          this.$notify({
            title: '成功！',
            message: 'タスクが編集されました！',
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
    // mounted(){
    //   const channelId = this.$route.params.id
    //   db.collection('channels').doc(channelId).collection('tags').onSnapshot((snapshot)=>{
    //     snapshot.docChanges().forEach((change)=>{
    //       const doc = change.doc
    //       if(change.type === 'added'){
    //         this.tags.push({id: doc.id, ...doc.data()})
    //       }
    //     })
    //   })
    // }
}
</script>

<style>
  .add-tag_btn{
    display: block;
  }
</style>