<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
        <h1 class="display-4 text-center">添加教育经历</h1>
        <small class="d-block pb-3">* 表示必填项</small>
        <form @submit.prevent="submit">
          <TextField
            type="text"
            name="schoolName"
            placeholder="* 学校或培训"
            v-model="msgInfo.schoolName"
            :error="errors.schoolName">
          </TextField>
          <SelectListGroup
            type="text"
            name="education"
            placeholder="* 学历"
            v-model="msgInfo.education"
            :options="educations"
            :error="errors.education">
          </SelectListGroup>
          <TextField
            type="text"
            name="professionalName"
            placeholder="专业"
            v-model="msgInfo.professionalName"
            :error="errors.professionalName">
          </TextField>
          <h6>开始时间</h6>
          <TextField
            type='date'
            name='studyStart'
            v-model="msgInfo.studyStart"
            :error='errors.studyStart'>
          </TextField>

          <h6>结束时间</h6>
          <TextField
            type='date'
            name='studyEnd'
            v-model="msgInfo.studyEnd"
            :error='errors.studyEnd'
            :disabled='msgInfo.current'>
          </TextField>
          <div class="form-check mb-4">
            <input
              class="form-check-input"
              type="checkbox"
              name="current"
              v-model="msgInfo.current"
              id="current"/>
            <label class="form-check-label" for="current">
              当前在校
            </label>
          </div>
          <!--   <TextArea
               placeholder="在校表现"
               name='description'
               v-model="msgInfo.description"
               :error='errors.description'
               info='说说你在学习过程的经历'>
               </TextArea>-->
          <input type="submit" class="btn btn-info btn-block mt-4" value="添加">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import TextField from './common/TextFieldGroup'
    import TextArea from './common/TextAreaGroup'
    import SelectListGroup from './common/SelectListGroup'

    export default {
        name: 'AddEducation',
        data() {
            return {
                educations: [],
                msgInfo: {
                    education: "", // 学历
                    studyEnd: "", // 就读结束时间
                    studyStart: "", // 就读开始时间
                    schoolName: "", // 学校名称
                    current: false,
                    professionalName: "" // 专业名称
                },
                errors: ""
            }
        },
        methods: {
            getEducations() {
                // 教育经历
                this.$axios.get('/api/dicinfo/sysDicinfo/getSysDicinfoByPcode/EDUCATION').then(res => {
                    console.log(res.data);
                    for(var i in res.data.data){
                      let obj = {};
                      obj.value = res.data.data[i].dicCode;
                      obj.text = res.data.data[i].dicName;
                      this.educations.push(obj);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            submit() {
                if (this.msgInfo.current) {
                    this.msgInfo.to = "在校"
                }
                this.msgInfo.candidateDetailId = this.$store.getters.user.detail.candidateDetailId;
                this.$axios.post('/api/hrbase/relationCandidateEducationExperience/add', this.msgInfo).then(res => {
                    console.log(res);
                    this.errors = ""; // 清空错误提示
                    this.$router.push("/dashboard");

                }).catch(err => {
                    if (err.response.data) {
                        this.errors = err.response.data
                    }
                })
            }
        },
        components: {
            TextField,
            TextArea,
            SelectListGroup
        },
        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.getEducations()
            })
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
