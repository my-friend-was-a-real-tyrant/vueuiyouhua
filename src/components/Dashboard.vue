<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">个人资料</h1>
          <p v-if="user !== null" class="lead text-muted">
            <router-link v-if="this.profile== null" to="/create-profile">{{user.candidateUser.candidateUserName}}
            </router-link>
            <router-link v-else :to="`/profile/${profile.handle}`">{{user.candidateUser.candidateUserName}}
            </router-link>
          </p>

          <div v-if="profile !== null">
            <div class="fileBox">
              上传简历
              <input type="file" class="fileBtn" name="file" @change="uploadBefore">
            </div>
            <div>
              <h4>
                <span>职业意向</span>
              </h4>
              <h5>
                <h6>期望行业：{{user.detail.desiredIndustry}}</h6>
                <h6>期望职能：{{user.detail.desiredFunction}}</h6>
                <h6>期望地点：{{user.detail.desiredLocation}}</h6>
                <h6>期望年薪：{{user.detail.expectedAnnualSalary}}</h6>
                <h6>目前年薪：{{user.detail.currentMonthlySalary}}</h6>
              </h5>
              <h4>
                <span>语言能力</span>
              </h4>
              <h5>
                <h6>{{user.detail.skillLabel}}</h6>
              </h5>
              <h4>
                <span>自我评价</span>
              </h4>
              <h5>
                <h6>{{user.detail.additionalInformation}}</h6>
              </h5>
              <!-- <h4>
                 <span>附加信息</span>
               </h4>
               <h5>
                 <h6>{{user.detail.additionalInformation}}</h6>
               </h5>-->
            </div>
            <!-- 信息 经历 教育 -->
            <ProfileActived></ProfileActived>

            <!-- 展示个人经历 -->
            <Experience @deleteExperience="deleteExperience" :experience="data.dataList"></Experience>

            <!-- 展示教育经历 -->
            <Education @deletecation="deletecation" :education="data.educationData"></Education>

            <!-- 删除账户按钮 -->
            <div class="mb-3 mt-3">
              <button class="btn btn-danger" @click="deleteClick">删除当前账户</button>
            </div>
          </div>
          <div v-else>
            <p>没有任何相关的个人信息,请添加你的个人信息</p>
            <router-link to="/create-profile" class="btn btn-info btn-lg">请添加个人信息</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import ProfileActived from './common/ProfileActived.vue'
    import Experience from './common/Experience.vue'
    import Education from './common/Education.vue'

    export default {
        name: 'Dashboard',
        data() {
            return {
                user: null,
                data: {},
                profile: {},

            }
        },

        methods: {
            getProfileData() {
                this.$axios.post('/api/hrbase/personalAuth/info/getUser').then(res => {
                    this.profile = res.data.data.detail;
                }).catch(err => {

                })
            },
            uploadBefore() {
                var formData = new window.FormData(); // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
                console.log(document.querySelector('input[type=file]'));
                var file =document.querySelector('input[type=file]').files[0];
                formData.append('file', file); // 'userfile' 这个名字要和后台获取文件的名字一样;
                console.log(file);
                this.$axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;charse=UTF-8';
                console.log(formData);
                this.$axios({
                    method: 'post',
                    data: formData,
                    transformRequest: [function () {
                        return formData;
                    }],
                    url: '/api/file/fileUpload'
                }).then(res => {
                    console.log(res.data);
                }).catch(err => {

                });

            },
            // 删除当前个人账户
            deleteClick() {
                console.log(1)
                this.$axios.delete('/api/profile').then(res => {
                    this.profile = null;
                    // 更新store
                    this.$store.dispatch("clearCurrentState");
                    //路由跳转

                    this.$router.push('/login')

                }).catch(err => {
                    // console.log(err)
                })
            },
            // 删除个人经历
            deleteExperience(id) {  //接受子组件
                this.$axios.post(`/api/hrbase/relationCandidateWorkExperience/remove?id=` + id).then(res => {
                    if (res.data.code == 0) {
                        this.getData();
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 删除教育经历
            deletecation(id) {   //接受子组件
                this.$axios.post(`/api/hrbase/relationCandidateEducationExperience/remove?id=` + id).then(res => {
                    if (res.data.code == 0) {
                        this.getData();
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            getData() {

                let parse = JSON.parse(window.localStorage.getItem('cUser'));
                console.log("parse", parse);
                this.$axios.get('/api/hrbase/personalAuth/info/getPersonalEducationExperience/' + parse.detail.candidateDetailId).then(res => {

                    // this.data.educationData = res.data.data;
                    this.$set(this.data, 'educationData', res.data.data)//动态添加
                    console.log("getPersonalEducationExperience=>", this.data.educationData);
                }).catch(err => {
                    console.log(err);
                });
                this.$axios.get('/api/hrbase/personalAuth/info/getPersonalWorkExperience/' + parse.detail.candidateDetailId).then(res => {
                    // this.data.dataList = res.data.data;
                    this.$set(this.data, 'dataList', res.data.data)//动态添加
                    console.log("getPersonalWorkExperience=>", this.data.dataList);
                }).catch(err => {
                    console.log(err);
                });
            }
        },

        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.getData();
                let parse = JSON.parse(window.localStorage.getItem('cUser'));
                vm.user = parse;
            })
        },
        created() {

        },

        components: {
            ProfileActived,
            Experience,
            Education
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fileBox{
    width: 48px;
    height: 14px;
    padding: 9px 15px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    border-radius: 3px;
  }
  .fileBtn{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    background: transparent;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
  }
</style>
