<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1 class="mb-3 mt-4 text-center">企业介绍及招聘岗位</h1>
        <div class="col-12" style="display: flex;">
          <TextField
            type="text"
            name="schoolName"
            :style="'flex:1'"
            v-model="keyword"
            placeholder="* 岗位搜索">
          </TextField>
          <div style="flex:0.5;">
            <button @click="getData" class="btn btn-info btn-block " >搜索</button>
          </div>
        </div>
        <div>
          <div style="display: flex;flex:0.5;border: 1px solid #ccc;" v-for="data in dataList" :key="'key_'">
            <div style="flex:1;">
              <h4>{{data.jobName}}</h4>
              <h5>
                <span>{{data.minMonthlySalary}}~{{data.maxMonthlySalary}}</span> &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>{{data.jobPlace}}</span> &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>{{data.education}}</span> &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>{{data.experience}}年以上</span>
              </h5>
              <h6>
                <span>{{data.releaseTime}}</span>
                <span>投递后：5个工作日内反馈</span>
              </h6>
            </div>
            <div style="flex:1;">
              <h5>{{data.recruitmentCompanyId}}</h5>
              <h5>{{data.professionalRequirements}}</h5>
              <h5>
                <span v-for="obj in data.hrPubPositionLanguageAbility">
                  {{obj.languageAbilityCode}}
                </span>
              </h5>
            </div>
          </div>
        </div>
        <PageHelper
          v-if="!dataChanged"
          ref="pager"
          :pageSize="pageSize"
          :page="curPage"
          :total="total"
          @setPage="gotoPage"
          @setRowNum="changeRowNum"/>
      </div>
    </div>
  </div>
</template>

<script>
    import ProfileItem from './common/ProfileItem.vue'
    import PageHelper from './common/PageHelper.vue'
    import TextField from './common/TextFieldGroup'

    export default {
        name: 'PostManager',
        data() {
            return {
                dataList: [],
                profiles: [],
                curPage: 1,//当前页
                total: 0,//总共页数
                pageSize: 20,//每页记录数
                dataChanged: false
            }
        },
        methods: {
            refresh() {//用于刷新组件，需手动调用
                this.dataChanged = true
                this.$nextTick(() => {
                    this.dataChanged = false
                })
            },
            gotoPage(page) {
                this.getData(page);
            },
            changeRowNum(pageSize) {
            },
            getData() {
                this.$axios.post('/api/hrbase/hrPubPosition/list', {
                    "limitParams": {
                        "page": this.curPage,
                        "limit": this.pageSize
                    },
                    "queryWrapper": {
                        "jobName": this.keyword
                    },
                }).then(res => {
                    console.log("getData=>", res);
                    this.dataList = res.data.data.records;
                    this.curPage = res.data.data.curPage;
                    this.pageSize = res.data.data.limit;
                    this.total = res.data.data.pages;
                }).catch(err => {

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
            ProfileItem,
            PageHelper
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
