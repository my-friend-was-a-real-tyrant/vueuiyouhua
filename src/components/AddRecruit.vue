<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
        <h1 class="display-4 text-center">发布招聘信息</h1>
        <small class="d-block pb-3">* 表示必填项</small>
        <form @submit.prevent="submit">
          <div style="display: flex;">
            <TextField
              type="text"
              name="jobName"
              placeholder="* 招聘岗位名称"
              v-model="msgInfo.jobName"
              :error="errors.jobName">
            </TextField>
            <SelectListGroup
              name="isUrgent"
              placeholder="* 是否加急"
              v-model="msgInfo.isUrgent"
              :options="jiajis"
              :error="errors.isUrgent"
              info="是否加急">
            </SelectListGroup>
          </div>
          <div style="display: flex;">
            <SelectListGroup
              name="industryCode"
              :style="'flex:1'"
              :error="errors.industryCode"
              v-model="msgInfo.industryCode"
              :options="industrys"
              info="细分类型">
            </SelectListGroup>
            <SelectListGroup
              name="recruitmentType"
              :style="'flex:1'"
              :error="errors.recruitmentType"
              v-model="msgInfo.recruitmentType"
              :options="recruitmentTypes"
              info="招聘类型">
            </SelectListGroup>
          </div>
          <div style="display: flex;
    flex-direction: row;">
            <SelectListGroup
              name="status"
              :style="'flex:1'"
              :error="errors.provinceCode"
              v-model="msgInfo.provinceCode"
              :options="provinces"
              @change="changeCity"
              info="工作省份">
            </SelectListGroup>
            <SelectListGroup
              name="status"
              :style="'flex:1'"
              :error="errors.cityCode"
              v-model="msgInfo.cityCode"
              :options="citys"
              info="工作城市">
            </SelectListGroup>
          </div>
          <div style="display: flex;">
            <TextField
              type="text"
              name="title"
              placeholder="* 工作经验"
              v-model="msgInfo.experience"
              :error="errors.experience">
            </TextField>
            <TextField
              type="text"
              name="age"
              placeholder="* 年龄"
              v-model="msgInfo.age"
              :error="errors.age">
            </TextField>
          </div>

          <TextField
            type="text"
            name="welfare"
            placeholder="* 企业福利"
            v-model="msgInfo.welfare"
            :error="errors.welfare">
          </TextField>
          <div style="display: flex;
    flex-direction: row;">
            <TextField
              type="number"
              name="minMonthlySalary"
              placeholder="* 最低月薪资"
              v-model="msgInfo.minMonthlySalary"
              :error="errors.minMonthlySalary">
            </TextField>
            <TextField
              type="number"
              name="title"
              placeholder="* 最高月薪资"
              v-model="msgInfo.maxMonthlySalary"
              :error="errors.maxMonthlySalary">
            </TextField>
            <TextField
              type="number"
              name="title"
              placeholder="* 薪资月数"
              v-model="msgInfo.monthlyNumber"
              :error="errors.monthlyNumber">
            </TextField>
          </div>
          <div style="display: flex;">
            <TextField
              type="text"
              name="subordinateDepartments"
              placeholder="* 所属部门"
              v-model="msgInfo.subordinateDepartments"
              :error="errors.subordinateDepartments">
            </TextField>
            <TextField
              type="text"
              name="numberOfSubordinates"
              placeholder="* 下属人数"
              v-model="msgInfo.numberOfSubordinates"
              :error="errors.numberOfSubordinates">
            </TextField>
            <TextField
              type="text"
              name="reportingObject"
              placeholder="* 汇报对象"
              v-model="msgInfo.reportingObject"
              :error="errors.reportingObject">
            </TextField>
          </div>
          <div style="display: flex;">
            <TextField
              type="text"
              name="title"
              placeholder="* 招聘人数"
              v-model="msgInfo.recruitNumber"
              :error="errors.recruitNumber">
            </TextField>
            <TextField
              type="text"
              name="title"
              placeholder="* 招聘天数"
              v-model="msgInfo.recruitDays"
              :error="errors.recruitDays">
            </TextField>
          </div>
          <SelectListGroup
            name="pubFlag"
            :style="'flex:1'"
            :error="errors.pubFlag"
            v-model="msgInfo.pubFlag"
            :options="status"
            info="发布状态">
          </SelectListGroup>
          <TextArea
            placeholder="专业要求"
            name='professionalRequirements'
            v-model="msgInfo.professionalRequirements"
            :error='errors.professionalRequirements'>
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
        name: 'AddRecruit',
        data() {
            return {
                provinces: [],
                citys: [],
                industrys: [], // 细分类型
                recruitmentTypes: [], // 招聘类型
                educations: [], // 学历
                status: [{
                    value: "0",
                    text: "未发布"
                },
                    {
                        value: "1",
                        text: "已发布"
                    }],
                jiajis: [{
                    value: "0",
                    text: "否"
                },
                    {
                        value: "1",
                        text: "是"
                    }],
                items: [],
                msgInfo: {
                    isUrgent: "0"
                },
                errors: ""
            }
        },
        methods: {

            submit() {
                this.msgInfo.jobPlace = this.msgInfo.cityCode;
                this.$axios.post('/api/hrbase/hrPubPosition/add', this.msgInfo).then(res => {
                    console.log(res.data);
                    if (res.data.code == 0) {
                        this.$router.push('/hrRecruit')
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            initData() {

                // 细分类型
                this.$axios.get('/api/dicinfo/sysDicinfo/getSysDicinfoByPcode/INDUSTRYS').then(res => {
                    console.log(res.data);
                    for (var i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].dicCode;
                        obj.text = res.data.data[i].dicName;
                        this.industrys.push(obj);
                    }
                    this.msgInfo.industryCode = this.industrys[0].value;
                }).catch(err => {
                    console.log(err);
                })

                // 招聘类型
                this.$axios.get('/api/dicinfo/sysDicinfo/getSysDicinfoByPcode/RECRUITMENTTYPES').then(res => {
                    console.log(res.data);
                    for (var i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].dicCode;
                        obj.text = res.data.data[i].dicName;
                        this.recruitmentTypes.push(obj);
                    }
                    this.msgInfo.recruitmentType = this.industrys[0].value;
                }).catch(err => {
                    console.log(err);
                })

                // 学历信息
                this.$axios.get('/api/dicinfo/sysDicinfo/getSysDicinfoByPcode/EDUCATION').then(res => {
                    console.log(res.data);
                    for (var i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].dicCode;
                        obj.text = res.data.data[i].dicName;
                        this.educations.push(obj);
                    }
                    this.msgInfo.education = this.industrys[0].value;
                }).catch(err => {
                    console.log(err);
                })

            },

            getProvince(pid) {
                this.$axios.post('/api/sysDistrict/sysDistrictinfo/findChildrenListByPId?pid=' + pid).then(res => {
                    console.log(res);
                    for (var i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].districtId;
                        obj.text = res.data.data[i].fullName;
                        this.provinces.push(obj);
                    }
                    this.msgInfo.provinceCode = this.provinces[0].value;
                    this.getCity(this.provinces[0].value);
                }).catch(err => {
                    if (err.response.data) {
                        this.errors = err.response.data
                    }
                })
            },
            changeCity(evt) {
                this.getCity(evt);
            },
            getCity(pid) {
                console.log("provinceCode=>", pid);
                this.citys = [];
                this.$axios.post('/api/sysDistrict/sysDistrictinfo/findChildrenListByPId?pid=' + pid).then(res => {
                    console.log(res);
                    for (var i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].districtId;
                        obj.text = res.data.data[i].districtName;
                        this.citys.push(obj);
                    }
                    this.msgInfo.cityCode = this.citys[0].value;
                }).catch(err => {
                    if (err.response.data) {
                        this.errors = err.response.data
                    }
                });
            },

        },
        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.getProvince('');
                vm.initData();
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
