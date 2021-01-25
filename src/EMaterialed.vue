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
                <router-link :to="{name:'EAdd'}"><a href="#">添加事件</a></router-link>
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
                <tbody v-for="(item,index) in list ">
                  <tr>
                    <td class='th5'>序号</td>
                    <td>{{item.RowNo}}</td>
                  </tr>
                  <!--年龄-->
                  <tr>
                    <td class='th5'>事件名称</td>
                    <td>{{item.Name}}<a href="javascript:;" v-bind:id="item.ID" @click="EventInfo" class="axq">详情</a></td>
                  </tr>
                  <!--姓名-->
                  <tr>
                    <td class='th5'>操作</td>
                    <td>
                      <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" v-bind:id="item.ID" @click="mready"
                        style=" vertical-align: middle;">物资准备</a>
                    </td>
                  </tr>
                  <!--事件状态-->
                  <tr></tr>
                  <!--事件状态-->
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
            <!-- <el-dialog :visible.sync="dialogVisible" width="70%" style="text-align: -webkit-center;" :before-close="handleClose"> -->
            <el-dialog :visible.sync="dialogVisible" width="70%" style="text-align: -webkit-center;">
              <table class="table-wrap table-input width-full table-read">
                <tbody v-for="it in info ">
                  <tr>
                    <td class='th5'>事件类型</td>
                    <td>{{it.CategoryName}}</td>
                  </tr>
                  <!--年龄-->
                  <tr>
                    <td class='th5'>事件名称</td>
                    <td>{{it.Name}}</td>
                  </tr>
                  <!--姓名-->
                  <tr>
                    <td class='th5'>暴发地址</td>
                    <td>{{it.Address}}</td>
                    <!--暴发地址-->
                  <tr>
                    <td class='th5'>暴发时间</td>
                    <td>{{it.IruptDate}}</td>
                  </tr>
                  <!--暴发时间-->
                  <tr>
                    <td class='th5'>暴发结束</td>
                    <td>{{it.IruptDateEnd}}</td>
                  </tr>
                  <!--暴发结束时间-->
                  <tr>
                    <td class='th5'>波及人数</td>
                    <td>{{it.Involve}}</td>
                  </tr>
                  <!--波及人数-->
                  <tr>
                    <td class='th5'>生病人数</td>
                    <td>{{it.Cases}}</td>
                  </tr>
                  <!--生病人数-->
                  <tr>
                    <td class='th5'>重病人数</td>
                    <td>{{it.HeavyCases}}</td>
                  </tr>
                  <!--重病人数-->
                  <tr>
                    <td class='th5'>死亡人数</td>
                    <td>{{it.Death}}</td>
                  </tr>
                  <!--死亡人数-->
                  <tr>
                    <td class='th5'>事件描述</td>
                    <td>{{it.Description}}</td>
                  </tr>
                  <!--事件描述-->
                  <tr>
                    <td class='th5'>上报人</td>
                    <td>{{it.ReportBy}}</td>
                  </tr>
                  <!--上报人-->
                  <tr>
                    <td class='th5'>联系方式</td>
                    <td>{{it.Contact}}</td>
                  </tr>
                  <!--上报人联系方式-->
                  <tr>
                    <td class='th5'>上报时间</td>
                    <td>{{it.ReportDate}}</td>
                  </tr>
                  <!--上报时间-->
                  <tr>
                    <td class='th5'>最后上报</td>
                    <td>{{it.LastReportDate}}</td>
                  </tr>
                  <!--事件状态-->
                </tbody>
              </table>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
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
        info: [], //详情
        Aid: "",
        FirstTypeList: [],
        editData: [], //编辑行的数据
        ver: "", //处置的值
        isShow: false,
        dialogVisible: false, //弹出框
      }
    },
    created: function() {

    },
    mounted: function() {
      setTimeout(function() {
        this.getData(); //定义方法
      }.bind(this), 200);

    },
    methods: {
      header() {
        $("#index").toggle();
      },
      clear() {
        $("#searchInput").val("");
      },
      slectFirst() { //一级分类
        this.$http.post(this.GLOBAL.serverSrc + '/api/tool/categores', {
          ConfigKey: 'EventRootCode'
        }, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == "0") {
            this.FirstTypeList = res.body.result;
          } else {
            this.warnMessage = "获取分类失败";
            this.colorMessage = "red"
          }
        }).catch(err => {
          this.warnMessage = "访问接口失败";
          this.colorMessage = "red"
        })
      },
      //事件详情
      EventInfo(e) {
        this.Aid = e.target.id;
        /*接口请求事件名称*/
        let data = {
          "Name": "", //事件名称
          "ID": this.Aid,
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/healthe/event/PreMaterials', data, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            this.dialogVisible = true;
            this.info = res.body.result;
          } else {
            this.$message("获取数据失败");
          }
        }).catch(err => {
          this.$message("访问接口失败");
        })
      },
      veried(e) {
        this.Aid = e.target.id;
        this.displayDivMessage = "block";
      },
      sure() {

      },
      closeT1() {
        this.displayDivMessage = "none";
      },
      Appear() {
        //this.ResertInfo();
        this.displayDiv = "block";
        this.Aid = "";
      },
      closeT() {
        this.displayDiv = "none";
      },
      clicked() {
        this.open = !this.open;
      },
      mready(e) {
        this.Aid = e.target.id;
        this.$router.push({
          name: "EMaterials",
          params: {
            eid: this.Aid
          }
        })
      },
      getData() {
        let data = {
          "Name": $("#searchInput").val(), //事件名称
          "currentPage": $("#CurrentPage").text(),
          "PageSize": $("#selectChange").val(),
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/healthe/event/PreMaterials', data, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
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
              this.$message("操作成功");

            } else {
              this.list = [];
              this.$message("暂无数据");
            }
          } else {
            this.$message("获取数据失败");

          }
        }).catch(err => {
          this.$message("访问接口失败");

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
  @import url("../static/css/main.css");
  @import url("../static/css/weui.css");
  @import url("../static/public/plugins/frozen/css/frozen.css");
  @import url("../static/public/static/css/admin.css");
  @import url("../static/public/static/css/login.css");
</style>
