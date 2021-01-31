<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainPage01.aspx.cs" Inherits="BACDC_Platform.MainPage01" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <!--[if lt IE 9]>
			<script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
			<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
	<![endif]-->
    <title>用户登录</title>
    <link href="static/css/main.css" rel="stylesheet">   
</head>
<body>
    <div id="app">      
            <section class="header" style="font-size:16px;">
                <div class="header-bg">
                    <div class="header-left">
                        <div class="t-name">
                            <img src="static/image/big-logo.1d740d3.png" /> </>
                        </div>
                        <ul class="header-ul">
                            <li class="dropdown header-menu">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="submenu/main.html" target="right" >首页</a>
                            </li>
                            <li class="dropdown header-menu">
                                <a class="dropdown-toggle" href="#" data-toggle="dropdown">系统基础数据</a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="submenu/Vaccin.aspx" target="right">                                                                     
                                            <div class="bg1">
                                                <i class="fa fa-list-alt"></i>
                                            </div>
                                            <dd>疫苗接种数报表</dd>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="submenu/Desk.aspx" target="right">
                                            <div class="bg2">
                                                <i class="fa fa-table"></i>
                                            </div>
                                            <dd>课桌椅示意图</dd>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li  class="dropdown header-menu"><a  href="#" data-toggle="dropdown" class="dropdown-toggle">疾病风险管理</a>
                                <ul  class="dropdown-menu">
                                    <li ><a  href="#" target="right">
                                        <div  class="bg1"><i  class="fa fa-send-o"></i></div>
                                        <dd >传染病管理</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg2"><i  class="fa fa-share-square-o"></i></div>
                                        <dd >病媒监测</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg3"><i  class="fa fa-transgender-alt"></i></div>
                                        <dd >疫情管理</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg4"><i  class="fa fa-share-alt"></i></div>
                                        <dd >流行病管理</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg5"><i  class="fa fa-share"></i></div>
                                        <dd >消毒监测</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg6"><i  class="fa fa-ambulance"></i></div>
                                        <dd >学校幼儿园疫情风险评估系统</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg7"><i  class="fa fa-balance-scale"></i></div>
                                        <dd >企业健康管理系统</dd>
                                    </a></li>
                                </ul>
                            </li>
                            <li  class="dropdown header-menu"><a  href="#" data-toggle="dropdown" class="dropdown-toggle">督导管理</a>
                                <ul  class="dropdown-menu">
                                    <li >
                                        <a  href="#" target="right">
                                        <div  class="bg1"><i  class="fa fa-chain"></i></div>
                                        <dd >预防接种督导</dd>
                                        </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg2"><i  class="fa fa-chain-broken"></i></div>
                                        <dd >传染病督导</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg3"><i  class="fa fa-indent"></i></div>
                                        <dd >学校卫生督导</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg4"><i  class="fa fa-columns"></i></div>
                                        <dd >电子健康档案督导</dd>
                                    </a></li>
                                    <li ><a  href="#" target="right">
                                        <div  class="bg5"><i  class="fa fa-adjust"></i></div>
                                        <dd >职业卫生督导</dd>
                                    </a></li>
                                </ul>
                            </li>
                            <li class="dropdown header-menu">
                                <a class="dropdown-toggle" href="#" data-toggle="dropdown">突发公共卫生事件管理</a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg1">
                                                <i class="fa fa-bell"></i>
                                            </div>
                                            <dd>应急管理</dd>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg2">
                                                <i class="fa fa-krw"></i>
                                            </div>
                                            <dd>风险管理</dd>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg3">
                                                <i class="fa fa-bell-slash-o"></i>
                                            </div>
                                            <dd>风险预警</dd>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown header-menu">
                                <a class="dropdown-toggle" href="#" data-toggle="dropdown">决策分析</a>
                            </li>
                            <li class="dropdown header-menu">
                                <a class="dropdown-toggle" href="#" data-toggle="dropdown">设置中心</a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg1">
                                                <i class="fa fa-gears"></i>
                                            </div>
                                            <dd>GIS设置</dd>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg2">
                                                <i class="fa fa-file-word-o"></i>
                                            </div>
                                            <dd>报表模板设置</dd>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg3">
                                                <i class="fa fa-exchange"></i>
                                            </div>
                                            <dd>数据交换接口设置</dd>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg4">
                                                <i class="fa fa-sun-o"></i>
                                            </div>
                                            <dd>溯源接口设置</dd>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg5">
                                                <i class="fa fa-table"></i>
                                            </div>
                                            <dd>网格设置</dd>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="right">
                                            <div class="bg6">
                                                <i class="fa fa-cog"></i>
                                            </div>
                                            <dd>权限设置</dd>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown header-menu">
                                <a class="dropdown-toggle" href="#" data-toggle="dropdown">地图服务</a>
                            </li>
                        </ul>
                    </div>
                    <div class="header-right">
                        <li class="dropdown user-menu unopen">
                            <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                                <img class="img-circle" alt="User Image" src="static/image/user.a988724.png" /> 
                                <span class="hidden-xs"><asp:Label ID="lblCurrentUser" Font-Size="16px" ForeColor="white" runat="server"></asp:Label></span>
                                  
                            </a>
                            <ul class="dropdown-menu">
                                <li class="user-header">
                                    <img class="img-circle" alt="User Image" src="static/image/user.a988724.png" /> 
                                    <dl>
                                        <dt><asp:Label ID="Label1" Font-Size="14px" ForeColor="white" runat="server"></asp:Label></dt>
                                        <dd style="font-size:14px" id="timeShow" class="time1"></dd>
                                    </dl>
                                </li>
                                <li class="user-footer">
                                    <a href="#">信息</a>
                                    <a href="Default.aspx">退出</a>
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
            </section>
        <iframe name="right" style="width:100%;height:100%" src= "submenu/main.html" scrolling= "auto" frameborder= "0"></iframe> 
    </div>    
    <script type="text/javascript" src="static/js/public/jquery1.12.1.min.js"></script>
    <script type="text/javascript" src="static/js/public/jquery.dotdotdot.min.js"></script>
    <script type="text/javascript" src="static/js/public/layer/layer.js"></script>
    <script type="text/javascript">
        $(function () {
            $("body").on("click", ".user-menu", function () {
                if ($(this).hasClass("open")) {
                    $(this).removeClass("open");
                } else {
                    $(this).addClass("open");
                }
            });
            $("body").on("mouseenter", ".header-menu", function () {
                $(this).addClass("open").siblings().removeClass("open");
            });
            $("body").on("mouseleave", ".header-ul", function () {
                $(".header-menu").removeClass("open");
            });
        })


        var t = null;
        t = setTimeout(time, 1000);//开始执行
        function time() {
            clearTimeout(t);//清除定时器
            dt = new Date();
            var y = dt.getYear() + 1900;
            var mm = dt.getMonth() + 1;
            var d = dt.getDate();
            var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            var day = dt.getDay();
            var h = dt.getHours();
            var m = dt.getMinutes();
            var s = dt.getSeconds();
            if (h < 10) { h = "0" + h; }
            if (m < 10) { m = "0" + m; }
            if (s < 10) { s = "0" + s; }
            document.getElementById("timeShow").innerHTML = y + "年" + mm + "月" + d + "日" + "" + h + ":" + m + ":" + s + "" + "(" + weekday[day] + ")";
            t = setTimeout(time, 1000); //设定定时器，循环执行           
        } 
  </script>
</body>
    
</html>