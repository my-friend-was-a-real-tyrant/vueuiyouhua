<template>
  <div>
    <h4>教育经历</h4>
    <table class="table">
      <thead>
      <tr>
        <th>学校</th>
        <th>学历</th>
        <th>年份</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="edu of education" :key="'key-' + edu.educationExperienceId">
        <td>{{edu.schoolName}}</td>
        <td>{{edu.education}}</td>
        <td>{{edu.studyStartVo}}~{{edu.studyEndVo}}</td>
        <td>
          <button class="btn btn-danger" @click="deleteEducation(edu.educationExperienceId)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: 'Experience',
        data() {
            return {
                data:{
                    educationData: null
                }
            }
        },
        props: {
            education: Array
        },
        methods: {
            deleteEducation(id) {
                this.$emit("deletecation", id)
            },
            getData() {
                this.$axios.get('/api/hrbase/personalAuth/info/getPersonalEducationExperience/' + this.$store.getters.user.detail.candidateDetailId).then(res => {
                    this.$set(this.data,'educationData',res.data.data)//动态添加
                    console.log("getPersonalEducationExperience=>",this.data.educationData);
                }).catch(err => {
                    console.log(err);
                });
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
