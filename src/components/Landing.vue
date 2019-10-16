<template>
  <div class="landing"
       :style="{background: 'url(' + indexInfo.img + ') no-repeat'}">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h3 class="display-3 mb-4">{{indexInfo.title}}</h3>
            <p class="lead">{{indexInfo.text}}</p>
            <hr/>
            <!--					  <router-link v-show="!isLogin" to='/register' class="btn btn-lg btn-info mr-2">注册</router-link>-->
            <!--					  <router-link v-show="!isLogin" to="/login" class="btn btn-lg btn-light">登录</router-link>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'landing',
        data() {
            return {
                indexInfo: {},
                // isLogin: true
            }
        },
        methods: {
            getIndexInfo() {
                this.$axios.get('/api/hrbase/advertisement/getIndexImg').then(res => {
                    console.log(res.data);
                    this.indexInfo = res.data;
                }).catch(err => {
                    console.log(err);
                })
            },
        },
        computed: {
            isLogin() {
                if (this.$store.getters.isAuthenticated) {
                    return true
                } else {
                    return false
                }
            }
        },
        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.getIndexInfo()
            })
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    width: 100%;
  }

  .landing {
    position: relative;
    background-size: cover !important;;
    background-position: center !important;
    height: 100vh;
    margin-top: -24px;
    margin-bottom: -50px;
  }

  .landing-inner {
    padding-top: 80px;
  }

  .dark-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .card-form {
    opacity: 0.9;
  }

  .latest-profiles-img {
    width: 40px;
    height: 40px;
  }

  .form-control::placeholder {
    color: #bbb !important;
  }
</style>
