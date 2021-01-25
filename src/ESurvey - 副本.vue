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
          <div class="weui-tab__panel" v-bind:style="{display:displayDiv}">
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
                  <tr>
                    <td class='th5'>操作</td>
                    <td>
                      <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" v-bind:id="[item.ID,item.ReportUnitName]"
                        @click="StdInfo(item.ID,item.ReportUnitName)">一览表</a>
                      <!-- <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" style="background: #184266;" v-bind:id="item.ID" @click="Survey1">调查表</a> -->
                      <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" style="background: #184266;" v-bind:id="item.ID" @click="Survey1">调查表</a>
                      <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" v-bind:id="item.ID" @click="Survey2">采样单</a>
                      <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" v-bind:id="[item.ID,item.EpidemicID]"
                        @click="Survey3" style="background: #184266;">意见书</a>
                      <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" v-bind:id="[item.ID,item.EpidemicID]"
                        @click="Survey4">初报告</a>
                      <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" v-bind:id="[item.ID,item.EpidemicID]"
                        @click="Survey5" style="background: #184266;">行政报告</a>
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
            <!-- 事件详情 -->
            <el-dialog :visible.sync="dialogVisible1" width="60%" style="text-align: -webkit-center;">
              <table class="table-wrap table-input width-full table-read">
                <tbody v-for="it in info">
                  <tr>
                    <td class='th5'>事件类型</td>
                    <td>{{it.CategoryName}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>事件名称</td>
                    <td>{{it.Name}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>暴发地址</td>
                    <td>{{it.Address}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>暴发时间</td>
                    <td>{{it.IruptDate}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>暴发结束</td>
                    <td>{{it.IruptDateEnd}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>波及人数</td>
                    <td>{{it.Involve}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>生病人数</td>
                    <td>{{it.Cases}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>重病人数</td>
                    <td>{{it.HeavyCases}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>死亡人数</td>
                    <td>{{it.Death}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>事件描述</td>
                    <td>{{it.Description}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>上报人</td>
                    <td>{{it.ReportBy}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>联系方式</td>
                    <td>{{it.Contact}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>上报时间</td>
                    <td>{{it.ReportDate}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>最后上报</td>
                    <td>{{it.LastReportDate}}</td>
                  </tr>
                  <tr>
                    <td class='th5'>事件状态</td>
                    <td>{{it.Status}}</td>
                  </tr>
                </tbody>
              </table>
            </el-dialog>
          </div>
          <!-- 一览表 -->
          <div v-bind:style="{display:displayDiv2}">
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" style="margin-top: 40px;margin-right: 5px;"
              @click="close2">返回</a>
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" @click="add" style="background: #184266;margin-top: 50px;margin-right: 5px;">新增</a>

            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" @click="Exports" style="margin-top: 40px;margin-right: 5px;">导出</a>
            <table class="gridtable">
              <thead>
                <tr class="data-order" data-order="id" data-sort="1">
                  <th class="order" data-order="a">
                    <div class="drop-wrap">
                      <span>姓名</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="b">
                    <div class="drop-wrap">
                      <span>性别</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="c">
                    <div class="drop-wrap">
                      <span>年龄</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="d">
                    <div class="drop-wrap">
                      <span>班级</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="cc">
                    <div class="drop-wrap">
                      <span>联系电话</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="dd">
                    <div class="drop-wrap">
                      <span>发病日期</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="e">
                    <div class="drop-wrap">
                      <span>症状</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="f">
                    <div class="drop-wrap">
                      <span>是否已就诊</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="g">
                    <div class="drop-wrap">
                      <span>操作</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="data-tbody" id="tbody">
                <tr v-for="it in stdinfo" v-bind:id="it.ID">
                  <td>{{it.StudentName}}</td>
                  <td>{{(it.Sex==1)?'女':'男'}}</td>
                  <td>{{it.Age}}</td>
                  <td>{{it.ClassName}}</td>
                  <td>{{it.PTels}}</td>
                  <td>{{it.StartTime|moment}}</td>
                  <td>{{it.AbsenceReason}}</td>
                  <td>{{(it.IsChecked=='true' ||it.IsChecked=='是')?"是":"否"}}</td>
                  <td>
                    <a href="javascript:;" class="fa fa-search" v-bind:id="it.ImgPath" @click="hre" v-if="it.ImgPath!='[]'&&it.ImgPath!=''&&it.ImgPath!='null'">预览</a>
                    <!-- <a href="javascript:;" class="fa fa-cloud-upload" v-bind:id="it.ID" @click="upfile" v-if="it.ImgPath=='[]'||it.ImgPath==''||it.ImgPath=='null'"><input
                        type="file" id="upfile" style="width:10px;height: 10px;color: #008800; display: none;" accept="*"
                        name="upfile" @change="selectFile">上传</a> -->
                    <a href="javascript:;" class="fa fa-edit" v-bind:id="it.ID" @click="editSym(it.ID)">编辑</a>
                    <a href="javascript:;" class="fa fa-trash" v-bind:id="it.ID" @click="delSym">删除</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <el-dialog title="" :visible.sync="dialogVisible2" wdith="80%" style="text-align: -webkit-center;">
              <!-- <span style="margin-left: -10px;">学校名称:</span>&nbsp;&nbsp;<el-autocomplete class="el-input" v-model="School"
                :fetch-suggestions="querySearchAsync" placeholder="输入学校名称搜索" :trigger-on-focus="false" @select="handleSelect"
                style="width:78%;"></el-autocomplete><br /> -->
              <div v-show="isShow1">
                <span style="margin-left: 20px;">年级:</span>&nbsp;&nbsp;
                <el-select v-model="grade" filterable clearable placeholder="请选择" id="grade" @change="GradeChange"
                  style="margin-top: 10px;width: 78%;">
                  <el-option v-for="option2 in selectGrade" :key="option2.Grade" :label="option2.Grade" :value="option2.Grade"></el-option>
                </el-select><br />
                <span style="margin-left: 20px;">班级:</span>&nbsp;&nbsp;
                <el-select v-model="Class" filterable clearable placeholder="请选择" id="Class" @change="ClassChange"
                  style="margin-top: 10px;width: 78%;">
                  <el-option v-for="option3 in selectClass" :key="option3.ID" :label="option3.ClassName" :value="option3.ID"></el-option>
                </el-select><br />
                <span style="margin-left: 18px;">姓名:</span>&nbsp;&nbsp;
                <!-- <el-select v-model="Students" filterable clearable placeholder="请选择" id="Students" @change="StudentsChange" style="margin-top: 10px;width: 78%;"> -->
                <el-select v-model="Students" filterable clearable placeholder="请选择" id="Students" style="margin-top: 10px;width: 78%;">
                  <el-option v-for="option4 in selectStudents" :key="option4.ID" :label="option4.Name" :value="option4.ID"></el-option>
                </el-select>
                <!-- <el-autocomplete class="el-input" v-model="Students"
                :fetch-suggestions="querySearchAsync" placeholder="输入名字搜索" :trigger-on-focus="false"
                style="width:78%;margin-top: 10px!important;"></el-autocomplete> -->
                <br />
              </div>
              <span style="margin-left: -10px;">联系电话:</span>&nbsp;&nbsp;
              <input class="intext" style="width: 78%;" id="PTels" name="PTels" :maxlength="11" regular="^1[34578]\d{9}$" /><br />
              <span style="margin-left: -10px;">病发时间:</span>&nbsp;&nbsp;
              <el-date-picker v-model="StartTime" type="datetime" id="StartTime" placeholder="选择日期时间" style="margin-top: 10px;width: 78%;"
                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker> <br />
              <span style="margin-left: 20px;">症状:</span>&nbsp;&nbsp;
              <input class="intext" style="width: 78%;" id="Symptom" name="Symptom" /><br />
              <span style="margin-left: -10px;">是否就诊:</span>&nbsp;&nbsp;
              <el-select v-model="IsChecked" filterable clearable placeholder="请选择" id="IsChecked" style="margin-top: 10px;width: 78%;">
                <el-option v-for="option in selectlist" :key="option.value" :label="option.Name" :value="option.value"></el-option>
              </el-select><br />
              <div v-show="IsChecked=='true'||IsChecked==true">
                <span style="margin-left: 20px;">附件:</span>&nbsp;&nbsp;
                <input type="file" id="upfile1" accept="*" name="upfile1" @change="Fileselect" class="fileinput" />
              </div>
              <span slot="footer" class="dialog-footer" style="font-size: 16px;" :style="{display:displaybutton2}">
                <el-button @click="Save">保 存</el-button>
              </span>
              <span slot="footer" class="dialog-footer" style="font-size: 16px;" :style="{display:displaybutton3}">
                <el-button @click="Save">保存编辑</el-button>
              </span>
            </el-dialog>
          </div>
          <!-- 个案调查-->
          <div class="weui-tab__panel" v-bind:style="{display:displayDiv1}">
            <form class="form ui-whitespace margin-top-60" name="samp-form" runat="server" style="font-size: 13px;">
              <div class="container">
                <div class="rows">
                  <p class="p_header" style="text-align: -webkit-center;">个案调查表</p>
                  <div>
                    <ul>
                      <li>
                        <span>姓名:</span>
                        <input class="xhx" id="stName" /><span>性别:</span><select class="xhx-select" id="Sex">
                          <option value="0">男</option>
                          <option value="1">女</option>
                        </select><span>年龄:</span><input class="xhx-mini" /><span>门诊号:</span><input class="xhx" id="MedicalNo" />
                        <span>住院号:</span><input class="xhx" id="HospitalNo" />
                        <p>
                          <span>家庭住址:</span><input class="xhx-2x" id="Address" /> <span>(家长)电话:</span><input class="xhx"
                            id="Phone1" />
                        </p>
                        <p>
                          <span>发病日期:</span>
                          <el-date-picker v-model="BeginDate" type="datetime" id="BeginDate" placeholder="选择日期时间" style="margin-top: 10px;background-color: #e6f4ff!important;"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>
                          <span>就诊日期:</span>
                          <el-date-picker v-model="MedicalDate" type="datetime" id="MedicalDate" placeholder="选择日期时间"
                            style="margin-top: 10px;background-color: #e6f4ff!important;" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>
                        </p>
                        <p>
                          <span>确诊日期:</span>
                          <el-date-picker v-model="ConfirmDate" type="datetime" id="ConfirmDate" placeholder="选择日期时间"
                            style="margin-top: 10px;background-color: #e6f4ff!important;" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>

                          <span>报告日期:</span>
                          <el-date-picker v-model="ReportDate" type="datetime" id="ReportDate" placeholder="选择日期时间"
                            style="margin-top: 10px;background-color: #e6f4ff!important;" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>
                        </p>
                        <p>
                          <span>住院日期:</span>
                          <el-date-picker v-model="InHospitalDate" type="datetime" id="InHospitalDate" placeholder="选择日期时间"
                            style="margin-top: 10px;background-color: #e6f4ff!important;" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>
                          <span>出院日期:</span>
                          <el-date-picker v-model="OutHospitalDate" type="datetime" id="OutHospitalDate" placeholder="选择日期时间"
                            style="margin-top: 10px;margin-bottom: 5px;background-color: #e6f4ff!important;" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>
                        </p>
                        <p>
                          <span>确诊单位:</span><input class="xhx-2x" id="HospitalName" />
                        </p>
                      </li>
                      <li>
                        <h5 class="title_h5">临床情况</h5>
                        症状与体态:<input class="xhx" id="Symptom">，
                        就诊前是否服用过抗病毒药物:<select class="xhx-select" id="IsUseAntiviral">
                          <option value="true">是</option>
                          <option value="false">否</option>
                        </select>，临床判断<input class="xhx" id="ClinicalDiagnos">
                      </li>
                      <li>
                        <h5 class="title_h5">流行病学调查</h5>
                        1.传染源情况:
                        <p>前三天去了何处:地点:<input class="xhx" placeholder="地址" id="Footprint">,时间:<el-date-picker v-model="FootprintDate"
                            type="datetime" id="FootprintDate" placeholder="选择日期时间" style="margin-top: 10px;background-color: #e6f4ff!important;"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>
                        </p>
                        <p>当地流感(或疑似)病人：<select class="xhx-select" id="HaveCase" @change="HaveCasechange">
                            <option value="true">有</option>
                            <option value="false">无</option>
                          </select>,<span v-show="HaveCaseShow" id="Relation">与病人关系：<input class="xhx"></span></p>
                        2.疫源地卫生情况:
                        <p><input class="xhx-3x" id="CaseSourceDescription"></p>
                      </li>
                      <li>
                        <h5 class="title_h5">传播途径与防疫措施</h5>
                        <p>传播途径情况<select class="xhx-2x" id="RouteOfTransmission">
                            <option value="空气飞沫传播">空气飞沫传播</option>
                            <option value="与病人面对面接触传播">与病人面对面接触传播</option>
                            <option value="日常用品传播">日常用品传播</option>
                            <option value="其他">其他</option>
                          </select>
                        </p>
                        <p>防疫措施<select class="xhx-2x" id="ControlMeasures">
                            <option value="隔离">隔离</option>
                            <option value="通风,消毒,交换场所">通风,消毒,交换场所</option>
                            <option value="预防接种">预防接种</option>
                            <option value="其他">其他</option>
                          </select>
                        </p>
                      </li>
                      <li style="margin-top: 10px;">
                        <p style="text-align: -webkit-right;"><span>调查者：</span><input class="xhx" /> <span> 调查时间：</span><el-date-picker v-model="SurveyDate"
                            type="datetime" id="SurveyDate" placeholder="选择日期时间" style="margin-top: 10px;" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>
                            </p>
                      </li>
                    </ul>
                  </div>
                  <div style="text-align: -webkit-right;">
                    <input class="btn btn-default" runat="server" id="btnSS" @click="SaveInfo" type="button" value="提交" />
                    <input class="btn btn-default" runat="server" id="btnSS" @click="close1" type="button" value="关闭" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <!-- 采样列表 -->
          <div v-bind:style="{display:displayDiv5}" style="margin: 10px 10px 10px 10px;">
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" style="margin-top: 40px;margin-right: 5px;"
              @click="close5">返回</a>
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" @click="addSample" style="margin-top: 40px;background: #184266;margin-right: 5px;">新增</a>
            <table class="gridtable">
              <thead>
                <tr class="data-order" data-order="id" data-sort="1">
                  <th class="order" data-order="a">
                    <div class="drop-wrap">
                      <span>样品编号</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="a">
                    <div class="drop-wrap">
                      <span>样品名称</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="b">
                    <div class="drop-wrap">
                      <span>采样地点</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="c">
                    <div class="drop-wrap">
                      <span>采样对象</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="d">
                    <div class="drop-wrap">
                      <span>样品状态</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="a">
                    <div class="drop-wrap">
                      <span>样品数量</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="a">
                    <div class="drop-wrap">
                      <span>样品说明</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                  <th class="order" data-order="e">
                    <div class="drop-wrap">
                      <span>操作</span>&nbsp;<ins></ins>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="data-tbody" id="tbody">
                <tr v-for="it in Samplelist" v-bind:id="it.ID">
                  <td>{{it.SampleCode}}</td> <!-- 样品编号 -->
                  <td>{{it.SampleName}}</td> <!-- 样品名称 -->
                  <td>{{it.SampleAddress}}</td> <!-- 采样地点 -->
                  <td>{{it.SampleFrom}}</td> <!-- 采样对象 -->
                  <td>{{it.SampleStatus}}</td> <!-- 样品状态 -->
                  <td>{{it.Count}}</td> <!-- 样品数量 -->
                  <td>{{it.Description}}</td> <!-- 样品说明 -->
                  <td>
                    <a href="javascript:;" class="fa fa-edit" v-bind:id="it.ID" @click="editSample">编辑</a>
                    <a href="javascript:;" class="fa fa-trash" v-bind:id="it.ID" @click="delSample">删除</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- 采样 -->
            <el-dialog title="采样单" :visible.sync="dialogVisible" width="70%" style="text-align: -webkit-center;">
              <span>样品编号</span><input class="xhx" style="width: 35%;" id="SampleCode" /><span>样品名称</span><input class="xhx"
                style="width: 35%;" id="SampleName" />
              <br /><span>采样对象</span><input class="xhx" style="width: 35%;" id="SampleBy" /><span>采样地点</span><input
                class="xhx" style="width: 35%;" id="SampleAddress" />
              <br /><span>样品状态</span><input class="xhx" style="width: 35%;" id="SampleStatus" /><span>样品数量</span><input
                class="xhx" style="width: 35%;" id="SampleCount" />
              <br /><span>样品说明</span><input class="xhx" style="width: 81%;" id="SDescription" />
              <span slot="footer" class="dialog-footer" :style="{display:displaybutton}">
                <el-button @click="SaveSamplesOne">保 存</el-button>
                <el-button @click="SaveSamplesNext">保存并继续</el-button>
              </span>
              <span slot="footer" class="dialog-footer" :style="{display:displaybutton1}">
                <el-button @click="SaveSamplesOne">保存编辑</el-button>
              </span>
            </el-dialog>
          </div>
          <!-- 意见书 -->
          <div class="weui-tab__panel" v-bind:style="{display:displayDiv3}">
            <form class="form ui-whitespace margin-top-60" name="samp-form" runat="server" style="font-size: 13px;">
              <div class="container">
                <div class="rows">
                  <p class="p_header">流行病学意见书</p>
                  <div>
                    <ul v-for="op in ReportInfo">
                      <li>
                        <p><span>疫情发生单位（个人）:</span><input class="xhx-2x" id="ReportUnitName" v-model="ReportUnitName=op.ReportUnitName" />
                          <span>法定代表人／负责人:</span><input class="xhx" id="Corporation" v-model="Corporation=op.Corporation" /></p>
                        <p><span>地 址</span>　<input class="xhx-2x" id="Address" v-model="Address=op.Address"><span>联系电话:</span><input
                            class="xhx" id="Phone" v-model="Phone=op.Phone" /></p>
                      </li>
                      <li>
                        <h5 class="title_h5">疫情简述</h5>
                        <el-date-picker v-model="ReportDate=op.ReportDate" type="datetime" id="ReportDate" placeholder="选择日期时间"
                          style="margin-top: 10px;background-color: #e6f4ff!important;" format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>，我中心流传科接<input class="xhx-2x" id="ReportUnitName" v-model="ReportUnitName=op.ReportUnitName" />报告，称该园
                        近期出现多名以<input class="xhx-2x" id="FirstCaseSymptom" v-model="FirstCaseSymptom=op.FirstCaseSymptom" />为主要症状的学生。疾控中心流病科<input
                          class="xhx-mini" id="OutDocNum" v-model="OutDocNum=op.OutDocNum">名工作人员于<el-date-picker type="datetime"
                          id="ArriveDate" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="ArriveDate=op.ArriveDate">
                        </el-date-picker>到达该园进行流行病学调查。
                        通过询问园医，查看该班级因病缺勤登记表及患病学生病历发现，首发病例<input class="xhx-2x" id="FirstCaseInfo" v-model="FirstCaseInfo=op.FirstCaseInfo" />，
                        <el-date-picker type="datetime" id="FirstCaseDate" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="FirstCaseDate=op.FirstCaseDate">
                        </el-date-picker>,在<input class="xhx" id="CheckOutWay" v-model="CheckOutWay=op.CheckOutWay">出现<input
                          class="xhx-2x" id="FirstCaseSymptom" v-model="FirstCaseSymptom=op.FirstCaseSymptom" />症状，家长带往<input
                          class="xhx-2x" placeholder="医院名称" id="HospitalName" v-model="HospitalName=op.HospitalName">就诊，居家隔离至
                        <el-date-picker type="datetime" id="FirstCaseReturnDate" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="FirstCaseReturnDate=op.FirstCaseReturnDate">
                        </el-date-picker> 。
                        截至 <el-date-picker type="datetime" id="DeadLine" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="DeadLine=op.DeadLine">
                        </el-date-picker>该园累计发现有<input class="xhx-2x" id="FirstCaseSymptom" v-model="FirstCaseSymptom=op.FirstCaseSymptom" />症状病例<input
                          class="xhx-mini" id="CaseNum" v-model="CaseNum=op.CaseNum">例，<input class="xhx-2x" style="width: 520px;text-align: left;"
                          placeholder="请描述具体疫情分布情况" v-model="SymDescription=op.ClassDistribution"> 。
                        该校有<input class="xhx-mini" id="Num1" v-model="Num1=op.Num1">栋教学楼<input class="xhx-mini" id="Num2"
                          v-model="Num2=op.Num2">层，合计<input class="xhx" id="ClassStudentCount" v-model="ClassStudentCount=op.ClassStudentCount">，教职工<input
                          class="xhx-mini" id="TeacherNum" v-model="TeacherNum=op.TeacherNum">人，有<input class="xhx-mini"
                          id="SchoolDoctorNum" v-model="SchoolDoctorNum=op.SchoolDoctorNum">名专职园医。<input class="xhx-3x"
                          id="CaseClassDistribution" v-model="CaseClassDistribution=op.CaseClassDistribution">。
                        <input class="xhx-3x" id="Deficiency" v-model="Deficiency=op.Deficiency" placeholder="疫情上报不及时，学校环境卫生尚可，教室通风良好">。
                        现场采集<input class="xhx-mini" id="SampleNum" v-model="SampleNum=op.SampleNum">名学生病例<input class="xhx"
                          id="SampleName1" v-model="SampleName1=op.SampleName">样本<input class="xhx-mini" id="SampleCount"
                          v-model="SampleCount=op.SampleCount">份
                      </li>
                      <li>
                        <h5 class="title_h5">流行病学意见</h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据现场流行病学调查情况，依据《GB28932-2012中小学校传染病预防控制工作管理规范》、《深圳市学校及托幼机构传染病防控工作指引（2017年版）》、《深圳市中小学校及托幼机构常见传染病疫情处置指引》（深卫计疾控〔2015〕40号）、《龙华区区卫计局
                        教育局关于加强和改进学校卫生工作的通知》（深龙华卫计联〔2018〕11号）等文件要求：
                        <P class="p1">1.落实本校传染病预防控制工作主体责任，成立由校长作为第一责任人的传染病预防控制工作小组，全面负责本校的各项传染病预防控制管理工作，</P>
                        <P class="p1">2.所有患病学生必须居家隔离治疗，待急性症状完全消失后48小时方可返校。(是否需要停课<select class="xhx-mini" id="isStop"
                            @change="stopclass">
                            <option value="false">否</option>
                            <option value="true">是</option>
                          </select>)<span v-show="Stoptrue"><input class="xhx-2x" id="ClassCloseAdvice" v-model="ClassCloseAdvice=op.ClassCloseAdvice"
                              placeholder="填写班级及停课天数">，其他班级病例达全部人数30%或1天内新增病大于等于5例则建议停课4天，</span></P>
                        <P class="p1">3.积极开展晨检、午检工作，排查疑似病例，全园一旦发现发热（体温大于等于38℃），伴咳嗽、咽痛症状老师或学生，须严格执行居家隔离措施并及时就诊。</P>
                        <P class="p1">4.学校须根据区疾控中心的要求实行日报和零报告制度，掌握流感样病例学生每日增减情况，及时将发现的流感样病例24小时内报告至龙华区疾病预防控制中心流行病与传染病控制科，27706691。</P>
                        <P class="p1">5.使用1000mg/L的含氯消毒剂对学校各班级和公共活动场所进行彻底消毒，加强课室的通风换气，学校及时更换不合格的紫外灯管。加强各类学习、生活、娱乐、工作场所（如教师、音乐室、舞蹈室、阅览室、宿舍）的卫生与通风，保持空气流通，保持室内外卫生环境整洁。</P>
                        <P class="p1">6.建议学校加强流感等呼吸道传染病防控宣传教育，多途径向家长普及流感等呼吸道传染病的预防知识。学校跟家长强调流感疫苗接种重要性，接种流感疫苗是预防流行性感冒的有效手段。</P>
                        <P class="p1">7.建议学校在疫情流行期间避免举行大型室内聚集性活动，减少班级之间的活动，避免交叉传染。</P>
                        <P class="p1"><textarea class="xhx-3x" id="ExtraOpinion" v-model="ExtraOpinion=op.ExtraOpinion"
                            style="min-height: 50px;height: 100%;"></textarea></P>
                      </li>
                      <li>
                        <p style="margin-left: 60%;margin-bottom: 10px;"><span>日期:
                            <el-date-picker v-model="ExamineDate=op.ExamineDate" type="datetime" placeholder="选择日期"
                              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" id="ExamineDate">
                            </el-date-picker>
                            <!-- <el-date-picker type="datetime"
                              placeholder="选择日期时间" style="margin-bottom: 5px;" format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss" v-model="ExamineDate=op.ExamineDate">
                            </el-date-picker> -->
                          </span></p>
                      </li>
                      <!-- <li style="margin-top: 10px;">
                        <p style="text-align: -webkit-right;"><span>疫情发生单位负责人（个人）签名：</span><input class="xhx" /> <span>
                            流行病学调查者签名：</span><input class="xhx" /></p>
                        <p><span style="margin-left: 25%;">日期: <el-date-picker type="datetime" id="ExamineDate"
                              placeholder="选择日期时间" style="margin-bottom: 5px;" format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss" v-model="ExamineDate=op.ExamineDate">
                            </el-date-picker>
                          </span><span>日期:<el-date-picker type="datetime" id="ExamineDate2" placeholder="选择日期时间" style="margin-bottom: 5px;"
                              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="ExamineDate2=op.ExamineDate">
                            </el-date-picker>
                          </span></p>
                      </li> -->
                    </ul>
                  </div>
                  <div style="text-align: -webkit-right;">
                    <input class="btn btn-default" runat="server" id="btnSS" @click="SaveInfo3" type="button" value="生成" />
                    <input class="btn btn-default" runat="server" id="btnSS" @click="Stamp3" type="button" value="重新生成" />
                    <input class="btn btn-default" runat="server" id="btnSS" @click="close3" type="button" value="关闭" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <!-- 初报告 -->
          <div class="weui-tab__panel" v-bind:style="{display:displayDiv4}">
            <form class="form ui-whitespace margin-top-60" name="samp-form" runat="server" style="font-size: 14px;">
              <div class="container">
                <div class="rows" v-for="op in ReportInfo1">
                  <p class="p_header">{{op.ReportUnitName}}一起流感样病例暴发疫情调查初次报告</p>
                  <div>
                    <ul>
                      <li>
                        <el-date-picker type="datetime" id="ReportDate1" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="ReportDate1=op.ReportDate">
                        </el-date-picker>，我中心流传科接<input class="xhx-2x" id="ReportUnitName1" v-model="ReportUnitName1=op.ReportUnitName" />报告，称该园
                        近期出现多名以<input class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom1=op.FirstCaseSymptom" />为主要症状的学生。疾控中心流病科
                        <input class="xhx-mini" id="OutDocNum1" v-model="OutDocNum1=op.OutDocNum">名工作人员于
                        <el-date-picker placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" id="ArriveDate1" type="datetime"
                          v-model="ArriveDate1=op.ArriveDate">
                        </el-date-picker>到达该园进行流行病学调查。
                        首发病例为<input class="xhx-2x" id="FirstCaseInfo1" v-model="FirstCaseInfo1=op.FirstCaseInfo" />，
                        <el-date-picker type="datetime" id="FirstCaseDate1" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="FirstCaseDate1=op.FirstCaseDate">
                        </el-date-picker>,在<input class="xhx" id="CheckOutWay1" v-model="CheckOutWay1=op.CheckOutWay">出现<input
                          class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom1=op.FirstCaseSymptom" />症状。
                        截至<el-date-picker type="datetime" id="DeadLine1" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="DeadLine1=op.DeadLine">
                        </el-date-picker>该园累计发现有<input class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom1=op.FirstCaseSymptom" />症状病例<input
                          class="xhx-mini" id="CaseNum1" v-model="CaseNum1=op.CaseNum">例，<input class="xhx-2x" style="width: 95%;text-align: left;"
                          placeholder="请描述具体疫情分布情况" v-model="ClassDistribution1=op.ClassDistribution" id="ClassDistribution1">,<input
                          class="xhx-3x" id="CurrentEventSitu1" v-model="CurrentEventSitu1=op.CurrentEventSitu"
                          placeholder="现场调查填写学生是否痊愈,隔离情况返校情况等" />。
                      </li>
                      <li>
                        <h5 class="title_h5">一、病例定义</h5>
                        <el-date-picker type="datetime" id="FirstCaseDate1" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="FirstCaseDate1=op.FirstCaseDate">
                        </el-date-picker>
                        至
                        <el-date-picker type="datetime" id="ArriveDate1" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="ArriveDate1=op.ArriveDate">
                        </el-date-picker>，在<input class="xhx-2x" id="ReportUnitName1" v-model="ReportUnitName1=op.ReportUnitName" />的师生、校医中：
                        <br />(一)疑似病例：出现<input class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom1=op.FirstCaseSymptom" />症状之一者;
                        <br />(二)临床诊断病例：满足疑似病例定义，且与实验室诊断病例有流行病学关联的病例。
                      </li>
                      <li>
                        <h5 class="title_h5">二、现场流行病学调查</h5>
                        (一)基本情况
                        该学校位于<input class="xhx-2x" id="Address1" v-model="Address1=op.Address" />，共有<input class="xhx"
                          id="ClassStudentCount1" v-model="ClassStudentCount1=op.ClassStudentCount">，教职工<input class="xhx-mini"
                          id="TeacherNum1" v-model="TeacherNum1=op.TeacherNum">余名，
                        设有<input class="xhx-mini" id="SchoolDoctorNum1" v-model="SchoolDoctorNum1=op.SchoolDoctorNum">名校医。<input
                          class="xhx-2x" style="width:480px" id="Deficiency1" v-model="Deficiency1=op.Deficiency"
                          placeholder="环境情况">。其中<input class="xhx-3x" id="CaseClassDistribution1" v-model="CaseClassDistribution1=op.CaseClassDistribution">。<br />
                        (二)病例发现<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;截止 <el-date-picker type="datetime" id="ArriveDate1" placeholder="选择日期时间"
                          style="margin-bottom: 5px;background-color: #e6f4ff!important;" format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss" v-model="ArriveDate1=op.ArriveDate">
                        </el-date-picker>，该校累计发现<input class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom1=op.FirstCaseSymptom" />
                        症状病例<input class="xhx-mini" id="CaseNum1" style="width:42px" v-model="CaseNum1=op.CaseNum">例，其中<input
                          class="xhx-3x" id="ClassDistribution1" v-model="ClassDistribution1=op.ClassDistribution">。<br />
                        (三)三间分布<br />
                        <div style="margin-left: 12px;">
                          3.1时间分布:<br /> 首发病例<input class="xhx-2x" id="FirstCaseInfo1" v-model="FirstCaseInfo1=op.FirstCaseInfo" />，
                          <el-date-picker type="datetime" id="FirstCaseDate1" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="FirstCaseDate1=op.FirstCaseDate">
                          </el-date-picker>,在<input class="xhx" id="CheckOutWay1" v-model="CheckOutWay1=op.CheckOutWay">出现<input
                            class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom=op.FirstCaseSymptom" />症状，家长带往<input
                            class="xhx-2x" placeholder="医院名称" id="HospitalName" v-model="HospitalName=op.HospitalName">就诊。
                          截至<el-date-picker type="datetime" id="DeadLine1" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;;"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="DeadLine1=op.DeadLine">
                          </el-date-picker>该园累计发现有
                          <input class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom1=op.FirstCaseSymptom" />症状病例、
                          <input class="xhx-mini" id="CaseNum1" v-model="CaseNum1=op.CaseNum">例。
                          <br />3.2地点分布:<br /> <input class="xhx-3x" id="ClassDistribution" v-model="ClassDistribution=op.ClassDistribution" />。
                          <br />3.3人群分布:<br /> <input class="xhx-mini" id="CaseNum1" v-model="CaseNum1=op.CaseNum">例病例中，
                          <input class="xhx" id="SexDistribution" v-model="SexDistribution=op.SexDistribution"
                            placeholder="性别分布">，
                          年龄为<input class="xhx-mini" id="AgeDistribution" v-model="AgeDistribution=op.AgeDistribution"
                            placeholder="年龄段">岁。
                          班级分布情况：<input class="xhx-3x" id="ClassRateDistribution" v-model="ClassRateDistribution=op.ClassRateDistribution"
                            placeholder="班级分布情况">。
                        </div>
                      </li>
                      <li>
                        <h5 class="title_h5">三、流行学线索</h5>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;经现场流行病学调查，结合病例临床表现，初步判定这是一起<input class="xhx-2x" id="EpidemicSituation"
                          v-model="EpidemicSituation=op.EpidemicSituation" />疫情。通过病例搜索可以找到最早首发病例
                        <input class="xhx-2x" id="FirstCaseInfo1" v-model="FirstCaseInfo1=op.FirstCaseInfo">学生,<el-date-picker
                          type="datetime" id="FirstCaseDate1" placeholder="选择日期时间" style="margin-bottom: 5px;background-color: #e6f4ff!important;"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="FirstCaseDate1=op.FirstCaseDate">
                        </el-date-picker>,在<input class="xhx-mini" id="CheckOutWay1" v-model="CheckOutWay1=op.CheckOutWay">出现<input
                          class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom1=op.FirstCaseSymptom" />症状。
                        <input class="xhx-3x" id="EpidemicClue1" v-model="EpidemicClue1=op.EpidemicClue" placeholder="如:该校午餐午休存在混班现象，其中四（4）班与四（5）混班，二（4）班与二年级的3和5班混班。该校在流感疫情流行期间举行大型军训活动" />。
                      </li>
                      <li>
                        <h5 class="title_h5">四、采样及检测</h5>
                        <input class="xhx-date" placeholder="采样时间" id="DwellDate">现场采集<input class="xhx-mini" id="SampleNum"
                          v-model="SampleNum=op.SampleNum">名学生病例<input class="xhx" id="SampleName1" v-model="SampleName1=op.SampleName">样本<input
                          class="xhx-mini" id="SampleCount" v-model="SampleCount=op.SampleCount">份，送区疾控中心实验室进行病原学分析，结果待出。
                      </li>
                      <li>
                        <h5 class="title_h5">五、调查初步结论</h5>
                        这是一场<input class="xhx-2x" id="EpidemicSituation" v-model="EpidemicSituation=op.EpidemicSituation">疫情。
                      </li>
                      <li>
                        <h5 class="title_h5">六、风险评估</h5>
                        根据学校传染病风险管理，结合现场流行病学调查数据，风险评估认为该校<input class="xhx-2x" id="EpidemicName" v-model="EpidemicName=op.EpidemicName">疫情存在扩散的风险。
                      </li>
                      <li>
                        <h5 class="title_h5">七、初步采取的控制措施及建议</h5>
                        <P class="p1">1.<span>建议<input class="xhx-2x" placeholder="所需停课班级,天数" id="ClassCloseAdvice1"
                              v-model="ClassCloseAdvice1=op.ClassCloseAdvice">，重点关注其他有流感样病例的班级，若一天内新增5例及以上病例或者发病人数占班级总人数30%，建议全班停课。</span></P>
                        <P class="p1">2.积极开展晨检、午检工作，排查疑似病例，全校一旦发现发热（≥38℃），伴咳嗽、咽痛症状老师和学生，须严格执行居家隔离措施并及时就诊，待症状消失后48小时方可返校，且返校须经过学校保健医生进行复查。</P>
                        <P class="p1">3.学校须掌握流感样病例学生每日增减情况，及时将发现的流感样病例24小时内报告至区疾病预防控制中心流行病与传染病控制科，电话27708310。</P>
                        <p class="p1">4.使用1000mg/L的含氯消毒剂对学校各班级和公共活动场所进行彻底消毒，加强课室的通风换气，学校及时更换不合格的紫外灯管。</p>
                        <p class="p1">5.建议学校加强流感等呼吸道传染病防控宣传教育，多途径向家长普及流感等呼吸道传染病的预防知识。</p>
                        <P class="p1">6.加强各类学习、生活、娱乐、工作场所（如教师、音乐室、舞蹈室、阅览室、宿舍）的卫生与通风，保持空气流通，保持室内外卫生环境整洁。</P>
                        <P class="p1">7.建议学校在疫情流行期间避免举行大型室内聚集性活动，减少班级之间的活动，避免交叉传染。</P>
                        <P class="p1"><textarea class="xhx-3x" id="ExtraOpinion1" v-model="ExtraOpinion1=op.ExtraOpinion"
                            style="min-height: 50px;height: 100%;"></textarea></P>
                      </li>
                      <li>
                        <h5 class="title_h5">八、健康教育</h5>
                        <p class="p1">1.要求学校向学生家长告知学校<input class="xhx" id="EpidemicName" v-model="EpidemicName=op.EpidemicName">等疫情情况，并普及<input
                            class="xhx" id="EpidemicName" v-model="EpidemicName=op.EpidemicName">等<input class="xhx" id="EpidemicCategory"
                            v-model="EpidemicCategory=op.EpidemicCategory">传染病的预防知识，培养孩子形成良好的卫生习惯。</p>
                        <p class="p1">2.现场发放<input class="xhx" id="EpidemicCategory" v-model="EpidemicCategory=op.EpidemicCategory">传染病宣传小册子<input
                            class="xhx-text" id="Num3" v-model="Num3=op.Num3" />份，张贴海报<input class="xhx-text" id="Num4"
                            v-model="Num4=op.Num4" />份。</p>
                      </li>
                      <!-- <li style="margin-top: 10px;">
                        <p style="margin-left: 60%;margin-top: 20px;"><span>龙华区疾病预防控制中心</span></p>
                        <p><span style="margin-left: 60%;margin-top: 20px;margin-bottom: 20px;">日期： <el-date-picker
                              type="datetime" id="ExamineDate1" placeholder="选择日期时间" style="margin-bottom: 5px;" format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss" v-model="ExamineDate1=op.ExamineDate">
                            </el-date-picker></span></p>
                      </li> -->
                      <li>
                        <p style="margin-left: 60%;margin-bottom: 10px;"><span>日期:
                            <!-- <el-date-picker v-model="ExamineDate1=op.ExamineDate" type="datetime" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                              value-format="timestamp" id="ExamineDate1">
                            </el-date-picker> -->
                            <el-date-picker type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss" v-model="ExamineDate1=op.ExamineDate" id="ExamineDate1">
                            </el-date-picker>
                          </span></p>
                      </li>
                    </ul>
                  </div>
                  <div style="text-align: -webkit-right;">
                    <input class="btn btn-default" runat="server" id="btnSS" @click="SaveInfo4" type="button" value="生成" />
                    <input class="btn btn-default" runat="server" id="btnSS" @click="Stamp4" type="button" value="重新生成" />
                    <input class="btn btn-default" runat="server" id="btnSS" @click="close4" type="button" value="关闭" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <!--行政报告 -->
          <div class="weui-tab__panel" v-bind:style="{display:displayDiv6}">
            <form class="form ui-whitespace margin-top-60" name="samp-form" runat="server" style="font-size: 13px;">
              <div class="container">
                <div class="rows" v-for="op in ReportInfo2">
                  <p class="p_header">{{txt}}信息首次行政报告模板</p>
                  <div>
                    <ul>
                      <li style="margin-bottom: 10px;font-weight: 700;text-align: center;">
                        关于
                        <!-- <select class="xhx-mini" id="Street" v-model="Street=op.Street" >
                          <option v-for="area in arealist" value="area.Name">{{area.Name}}</option>
                        </select> -->
                        <input class="xhx-mini" id="Street" v-model="Street=op.Street" />
                        街道辖区<input class="xhx" id="Community" v-model="Community=op.Community" />一起<input class="xhx"
                          id="EpidemicSituation" v-model="EpidemicSituation=op.EpidemicSituation">{{txt}}的情况报告</p>
                      </li>
                      <li>
                        <h5>区卫生健康局:</h5>
                      </li>
                      <li>
                        <input class="xhx-date" id="ReportDate1" v-model="ReportDate1=op.ReportDate" style="margin-left: 30px;" />，我单位接<input
                          class="xhx-2x" id="ReportUnitName1" v-model="ReportUnitName1=op.ReportUnitName" />（单位/个人）（联系电话：<input
                          class="xhx" id="Phone" v-model="Phone=op.Phone" />）报告：<input class="xhx-date" id="ReportDate1"
                          v-model="ReportDate1=op.ReportDate" />，
                        <!-- <select class="xhx-mini" id="Street">
                          <option v-for="area in arealist" value="area.Name">{{area.Name}}</option>
                        </select> -->
                        <input class="xhx-mini" id="Street" v-model="Street=op.Street" />
                        街道<input class="xhx" id="Community" v-model="Community=op.Community">社区<input class="xhx" id="ReportUnitName1"
                          v-model="ReportUnitName1=op.ReportUnitName" />（单位/公司）发生一起<input class="xhx-2x" id="EpidemicSituation2"
                          v-model="EpidemicSituation=op.EpidemicSituation">疫情，目前，<input class="xhx-mini" id="CaseNum1"
                          v-model="CaseNum1=op.CaseNum">人出现<input class="xhx-2x" id="FirstCaseSymptom1" v-model="FirstCaseSymptom1=op.FirstCaseSymptom" />症状，<input
                          class="xhx-mini" id="HospitalCase">人在<input class="xhx-2x" id="HospitalName1" v-model="HospitalName=op.HospitalName">（医疗机构名称）诊治，其中，死亡<input
                          class="xhx-mini" id="Death" v-model="Death=op.Death">人，危重<input class="xhx-mini" id="HeavyCases"
                          v-model="HeavyCases=op.HeavyCases">人。
                      </li>
                      <li>
                        <span style="margin-left: 30px;vertical-align: top">已开展的工作或采取的措施:</span>
                        <textarea style="height:100%;min-height: 50px;padding-top: 3px;" class="xhx-3x" id="Measures"
                          v-model="Measures=op.Measures"></textarea>
                      </li>
                      <li style="text-align: center;">
                        {{txt}}原因调查正在进行中。后续情况再报。
                      </li>
                      <!-- <li style="margin-top: 10px;">
                        <p style="margin-left: 52.5%;margin-top: 20px;"><span>报告单位：</span><input class="xhx-2x" id="ReportUnit" /></p>
                        <p><span>信息员：</span><input class="xhx" id="ReportBy" />
                          <span>
                            手机：</span><input class="xhx" id="ReportByTel" /></p>
                        <p><span style="margin-left: 52.5%;margin-bottom: 20px;">日期：<input class="dateinput" id="ExamineDate2"
                              type="datetime"></span></p>
                      </li> -->
                    </ul>
                  </div>
                  <div style="text-align: -webkit-right;">
                    <input class="btn btn-default" runat="server" id="btnSS" @click="SaveInfo5" type="button" value="生成" />
                    <input class="btn btn-default" runat="server" id="btnSS" @click="Stamp5" type="button" value="重新生成" />
                    <input class="btn btn-default" runat="server" id="btnSS" @click="close6" type="button" value="关闭" />
                  </div>
                </div>
              </div>
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
        displayDiv: 'block',
        displayDiv1: 'none',
        displayDiv2: 'none',
        displayDiv3: 'none',
        displayDiv4: 'none',
        displayDiv5: 'none',
        displayDiv6: 'none',
        displayDivMessage: 'none',
        showOrHide: "",
        open: false,
        selected: false,
        colorMessage: "",
        warnMessage: "", //提示信息
        checked: false, //默认不选中
        display: "block",
        list: [],
        Samplelist: [], //采样
        editsample: [],
        isShow1: true,
        info: [],
        stdinfo: [], //一览表数组
        Aid: "",
        eid: "", //事件id
        FirstTypeList: [],
        editData: [], //编辑行的数据
        ver: "", //处置的值
        isShow: false,
        Stoptrue: false,
        HaveCaseShow: true,
        dialogVisible: false, //采样弹出框
        dialogVisible1: false, //事件详情弹出框
        dialogVisible2: false, //新增一览表学生
        ReportInfo: [],
        ReportInfo1: [],
        ReportInfo2: [],
        dateinfo: '',
        School: '',
        grade: '',
        Class: '',
        Students: '',
        selectSchool: [],
        selectClass: [],
        selectGrade: [],
        selectStudents: [],
        CurrentEventSitu1: '患病学生均居家隔离治疗，xx班存在xx例病例未痊愈返校情况，其他学生均居家隔离',
        EpidemicClue1: "该校午餐午休存在混班现象，其中xx班与xx混班，xx与xx混班。该校在流感疫情流行期间举行大型军训活动",
        pdfpath: '',
        ReportCategory: "", //脚本102701意见书，102702报告
        ReGenerate: "", //是否重新生成 true重新生成
        displaybutton: "block",
        displaybutton1: "none",
        displaybutton2: "block",
        displaybutton3: "none",
        imgpath: "", //列表上传的
        imgpath1: "", //新增时保存的
        arr: [], //多个传参
        StartTime: "",
        IsChecked: "",
        selectlist: [{
          ID: 1,
          value: "false",
          Name: "否"
        }, {
          ID: 2,
          value: "true",
          Name: "是"
        }],
        epidemicid: "",
        Msglist: [{
          ID: 1,
          Name: "传染病疫情"
        }, {
          ID: 2,
          Name: "中毒类事件"
        }],
        arealist: [{
            Name: '福城',
            ID: 1
          },
          {
            Name: '观澜',
            ID: 2
          },
          {
            Name: '观湖',

            ID: 3
          },
          {
            Name: '大浪',

            ID: 4
          },
          {
            Name: '龙华',
            ID: 5
          },
          {
            Name: '民治',
            ID: 6
          }
        ],
        txt: "疫情",
        BeginDate: "",
        MedicalDate: "",
        ConfirmDate: "",
        ReportDate: "",
        ExamineDate: "",
        DeadLine: "",
        DeadLine1: "",
        InHospitalDate: "",
        OutHospitalDate: "",
        ExamineDate1: "",
        ExamineDate2: "",
        FootprintDate: "",
        SurveyDate: "",
        ArriveDate: "",
        ArriveDate1: "",
        ReportDate1: "",
        FirstCaseReturnDate: "",
      }
    },   
    mounted: function() {
      setTimeout(function() {
        this.getData(); //定义方法
      }.bind(this), 200);
    },
    methods: {
      upfile() {
        $('#upfile').click();
      },
      // 事件详情
      EventInfo(e) {
        this.Aid = e.target.id;
        let data = {
          "Name": "", //事件名称
          "ID": this.Aid,
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/healthe/Event/EpidemicReport', data, {

          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            this.info = res.body.result;
            this.dialogVisible1 = true;
          } else {
            this.$message("数据获取失败");
          }
        }).catch(err => {
          this.$message("访问接口失败");
        })
      },
      // 获取一览表数据
      StdInfo(_id, _id1) {
        // this.arr = e.target.id;
        // var arr1 = this.arr.split(',');
        // var ids = arr1[0];
        // var did = arr1[1]; //学校id
        this.eid = _id; //
        this.School = _id1;
        // this.Aid = "";
        let data = {
          "EventID": this.eid,
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/epidemic/report/cases', data, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
              this.stdinfo = res.body.result;
            } else {
              this.stdinfo = [];
            }
          } else {
            this.$message("数据获取失败");
          }
          this.displayDiv = "none";
          this.displayDiv2 = "block";
        }).catch(err => {
          this.$message("访问接口失败");
        })

      },
      hre(e) {
        var path = e.target.id;
        window.open(this.GLOBAL.serverSrc + "/" + path); // 本窗口打开下载
      },
      add() {
        this.isShow1 = true;
        this.dialogVisible2 = true;
        this.displaybutton2 = "block";
        this.displaybutton3 = "none";
        this.resertinfo();
        this.InitGrade();
      },
      addSample() {
        this.dialogVisible = true;
        this.ResetSample();
        this.displaybutton = "block";
        this.displaybutton1 = "none";
      },
      /*初始化获取学校*/
      InitGrade() {
        this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/StuClass/FindGrade', {
          "SchoolName": this.School, //$("#School").val()
        }, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == "0") {
            if (res.body.result.length == 0) {
              this.selectGrade = [];
            } else {
              this.selectGrade = res.body.result;
            }
            $(".pull-left").text("");
          } else {
            this.$message(res.body.result);
          }
        }).catch(err => {
          this.$message("访问接口失败");
        })
      },
      /*学校搜索END*/
      /*根据年级查询班级*/
      GradeChange(value) {
        this.grade = value;
        /*接口请求班级*/
        this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/StuClass/FindClass', {
          "Grade": this.grade,
          "SchoolName": this.School,
        }, {

          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == "0") {
            if (res.body.result.length == 0) {
              this.selectClass = [];
            } else {
              this.selectClass = res.body.result;

            }
            $(".pull-left").text("");
          } else {
            this.$message("获取班级失败");
          }
        }).catch(err => {
          this.$message("访问接口失败");
        })
      },
      /*获取班级学生*/
      ClassChange(value) {
        this.Class = value;
        this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/Students/Students', {
          "ClassID": this.Class,
        }, {

          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == "0") {
            if (res.body.result.length == 0) {
              this.selectStudents = [];
            } else {
              this.selectStudents = res.body.result;
              /*搜索输入框获取*/
              // for (let i = 0; i < res.body.result.length; i++) {
              //   this.selectStudents.push({
              //     'value': res.body.result[i].Name,
              //   })
              // }
              // return this.selectStudents;
              /*搜索输入框获取end*/
            }
            $(".pull-left").text("");
            //console.info(this.selectOption);
          } else {
            alert("获取学生失败");
          }
        }).catch(err => {
          alert("访问接口失败");
        })
      },
      /*姓名下拉框搜索*/
      querySearchAsync(queryString, cb) {
        let houseNumberList = this.selectStudents;
        let results = queryString ? houseNumberList.filter(this.createStateFilter(queryString)) : houseNumberList;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },
      createStateFilter(queryString) {
        return (Students) => {
          return (Students.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      /*一览表保存*/
      Save() {
        var StartTime = $("#StartTime")[0].value;
        let saveData = {
          "ID": this.Aid,
          "EventID": this.eid, //事件id
          "StudentID": this.Students, //学生id
          "AbsenceReason": $("#Symptom").val(),
          "StartTime": StartTime,
          "Tel": $("#PTels").val(),
          "IsChecked": this.IsChecked,
          "ImgPath": this.imgpath1,
        };
        console.info(saveData);
        if (this.Students != "" || $("#Symptom").val() != "" || StartTime != "" || this.IsChecked != "") {
          /*接口请求*/
          this.$http.post(this.GLOBAL.serverSrc + '/epidemic/report/AddAbsence', saveData, {
            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true,
          }).then((res) => {

            if (res.body.code == 0) {

              this.$message("添加成功");
              this.dialogVisible2 = false;
              this.StdInfo(this.eid, this.School);
            } else {
              this.$message("保存失败");
            }
          }).catch(err => {
            this.$message("访问接口失败");
          })
        } else {
          this.$message("姓名/班级/病发时间/是否就诊不能为空");
        }
      },
      /*编辑一览表*/
      editSym(_id) {
        this.isShow1 = false;
        this.dialogVisible2 = true;
        this.Aid = _id;
        var ida = this.Aid; //当前行的id
        this.editsample = this.stdinfo.filter(function(e) {
          return e.ID == ida;
        });
        this.displaybutton3 = "block";
        this.displaybutton2 = "none";
        this.Students = this.editsample[0].StudentID;
        $("#PTels").val(this.editsample[0].PTels); //行
        $("#Symptom").val(this.editsample[0].AbsenceReason); //资产编号

        if (this.editsample[0].IsChecked == 'true' || this.editsample[0].IsChecked == '是') {
          //$("#IsChecked").val("true"); //是否调节
          this.IsChecked = "是";
          $("#IsChecked").val("true"); //是否调节
        } else {
          // this.IsChecked="否";
          $("#IsChecked").val("0"); //是否调节
          //$("#IsChecked").val("false"); //是否调节
        }
        this.StartTime = this.editsample[0].StartTime;
        // $("#StartTime").get(0).value = this.editsample[0].StartTime.substring(0, this.editData[0].StartTime.indexOf("T"));
        $("#save1").text("保存编辑");
      },
      resertinfo() {
        this.grade = "",
          this.Aid = "",
          this.Class = "",
          this.Students = "",
          $("#PTels").val(""); //行
        $("#Symptom").val(""); //资产编号
        this.IsChecked = "",
          $("#StartTime").val("");
      },
      /*删除一览表*/
      delSym(e) {
        var ids = e.target.id;
        let data = {
          "AbsenceID": ids, //记录id
          "EventID": this.eid,
        }
        if (confirm('确定删除该信息？')) {
          this.$http.post(this.GLOBAL.serverSrc + '/epidemic/report/removeabsence', data, {
            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true
          }).then((res) => {
            if (res.body.code == "0") {
              //console.info(res);
              this.$message("删除成功");
              this.StdInfo(this.eid, this.School);
            } else {
              this.$message("删除失败");
            }
          }).catch(err => {
            this.$message("访问接口失败");
          })
        }
      },
      /*导出一览表*/
      Exports() {
        let datas = {
          "currentPage": 1,
          "PageSize": 99999,
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/epidemic/report/Exports', datas, {
          header: {},
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            var url = this.GLOBAL.serverSrc + "/" + res.body.result;
            window.open(url);
            this.warnMessage = "操作成功";
            this.colorMessage = "green"
          } else {
            this.warnMessage = "获取数据失败";
            this.colorMessage = "red"
          }
        }).catch(err => {
          this.warnMessage = "访问接口失败";
          this.colorMessage = "red"
        })
      },
      //采样单保存
      SaveSamples() {
        var SampleName = $("#SampleName").val();
        var SampleCode = $("#SampleCode").val();
        var SDescription = $("#SDescription").val();
        var SampleCount = $("#SampleCount").val();
        var SampleBy = $("#SampleBy").val();
        var SampleStatus = $("#SampleStatus").val();
        var SampleAddress = $("#SampleAddress").val();
        let saveData = {
          "ID": this.Aid,
          "SampleName": SampleName,
          "SampleCode": SampleCode,
          "Description": SDescription,
          "SampleFrom": SampleBy,
          "SampleStatus": SampleStatus,
          "SampleAddress": SampleAddress,
          "Count": SampleCount,
          "Unit": "",
          "Flag": "",
          "EventID": this.eid,
        };
        console.info(saveData);
        if (SampleName != "" && SampleCode != "" && SampleCount != "") {
          /*接口请求*/
          this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/sample/Save', saveData, {

            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true,
          }).then((res) => {
            if (res.body.code == 0) {
              this.$message("保存成功");

              this.getSample();
            } else {
              this.$message("保存失败");
            }
          }).catch(err => {
            this.$message("访问接口失败");

          })
        } else {
          this.$message("样品编号/样品名称/样品数量不能为空");
        }
      },
      // 保存多个样品
      SaveSamplesNext() {
        this.SaveSamples();
        this.ResetSample();
      },
      //保存样品
      SaveSamplesOne() {
        this.SaveSamples();
        this.dialogVisible = false;
      },
      editSample(e) {
        this.Aid = e.target.id;
        var ida = this.Aid; //当前行的id
        this.editsample = this.Samplelist.filter(function(e) {
          return e.ID == ida;
        });
        this.dialogVisible = true;
        this.displaybutton1 = "block";
        this.displaybutton = "none";
        $("#SampleName").val(this.editsample[0].SampleName); //资产编号
        $("#SampleCode").get(0).value = this.editsample[0].SampleCode; //是否库存
        $("#SampleCount").val(this.editsample[0].Count); //行
        $("#SampleBy").val(this.editsample[0].SampleBy); //列
        $("#SampleAddress").val(this.editsample[0].SampleAddress); //班级
        $("#SampleStatus").val(this.editsample[0].SampleStatus); //型号
        $("#SDescription").val(this.editsample[0].Description); //桌椅
      },
      //删除样品
      delSample(e) {
        var ids = e.target.id;
        let data = {
          "IDs": ids,
        }
        if (confirm('确定删除该信息？')) {
          this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/Sample/Del', data, {

            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true
          }).then((res) => {
            if (res.body.code == "0") {
              //console.info(res);
              this.$message("删除成功");
              this.getSample();
            } else {
              this.$message("删除失败");
            }
          }).catch(err => {
            this.$message("访问接口失败");
          })
        }
      },
      //重置样品
      ResetSample() {
        $("#SampleName").val("");
        $("#SampleCode").val("");
        $("#SDescription").val("");
        $("#SampleCount").val("");
        $("#SampleBy").val("");
        $("#SampleAddress").val("");
        $("#SampleStatus").val("");
      },
      getSample() {
        let data = {
          "EventID": this.eid,
          "currentPage": $("#CurrentPage").text(),
          "PageSize": $("#selectChange").val(),
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/Sample/Samples', data, {

          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
              this.Samplelist = res.body.result;

            } else {
              this.Samplelist = [];
              this.$message("暂无数据");
            }
          } else {
            this.$message("获取数据失败");
          }
        }).catch(err => {
          this.$message("访问接口失败");
        })
      },
      //个案调查
      Survey1(e) {
        this.Aid = e.currentTarget.id || e.target.id;
				//$('#iosDialog1').show();
				this.displayDiv = "none";
				this.displayDiv1 = "block";
				this.displayDiv3 = "none";
				this.displayDiv4 = "none";
				this.displayDiv6 = "none";
				this.ReInfo();
      },
      //采样
      Survey2(e) {
        this.Aid = e.currentTarget.id || e.target.id;
        this.getSample();
        this.displayDiv = "none";
        this.displayDiv1 = "none";
        this.displayDiv3 = "none";
        this.displayDiv4 = "none";
        this.displayDiv5 = "block";
        this.displayDiv6 = "none";
      },
      //意见书
      Survey3(e) {
        this.arr = e.target.id;
        var arr1 = this.arr.split(',');
        this.Aid = arr1[0]; //事件id
        this.epidemicid = arr1[1]; //epidemicid
        this.getReportInfo();
        this.displayDiv = "none";
        this.displayDiv3 = "block";
        this.displayDiv4 = "none";
        this.displayDiv1 = "none";
        this.displayDiv6 = "none";
      },
      //初报告
      Survey4(e) {
        this.arr = e.target.id;
        var arr1 = this.arr.split(',');
        this.Aid = arr1[0]; //事件id
        this.epidemicid = arr1[1]; //epidemicid
        this.getReportInfo();
        this.displayDiv = "none";
        this.displayDiv4 = "block";
        this.displayDiv3 = "none";
        this.displayDiv1 = "none";
        this.displayDiv6 = "none";
      },
      /*行政报告*/
      Survey5(e) {
        this.arr = e.target.id;
        var arr1 = this.arr.split(',');
        this.Aid = arr1[0]; //事件id
        this.epidemicid = arr1[1]; //epidemicid
        this.getReportInfo();
        this.displayDiv = "none";
        this.displayDiv4 = "none";
        this.displayDiv3 = "none";
        this.displayDiv1 = "none";
        this.displayDiv6 = "block";
      },
      //查看/生成报告
      GenarateReport() {
        let data = {
          "EventID": this.Aid,
          "ReportCategory": this.ReportCategory,
          "ReGenerate": this.ReGenerate,
          "EpidemicID": this.epidemicid,
        }
        this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/report/GenarateReport', data, {

          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true,
        }).then((res) => {
          if (res.body.code == 0) {
            this.$message("生成成功");
          } else {
            this.$message("报告生成失败");
          }
        }).catch(err => {
          this.$message("报告生成访问接口失败");
        })
      },
      // 意见书重新生成
      Stamp3() {
        this.ReGenerate = "true";
        this.ReportCategory = "102701";
        this.GenarateReport();
      },
      //报告重新生成
      Stamp4() {
        this.ReGenerate = "true";
        this.ReportCategory = "102702";
        this.GenarateReport();
      },
      //行政报告重新生成
      Stamp5() {
        this.ReGenerate = "true";
        this.ReportCategory = "102703";
        this.GenarateReport();
      },
      close3() {
        this.displayDiv3 = "none";
        this.displayDiv2 = "none";
        this.displayDiv1 = "none";
        this.displayDiv = "block";
      },
      close4() {
        this.displayDiv4 = "none";
        this.displayDiv2 = "none";
        this.displayDiv1 = "none";
        this.displayDiv = "block";
      },
      close5() {
        this.displayDiv5 = "none";
        this.displayDiv4 = "none";
        this.displayDiv2 = "none";
        this.displayDiv1 = "none";
        this.displayDiv = "block";
      },
      close6() {
        this.displayDiv6 = "none";
        this.displayDiv4 = "none";
        this.displayDiv2 = "none";
        this.displayDiv1 = "none";
        this.displayDiv = "block";
      },
      close1() {
        //$('#iosDialog1').hide();
        this.displayDiv1 = "none";
        this.displayDiv = "block";
      },
      close2() {
        this.displayDiv2 = "none";
        this.displayDiv = "block";
      },
      ReInfo() {
        $("#stName").val("");
        $("#Sex").val("");
        $("#MedicalNo").val("");
        $("#HospitalNo").val("");
        $("#Phone1").val("");
        $("#Address").val("");
        $("#BeginDate").val("");
        $("#MedicalDate").val("");
        $("#ConfirmDate").val("");
        $("#ReportDate").val("");
        $("#InHospitalDate").val("");
        $("#OutHospitalDate").val("");
        $("#HospitalName").val("");
        $("#Symptom").val("");
        $("#IsUseAntiviral").val("");
        $("#ClinicalDiagnos").val(""); //直接略过上报、审核流程，到处置环节
        $("#Footprint").val("");
        $("#FootprintDate").val("");
        $("#HaveCase").val("");
        $("#Relation").val("");
        $("#CaseSourceDescription").val("");
      },
      ReInfo1() {
        $("#UName").val("");
        $("#USex").val("");
        $("#UAge").val("");
        $("#UAddress").val("");
        $("#StartTime").val("");
        $("#VisDate").val("");
        $("#OutpatientNo").val("");
      },
      ReInfo2() {
        $("#TestFormID").val("");
        $("#SampleName").val("");
        $("#SampleBy").val("");
        $("#SampleAddress").val("");
        $("#SampleStatus").val("");
        $("#SampleCount").val("");
        $("#SDescription").val("");
      },
      //个案保存
      SaveInfo() {
        let saveData = {
          "EventID": this.Aid,
          "Name": $("#stName").val(),
          "Sex": $("#Sex").val(),
          "MedicalNo": $("#MedicalNo").val(),
          "HospitalNo": $("#HospitalNo").val(),
          "Phone": $("#Phone1").val(),
          "Address": $("#Address").val(),
          "BeginDate": $("#BeginDate")[0].value,
          "MedicalDate": $("#MedicalDate")[0].value,
          "ConfirmDate": $("#ConfirmDate")[0].value,
          "ReportDate": $("#ReportDate")[0].value,
          "InHospitalDate": $("#InHospitalDate")[0].value,
          "OutHospitalDate": $("#OutHospitalDate")[0].value,
          "HospitalName": $("#HospitalName").val(),
          "Symptom": $("#Symptom").val(),
          "IsUseAntiviral": $("#IsUseAntiviral").val(),
          "ClinicalDiagnos": $("#ClinicalDiagnos").val(), //直接略过上报、审核流程，到处置环节
          "Footprint": $("#Footprint").val(),
          "FootprintDate": $("#FootprintDate")[0].value,
          "HaveCase": $("#HaveCase").val(),
          "Relation": $("#Relation").val(),
          "CaseSourceDescription": $("#CaseSourceDescription").val(),
          "RouteOfTransmission": $("#RouteOfTransmission").val(),
          "ControlMeasures": $("#ControlMeasures").val(),
        };
        console.info(saveData);
        if (this.Aid != "" || $("#stName").val() != "") {
          /*接口请求*/
          this.$http.post(this.GLOBAL.serverSrc + '/healthe/eventcase/save', saveData, {
            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true,
          }).then((res) => {
            if (res.body.code == 0) {
              this.$message("保存成功");
              this.close1();
            } else {
              this.$message("保存失败");
            }
          }).catch(err => {
            this.$message("访问接口失败");

          })
        } else {
          this.$message("请填写完毕");
        }
      },
      SaveInfo3() {
        let saveData = {
          "EventID": this.Aid,
          "OutDocNum": $("#OutDocNum").val(),
          "ArriveDate": $("#ArriveDate")[0].value,
          "FirstCaseReturnDate": $("#FirstCaseReturnDate")[0].value,
          "DeadLine": $("#DeadLine")[0].value,
          "CurrentEventSitu": $("#CurrentEventSitu1").val(),
          "Num1": $("#Num1").val(),
          "Num2": $("#Num2").val(),
          "Num3": $("#SampleNum").val(),
          "Num4": "",
          "TeacherNum": $("#TeacherNum").val(),
          "SchoolDoctorNum": $("#SchoolDoctorNum").val(),
          "Deficiency": $("#Deficiency").val(),
          "SampleName": $("#SampleName1").val(),
          "SampleCount": $("#SampleCount").val(),
          "ClassCloseAdvice": $("#ClassCloseAdvice").val(),
          "EpidemicSituation": $("#EpidemicSituation").val(), //直接略过上报、审核流程，到处置环节
          "EpidemicClue": $("#EpidemicClue1").val(),
          "EpidemicName": $("#EpidemicName").val(),
          "ExamineDate": $("#ExamineDate")[0].value,
          "EpidemicCategory": $("#EpidemicCategory").val(),
          "ExtraOpinion": $("#ExtraOpinion").val(),
        };
        console.info(saveData);
        if (this.Aid != "") {
          /*接口请求*/
          this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/report/save', saveData, {
            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true,
          }).then((res) => {
            if (res.body.code == 0) {
              // this.close3();
              this.ReGenerate = "false";
              this.ReportCategory = "102701";

              this.GenarateReport();
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
      SaveInfo4() {
        let saveData = {
          "EventID": this.Aid,
          "OutDocNum": $("#OutDocNum1").val(),
          "ArriveDate": $("#ArriveDate1")[0].value,
          "FirstCaseReturnDate": $("#FirstCaseReturnDate")[0].value,
          "DeadLine": $("#DeadLine1")[0].value,
          "CurrentEventSitu": $("#CurrentEventSitu1").val(),
          "Num1": $("#Num1").val(),
          "Num2": $("#Num2").val(),
          "Num3": $("#Num3").val(),
          "Num4": $("#Num4").val(),
          "TeacherNum": $("#TeacherNum1").val(),
          "SchoolDoctorNum": $("#SchoolDoctorNum1").val(),
          "Deficiency": $("#Deficiency1").val(),
          "SampleName": $("#SampleName1").val(),
          "SampleCount": $("#SampleCount").val(),
          "ClassCloseAdvice": $("#ClassCloseAdvice1").val(),
          "EpidemicSituation": $("#EpidemicSituation").val(), //直接略过上报、审核流程，到处置环节
          "EpidemicClue": $("#EpidemicClue1").val(),
          "EpidemicName": $("#EpidemicName").val(),
          "ExamineDate": $("#ExamineDate1")[0].value,
          "EpidemicCategory": $("#EpidemicCategory").val(),
          "ExtraOpinion": $("#ExtraOpinion1").val(),
        };
        console.info(saveData);
        if (this.Aid != "" || $("#EpidemicCategory").val() != "" || $("#EpidemicName").val() != "") {
          /*接口请求*/
          this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/report/save', saveData, {

            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true,
          }).then((res) => {
            if (res.body.code == 0) {
              // this.close4();
              this.ReGenerate = "false";
              this.ReportCategory = "102702";
              this.GenarateReport();
            } else {
              this.$message("保存失败");
            }
          }).catch(err => {
            this.$message("访问接口失败");

          })
        } else {
          this.$message("");
        }
      },
      /*行政报告生成*/
      SaveInfo5() {
        let saveData = {
          "EventID": this.Aid,
          "Street": $("#Street").val(), //街道
          "Community": $("#Community").val(), //社区
          "HospitalCase": $("#HospitalCase").val(), //住院人数
          "HospitalName": $("#HospitalName1").val(), //医院名称
          "Death": $("#Death").val(), //死亡人数
          "HeavyCases": $("#HeavyCases").val(), //重症人数
          "Measures": $("#Measures").val(), //处置措施
          // "ReportUnit": $("#ReportUnit").val(), //治疗人数
          // "ReportBy": $("#ReportBy").val(), //医院名称
          // "ReportByTel": $("#ReportByTel").val(), //处置措施ReportUnit
        };
        console.info(saveData);
        if (this.Aid != "" || $("#Measures").val() != "" || $("#Death").val() != "" || $("#Community").val() != "" || $(
            "#Street").val() != "") {
          /*接口请求*/
          this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/report/adrptsave', saveData, {

            headers: {
              'token': this.$getCookie('token')
            },
            emulateJSON: true,
          }).then((res) => {
            if (res.body.code == 0) {
              // this.close6();
              this.ReGenerate = "false";
              this.ReportCategory = "102703";
              this.GenarateReport();
            } else {
              this.$message("保存失败");
            }
          }).catch(err => {
            this.$message("访问接口失败");

          })
        } else {
          this.$message("请填写完毕");
        }
      },
      getReportInfo() {
        let data = {
          "EventID": this.Aid,
          "currentPage": $("#CurrentPage").text(),
          "PageSize": $("#selectChange").val(),
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/report/reportinfo', data, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          //console.info(res);
          if (res.body.code == "0") {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
              this.ReportInfo = res.body.result;
              this.ReportInfo1 = res.body.result;
              this.ReportInfo2 = res.body.result;
            } else {
              this.ReportInfo = [];
              this.ReportInfo1 = [];
              this.ReportInfo2 = [];
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
      HaveCasechange() {
        var Sym = $("#HaveCase").val();
        if (Sym == 'true') {
          this.HaveCaseShow = true;
        } else {
          this.HaveCaseShow = false;
        }
      },
      header() {
        $("#index").toggle();
      },
      clear() {
        $("#searchInput").val("");
      },
      stopclass() {
        var stpclss = $("#isStop").val();
        if (stpclss == 'true') {
          this.Stoptrue = true;
        } else {
          this.Stoptrue = false;
        }
      },
      getData() {
        let data = {
          "Name": $("#searchInput").val(), //事件名称
          "ID": 0, //类型ID
          "currentPage": $("#CurrentPage").text(),
          "PageSize": $("#selectChange").val(),
        }
        /*接口请求*/
        this.$http.post(this.GLOBAL.serverSrc + '/healthe/Event/EpidemicReport', data, {
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
      selectFile(e) {
        this.Aid = e.target.id;
        var myfile = $("#upfile");
        var files = myfile[0].files[0];
        var formData = new FormData();
        formData.append("myfile", files);
        this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/Symptom/uploader', formData, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == 0) {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
              this.imgpath = res.body.result;
              let Data = {
                "Imgpath": this.imgpath,
                "SymptomID": this.Aid,
              }
              console.log(Data)
              this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/Symptom/uploading', Data, {
                header: {},
                headers: {
                  'token': this.$getCookie('token')
                },
                emulateJSON: true
              }).then((res) => {
                if (res.body.code == 0) {
                  this.$message('上传成功');
                } else {
                  this.$message('上传失败');
                }
              }).catch(err => {
                this.$message("出错啦");
              })
            }
          } else {
            this.$message('上传失败');
          }
        }).catch(err => {
          this.$message("出错啦");
        });
      },
      Fileselect() {
        var myfile = $("#upfile1");
        var files = myfile[0].files[0];
        var formData = new FormData();
        formData.append("myfile", files);
        this.$http.post(this.GLOBAL.serverSrc + '/Epidemic/Symptom/uploader', formData, {
          headers: {
            'token': this.$getCookie('token')
          },
          emulateJSON: true
        }).then((res) => {
          if (res.body.code == 0) {
            if (res.body.result.length > 0 && res.body.result != "结果为空") {
              this.imgpath1 = res.body.result;
            }
          } else {
            this.$message('上传失败');
          }
        }).catch(err => {
          this.$message("出错啦");
        });
      },
      //保存附件
      infoJustify() {
        let Data = {
          "ID": "",
          "FileName": this.filename,
          "FileUrl": this.filepath,
          "KeyWords": "",
          "Description": "",
          "CategoryID": 0,
          "TableName": "Phe_HealthEdu",
          "TablePID": 0,
        }
        if (this.filename == "") {
          this.$message("请选择文件！");
        } else {
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
<style scoped>
  @import url("../static/css/main.css");
  @import url("../static/css/weui.css");
  @import url("../static/public/plugins/frozen/css/frozen.css");
  @import url("../static/public/static/css/admin.css");
  @import url("../static/public/static/css/login.css");

  .hello {
    width: 100%;
    height: 100%;
    background: #E6F4FF;
  }

  .xhx-date {
    height: 1.875rem;
    width: 150px;
    border: none;
    border-bottom: 1px solid #6f8295;
    text-align: center;
    outline: none;
    margin-bottom: 8px;
    margin-right: 8px;
  }

  table.gridtable {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    width: 100%;
  }

  table.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
  }

  table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
  }

  .gridtable input {
    width: 66%;
    outline: none;
    border-bottom: 1px solid #ddd !important;
    border: none;
  }

  .intext {
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
  }

  .dateinput {
    height: 1.875rem;
    width: 150px;
    border: none;
    outline: none;
    margin-bottom: 8px;
    margin-right: 8px;
  }

  .but1 {
    width: 25px;
    height: 25px;
    font-size: 10px;
    padding-left: 1px;
    padding-right: 1px;
    background-color: #49abfe;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
    margin-left: -10px;
  }

  .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 1px 1px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 10px;
    font-size: 12px;
  }

  .file input {
    position: absolute;
    font-size: 10px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }

  .el-input__inner input {
    background-color: #e6f4ff
  }

  .el-input__inner {
    background-color: #e6f4ff
  }

  .el-input__inner:hover {
    background-color: #e6f4ff
  }

  .el-input__inner:focus {
    background-color: #e6f4ff
  }
</style>
