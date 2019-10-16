<template>
  <div class="create-rofile">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
          <h1 class="display-4 text-center">编辑个人资料</h1>
          <small class="d-block pb-3">* 表示必填项</small>
          <!-- form表单 -->
          <form @submit.prevent="submit">
            <TextField
              type="text"
              name="desiredIndustry"
              placeholder="* 期望行业"
              v-model="msgInfo.desiredIndustry"
              :error="errors.desiredIndustry"
              info="期望行业">
            </TextField>
            <TextField
              type="text"
              name="desiredFunction"
              placeholder="* 期望职能"
              v-model="msgInfo.desiredFunction"
              :error="errors.desiredFunction"
              info="期望职能">
            </TextField>
            <TextField
              type="text"
              name="desiredLocation"
              placeholder="期望地点"
              v-model="msgInfo.desiredLocation"
              :error="errors.desiredLocation"
              info="期望地点">
            </TextField>
            <TextField
              type="number"
              name="expectedAnnualSalary"
              placeholder="期望年薪"
              v-model="msgInfo.expectedAnnualSalary"
              :error="errors.expectedAnnualSalary"
              info="期望年薪">
            </TextField>
            <TextField
              type="number"
              name="currentMonthlySalary"
              placeholder="目前年薪"
              v-model="msgInfo.currentMonthlySalary"
              :error="errors.currentMonthlySalary"
              info="目前年薪">
            </TextField>
            <TextField
              type="text"
              name="skillLabel"
              placeholder="编程语言技能"
              v-model="msgInfo.skillLabel"
              :error="errors.skillLabel"
              info="语言能力">
            </TextField>
            <TextField
              type='text'
              name='additionalInformation'
              placeholder="自我评价"
              v-model="msgInfo.additionalInformation"
              :error='errors.additionalInformation'
              info='自我评价'>
            </TextField>
            <!-- <TextArea
               placeholder="附加信息"
               name='additionalInformation'
               v-model="msgInfo.additionalInformation"
               :error='errors.additionalInformation'
               info='附加信息'>
             </TextArea>-->
            <input type="submit" class="btn btn-info btn-block mt-4" value="提交">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TextField from './common/TextFieldGroup'
    import TextArea from './common/TextAreaGroup'
    import SelectList from './common/SelectListGroup'
    import InputGroup from './common/InputGroup'

    export default {
        name: 'CreateProfile',
        data() {
            return {
                msgInfo: { //数据
                    desiredIndustry: "",
                    desiredFunction: "",
                    desiredLocation: "",
                    expectedAnnualSalary: "",
                    currentMonthlySalary: "",
                    skillLabel: "",
                    additionalInformation: "",
                },
                dispalaySocialInputs: false,
                errors: {},  //提示内容
                options: [
                    {label: "0", value: "*请选择你的职业"},
                    {label: "Junior Developer", value: "前端初级工程师"},
                    {label: "Senior Developer", value: "前端中级工程师"},
                    {label: "HighDeveloper", value: "前端高级工程师"},
                    {label: "Manager", value: "前端管理"},
                    {label: "backend Developer", value: "后端开发"},
                    {label: "python machine learning", value: "python机器学习"},
                    {label: "Other", value: "其他"}
                ]
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getCurrentProfile();
            });
        },
        methods: {
            getCurrentProfile() {

                let parse = JSON.parse(window.localStorage.getItem('cUser'));
                console.log(parse);
                this.msgInfo.desiredIndustry = parse.detail.desiredIndustry;
                this.msgInfo.desiredFunction = parse.detail.desiredFunction;
                this.msgInfo.desiredLocation = parse.detail.desiredLocation;
                this.msgInfo.expectedAnnualSalary = parse.detail.expectedAnnualSalary;
                this.msgInfo.currentMonthlySalary = parse.detail.currentMonthlySalary;
                this.msgInfo.skillLabel = parse.detail.skillLabel;
                this.msgInfo.additionalInformation = parse.detail.additionalInformation;

                //判断内容是否有空的
                /*let profile = this.$store.getters.profile;

                profile.company = profile.company ? profile.company : "";
                profile.website = profile.website ? profile.website : "";
                profile.location = profile.location ? profile.company : "";
                profile.githubusername = profile.githubusername ? profile.githubusername : "";
                profile.bio = profile.bio ? profile.bio : "";

                profile.social = profile.social ? profile.social : {};
                profile.wechat = profile.social.wechat ? profile.social.wechat : "";
                profile.QQ = profile.social.QQ ? profile.social.QQ : "";
                profile.tengxunkt = profile.social.tengxunkt ? profile.social.tengxunkt : "";
                profile.wangyikt = profile.social.wangyikt ? profile.social.wangyikt : "";
                profile.skills = profile.skills.length ? profile.skills.join(",") : "";

                this.msgInfo = profile*/
            },
            submit() {
                let parse = JSON.parse(window.localStorage.getItem('cUser'));
                this.msgInfo.candidateDetailId = parse.detail.candidateDetailId;
                this.$axios.post('/api/hrbase/candidateDetail/insertOrUpdate', this.msgInfo).then(res => {
                    console.log(res);
                    this.$axios.post('/api/hrbase/personalAuth/info/getUser').then(res2 => {
                        parse.detail = res2.data.data.detail;
                        window.localStorage.setItem("cUser", JSON.stringify(parse));
                        this.$router.push('/dashboard')
                    }).catch(err => {

                    });
                    this.errors = {}
                    /*//存储数据
                    this.$store.dispatch("setProfile", res.data);*/
                    //路由跳转
                    // this.$router.push('/dashboard')
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
            SelectList,
            InputGroup
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
