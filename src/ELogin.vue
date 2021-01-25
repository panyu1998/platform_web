<template>
  <!-- <div style="background: #E6F4FF;height: 100%;"> -->
  <div class="hello">
    <el-carousel height="150px">
      <el-carousel-item v-for="it in 2" :key="it">
      </el-carousel-item>
    </el-carousel>
    <div>
      <!-- <div class="loginlogo"></div> -->
      <form class="login-form" style="padding: 10% 0;">
        <div class="login-wrap">
          <label for="#" style="background: initial;">
            <img src="../static/public/static/img/login-ico-user.png"></label>
          <input class="login-input" id="j_UserName" name="username" type="text" value="" placeholder="用户名">
        </div>
        <div class="login-wrap">
          <label for="#" style="background:initial;">
            <img src="../static/public/static/img/login-ico-pass.png"></label>
          <input class="login-input" id="j_Password" name="password" type="password" value="" placeholder="密码">
        </div>
        <div class="login-wrap" style="width: 100%; text-align: -webkit-left;">
          <input class="login-input" id="vCode" style="width:78%;" placeholder="输入验证码">
          <!-- <img id="Img" src="Img" alt="验证码" class="text-right" />
          <a @click="getCodeimg" style="font-size: 12px;font-weight: 700;">换一张</a> -->
          <a @click="getCodeimg" style="font-size: 12px;font-weight: 700;"><img id="Img" src="Img" alt="验证码" class="text-right"
              style="width:20%;height: 35px;border-radius: 20px;" /></a>
          <!-- </table> -->
          <!-- <label for="#" style="background:initial;">
							<img src="../static/public/static/img/login-ico-pass.png"></label>
					<input class="login-input" id="j_Password" name="password" type="password" value="" placeholder="密码"> -->
        </div>
        <div class="login-wrap">
          <button type="button" class="login-btn" id="btnLogin" @click="pwlogin_OK">登 录</button>
        </div>
        <div class="login-wrap">
          <a class="col-sm-6 col-xs-12 btn btn-link" href="#">忘记密码?</a>
        </div>
      </form>
    </div>
    <div class="weui-footer weui-footer_fixed-bottom" id="bottomInfo">
      <p class="weui-footer__links">
        <a href="http://www.cnway.net" class="weui-footer__link">COPYRIGHT&copy;2020</a>
      </p>
      <p class="weui-footer__text">深圳市中卫信息技术有限公司技术支持</p>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        Aid: "",
        displayDiv1: 'block',
        displayDiv2: 'none',
        displayDiv3: 'none',
        disabled: false, //判断验证码
        time: 0, //验证码初始时间
        btntxt: "获取验证码",
        test: 10,
        message: '',
        show: true,
        count: '',
        timer: null,
        salt:"",

        wHeight: '',    
        screenHeight: document.body.clientHeight, // 窗口正常宽度
      }
    },
    mounted() {
      // 处理移动端弹出输入框后，底部信息上浮现象
      window.onresize = () => {
        return (() => {
          this.wHeight = $(window).height();    // 变化后当前的窗口高度
          if( this.wHeight<this.screenHeight ){
            this.$nextTick(()=>{
              $('#bottomInfo').css('display','none')
            })
          }else{
            this.$nextTick(()=>{
              $('#bottomInfo').css('display','block')
            })
          }
        })()
      };

      this.getCodeimg();
    },
    http: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    },
    methods: {
      LoginOfPass1() {
        this.displayDiv1 = "block";
        this.displayDiv3 = "none";
      },
      setCookie(c_name, c_pwd, exdays, check, checkNm) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "UserName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        if (document.getElementById("savenm").checked == true && document.getElementById("savepw").checked == false) {
          window.document.cookie = "Password" + "=" + "" + ";path=/;expires=" + exdate.toGMTString();
        }
        if (document.getElementById("savepw").checked == true) {
          window.document.cookie = "Password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        }
        window.document.cookie = "checked" + "=" + check + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "checkedNm" + "=" + checkNm + ";path=/;expires=" + exdate.toGMTString();
      },
      /*获取验证码图片*/
      getCodeimg() {
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/api/login/showimgcode', {}, {
          header: {},
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == "0") {
            var img = document.getElementById("Img");
            img.src = "data:image/png;base64," + res.body.result;
          } else {
            this.warnMessage = "获取图片失败";
            this.colorMessage = "red"
          }
        }).catch(err => {
          this.warnMessage = "访问接口失败";
          this.colorMessage = "red"
        })
      },
      //读取cookie
      getCookie: function() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'UserName') {
              $("#j_UserName").val(arr2[1]); //保存到保存数据的地方
            } else if (arr2[0] == 'Password') {
              $("#j_Password").val(arr2[1]);
            } else if (arr2[0] == 'checked') {
              if (arr2[1] == "false") {
                document.getElementById("savepw").checked = false;
              } else {
                document.getElementById("savepw").checked = arr2[1];
              }
            } else if (arr2[0] == 'checkedNm') {
              document.getElementById("savenm").checked = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", "", "", -1); //修改4值都为空，天数为负1天就好了
      },
      register() {
        this.displayDiv3 = "block";
        this.displayDiv1 = "none";
      },
      getCode() {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        var Phone = $("#Phone").val();
        if (Phone == '') {
          alert("请输入手机号码");
        } else if (!reg.test(Phone)) {
          alert("手机格式不正确");
        } else {
          let AppearData = {
            "Phone": Phone,
          };
          this.$http.post(this.GLOBAL.serverSrc + '/api/Login/SendMessage', AppearData, {

            emulateJSON: true
          }).then((res) => {
            console.info(res);
            if (res.body.code == "0") {
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
            } else {
              alert("发送信息失败");
            }
          }).catch(err => {
            this.warnMessage = "访问接口失败";
            this.colorMessage = "red"
          })
        }
      },
      pwlogin_OK() {
        if ($("#j_UserName").val() === "" || $("#j_Password").val() === "" || $("#vCode").val() === "") { //验证码
          this.$message("不能为空");
        } else {
          //先密码加密
          var pass = this.$md5($("#j_Password").val()).toUpperCase();
          this.$http.post(this.GLOBAL.serverSrc + '/api/login/salt', {}, {
            header: {},
            emulateJSON: true
          }).then((res) => {
              console.info(res.body.result);
              this.salt = res.body.result; //返回一子符串用来加密
              let data = {
                'salt': this.salt,
                'UserName': $("#j_UserName").val(), //用户名
                'Password': this.$md5(this.salt + pass).toUpperCase(), //$("#j_Password").val() //密码
                'vcode': $("#vCode").val() //图片验证码
              }
              // 验证填入值
              /*接口请求*/
              this.$http.post(this.GLOBAL.serverSrc + '/api/Login/LoginOn', data, {
                header: {},
                emulateJSON: true
              }).then((res) => {
                // console.info(res);
                let uid = res.body.result[0].ID;
                this.$setCookie('token', res.body.token);
                if (res.body.code == "0") {    
				        localStorage.getItem('token',res.body.token);
                  localStorage.setItem("login", 1); //登录状态  0未登录1已登录
                  this.$router.push({
                    name: 'EIndex',
                  })
                } else {
                  this.$message(res.body.result);
                }
              }).catch(err => {
                console.info("访问接口失败");
              })
              }).catch(err => {
                 console.info("访问接口失败");
              })
              }
            },
          }
        }
</script>

<style>
  @import url("../static/public/plugins/frozen/css/frozen.css");
  @import url("../static/public/static/css/login.css");

  .J-mlogin-login-normal1 {
    height: 36px;
    line-height: 36px;
    padding: 0 14px;
    border-radius: 3px;
    display: inline-block;
    border: 1px solid #15a0b3;
    color: #15a0b3;
    text-decoration: none;
    margin: 10px auto;
    font-size: 14px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -o-background-size: cover;
    /*background-image: url(../static/img/logo/header_two.jpg);*/
    background-image: url(../static/img/logo/login-pic1.jpg);

  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-repeat: no-repeat;
    /*background-image: url(../static/img/logo/header_three.jpg);*/
    background-image: url(../static/img/logo/login-pic2.jpg);

  }

  .weui-footer_fixed-bottom {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    padding: 20px;
    font-size: 13px;
  }
</style>
