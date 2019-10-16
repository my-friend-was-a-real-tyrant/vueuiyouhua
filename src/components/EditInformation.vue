<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
        <h1 class="display-4 text-center">企业对外信息维护</h1>
        <small class="d-block pb-3">* 表示必填项</small>
        <form @submit.prevent="submit">
          <TextField
            type="text"
            name="companyName"
            placeholder="* 公司名称"
            v-model="obj.companyName"
            :error="errors.companyName">
          </TextField>
          <TextField
            type="text"
            name="companyAddress"
            placeholder="* 公司地址"
            v-model="obj.companyAddress"
            :error="errors.companyAddress">
          </TextField>
          <TextField
            type="text"
            name="companyPhone"
            placeholder="* 联系电话"
            v-model="obj.companyPhone"
            :error="errors.companyPhone">
          </TextField>
          <TextField
            type="text"
            name="companyEmail"
            placeholder="* 公司邮箱"
            v-model="obj.companyEmail"
            :error="errors.companyEmail">
          </TextField>
          <TextField
            type="number"
            name="recordNumber"
            placeholder="* 备案号"
            v-model="obj.recordNumber"
            :error="errors.recordNumber">
          </TextField>
          <TextField
            type="number"
            name="serviceHotline"
            placeholder="* 服务热线"
            v-model="obj.serviceHotline"
            :error="errors.serviceHotline">
          </TextField>
          <TextField
            type="number"
            name="workingDay"
            placeholder="* 工作日"
            v-model="obj.workingDay"
            :error="errors.workingDay">
          </TextField>
          <TextField
            type="number"
            name="restDay"
            placeholder="* 休息日"
            v-model="obj.restDay"
            :error="errors.restDay">
          </TextField>
          <div>
            <label>人力资源许可证路径:</label>
            <input type="file" name="" id="humanResourcesFilePath" @change="submitUpload('humanResourcesFilePath')"/>
          </div>
          <div>
            <label>&nbsp;&nbsp;&nbsp;电子营业执照路径:</label>
            <input type="file" name="" id="businessLicenseFilePath" @change="submitUpload('businessLicenseFilePath')"/>
          </div>
          <TextArea
            placeholder="职位发布规则"
            name='jobReleaseRules'
            v-model="obj.jobReleaseRules"
            :error='errors.jobReleaseRules'>
						</TextArea>
          <TextArea
            placeholder="使用帮助"
            name='useHelp'
            v-model="obj.useHelp"
            :error='errors.useHelp'>
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
    import SelectListGroup from './common/SelectListGroup'

    export default {
        name: 'EditInformation',
        data() {
            return {
                items: [],
                obj: {},
                errors: ""
            }
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
                };
                this.$axios.post('/api/file/fileUpload', formData, requestConfig).then((res) => {
                    console.log(res);
                    let fileId = res.data.data.fielId;
                    if (id == "businessLicenseFilePath") {
                        this.obj.businessLicenseFilePath = fileId;
                    } else if (id == "humanResourcesFilePath") {
                        this.obj.humanResourcesFilePath = fileId;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            submit() {

                this.$axios.post('/api/admin/ourCompanyForeignInformation/saveOrUpdate', this.obj).then(res => {
                    console.log(res.data);
                    if (res.data.code == 0) {
                        this.$router.push('/hrDashboard')
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            getData() {
                this.$axios.post('/api/hrbase/hrUser/getHrCompanyId').then(res => {
                    console.log(res.data);
                    var companyId = res.data.data;
                    this.$axios.get('/api/admin/ourCompanyForeignInformation/getOurCompanyInformation?companyId=' + res.data.data, this.msgInfo).then(res => {
                        console.log("getOurCompanyInformation", res.data);
                        this.obj = res.data.data;
                        this.obj.companyId = companyId;
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                })


            },
        },
        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.getData()
            })
        },
        components: {
            TextField,
            TextArea,
            SelectListGroup,
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
