<template>
  <div>
    <head-top></head-top>

    <div class="login-number">
      <div class="num tel">
        <label>手机号</label>
        <input type="text" v-model="userPhone" placeholder="11位手机号" name="phone" maxlength="11" class="login-phone">
        <button :class="['code' ,{'btn-dis':!rightPhone}]" @click.prevent="getVerifyCode">获取验证码</button>
      </div>
      <div class="num">
        <label>验证码</label>
        <input type="text" v-model="validate" placeholder="收到短信中的验证码" class="login-code" maxlength="4">
      </div>
    </div>
    <div class="login-btn">
      <input type="button" value="登录" @click="login" :class="['sure-login-button' ,{'btn-dis':!rightCode}]">
    </div>

  </div>


</template>

<script>
  import headTop from '../../components/head/head'
  //    import alertTip from '../../components/common/alertTip'
  //      import {localapi, proapi, imgBaseUrl} from 'src/config/env'
  import {mapState, mapMutations} from 'vuex'
  import {getMobileCode, sendLogin} from '../../service/getData'

  export default {
    data(){
      return {
        loginWay: false, //登录方式，默认短信登录

        userPhone: '17710352664', //电话号码
        validate: null, //短信验证码
        validate_token: null, //获取短信时返回的验证值，登录时需要
        computedTime: 0, //倒数记时
        userInfo: null, //获取到的用户信息
        userAccount: null, //用户名
        passWord: null, //密码
        token: null,

        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
      }
    },
    components: {
      headTop,
    },
    computed: {
      //判断手机号码
      rightPhone: function () {
        return /^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$/gi.test(this.userPhone)
      },
      rightCode: function () {
        return /^\d{4}$/gi.test(this.validate)
      }
    },
    methods: {
      ...mapMutations([
        'SAVE_TOKEN',
        'SAVE_USER_INFO',
      ]),
      //改变登录方式
      changeLoginWay(){
        this.loginWay = !this.loginWay;
      },
      //是否显示密码
      changePassWordType(){
        this.showPassword = !this.showPassword;
      },
      //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
      async getCaptchaCode(){
        let res = await getcaptchas();
        this.captchaCodeImg = res.code;
      },
      //获取短信验证码
      async getVerifyCode(){
        if (this.rightPhone) {
          this.computedTime = 60;
          this.timer = setInterval(() => {
            this.computedTime--;
            if (this.computedTime == 0) {
              clearInterval(this.timer)
            }
          }, 1000);
          //发送短信验证码
          let data = {
            cmd: "send_verify_code",
            mobile: this.userPhone
          }
          let resp = null;
          try {
            resp = await getMobileCode(data);
          } catch (err) {
            console.log(err);
          }
          if (resp) {
            console.log(resp.resp[0]);
            this.$Message.success({content: resp.resp[0]})
          } else {
            // todo
          }
        }
      },

      //发送登录信息
      async login(){
        if (!this.rightPhone) {
          this.$Message.error({content: '手机号码不正确'})
          return false;
        } else if (!this.rightCode) {
          this.$Message.error({content: '验证码不正确验证码不正确验证码不正确验证码不正确'})
          return false;
        }
        let data = {
          cmd: 'user_web_login',
          verify_code: this.validate,
          mobile: this.userPhone,
        }
        let resp = null;
        try {
          resp = await sendLogin(data);
        } catch (err) {
          console.log(err);
        }
        if (resp && resp.resp[0]) {
          if (resp.resp[0].login_token && resp.resp[0].login_token.token) {
            this.token = resp.resp[0].login_token.token
            this.SAVE_TOKEN(this.token);
          }
          if (resp.resp[0].user_info) {
            let head_img_url = resp.resp[0].user_info.head_img_url;
            let nick_name = resp.resp[0].user_info.nick_name;
            this.SAVE_USER_INFO({head_img_url, nick_name});
          }
          this.$router.push('/');
        }
      },
    },
    watch: {
      'userPhone': function (newVal) {
        this.userPhone = newVal.replace(/[^0-9]/g, '')
      },
      'validate': function (newVal) {
        this.validate = newVal.replace(/[^0-9]/g, '')
      }
    }
  }

</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '../../style/mixin';

  ::-webkit-input-placeholder {
    color: #dedede;
    padding-left: .05rem;
    padding-bottom: .01rem;
    font-size: .13rem;
    line-height: .17rem;
  }

  .login-number {
    font-size: .14rem;
    background: #fff;
    margin-bottom: .80rem;
  }

  input, button {
    outline: 0;
    border: none;
    float: left;
    height: 99%;
  }

  .num {
    height: .46rem;
    line-height: .46rem;
  }

  .num label {
    float: left;
    width: .65rem;
    padding-left: .15rem;
  }

  .tel {
    position: relative;
    border-bottom: 1px solid #f1f1f1;
  }

  .tel input {
    width: 50%;
  }

  .code {
    position: absolute;
    width: 1rem;
    height: .30rem;
    line-height: .30rem;
    text-align: center;
    right: .15rem;
    top: 50%;
    margin-top: -.15rem;
    border-radius: 0.05rem;
    color: #fff;
    font-size: .12rem;
    background: #e03731;
  }

  .login-btn {
    width: 90%;
    height: .44rem;
    margin: 0 auto;
    border-radius: .8rem;
  }

  .sure-login-button {
    width: 100%;
    height: 100%;
    background: #e03731;
    color: #fff;
    text-align: center;
    font-size: .14rem;
    cursor: pointer;
    border-radius: .8rem;
  }

  .btn-dis {
    background: #afafaf;
    color: #fff;
  }


</style>
