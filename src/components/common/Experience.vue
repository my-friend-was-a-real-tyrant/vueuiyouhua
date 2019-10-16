<template>
  <div>
    <h4>工作经历</h4>
    <table class="table">
      <thead>
      <tr>
        <th>公司</th>
        <th>职位</th>
        <th>年份</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="exp in experience" :key="'key_'+exp.relationWorkExperienceId">
        <td>{{exp.companyName}}</td>
        <td>{{exp.jobTitle}}</td>
        <td>{{exp.studyStartVo}}~{{exp.studyEndVo}}</td>
        <td>
          <button class="btn btn-danger" @click="deletePerience(exp.relationWorkExperienceId)">删除</button>
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
                data: {
                    dataList: null,
                    educationData: null,
                }
            }
        },
        props: {
            experience: Array
        },
        methods: {
            deletePerience(id) {
                this.$emit("deleteExperience", id);
            },
            getData() {
                this.$axios.get('/api/hrbase/personalAuth/info/getPersonalWorkExperience/' + this.$store.getters.user.detail.candidateDetailId).then(res => {
                    this.$set(this.data, 'dataList', res.data.data)//动态添加
                    console.log("getPersonalWorkExperience=>", this.data.dataList);
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
