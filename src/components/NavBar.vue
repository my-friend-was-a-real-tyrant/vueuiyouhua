<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link to="/" class="navbar-brand">仲玮</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <!-- <li class="nav-item">
            <a class="nav-link"> 米修在线</a>
          </li> -->
          <li class="nav-item">
            <router-link to='/profiles' class="nav-link">首页</router-link>
          </li>

          <li class="nav-item" v-if="identity == 'HR'">
            <router-link to='/hrDashboard' class="nav-link">企业动态</router-link>
          </li>
          <li class="nav-item" v-if="identity == 'HR'">
            <router-link to='/hrRecruit' class="nav-link">招聘信息</router-link>
          </li>
          <li class="nav-item" v-if="identity == 'HR'">
            <router-link to='/postManager' class="nav-link">人才信息</router-link>
          </li>

          <li class="nav-item" v-if="identity == 'USER'">
            <router-link to='/postManager' class="nav-link">职位</router-link>
          </li>
          <li class="nav-item" v-if="identity == 'USER'">
            <router-link to='/profiles' class="nav-link">新闻</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-show="isLogin">
            <router-link to='/feed' class="nav-link">留言</router-link>
          </li>
          <li class="nav-item" v-if="isLogin">
            <router-link to='/dashboard' v-if="user !== null" class="nav-link">
              <!--            {{user.candidateUser != null ? user.candidateUser.candidateUserName : ""}}-->
            </router-link>
          </li>

          <li class="nav-item" v-show="!isLogin">
            <router-link to='/login' class="nav-link">候选人登录</router-link>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <router-link to='/loginByEnt' class="nav-link">企业HR登录</router-link>
          </li>
          <li class="nav-item" v-if="user !== null" v-show="isLogin">
            <a @click.prevent="loginOut" class="nav-link">
              <!--						<img :src="user.candidateUser.candidateUserHeadImage===''?'http://www.gravatar.com/avatar/637077799a582c6966a5cbe95e11d924?s=200&r=pg&d=mm':user.candidateUser.candidateUserHeadImage"  :alt="user.candidateUser.candidateUserName" class="rouded-circle headerImg">-->
              <img src="http://www.gravatar.com/avatar/637077799a582c6966a5cbe95e11d924?s=200&r=pg&d=mm"
                   class="rouded-circle headerImg">
              退出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                identity: null
            }
        },
        computed: {
            isLogin() {
                if (this.$store.getters.isAuthenticated) {
                    return true
                } else {
                    return false
                }
            },
            user() {
                this.identity = window.localStorage.getItem('identity');
                console.log("identity", this.identity);
                return this.$store.getters.user;
            }
        },
        methods: {
            loginOut() {
                //清除localStorage缓存
                localStorage.removeItem("jwtToken");

                //清除请求头
// 			this.$store.dispatch("setIsAuthenticated",false)
// 			this.$store.dispatch("setUser",{});
                this.$store.dispatch("clearCurrentState")
                //页面跳转
                this.$router.push('/login')
            }
        },
        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.identity = window.localStorage.getItem('identity');
                console.log("identity", vm.identity);
            })
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headerImg {
    width: 25px;
    margin-right: 15px;
  }

  .rouded-circle {
    border-radius: 50%;
  }
</style>
