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
          <div class="weui-tab__panel" style="margin-top: 40px;">
            <form class="form ui-whitespace margin-top-10" name="samp-form" id="form1" runat="server">
              <div class="container">
                <div class="rows">
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>事件类型：</div>
                      </div>
                      <div class="td2">
                        <select class="form-control" id="Category" name="Category" required="required">
                          <option value="">请选择</option>
                          <option v-for="option in FirstTypeList" v-bind:value="option.Id">{{option.Name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>事件名称：</div>
                      </div>
                      <div class="td2">
                        <select class="form-control" id="Name" name="Name" required="required">
                          <option value="">请选择</option>
                          <option value="水痘聚集性">水痘聚集性</option>
                          <option value="流行性感冒">流行性感冒</option>
                          <option value="校园食物中毒">校园食物中毒</option>
                          <option value="手足口病">手足口病</option>
                        </select>
                        <span class="reddot">*</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>严重级别：</div>
                      </div>
                      <div class="td2">
                        <select class="form-control" id="Level">
                          <option value=""></option>
                          <option value="1">一般</option>
                          <option value="2">较严重</option>
                          <option value="3">严重</option>
                          <option value="4">极度严重</option>
                          <option value="0">未分级</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>爆发时间：</div>
                      </div>
                      <div class="td2">
                        <input id="IruptDate" name="HappenTime" class="form-control" type="datetime" required="required"
                          placeholder="选择日期时间">
                        <span class="reddot">*</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>结束时间：</div>
                      </div>
                      <div class="td2">
                        <input id="IruptDateEnd" name="HappenTime" class="form-control" type="datetime" required="required"
                          placeholder="爆发结束时间">
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>波及人数：</div>
                      </div>
                      <div class="td2">
                        <input class="form-control" data-reg="notNull|isAll|字符串|all" type="text" runat="server" id="Involve"
                          maxlength="50" placeholder="请输入" tabindex="4" />
                        <span class="reddot">*</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>生病人数：</div>
                      </div>
                      <div class="td2">
                        <input class="form-control" data-reg="notNull|isAll|字符串|all" type="text" runat="server" id="Cases"
                          maxlength="50" placeholder="请输入数字" tabindex="4" />
                        <span class="reddot">*</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>重病人数：</div>
                      </div>
                      <div class="td2">
                        <input class="form-control" data-reg="notNull|isPosInt|数字|1" type="text" runat="server" id="HeavyCases"
                          maxlength="50" placeholder="请输入数字" tabindex="4" />
                        <span class="reddot">*</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>死亡人数：</div>
                      </div>
                      <div class="td2">
                        <input class="form-control" data-reg="notNull|isPosInt|数字|1" type="textarea" runat="server" id="Death"
                          maxlength="50" placeholder="请输入数字" tabindex="4" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>联系方式：</div>
                      </div>
                      <div class="td2">
                        <input class="form-control" data-reg="notNull|isPosInt|数字|1" type="textarea" runat="server" id="Phone"
                          maxlength="11" placeholder="请输入上报人联系电话" tabindex="4" />
                        <span class="reddot">*</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" style="margin-bottom: 10px;">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>事件描述：</div>
                      </div>
                      <div class="td2">
                        <input class="form-control" data-reg="notNull|isPosInt|数字|1" type="textarea" runat="server" id="Description"
                          maxlength="200" placeholder="请描述" tabindex="4" />
                        <span class="reddot">*</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>爆发地址：</div>
                      </div>
                      <div class="td2">
                        <div style="padding-top:0px;border:1px solid #CCCCCC">
                          <Modal width="100" :closable="closabling" :mask-closable="false">
                            <div class="bm-view" style="width: 100%; height: 300px;">
                              <!-- height: 34px; -->
                              <div style="width: 100%; height: 300px; flex: 1 1 0%; overflow: hidden; position: relative; z-index: 0; background-color: rgb(243, 241, 236); color: rgb(0, 0, 0); text-align: left;">
                                <input style="width: 55px;" v-model.number="center.lng" id="lng" hidden="hidden">
                                <input style="width: 55px;" v-model.number="center.lat" id="lat" hidden="hidden">
                                <baidu-map v-bind:style="mapStyle" class="map" ak="sp3adkY21cGIgu6Uoqh9QfAbHc6vD3Vt&callback=init&callback=bMapInit"
                                  :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @click="getClickInfo" @moving="syncCenterAndZoom"
                                  @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom" :autoLocation="true">
                                  <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
                                    :autoLocation="true"></bm-geolocation>
                                  <bm-view style="width: 100%; height:300px; flex: 1"></bm-view>
                                  <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
                                  <bm-control :offset="{width: '10px', height: '300px'}">
                                    <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                                      <input style="background-color: white;font-size: 12px;width: 255px;height: 36px;border: 0px solid #ccc;border-radius: 4px;"
                                        type="text" placeholder="请输入爆发地址" :value="keyword" class="serachinput" id="Address">
                                    </bm-auto-complete>
                                  </bm-control>
                                  <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
                                </baidu-map>
                              </div>
                            </div>
                          </Modal>
                        </div>
                        <span class="reddot">*</span>
                        <!-- <span :title="address_text">{{address_text}}</span> -->
                        <!-- <input class="form-control" data-reg="notNull|isPosInt|数字|1" type="textarea" runat="server" id="Address"
												 maxlength="10" :placeholder="address_text" tabindex="4" />
												<span class="reddot">*</span> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" style="margin-top:1px;">
                    <div class="table-wrap">
                      <div class="td1">
                        <div>备注：</div>
                      </div>
                      <div class="td2">
                        <input class="form-control" data-reg="notNull|isPosInt|数字|1" type="textarea" runat="server" id="Remark"
                          maxlength="10" placeholder="请描述" tabindex="4" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12">
                    <div style="margin-top: 10px; display: block;">带<span style="color: red;">*</span>为必填项目</div>
                  </div>
                  <div class="col-xs-12 col-sm-12">
                    <div class="table-wrap">
                      <div class="td1">&nbsp;</div>
                      <div class="td2 text-right">
                        <a href="javascript:void(0);" class="btn btn-default" id="btnSS" @click="SaveInfo">保存并上报</a>
                        <!-- <input class="btn btn-default" runat="server" id="btnSS" @click="SaveInfo" type="button" value="保存并上报" /> -->
                        <input class="btn btn-default" runat="server" id="btnReload" @click="ResertInfo" type="button"
                          value="重置" />
                        <router-link :to="{name:'EIndex'}"><a href="#" class="btn btn-default">关闭</a></router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div class="js_dialog" id="iosDialog1">
              <div class="weui-mask"></div>
              <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title"></strong></div>
                <div class="weui-dialog__bd">是否获取当前位置</div>
                <div class="weui-dialog__ft">
                  <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="yes">是</a>
                  <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="no">否</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import BMap from 'BMap'
  import Vue from 'vue'
  import {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  } from 'vue-baidu-map'
  // import {
  // 	location
  // } from './map';
  var pageSize = ''; //每页显示条数
  var num = ''; //总条数
  var totalPage = ''; //总页数
  var currentPage = ''; //当前页
  export default {
    name: 'HelloWorld',
    components: {
      BaiduMap,
      BmControl,
      BmView,
      BmAutoComplete,
      BmLocalSearch,
      BmMarker
    },
    data() {
      return {
        location: null,
        FirstTypeList: [],
        colorMessage: "",
        warnMessage: "", //提示信息
        Aid: "",
        editData: [], //编辑行的数据
        keyword: '',
        value1: '',
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px'
        },
        type: 'tab',
        center: {
          lng: 114.066921,
          lat: 22.653031
        },
        zoom: 15,
        selectSchool: [],
        Categorylist: [],
        displayDivMessage: 'none',
        filename: "",
        CategoryID: "",
        upid: "",
        arr: [],
        path: "", //文件路径
        isShow: false,
      }
    },

    create: function() {
      this.selectFirst();
    },
    watch: {
      value: function(currentValue) {
        this.showMapComponent = currentValue
        if (currentValue) {
          this.keyword = $("#Address").val();
          this.keyword = this.center.lng
          this.keyword = this.center.lat
        }
      }
    },
    props: {
      value: Boolean,
      mapHeight: {
        type: Number,
        default: 500
      }
    },
    mounted: function() {
      this.slectFirst();
      //this.addressDetail();
      //this.locationbtn();
      //this.getCity(); // 调用获取地理位置
      laydate.render({
        elem: '#IruptDate',
        type: 'datetime' //指定元素
      });
      laydate.render({
        elem: '#IruptDateEnd',
        type: 'datetime' //指定元素
      });
      laydate.render({
        elem: '#startTime' //指定元素
      });
      laydate.render({
        elem: '#endTime' //指定元素
      });
      setTimeout(function() {
        this.getData(); //定义方法
      }.bind(this), 200);
      if (this.leftmenu != null && this.leftmenu != "null" && this.leftmenu != "") {

        for (var i = 0; i < $("ul.left-menu")[0].children.length; i++) {
          $("ul.left-menu")[0].children[i].style.display = "none"; //所有菜单隐藏
        }
        var rights = this.leftmenu.split(',');
        for (var i = 0; i < rights.length; i++) {
          if (rights[i] == "01040101") {
            $("#" + rights[i])[0].style.display = "block";
          }
          if (rights[i] == "01040102") {
            $("#" + rights[i])[0].style.display = "block";
          }
          // if (rights[i] == "01040103") {
          // 	$("#" + rights[i])[0].style.display = "block";
          // }
          if (rights[i] == "01040104") {
            $("#" + rights[i])[0].style.display = "block";
          }
          if (rights[i] == "01040105") {
            $("#" + rights[i])[0].style.display = "block";
          }
        }
      }
    },

    methods: {
      yes() {
        this.addressDetail();
        $("#iosDialog1").hide();
      },
      no() {
        $("#iosDialog1").hide();

      },
      addressDetail() { //获取地理位置
        let _this = this
        // var vm = this;
        //全局的this在方法中不能使用，需要重新定义一下
        // var geolocation = new BMap.Geolocation();
        //
        var geolocation = new BMap.Geolocation();
        var gc = new BMap.Geocoder();
        geolocation.getCurrentPosition(function(r) { //定位结果对象会传递给r变量
          if (this.getStatus() == BMAP_STATUS_SUCCESS) { //通过Geolocation类的getStatus()可以判断是否成功定位。
            var pt = r.point;
            gc.getLocation(pt, function(rs) {
              var addComp = rs.addressComponents;
              //这里弹出的便是定位的地理位置

              _this.keyword = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
              //_this.now = false
              //这里把位置存在session里面就可以在后面用了
              sessionStorage.setItem("dAddress", addComp.province + addComp.city + addComp.district + addComp.street +
                addComp.streetNumber)
            });
          } else {
            switch (this.getStatus()) {
              case 2:
                alert('位置结果未知 获取位置失败.');
                break;
              case 3:
                alert('导航结果未知 获取位置失败..');
                break;
              case 4:
                alert('非法密钥 获取位置失败.');
                break;
              case 5:
                alert('对不起,非法请求位置  获取位置失败.');
                break;
              case 6:
                alert('对不起,当前 没有权限 获取位置失败.');
                break;
              case 7:
                alert('对不起,服务不可用 获取位置失败.');
                break;
              case 8:
                alert('对不起,请求超时 获取位置失败.');
                break;

            }
          }

        }, {
          enableHighAccuracy: true
        })
      },
      handler({
        BMap,
        map
      }) {
        let _this = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
          console.log(r);
          _this.center = {
            lng: r.longitude,
            lat: r.latitude
          }; // 设置center属性值
          _this.autoLocationPoint = {
            lng: r.longitude,
            lat: r.latitude
          }; // 自定义覆盖物
          _this.initLocation = true;
          console.log('center:', _this.center) // 如果这里直接使用this是不行的
        }, {
          enableHighAccuracy: true
        })
      },
      /***
       * 地图点击事件。
       */
      getClickInfo(e) {
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
      },

      syncCenterAndZoom(e) {
        const {
          lng,
          lat
        } = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = e.target.getZoom()
      },
      hre(e) {
        this.path = e.target.id;
        window.location.href = this.GLOBAL.serverSrc + '/' + this.path; // 本窗口打开下载
      },
      // 附件
      uplad(e) {
        this.filehref = e.target.id;
      },
      preupload(e) {
        this.displayDiv = "none";
        this.displayDivMessage = "block";
        this.arr = e.target.id;
        var arr1 = this.arr.split(',');
        this.upid = arr1[0];
        this.CategoryID = arr1[1];
      },
      close() {
        this.$router.replace({
          name: 'EIndex',
        })
      },
      //选取文件
      selectFile() {
        // 注意这里想要获取formDate的数据格式,那么input必须加上name属性,且name值对应绑定的v-model数据名字
        let size;
        this.fileObj = document.getElementById("upfile").files[0]; //获取文件信息
        this.filename = this.fileObj.name;
        this.fileObj = this.arr[0];
        var files = document.getElementById("upfile").files[0];
        var formData = new FormData();
        formData.append("myfile", files);
        this.$http.post(this.GLOBAL.serverSrc + '/api/file/uploadfile', formData, {
         
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == 0) {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
              this.filepath = res.body.result;
            }
          } else {
            this.warnMessage = "上传失败";
          }
        }).catch(err => {
          this.warnMessage = "访问接口失败";
        })
      },
      //保存附件
      infoJustify() {
        let Data = {
          "ID": "",
          "FileName": this.filename,
          "FileUrl": this.filepath,
          "KeyWords": "",
          "Description": "",
          "CategoryID": this.CategoryID,
          "TableName": "Phe_Event",
          "TablePID": this.upid,
        }
        this.$http.post(this.GLOBAL.serverSrc + '/api/file/save', Data, {
         
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == 0) {
            this.$message('上传成功');
            this.displayDivMessage = "none";
            this.getData();
          } else {
            this.$message('上传失败');
          }
        }).catch(err => {
          this.$message("访问接口失败");
        })
      },
      //预览附件
      look(e) {
        this.displayA = "block";
        var ids = e.target.id;
        let data = {
          "ID": "",
          "FileName": "",
          "FileUrl": "",
          "KeyWords": "",
          "Description": "",
          "CategoryID": "",
          "TableName": "Phe_Event",
          "TablePID": ids,
          "currentPage": 1,
          "PageSize": 99999,
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/api/file/files', data, {
         
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
              this.fileList = res.body.result;
              this.path = res.body.result[0].FileUrl;
              this.warnMessage = "操作成功";
              this.colorMessage = "green"
            } else {
              this.fileList = [];
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
      handleChange(value) {
        console.log(value);
      },
      //事件类型列表
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
      handler({
        BMap,
        map
      }) {
        let _this = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
          console.log(r);
          _this.center = {
            lng: r.longitude,
            lat: r.latitude
          }; // 设置center属性值
          _this.autoLocationPoint = {
            lng: r.longitude,
            lat: r.latitude
          }; // 自定义覆盖物
          _this.initLocation = true;
          console.log('center:', _this.center) // 如果这里直接使用this是不行的
        }, {
          enableHighAccuracy: true
        })
      },
      /***
       * 地图点击事件。
       */
      getClickInfo(e) {
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
      },

      syncCenterAndZoom(e) {
        const {
          lng,
          lat
        } = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = e.target.getZoom()
      },
      clicked() {
        this.open = !this.open;
      },
      getData() {
        let data = {
          "Name": $("#EventName1").val(), //事件名称
          "Category": $("#Category1").val(), //类型ID
          "Level": $("#Level1").val(), //严重级别
          "Status": "", //事件状态，（0，1，2，3，4，-1）
          "DateS": $("#startTime").val(), //起始日期
          "DateE": $("#endTime").val(), //截止日期
          "currentPage": $("#CurrentPage").text(),
          "PageSize": $("#selectChange").val()
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/healthe/event/events', data, {
         
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
      deleteData(e) { //删除数据
        var idstring = 0;
        var $checkbox = $('#tbody input[type="checkbox"][name="checked"]');
        var $checked = $('#tbody input[type="checkbox"][name="checked"]:checked');
        if ($checkbox.is(":checked")) {
          if (confirm('确定删除选中的信息？')) { //确认
            var idArray = [];
            $("input:checkbox[name='checked']:checked").each(function() {
              idArray.push($(this).attr("id")); //向数组中添加元素
            });
            idstring = idArray.join(','); //将数组元素连接起来以构建一个字符串
            this.$http.post(this.GLOBAL.serverSrc + '/healthe/event/del', {
              "IDs": idstring
            }, {
              header: {},
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
        } else {
          this.warnMessage = "请选择要删除的信息";
          this.colorMessage = "red"
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
        var Name = $("#Name").val(); //事件名称
        var IruptDate = $("#IruptDate").val(); //爆发时间
        var IruptDateEnd = $("#IruptDateEnd").val(); //爆发时间
        var Level = $("#Level").val(); //严重级别
        var Address = $("#Address").val(); //爆发地点
        var Longitude = $("#lng").val(); //经度
        var Latitude = $("#lat").val(); //纬度
        var Category = $("#Category").val(); //类别
        var Involve = $("#Involve").val(); //波及人数
        var Cases = $("#Cases").val(); //生病人数
        var HeavyCases = $("#HeavyCases").val(); //生病人数
        var Death = $("#Death").val(); //死亡人数
        var Description = $("#Description").val(); //事件描述
        var Remark = $("#Remark").val(); //备注
        var Contact = $("#Phone").val(); //联系方式
        let saveData = {
          "ID": this.Aid,
          "Name": Name,
          "IruptDate": IruptDate,
          "IruptDateEnd": IruptDateEnd,
          "Level": Level,
          "Address": Address,
          "Longitude": Longitude,
          "Latitude": Latitude,
          "Category": Category,
          "Involve": Involve,
          "Cases": Cases,
          "HeavyCases": HeavyCases,
          "Death": Death,
          "Description": Description,
          "Remark": Remark,
          "Contact": Contact,
          "Status": 2, //直接略过上报、审核流程，到处置环节
          "DisposeStatus": -1
        };
        console.info(saveData);
        if (Name != "" && IruptDate != "" && Address != "" && Involve != "" && Cases != "" && HeavyCases != "" &&
          Contact != "" && Description != "") {
          /*接口请求*/
          this.$http.post(this.GLOBAL.serverSrc + '/HealthE/Event/Save', saveData, {
           
            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true,
          }).then((res) => {
            if (res.body.code == 0) {

              this.$message("保存成功");
              if (Name == '流行性感冒') {
                window.location.href = this.GLOBAL.serverSrc + '/Healthfiles/流感样病例调查一览表.docx'; // 本窗口打开下载
              }
              if (Name == '水痘聚集性') {
                window.location.href = this.GLOBAL.serverSrc + '/Healthfiles/水痘病例调查一览表.docx'; // 本窗口打开下载
              }
              setTimeout(function() {
                this.$router.push({
                  name: "EVerify",
                })
              }.bind(this), 2000);

            } else {
              this.$message("保存失败");
            }
          }).catch(err => {
            this.$message("访问接口失败");

          })
        } else {
          this.$message("事件名称或爆发时间不能为空");
        }
      },
      /*批量上报*/
      submit() {
        var $checkbox = $('#tbody input[type="checkbox"][name="checked"]');
        var $checked = $('#tbody input[type="checkbox"][name="checked"]:checked');
        if ($checkbox.is(":checked")) {
          if (confirm('确定上报选中的信息？')) { //确认
            var idArray = [];
            $("input:checkbox[name='checked']:checked").each(function() {
              idArray.push($(this).attr("id")); //向数组中添加元素
            });
            var idstring = idArray.join(','); //将数组元素连接起来以构建一个字符串
            /*接口请求*/           
              this.$http.post(this.GLOBAL.serverSrc + '/healthe/event/report', {
                "ID": idstring
              }, {             
                headers: {
                  'token': this.$getCookie('token')
                },
                emulateJSON: true
              }).then((res) => {
                this.getData();
              }).catch(err => {
                this.warnMessage = "访问接口失败";
                this.colorMessage = "red"
              })
          }
        } else {
          this.warnMessage = "请选择要上报的信息";
          this.colorMessage = "red"
        }
      },
      /*上报*/
      submitNow(e) {
        this.Aid = e.target.id;
        var aid = this.Aid
        if (e.target.innerHTML == "上报") {
          if (confirm('确定上报选中的信息？')) { //确认
            /*接口请求*/
            http: //140.200.0.105:8066/NurSchool/NurSchoolReport/RemoveNurSchool
              this.$http.post(this.GLOBAL.serverSrc + '/healthe/event/report', {
                "ID": aid
              }, {
               
                headers: {
                  'token': this.$getCookie('token')
                },
                emulateJSON: true
              }).then((res) => {
                this.getData();
              }).catch(err => {
                this.warnMessage = "访问接口失败";
                this.colorMessage = "red"
              })
          }
        } else {
          this.warnMessage = "删除失败";
          this.colorMessage = "red"
        }
      },
      EditInfo(e) {
        //this.ResertInfo();
        this.displayDiv = "block";
        this.Aid = e.target.id; //当前行的id
        var ida = this.Aid;
        this.editData = this.list.filter(function(e) {
          return e.ID == ida;
        });
        $("#Name").val(this.editData[0].Name); //事件名称
        $("#IruptDate").val(this.editData[0].IruptDate.substring(0, this.editData[0].IruptDate.indexOf("T"))); //爆发地点
        $("#IruptDateEnd").val(this.editData[0].IruptDate.substring(0, this.editData[0].IruptDateEnd.indexOf("T"))); //爆发地点
        $("#Address").val(this.editData[0].Address); //爆发地点
        $("#lng").val(this.editData[0].Longitude); //经度
        $("#lat").val(this.editData[0].Latitude); //纬度
        $("#Category").val(this.editData[0].Category); //事件类别
        $("#Involve").val(this.editData[0].Involve); //波及人数
        $("#Cases").val(this.editData[0].Cases); //生病人数
        $("#HeavyCases").val(this.editData[0].HeavyCases); //生病人数
        $("#Death").val(this.editData[0].Death); //死亡人数
        $("#Description").val(this.editData[0].Description); //事件描述
        $("#Remark").val(this.editData[0].Remark); //备注
        $("#Phone").val(this.editData[0].Contact); //备注
        $(".modal-footer .btn-primary").text("保存编辑");
        this.center.lng = this.editData[0].Longitude;
        this.center.lat = this.editData[0].Latitude;
        this.zoom = e.target.getZoom()
      },
      ResertInfo() { //重置信息
        $("#Name").val("");
        $("#IruptDate").val("");
        $("#IruptDateEnd").val("");
        $("#Address").val("");
        $("#lng").val("");
        $("#lat").val("");
        $("#Category").val("");
        $("#Phone").val("");
        $("#Involve").val("");
        $("#Cases").val("");
        $("#HeavyCases").val("");
        $("Daeth").val("");
        $("#Description").val("");
        $("#Remark").val("");
      },
      header() {
        $("#index").toggle();
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

  .hello {

    background: #E6F4FF;
  }

  .container {

    background: #E6F4FF;
  }
</style>
round: #E6F4FF;
}

.container {

background: #E6F4FF;
}
</style>
