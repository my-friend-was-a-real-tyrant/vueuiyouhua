<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">招聘信息</h1>
          <p v-if="user !== null" class="lead text-muted">
            <router-link v-if="this.profile== null" to="/create-profile">{{user.candidateUser.candidateUserName}}
            </router-link>
            <router-link v-else :to="`/profile/${profile.handle}`">{{user.candidateUser.candidateUserName}}
            </router-link>
          </p>

          <div>
            <!-- 信息 经历 教育 -->
            <div class="btn-group mb-4" role="group">
              <router-link to="/add-Recruit" class="btn btn-light">
                <i class="fas fa-user-circle text-info mr-1"></i>
                招聘信息发布
              </router-link>
            </div>

            <!-- 展示个人经历 -->
            <div>
              <h4>招聘信息</h4>
              <table class="table">
                <thead>
                <tr>
                  <th>招聘公司</th>
                  <th>细分行业</th>
                  <th>发布公司</th>
                  <th>发布人</th>
                  <th>招聘类型</th>
                  <th>是否加急</th>
                  <th>岗位名称</th>
                  <th>招聘区域</th>
                  <th>发布时间</th>
                  <th>学历要求</th>
                  <th>工作经验</th>
                  <th>年龄</th>
                  <th>企业福利</th>
                  <th>最低月薪资</th>
                  <th>最高月薪资</th>
                  <th>薪资月数</th>
                  <th>所属部门</th>
                  <th>汇报对象</th>
                  <th>专业要求</th>
                  <th>发布状态</th>
                  <th>下属人数</th>
                  <th>招聘人数</th>
                  <th>招聘天数</th>
                  <th>招聘截止日期</th>
                  <th style="width: 20%"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="data in dataList" :key="'key_'+data.ourCompanyNewsId">
                  <td>{{data.title}}</td>
                  <td>{{data.keyWord}}</td>
                  <td>{{data.itemName}}</td>
                  <td>{{data.industryCode}}</td>
                  <td>{{data.content}}</td>
                  <td>{{data.pubStatus=='0'?'未发布':'已发布'}}</td>
                  <td>{{data.orderIndex}}</td>
                  <td>{{data.sendTime}}</td>
                  <td>{{data.updTime}}</td>
                  <td>
                    <div>
                      <router-link :to="'/edit-news/'+data.ourCompanyNewsId"
                                   class="btn btn-light">
                        <i class="fas fa-graduation-cap text-info mr-1"></i>
                        修改
                      </router-link>
                      <button class="btn btn-danger" @click="deleteNews(data.ourCompanyNewsId)">删除</button>
                    </div>

                  </td>
                </tr>
                </tbody>
              </table>
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
  </div>
</template>

<script>
    import ProfileActived from './common/ProfileActived.vue'
    import Experience from './common/Experience.vue'
    import Education from './common/Education.vue'
    import PageHelper from './common/PageHelper.vue'


    export default {
        name: 'HrRecruit',
        data() {
            return {
                user: null,
                data: {},
                profile: {},
                dataList: [],
                profiles: [],
                curPage: 1,//当前页
                total: 0,//总共页数
                pageSize: 20,//每页记录数
                dataChanged: false
            }
        },

        methods: {
            deleteNews(id) {
                this.$axios.post(`/api/admin/ourCompanyNews/remove?id=` + id).then(res => {
                    if (res.data.code == 0) {
                        this.getData();
                    }
                }).catch(err => {
                    console.log(err)
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
                    for (var i in this.dataList) {
                        var content = this.dataList[i].content;
                        if (content.length > 15) {
                            this.dataList[i].content = content.substring(0, 15) + "...";
                        }
                    }

                    this.curPage = res.data.data.curPage;
                    this.pageSize = res.data.data.limit;
                    this.total = res.data.data.pages;
                }).catch(err => {

                })
            }
        },

        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.getData();
            })
        },
        created() {

        },
        components: {
            ProfileActived,
            Experience,
            Education,
            PageHelper
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
