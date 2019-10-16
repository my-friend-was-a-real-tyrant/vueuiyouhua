<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="display-4 text-center">企业HR认证 页</div>
          <form @submit.prevent="submit" autocomplete="off" method="post">
            <div>
              <h2>HR认证</h2>
              <TextField
                type='text'
                name='name'
                placeholder="姓名"
                v-model="newUser.hrUserName"
                :error='errors.hrUserName'>
              </TextField>
              <TextField
                type='text'
                name='name'
                placeholder="身份证号码"
                v-model="newUser.hrUserIdNo"
                :error='errors.hrUserIdNo'>
              </TextField>
              <div>
                <label>上传在职证明:</label>
                <input type="file" name="" id="zaizhiFile" @change="submitUpload('zaizhiFile')"/>
              </div>
              <div>
                <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上传头像:</label>
                <input type="file" name="" id="headImgFile" @change="submitUpload('headImgFile')"/>
              </div>
            </div>

            <br/>
            <div>
              <h2>企业认证</h2>
              <TextField
                type='text'
                name='name'
                placeholder="公司名称"
                v-model="newUser.ourCompanyName"
                :error='errors.ourCompanyName'>
              </TextField>
              <TextField
                type='text'
                name='name'
                placeholder="公司全称"
                v-model="newUser.ourCompanyFullName"
                :error='errors.ourCompanyFullName'>
              </TextField>
              <TextField
                type='text'
                name='name'
                placeholder="公司地址"
                v-model="newUser.companyAddress"
                :error='errors.companyAddress'>
              </TextField>
              <TextField
                type='text'
                name='name'
                placeholder="公司规模"
                v-model="newUser.companySize"
                :error='errors.companySize'>
              </TextField>
              <TextField
                type='text'
                name='name'
                placeholder="公司福利"
                v-model="newUser.companyLabel"
                :error='errors.companyLabel'>
              </TextField>
              <div>
                <label>营业执照:</label>
                <input type="file" name="" id="zhizhaoFile" @change="submitUpload('zhizhaoFile')"/>
              </div>
              <div>
                <label>公司图片:</label>
                <input type="file" name="" id="companyLogo" @change="submitUpload('companyLogo')"/>
              </div>
              <TextField
                type='text'
                name='name'
                placeholder="公司介绍"
                v-model="newUser.text"
                :error='errors.text'>
              </TextField>
            </div>
            <button type="submit" class="btn btn-info btn-block mt-4">提交</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TextField from './common/TextFieldGroup'

    export default {
        name: 'RegisterEnt',
        data() {
            return {
                newUser: {
                    zaizhiFileId: null,
                    headImgFileId: null,
                    licenseOfCompanyFileId: null,
                    companyLogoFileId: null,
                    hrUserName: '',
                    hrUserIdNo: '',
                    text: '',
                    companyLabel: '',
                    companySize: '',
                    ourCompanyFullName: '',
                    companyAddress: '',
                    ourCompanyName: '',
                },
                errors: {}
            }
        },
        components: {
            TextField
        },
        methods: {
            submitUpload(id) {
                var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
                // var file = document.querySelector('input[type=file]').files[num];
                var file = document.querySelector('#' + id).files[0];
                console.log(file);
                formData.append('file', file) // 'userfile' 这个名字要和后台获取文件的名字一样;


                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                    }
                }
                this.$axios.post('/api/file/fileUpload', formData, requestConfig).then((res) => {
                    console.log(res);
                    let fileId = res.data.data.fielId;
                    if (id == "zaizhiFile") {
                        this.newUser.zaizhiFileId = fileId;
                    } else if (id == "headImgFile") {
                        this.newUser.headImgFileId = fileId;
                    } else if (id == "zhizhaoFile") {
                        this.newUser.licenseOfCompanyFileId = fileId;
                    } else if (id == "companyLogo") {
                        this.newUser.companyLogoFileId = fileId;
                    }


                }).catch(err => {
                    console.log(err);
                })
            },

            submit() {
                console.log(this.newUser);
                this.$axios.post('/api/hrbase/hrUser/hrUserAuth', this.newUser).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$router.push('/hrDashboard')
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
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
