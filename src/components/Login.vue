<template>
  <div class="login">
    <el-row>
      <el-col :span="16">
         <el-carousel indicator-position="outside" height="500px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h2 class="text-center">登录/注册</h2>
                <h5 class="text-center" style="margin-bottom:30px">使用手机验证码登录</h5>
                <form @submit.prevent="submit" autocomplete="off" method="post">
                  <!-- <div class="form-group">
              <input type="email"
                v-model="user.email"
                class="form-control form-control-lg"
                :class="{'is-invalid': errors.email}"
                placeholder="邮箱" name="email" />
              <div v-if="errors.email" class="invalid-feedback">{{errors.email}}</div>
              <small className="form-text text-muted">我们使用了全球公共头像，如果需要的头像显示，请使用gravatar注册邮箱</small>
                  </div>-->
                  <!-- <div class="form-group">
              <input type="password"
                v-model="user.password"
                class="form-control form-control-lg"
                :class="{'is-invalid': errors.password}"
                placeholder="密码" name="password" />
              <div v-if="errors.password" class="invalid-feedback">{{errors.password}}</div>
                  </div>-->
                  <TextField
                    type="phone"
                    name="phone"
                    placeholder="手机号"
                    v-model="user.phone"
                    :error="errors.phone"
                  ></TextField>

                  <TextField
                    type="code"
                    name="code"
                    placeholder="验证码"
                    v-model="user.code"
                    :error="errors.code"
                  ></TextField>
                  <vue-img-verify @getImgCode="getImgCode" ref="vueImgVerify" />

                  <div style="display: flex">
                    <label for>
                      <router-link tag="a" target="_blank" to="/agreement">用户协议</router-link>
                    </label>
                    <div id="example">
                      <input type="radio" id="wuhan" value="0" v-model="agree" checked="checked" />
                      <label for="wuhan">同意</label>
                    </div>
                  </div>

                  <p style="margin-bottom:21px">
                    <button onclick="sendMsg()" class="btn btn-info btn-block mt-2">发送验证码</button>
                    <button type="submit" class="btn btn-info btn-block mt-2">登录</button>
                  </p>
                </form>
          <!-- <div class="container">
            <div class="row">
              <div class="col-md-10 m-auto">
                
              </div>
            </div>
          </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TextField from "./common/TextFieldGroup";
import vueImgVerify from "./common/vue-img-verify";

export default {
  name: "Login",
  data() {
    return {
      agree: 0,
      imgCode: "",
      user: {
        phone: "",
        code: ""
      },
      errors: {}
    };
  },
  components: {
    TextField,
    vueImgVerify
  },
  methods: {
    // 点击图片获取验证码
    getImgCode(code) {
      this.imgCode = code;
      console.log("验证码: " + this.imgCode);
    },
    // 点击按钮获取验证码
    handleClick() {
      this.imgCode = this.$refs.vueImgVerify.draw();
      console.log("验证码: " + this.imgCode);
    },
    sendMsg() {},
    submit() {
      if (this.agree != 0) {
        alert("请同意协议");
        return;
      }

      this.$axios
        .post(
          "/api/hrbase/personal/register?code=" +
            this.user.code +
            "&phone=" +
            this.user.phone
        )
        .then(res => {
          this.errors = {};
          console.log(res.data);
          if (!res.data.success) {
            this.errors.code = res.data.msg;
            return;
          }
          const token = res.data.token;
          window.localStorage.setItem("jwtToken", token);
          //分发action更改store的state
          this.$store.dispatch("setIsAuthenticated", !this.isEmpty(token));
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
              this.$router.push("/baseInfo");
            } else {
              this.$router.push("/dashboard");
            }
          } else {
            this.$router.push("/idCardAuth");
          }
        })
        .catch(err => {
          this.errors = {};
          if (err.response.data) {
            window.localStorage.setItem("jwtToken", "");
            this.$store.dispatch("clearCurrentState", null);

            // alert(this.errors);
          }
          this.errors.code = "认证失败";
        });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss" >
.login {
  width: 1200px;
  height: 100%;
  margin: 260px auto;
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    // border-radius: 4px;
    min-height: 36px;
    padding: 40px 20px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    // line-height: 100%;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .el-carousel__container {
    height: 400px
  }
}
</style>
