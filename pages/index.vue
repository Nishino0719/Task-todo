<template>
  <div class="container">
    <h2>ようこそ</h2>
    <p>初めてですか？初めての方はこちらから説明を読んでね</p>
  </div>
</template>

<script>
// import {db} from '~/plugins/firebase'

export default {
  components: {
  },
  // mounted(){
  //   db.collection('channels').get()
  //   .then((querySnapshot)=>{
  //     querySnapshot.forEach(function(doc){
  //       console.log(doc.id, "=>", doc.data())
  //     })
  //   })
  // }
}
</script>

<style>

.container{
  background:#d0d0d0;
  height: 100vh;
}

</style>
