<template>
  <div class="container" id="container">
    <div class="page" style="background: #E6F4FF;text-align: -webkit-left;">
      <div class="page__hd">
        <header class="ui-header ui-header-positive ui-border-b">
          <h1></h1><button class="menu-btn" @click="header"><i class="fa fa-bars" aria-hidden="true"></i></button>
        </header>
        <aside class="main-menu" id="index" v-show="isShow">
          <div class="menu-wrap">
            <ul class="menu-ul">
              <li>
                <router-link :to="{name:'EIndex'}"><a href="#">首页</a></router-link>
              </li>
              <li>
                <router-link :to="{name:'EAdd'}"><a href="#">添加事件</a></router-link>
              </li>
              <li>
                <router-link :to="{name:'EVerify'}"><a href="#">事件处置</a></router-link>
              </li>
              <li>
                <router-link :to="{name:'EMaterialed'}"><a href="#">物资准备</a></router-link>
              </li>
              <li>
                <router-link :to="{name:'ESurvey'}"><a href="#">疫情调查</a></router-link>
              </li>
              <li>
                <router-link :to="{name:'EReport'}"><a href="#">疫情报告</a></router-link>
              </li>
              <li>
                <a href="#" @click="outlogin">退出登录</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <div class="page__bd">
        <div class="weui-tab">
          <div class="weui-tab__panel">
            <div class="weui-search-bar__box" style="background: #fff;margin-top: 48px;height: 50px;">
              <i class="weui-icon-search" style="margin-top: 12px;"></i>
              <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索事件名称" style="height: 34px;margin-top: 4px;"
                required />
              <a href="javascript:" class="weui-icon-clear" id="searchClear" style="margin-top: 12px;" @click="clear"></a>
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" style="margin-top: -36px;float: right;"
                @click="selectData">查询</a>
            </div>
            <form id="form1" runat="server">
              <table class="table-wrap table-input width-full table-read">
                <tbody v-for="(item,index) in list ">
                  <!--年龄-->
                  <tr>
                    <td class='th5'>名称</td>
                    <td><a class="bar-btn btn-download" href="javascript:;" hidefocus="true" @click="hre" :id="[item.ID,item.FileUrl]">{{item.Title}}</a></td>
                  </tr>
                  <!--姓名-->
                  <tr>
                    <td class='th5'>上传时间</td>
                    <td>{{item.CreateDate}}</td>
                    <!--暴发地址-->
                  </tr>
                  <tr></tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="5">
                      <div class="my-page">
                        <div class="my-page" data-nowpage="1" data-maxpage="10" data-pagenum="10" data-nums="99">
                          <a class="firstPage disabled" data-href="1" href="javascript:void(0);" @click="firstPage">首页</a>
                          <a class="prevPage disabled" @click="prevPage" data-href="0" href="javascript:void(0);">上一页</a>
                          &nbsp;
                          &nbsp;<span>第<span id="CurrentPage">1</span>页，共<span id="total"></span>页</span>&nbsp; &nbsp;
                          <a class="nextPage" data-href="2" href="javascript:void(0);" @click="nextPage">下一页</a>
                          <a class="lastPage" data-href="10" href="javascript:void(0);" @click="lastPage">尾页</a>&nbsp;
                          &nbsp;
                          <span v-bind:style="{color:colorMessage}">{{warnMessage}}</span>
                          <div class="pull-right">每页显示
                            <select id="selectChange" @change="selectChangePage">
                              <option value="5" selected="selected">5</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="30">30</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>条，共<span id="numRow"></span>条</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  var pageSize = ''; //每页显示条数
  var num = ''; //总条数
  var totalPage = ''; //总页数
  var currentPage = ''; //当前页
  export default {
    name: 'HelloWorld',
    data() {
      return {
        displayDiv: 'none',
        displayDivMessage: 'none',
        showOrHide: "",
        open: false,
        selected: false,
        colorMessage: "",
        warnMessage: "", //提示信息
        checked: false, //默认不选中
        display: "block",
        list: [],
        Aid: "",
        FirstTypeList: [],
        editData: [], //编辑行的数据
        ver: "", //处置的值
        isShow: false,
        arr: [],
        url: "",
      }
    },
    mounted: function() {
    	setTimeout(function() {
    	this.getData(); //定义方法
    }.bind(this), 200)
    },
    methods: {
      hre(e) {
        this.arr = e.target.id;
        var arr1 = this.arr.split(',');
        var ids = arr1[0];
        var path = arr1[1];
        window.open(this.GLOBAL.serverSrc + path); // 本窗口打开下载
      },
      header() {
        $("#index").toggle();
      },
      clear() {
        $("#searchInput").val("");
      },
	  getData() {
	    let Data = {
	      "ID": "",
	      "FileUrl": "",
	      "KeyWords": "",
	      "Description": "",
	      "CategoryID": "",
	      "TablePID": 0,
	      "FileName": $("#searchInput").val(),
	      "TableName": "Phe_HealthEdu",
	      "currentPage": $("#CurrentPage").text(),
	      "PageSize": $("#selectChange").val(),
	    }
	    this.$http.post(this.GLOBAL.serverSrc + '/api/file/files', Data, {
	      headers: {
	        'token': this.$getCookie('token')
	      },
	      emulateJSON: true
	    }).then((res) => {
	      if (res.body.code == 0) {
	        if (res.body.result.length==0) {
	           this.list = [];
	          this.warnMessage="暂无数据";
	          this.colorMessage="red";
	        } else {
	          this.list = res.body.result;
	          $("#numRow").text(res.body.count);
	          num = $("#numRow").text();
	          pageSize = $("#selectChange").val();
	          if (num / pageSize > parseInt(num / pageSize)) {
	          	totalPage = parseInt(num / pageSize) + 1;
	          } else {
	          	totalPage = parseInt(num / pageSize);
	          }
	          $("#total").text(totalPage);
	        }
	      } else {
	        this.warnMessage="数据获取失败";
	        this.colorMessage="red";
	      }
	    }).catch(err => {
	      this.warnMessage="接口访问失败";
	      this.colorMessage="red";
	    })
	  },
	  selectData() { //查询数据
	    $("#CurrentPage").text("1");
	    this.getData(); //定义方法
	  },
      CheckedAll() {
        this.checked = !this.checked //选中切换
      },
      selectChangePage() { //每页显示的条数
        $("#CurrentPage").text("1");
        this.getData(); //定义方法
      },
      firstPage() { //首页
        $("#CurrentPage").text("1");
        this.getData(); //定义方法
        $(".prevPage").addClass("disabled");
        $(".firstPage").addClass("disabled");
        $(".nextPage").removeClass("disabled");
        $(".lastPage").removeClass("disabled");
      },
      lastPage() { //尾页
        $("#CurrentPage").text(totalPage);
        this.getData(); //定义方法
        $(".prevPage").removeClass("disabled");
        $(".firstPage").removeClass("disabled");
        $(".nextPage").addClass("disabled");
        $(".lastPage").addClass("disabled");
      },
      nextPage() { //下一页
        if (parseInt($("#CurrentPage").text()) < totalPage) {
          currentPage = parseInt($("#CurrentPage").text()) + 1; //第几页
          if (1 < currentPage < totalPage) {
            $(".prevPage").removeClass("disabled");
            $(".firstPage").removeClass("disabled");
          } else {
            $(".prevPage").addClass("disabled");
            $(".firstPage").addClass("disabled");
          }
          if (currentPage == totalPage) {
            $(".nextPage").addClass("disabled");
            $(".lastPage").addClass("disabled");
          } else {
            $(".nextPage").removeClass("disabled");
            $(".lastPage").removeClass("disabled");
          }
          $("#CurrentPage").text(currentPage);
          this.getData(); //定义方法
        }
      },
      prevPage() { //上一页
        if (parseInt($("#CurrentPage").text()) > 1) {
          currentPage = parseInt($("#CurrentPage").text()) - 1; //第几页
          if (currentPage > 1) {
            $(".prevPage").removeClass("disabled");
            $(".firstPage").removeClass("disabled");
          } else {
            $(".prevPage").addClass("disabled");
            $(".firstPage").addClass("disabled");
          }
          if (currentPage > totalPage) {
            $(".nextPage").addClass("disabled");
            $(".lastPage").addClass("disabled");
          } else {
            $(".nextPage").removeClass("disabled");
            $(".lastPage").removeClass("disabled");
          }
          $("#CurrentPage").text(currentPage);
          this.getData(); //定义方法
        }
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* @import url("../static/css/main.css"); */
  @import url("../static/css/weui.css");
  @import url("../static/public/plugins/frozen/css/frozen.css");
  @import url("../static/public/static/css/admin.css");
  @import url("../static/public/static/css/login.css");
</style>
