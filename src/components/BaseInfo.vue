<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <h1 class="display-4 text-center">基础信息输入</h1>
        <small class="d-block pb-3">* 表示必填项</small>
        <form @submit.prevent="submit">
          <div>
            <div>

            </div>
            <div>
              <TextField
                type="text"
                name="realName"
                placeholder="* 姓名"
                :disabled="true"
                v-model="msgInfo.realName"
                :error="errors.realName">
              </TextField>
              <div style="display: flex;
    flex-direction: row;">
                <label for="">性别：</label>
                <div id="example">
                  <input type='radio' id='wuhan' value='0' v-model='msgInfo.sex' checked="checked"/>
                  <label for='wuhan'>男</label>

                  <input type='radio' id='xian' value='1' v-model='msgInfo.sex'/>
                  <label for='xian'>女</label>
                </div>

              </div>
              <TextField
                type="text"
                name="companyName"
                placeholder="* 公司名称"
                v-model="msgInfo.companyName"
                :error="errors.companyName">
              </TextField>
              <SelectListGroup
                name="industryName"
                :error="errors.industryName"
                v-model="msgInfo.industryName"
                :options="industrys"
                info="当前行业">
              </SelectListGroup>
              <SelectListGroup
                name="functionName"
                :error="errors.functionName"
                v-model="msgInfo.functionName"
                :options="functions"
                info="当前职能">
              </SelectListGroup>
              <div style="display: flex;
    flex-direction: row;">
                <SelectListGroup
                  name="year"
                  :style="'flex:0.5'"
                  :error="errors.year"
                  v-model="msgInfo.year"
                  :options="years"
                  info="开始工作年份">
                </SelectListGroup>
                <TextField
                  :style="'flex:1'"
                  type="text"
                  name="postName"
                  placeholder="* 职位名称"
                  v-model="msgInfo.postName"
                  :error="errors.postName">
                </TextField>
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
                  info="所属省份">
                </SelectListGroup>
                <SelectListGroup
                  name="status"
                  :style="'flex:1'"
                  :error="errors.cityCode"
                  v-model="msgInfo.cityCode"
                  :options="citys"
                  info="所属省份">
                </SelectListGroup>
              </div>
            </div>
          </div>

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
        name: 'BaseInfo',
        data() {
            return {
                provinces: [],
                options: [],
                citys: [],
                years: [],
                functions: [],
                industrys: [],
                sex: 0,
                educations: [],
                msgInfo: {
                    provinceCode: null, //
                    cityCode: null, //
                    year: null,
                    sex: 0,
                    industryName: null,
                    postName: "",
                    functionName: null,
                    realName: "",
                    companyName: "",
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
                this.$axios.post('/api/hrbase/api/1011/baseInfoEdit', this.msgInfo).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$router.push("/dashboard");
                        this.errors = ""; // 清空错误提示
                    } else {
                        alert(res.data.message);
                    }

                }).catch(err => {
                    if (err.response.data) {
                        this.errors = err.response.data
                    }
                })
            },
            initData() {

                let parse = JSON.parse(window.localStorage.getItem('cUser'));
                console.log(parse);
                this.msgInfo.realName = parse.candidateUser.candidateUserName;

                this.$axios.get('/api/dicinfo/sysDicinfo/getSysDicinfoByPcode/YEARS').then(res => {
                    console.log(res.data);
                    for (var i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].dicCode;
                        obj.text = res.data.data[i].dicName;
                        this.years.push(obj);
                    }
                    this.msgInfo.year = this.years[0].value;
                }).catch(err => {
                    console.log(err);
                })
                this.$axios.get('/api/dicinfo/sysDicinfo/getSysDicinfoByPcode/INDUSTRYS').then(res => {
                    console.log(res.data);
                    for (var i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].dicCode;
                        obj.text = res.data.data[i].dicName;
                        this.industrys.push(obj);

                    }
                    this.msgInfo.industryName = this.industrys[0].value;
                }).catch(err => {
                    console.log(err);
                })
                this.$axios.get('/api/dicinfo/sysDicinfo/getSysDicinfoByPcode/FUNCTIONS').then(res => {
                    console.log(res.data);
                    for (var i in res.data.data) {
                        let obj = {};
                        obj.value = res.data.data[i].dicCode;
                        obj.text = res.data.data[i].dicName;
                        this.functions.push(obj);
                    }
                    this.msgInfo.functionName = this.functions[0].value;

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
        created() {
            this.getProvince('');
            this.initData();
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
