<template>
  <div class="hello">
    <header class="ui-header ui-header-positive ui-border-b" style="background-color: #3959fb;">
      <h1></h1><button class="menu-btn" @click="header"><i class="fa fa-bars" aria-hidden="true"></i></button>
    </header>
    <aside class="main-menu" id="index" v-show="isShow">
      <div class="menu-wrap">
        <ul class="menu-ul">
          <li>
            <!-- <router-link :to="{name:'ELogin'}"> -->
            <a href="#" @click="outlogin">退出登录</a>
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
    </aside>
    <section class="ui-container">
      <div class="banner-wrap">
        <el-carousel height="150px">
          <el-carousel-item v-for="it in 2" :key="it">
          </el-carousel-item>
        </el-carousel>
        <!-- <img src="../static/public/static/img/home-banner.jpg" alt="home-banner"> -->
      </div>
      <div class="ui-row home-nav padding-horizontal-10">
        <div class="ui-row home-nav margin-10">
          <div class="ui-col ui-col-50 ui-whitespace">
            <router-link :to="{name:'EAdd'}" style="color:#3b4044">
              <a href="#" class="home-nav-one">
                <div class="wrap"><i class="icon home-nav-1"></i></div>
                <h2>添加事件</h2>
              </a>
            </router-link>
            <!-- <router-link :to="{name:'ESurvey',params:{admin:'admin',id:12}}" style="color:#3b4044">
						<a href="#" class="home-nav-one">
							<div class="wrap"><i class="icon home-nav-1"></i></div>
							<h2>添加事件</h2>
						</a>
						</router-link> -->
          </div>
          <div class="ui-col ui-col-50 ui-whitespace">
            <router-link :to="{name:'EVerify'}" style="color:#3b4044">
              <a href="#" class="home-nav-two">
                <div class="wrap"><i class="icon home-nav-3"></i></div>
                <h2>事件处置</h2>
              </a>
            </router-link>
          </div>
          <div class="ui-col ui-col-50 ui-whitespace">
            <router-link :to="{name:'EMaterialed'}" style="color:#3b4044">
              <a href="#" class="home-nav-sev">
                <div class="wrap"><i class="icon home-nav-2"></i></div>
                <h2>物资准备</h2>
              </a>
            </router-link>
          </div>
          <div class="ui-col ui-col-50 ui-whitespace">
            <router-link :to="{name:'ESurvey'}" style="color:#3b4044">
              <a href="#" class="home-nav-thr">
                <div class="wrap"><i class="icon home-nav-2"></i></div>
                <h2>疫情调查
                </h2>
              </a>
            </router-link>
          </div>
          <div class="ui-col ui-col-50 ui-whitespace">
            <router-link :to="{name:'EReport'}" style="color:#3b4044">
              <a href="#" class="home-nav-fou">
                <div class="wrap"><i class="icon home-nav-2"></i></div>
                <h2>疫情报告</h2>
              </a>
            </router-link>
          </div>
          <div class="ui-col ui-col-50 ui-whitespace">
            <router-link :to="{name:'EHealthEdu'}" style="color:#3b4044">
              <a href="#" class="home-nav-five">
                <div class="wrap"><i class="icon home-nav-2"></i></div>
                <h2>健康教育</h2>
              </a>
            </router-link>
          </div>
          <div class="ui-col ui-col-50 ui-whitespace">
            <a href="#" class="home-nav-six" @click="outlogin">
              <div class="wrap"><i class="icon home-nav-4"></i></div>
              <h2>退出登录</h2>
            </a>
          </div>
        </div>
      </div>
      <div class="weui-footer weui-footer_fixed-bottom" id="bottomInfo">
        <p class="weui-footer__links">
          <a href="http://www.cnway.net" class="weui-footer__link">COPYRIGHT&copy;2020</a>
        </p>
        <p class="weui-footer__text">深圳市中卫信息技术有限公司技术支持</p>
      </div>
    </section>
  </div>
</template>
<script>
  import Vue from 'vue'
  var pageSize = ''; //每页显示条数
  var num = ''; //总条数
  var totalPage = ''; //总页数
  var currentPage = ''; //当前页
  export default {
    data() {
      return {
        Aid: "",
        displayDiv1: 'block',
        displayDiv2: 'none',
        displayDiv3: 'none',
        list: [],
        disabled: false, //判断验证码
        time: 0, //验证码初始时间
        btntxt: "获取验证码",
        test: 10,
        message: '',
        show: true,
        count: '',
        timer: null,
        isShow: false,

        wHeight: '',    
        screenHeight: document.body.clientHeight, // 窗口正常宽度
      }
    },
    created(){
      let oHeight = $(document).height();
      $(window).resize(function(){
        if($(document).height() < oHeight){
          $(".weui-footer_fixed-bottom").css("position","static");
        }else{
          $(".weui-footer_fixed-bottom").css("position","fixed");
        }
      });
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
    },
    methods: {
      header() {
        $("#index").toggle();
      },    
      LoginOfPass1() {
        this.displayDiv1 = "block";
        this.displayDiv3 = "none";
      },     
      outlogin() {
        this.$http.post(this.GLOBAL.serverSrc + '/api/Login/LoginOut', {}, {
          header: {},
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
			   localStorage.setItem("token", "")
            localStorage.setItem("login", 0); //登录状态  0未登录1已登录
            this.$router.push({
              path: '/'
            })
          }
        }).catch(err => {
          console.info("访问接口失败");
        })
      }
    }
  }
</script>
<style>
  /* @import url("../static/public/plugins/bootstrap/css/bootstrap.min.css"); */
  @import url("../static/public/plugins/frozen/css/frozen.css");
  @import url("../static/public/static/css/admin.css");
  @import url("../static/public/static/css/login.css");
  @import url("../static/css/main.css");

  body {
    background: #E6F4FF;
  }

  .hello {
    width: 100%;
    height: 100%;
  }
</style>
