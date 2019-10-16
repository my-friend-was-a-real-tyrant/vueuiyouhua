<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <h1 class="display-4 text-center">实名认证</h1>
        <small class="d-block pb-3">* 表示必填项</small>
        <form @submit.prevent="submit">
          <TextField
            type="text"
            name="realName"
            placeholder="* 姓名"
            v-model="msgInfo.realName"
            :error="errors.realName">
          </TextField>
          <TextField
            type="text"
            name="idNo"
            placeholder="* 身份证"
            v-model="msgInfo.idNo"
            :error="errors.idNo">
          </TextField>
          <input type="submit" class="btn btn-info btn-block mt-4" value="提交">
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
        name: 'IdCardAuth',
        data() {
            return {
                educations: [],
                msgInfo: {
                    idNo: "", //
                    realName: "", //
                },
                errors: {},
            }
        },
        methods: {

            submit() {
                if (this.msgInfo.current) {
                    this.msgInfo.to = "在校"
                }
                console.log(this.msgInfo);
                this.$axios.post('/api/hrbase/api/1011/idCardAuth?realName=' + this.msgInfo.realName + "&idNo=" + this.msgInfo.idNo).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.errors = ""; // 清空错误提示
                        if (res.data.data) {
                            this.$router.push("/dashboard");
                        } else {
                            let parse = JSON.parse(window.localStorage.getItem('cUser'));
                            parse.candidateUser.candidateUserName = this.msgInfo.realName;
                            window.localStorage.setItem("cUser", JSON.stringify(parse));
                            this.$router.push('/baseInfo')
                        }
                    } else {
                        alert(res.data.message);
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
            TextArea,
            SelectListGroup
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
