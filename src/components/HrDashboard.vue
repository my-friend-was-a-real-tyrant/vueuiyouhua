<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">企业动态</h1>
          <p v-if="user !== null" class="lead text-muted">
            <router-link v-if="this.profile== null" to="/create-profile">{{user.candidateUser.candidateUserName}}
            </router-link>
            <router-link v-else :to="`/profile/${profile.handle}`">{{user.candidateUser.candidateUserName}}
            </router-link>
          </p>

          <div>
            <!-- 信息 经历 教育 -->
            <div class="btn-group mb-4" role="group">
              <router-link to="/edit-Information" class="btn btn-light">
                <i class="fas fa-user-circle text-info mr-1"></i>
                企业对外宣传信息维护
              </router-link>
              <router-link to="/add-news" class="btn btn-light">
                <i class="fas fa-graduation-cap text-info mr-1"></i>
                添加企业动态
              </router-link>

            </div>

            <!-- 展示个人经历 -->
            <div>
              <h4>企业动态</h4>
              <table class="table">
                <thead>
                <tr>
                  <th>标题</th>
                  <th>关键字</th>
                  <th>所属栏目</th>
                  <th>细分行业</th>
                  <th>内容</th>
                  <th>发布状态</th>
                  <th>排序</th>
                  <th>发布时间</th>
                  <th>更新时间</th>
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
        name: 'HrDashboard',
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
                this.$axios.post('/api/admin/ourCompanyNews/list', {
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
  table {
    font-size: 14px;
    color: #5a5a5a;
    /*width: 100%;*/
    width: 1300px;
    table-layout: fixed;
  }

  table thead tr th {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  table thead tr th:first-child {
    width: 10%;
  }

  .btn {
    font-size: 14px;
  }

  table tbody tr td > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
