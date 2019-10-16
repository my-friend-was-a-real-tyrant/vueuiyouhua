<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
        <h1 class="display-4 text-center">添加个人经历</h1>
        <small class="d-block pb-3">* 表示必填项</small>
        <form @submit.prevent="submit">
          <TextField
            type="text"
            name="jobTitle"
            placeholder="* 职位"
            v-model="msgInfo.jobTitle"
            :error="errors.jobTitle">
          </TextField>
          <TextField
            type="text"
            name="companyName"
            placeholder="* 公司"
            v-model="msgInfo.companyName"
            :error="errors.companyName">
          </TextField>
          <TextField
            type="text"
            name="workPlace"
            placeholder="* 地点"
            v-model="msgInfo.workPlace"
            :error="errors.workPlace">
          </TextField>
          <h6>开始时间</h6>
          <TextField
            type="date"
            name="appointmentStart"
            v-model="msgInfo.appointmentStart"
            :error="errors.appointmentStart">
          </TextField>
          <h6>结束时间</h6>
          <TextField
            type="date"
            name="appointmentEnd"
            v-model="msgInfo.appointmentEnd"
            :error="errors.appointmentEnd"
            :disabled="msgInfo.current">
          </TextField>
          <!--	<div class="form-check mb-4">
              <input type="checkbox"
                class="form-check-input"
                 v-model="msgInfo.current"
                 id="current"
                name="current">
                <label class="form-check-label" for="current">当前在职</label>
            </div>-->
          <TextArea
            placeholder="工作描述"
            name='reportingObject'
            v-model="msgInfo.reportingObject"
            :error='errors.reportingObject'
            info='其他工作职责等'>
						</TextArea>
          <input type="submit" class="btn btn-info btn-block mt-4" value="添加">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import TextField from './common/TextFieldGroup'
    import TextArea from './common/TextAreaGroup'

    export default {
        name: 'AddExperience',
        data() {
            return {
                msgInfo: {
                    jobTitle: "",
                    companyName: "",
                    workPlace: "",
                    appointmentStart: "",
                    appointmentEnd: "",
                    reportingObject: "",
                },
                errors: ""
            }
        },
        methods: {
            submit() {

                if (this.msgInfo.current) {
                    this.msgInfo.to = "在职"
                }
                this.msgInfo.candidateDetailId = this.$store.getters.user.detail.candidateDetailId;
                this.$axios.post('/api/hrbase/relationCandidateWorkExperience/addOrUpdate', this.msgInfo).then(res => {
                    if(res.data.code == "0"){
                        this.errors = ""; // 清空错误提示
                        this.$router.push("/dashboard");
                    }
                }).catch(err => {
                    if (err.response.data) {
                        this.errors = err.response.data
                    }
                })
            }
        },
        components: {
            TextField,
            TextArea
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
