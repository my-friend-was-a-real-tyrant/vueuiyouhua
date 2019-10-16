<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="display-4 text-center">登录/注册</div>
          <p class="lead text-center">使用手机验证码登录</p>
          <form @submit.prevent="submit" autocomplete="off" method="post">
            <!-- <div class="form-group">
              <input type="email"
                v-model="user.email"
                class="form-control form-control-lg"
                :class="{'is-invalid': errors.email}"
                placeholder="邮箱" name="email" />
              <div v-if="errors.email" class="invalid-feedback">{{errors.email}}</div>
              <small className="form-text text-muted">我们使用了全球公共头像，如果需要的头像显示，请使用gravatar注册邮箱</small>
            </div> -->
            <!-- <div class="form-group">
              <input type="password"
                v-model="user.password"
                class="form-control form-control-lg"
                :class="{'is-invalid': errors.password}"
                placeholder="密码" name="password" />
              <div v-if="errors.password" class="invalid-feedback">{{errors.password}}</div>
            </div> -->
            <TextField
              type='phone'
              name='phone'
              placeholder="手机号"
              v-model="user.phone"
              :error='errors.phone'>
            </TextField>

            <TextField
              type='code'
              name='code'
              placeholder="验证码"
              v-model="user.code"
              :error='errors.code'>
            </TextField>
            <vue-img-verify @getImgCode="getImgCode" ref="vueImgVerify"/>

            <div style="display: flex">
              <label for="">
                <router-link tag="a" target="_blank" to="/agreement">用户协议</router-link>
              </label>
              <div id="example">
                <input type='radio' id='wuhan' value='0' v-model='agree' checked="checked"/>
                <label for='wuhan'>同意</label>
              </div>
            </div>


            <p>
              <button onclick="sendMsg()" class="btn btn-info btn-block mt-2">发送验证码</button>
              <button type="submit" class="btn btn-info btn-block mt-2">登录</button>
            </p>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TextField from './common/TextFieldGroup'
    import vueImgVerify from './common/vue-img-verify'

    export default {
        name: 'Login',
        data() {
            return {
                agree: 0,
                imgCode: '',
                user: {
                    phone: '',
                    code: ''
                },
                errors: {}
            }
        },
        components: {
            TextField,
            vueImgVerify
        },
        methods: {
            // 点击图片获取验证码
            getImgCode(code) {
                this.imgCode = code
                console.log('验证码: ' + this.imgCode)
            },
            // 点击按钮获取验证码
            handleClick() {
                this.imgCode = this.$refs.vueImgVerify.draw()
                console.log('验证码: ' + this.imgCode)
            },
            sendMsg() {

            },
            submit() {

                if(this.agree != 0){
                    alert("请同意协议");
                    return;
                }

                this.$axios.post('/api/hrbase/personal/register?code=' + this.user.code + '&phone=' + this.user.phone).then(res => {
                    this.errors = {};
                    console.log(res.data);
                    if (!res.data.success) {
                        this.errors.code = res.data.msg;
                        return;
                    }
                    const token = res.data.token;
                    window.localStorage.setItem("jwtToken", token)
                    //分发action更改store的state
                    this.$store.dispatch("setIsAuthenticated", !this.isEmpty(token))
                    this.$store.dispatch("setUser", res.data);
                    window.localStorage.setItem("identity", "USER");
                    window.localStorage.setItem("cUser", JSON.stringify(res.data));

                    this.errors = {};
                    //页面跳转

                    var idCardAuth = res.data.idCardAuth;
                    console.log("redirect", idCardAuth);
                    if (idCardAuth) {
                        // 检测是否
                        var redirect = res.data.redirect;
                        if (!redirect) {
                            this.$router.push('/baseInfo')
                        } else {
                            this.$router.push('/dashboard')
                        }
                    } else {
                        this.$router.push('/idCardAuth')
                    }
                }).catch(err => {
                    this.errors = {}
                    if (err.response.data) {
                        window.localStorage.setItem("jwtToken", "");
                        this.$store.dispatch("clearCurrentState", null);

                        // alert(this.errors);
                    }
                    this.errors.code = '认证失败';
                })
            },
            isEmpty(value) {
                return value === undefined || value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
            }

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
