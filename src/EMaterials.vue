<template>
  <!-- <div class="hello"> -->
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
                <router-link :to="{name:'EIndex'}"><a href="#">添加事件</a></router-link>
              </li>
              <li>
                <router-link :to="{name:'EVerify'}"><a href="#">事件处置</a></router-link>
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
                <p><span style="font-size: 14px;color:#409eff;padding: 5px;" v-bind:checked="checked" @click="CheckedAll">全选</span></p>
                <tbody v-for="(item,index) in list ">
                  <tr>
                    <td class='th5'><input type="checkbox" v-bind:checked="checked" name="checked" v-bind:id="item.ID"
                        style="margin-top: 5px;"></td>
                    <td>{{item.Name}}</td>
                  </tr>
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
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="20" selected="selected">20</option>
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
        <div class="weui-tabbar" style="position: fixed;">
          <a class="my-btn" href="javascript:" @click="outsave">完成</a>
        </div>
      </div>
    </div>
    <!-- </div> -->
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
        eid: this.$route.params.eid,
        Aid: "",
        FirstTypeList: [],
        editData: [], //编辑行的数据
        ver: "", //处置的值
        isShow: false,
        count: "",
      }
    },
    mounted: function() {
      setTimeout(function() {
        this.getData(); //定义方法
      }.bind(this), 200);
      laydate.render({
        elem: '#HappenTime', //指定元素
        type: 'datetime', //指定元素
        max: getNowFormatDate()
      });
      laydate.render({
        elem: '#ReportDate', //指定元素
        type: 'datetime', //指定元素
        max: getNowFormatDate()
      });

      function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month +
          seperator1 + strDate + " " + date.getHours() + seperator2 +
          date.getMinutes() + seperator2 + date.getSeconds();
        return currentdate;
      }
    },
    methods: {
      //完成物资申请
      outsave() {
        var JsonData = [];
        var $checkbox = $('tbody input[type="checkbox"][name="checked"]');
        var $checked = $('#tbody input[type="checkbox"][name="checked"]');
        var idArray = [];
        $("input:checkbox[name='checked']:checked").each(function() {
          idArray.push($(this).attr("id")); //向数组中添加元素
        });
        var sy1 = idArray.join(',');
        var Sy2 = sy1.split(',');
        for (var i = 0; i < Sy2.length; i++) {
          var mid = Sy2[i];
          JsonData.push($.extend({
            "ID": 0,
          }, {
            "MaterialID": mid, //物资id
          }, {
            "EventID": this.eid, //事件id
          }, {
            "Count": 1,
          }, {
            "UseDate": "0000-00-00",
          }, {
            "Utend": "",
          }));
        }
        console.info(JSON.stringify(JsonData));
        console.info(this.count);
        console.info(sy1.length);
        console.info(Sy2.length);
        if (sy1 != [] && Sy2.length == parseInt(this.count)) {
          if (confirm('确认完成物资？')) {
            /*接口请求*/
            this.$http.post(this.GLOBAL.serverSrc + '/healthe/MaterialUse/save', {
              "JsonData": JSON.stringify(JsonData),
            }, {
              headers: {
                'token': this.$getCookie('token')
              },
              emulateJSON: true,
            }).then((res) => {
              console.info(res);
              if (res.body.code == "0") {
                this.$message("申请成功");
                //物资申请成功后改变事件状态
                let data = {
                  "ID": this.eid,
                  "Status": 6,
                }
                this.$http.post(this.GLOBAL.serverSrc + '/healthe/event/Verify', data, {
                  headers: {
                    'token': this.$getCookie('token')
                  },
                  emulateJSON: true
                }).then((res) => {
                  this.$router.push({
                    name: "ESurvey",
                    params: {
                      admin: this.$route.params.admin,
                      // eid: this.eid
                    }
                  })
                }).catch(err => {
                  this.warnMessage = "访问接口失败";
                  this.colorMessage = "red"
                })
              } else {
                this.$message(res.body.result);
              }
            }).catch(err => {
              this.warnMessage = "访问接口失败";
              this.colorMessage = "red"
            })
          }
        } else {
          this.$message("请勾选全部物资");
        }
      },
      header() {
        $("#index").toggle();
      },
      clear() {
        $("#searchInput").val("");
      },

      getData() {
        let data = {
          "Name": $("#searchInput").val(), //事件名称
          "Category": 3, //应急物资类别
          "currentPage": $("#CurrentPage").text(),
          "PageSize": $("#selectChange").val(),
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/healthe/material/materials', data, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
              this.list = res.body.result;
              this.count = res.body.count;
              $("#numRow").text(res.body.count);
              num = $("#numRow").text();
              pageSize = $("#selectChange").val();
              if (num / pageSize > parseInt(num / pageSize)) {
                totalPage = parseInt(num / pageSize) + 1;
              } else {
                totalPage = parseInt(num / pageSize);
              }
              $("#total").text(totalPage);
              this.warnMessage = "操作成功";
              this.colorMessage = "green"
            } else {
              this.list = [];
              this.warnMessage = "暂无数据";
              this.colorMessage = "red"
            }
          } else {
            this.warnMessage = "获取数据失败";
            this.colorMessage = "red"
          }
        }).catch(err => {
          this.warnMessage = "访问接口失败";
          this.colorMessage = "red"
        })
      },
      selectData() { //查询数据
        $("#CurrentPage").text("1");
        this.getData(); //定义方法
      },
      deleteData() { //删除数据
        var $checkbox = $('tbody input[type="checkbox"][name="checked"]');
        var $checked = $('#tbody input[type="checkbox"][name="checked"]');
        if ($checkbox.is(':checked')) {
          if (confirm("确定要删除选中信息")) {
            var idArray = [];
            $("input:checkbox[name='checked']:checked").each(function() {
              idArray.push($(this).attr("id")); //向数组中添加元素
            });
            var ida = idArray.join(','); //将数组元素连接起来以构建一个字符串
            /*this.Aid = e.target.id; //当前行的id
            var ida = this.Aid;
            if(e.target.innerHTML == "删除") {
            	if(confirm('确定删除选中的信息？')) { */
            /*接口请求*/
            http: this.$http.post(this.GLOBAL.serverSrc + '/healthe/material/del', {
              "IDs": ida
            }, {
              headers: {
                'token': this.$getCookie('token')
              },
              emulateJSON: true
            }).then((res) => {
              this.getData();
              this.warnMessage = "删除成功";
              this.colorMessage = "green"
            }).catch(err => {
              this.warnMessage = "访问接口失败";
              this.colorMessage = "red"
            })
          }
        }
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
      SaveInfo() {
        var Name = $("#EventName").val(); //事件名称
        var IruptDate = $("#IruptDate").val(); //暴发时间
        var Address = $("#Address").val(); //暴发地点
        var Category = $("#Category").val(); //类别
        var Involve = $("#Involve"); //波及人数
        var Cases = $("#Cases"); //生病人数
        var Daeth = $("#Death"); //死亡人数
        var ReportBy = $("#ReportBy"); //上报人
        var ReportDate = $("#ReportDate"); //上报时间
        var Description = $("#Description").val(); //事件描述
        var Status = $("#Status").val(); //事件描述
        let saveData = {
          "ID": this.Aid,
          "Name": Name,
          "IruptDate": IruptDate,
          "Address": Address,
          "ReportBy": ReportBy,
          "ReportDate": ReportDate,
          "Category": Category,
          "Involve": Involve,
          "Cases": Cases,
          "Daeth": Daeth,
          "Description": Description,
          "Status": Status
        };
        console.info(saveData);
        if (Name != "" && IruptDate != "" && Address != "") {
          /*接口请求*/
          this.$http.post(this.GLOBAL.serverSrc + '/healthe/event/save', saveData, {
            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true
          }).then((res) => {
            console.info(res);
            if (res.body.code == "0") {
              this.getData();
            } else {
              this.warnMessage = res.body.result;
              this.colorMessage = "red"
            }
          }).catch(err => {
            this.warnMessage = "访问接口失败";
            this.colorMessage = "red"
          })
          this.displayDiv = "none";
        } else {
          this.warnMessage = "事件不能为空";
          this.colorMessage = "red"
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
  /* 	@import url("../static/css/login.css");
	@import url("../static/css/public_login.css");
	@import url("../static/css/reset.css"); */
  /* 	@import url("../static/css/style.css"); */

  .hello {
    width: 100%;
    height: 100%;
    background: #E6F4FF;
  }

  input[type="checkbox"i] {
    width: 30px;
    height: 20px;
    font-size: 12px;
  }

  .my-btn {
    width: 100%;
    height: 30px;
    font-size: 13px;
    margin-left: 4%;
    margin-right: 4%;
    margin-top: 2.5%;
    margin-bottom: 3%;
    background-color: #3959fb;
    text-align: center;
    color: #FFFFFF;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
  }
</style>
