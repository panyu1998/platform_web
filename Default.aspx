<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BACDC.Platform.Web.Default" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
    <title>project</title>
    <link href="static/css/login.css" rel="stylesheet">
    <style>
        .codeimg {
            height: 25px;
            width: 100px;
            margin-top: 10px;
            margin-bottom: 10px;
            border: #fff 1px solid;
            border-radius: 2px;
        }

        .ima {
            width: 60px;
            background-color: black;
            height: 25px;
            text-align: center;
        }

        .changbtn {
            border: 0px;
            font-size: 12px;
            color: #0863e4;
            background: transparent;
        }
    </style>
</head>
<body style="background-image: url(static/image/bg.jpg);">
    <form role="form" method="post" action="" class="form-signin">
        <div id="login">
            <div class="img">
                <p>
                    <img src="static/image/logonew.png" class="PlatformName" /></p>
                <div class="panel-body">
                    <form class="form-signin" role="form" method="post" action="" >
                        <h4 id="msg" style="display: none;">
                            <label class="label label-warning"></label>
                        </h4>
                        <div class="input-group" style="display: inline-block;">
                            <input type="text" class="srk" id="j_username" name="j_username" placeholder="用户名" required="" />
                        </div>
                        <div class="input-group has-feedback" style="display: inline-block;">
                            <input type="password" class="srk ui-keyboard-input ui-corner-all" id="j_password" name="j_password" placeholder="密码" required="" value="" aria-haspopup="true" role="textbox" />
                            <span class="keyboard form-control-feedback">
                                <img src="static/image/icon.png" id="keyboards" /></span>
                        </div>
                        <div>                     
                                <input type="text" name="vCode" id="vCode" placeholder="验证码" class="codeimg" />
                                <img id="Img" src="Img" alt="验证码"  />
                              <button name="changeImg" id="changeImg" class="changbtn">换一张</button>
                        </div>
                        <div class="btnDiv" style="display: inline-block; position: absolute\9; padding-left: 1px;">                         
                            <button id="form-ok" class="btndl" type="button">登&nbsp;&nbsp;录</button>                         
                        </div>
                        <div style="margin: 20px 3px 10px 3px;">
                            <input type="checkbox" value="remember-me-nm" name="savenm" id="savenm" class="check"/>
                            <span class="song">记住用户名</span>
                            <input type="checkbox" value="remember-me-pw" name="savepw" id="savepw" class="check" />
                            <span class="song">记住密码</span>

                        </div>
                    </form>
                </div>
            </div>
            <div id="container">
                <input id="write" placeholder="密码" type="password" />
                <ul id="keyboard">
                    <li class="symbol"><span class="off">`</span><span class="on">~</span></li>
                    <li class="symbol"><span class="off">1</span><span class="on">!</span></li>
                    <li class="symbol"><span class="off">2</span><span class="on">@</span></li>
                    <li class="symbol"><span class="off">3</span><span class="on">#</span></li>
                    <li class="symbol"><span class="off">4</span><span class="on">$</span></li>
                    <li class="symbol"><span class="off">5</span><span class="on">%</span></li>
                    <li class="symbol"><span class="off">6</span><span class="on">^</span></li>
                    <li class="symbol"><span class="off">7</span><span class="on">&amp;</span></li>
                    <li class="symbol"><span class="off">8</span><span class="on">*</span></li>
                    <li class="symbol"><span class="off">9</span><span class="on">(</span></li>
                    <li class="symbol"><span class="off">0</span><span class="on">)</span></li>
                    <li class="symbol"><span class="off">-</span><span class="on">_</span></li>
                    <li class="symbol"><span class="off">=</span><span class="on">+</span></li>
                    <li class="delete lastitem">delete</li>
                    <li class="tab">tab</li>
                    <li class="letter">q</li>
                    <li class="letter">w</li>
                    <li class="letter">e</li>
                    <li class="letter">r</li>
                    <li class="letter">t</li>
                    <li class="letter">y</li>
                    <li class="letter">u</li>
                    <li class="letter">i</li>
                    <li class="letter">o</li>
                    <li class="letter">p</li>
                    <li class="symbol"><span class="off">[</span><span class="on">{</span></li>
                    <li class="symbol"><span class="off">]</span><span class="on">}</span></li>
                    <li class="symbol lastitem"><span class="off">\</span><span class="on">|</span></li>
                    <li class="capslock">caps lock</li>
                    <li class="letter">a</li>
                    <li class="letter">s</li>
                    <li class="letter">d</li>
                    <li class="letter">f</li>
                    <li class="letter">g</li>
                    <li class="letter">h</li>
                    <li class="letter">j</li>
                    <li class="letter">k</li>
                    <li class="letter">l</li>
                    <li class="symbol"><span class="off">;</span><span class="on">:</span></li>
                    <li class="symbol"><span class="off">'</span><span class="on">&quot;</span></li>
                    <li class="return lastitem">return</li>
                    <li class="left-shift">shift</li>
                    <li class="letter">z</li>
                    <li class="letter">x</li>
                    <li class="letter">c</li>
                    <li class="letter">v</li>
                    <li class="letter">b</li>
                    <li class="letter">n</li>
                    <li class="letter">m</li>
                    <li class="symbol"><span class="off">,</span><span class="on">&lt;</span></li>
                    <li class="symbol"><span class="off">.</span><span class="on">&gt;</span></li>
                    <li class="symbol"><span class="off">/</span><span class="on">?</span></li>
                    <li class="right-shift lastitem">shift</li>
                    <li class="space sure" id="sure">确定</li>
                    <li class="space lastitem">&nbsp;</li>
                    <li class="space cancel" id="cancel">取消</li>
                </ul>
            </div>
        </div>
    </form>
    <script type="text/javascript" src="static/js/app.b7fddeca135a12285667.js"></script>
    <script type="text/javascript" src="static/js/jquery.min.js"></script>
    <script type="text/javascript" src="static/js/jianpan.js"></script>
    <script type="text/javascript">
        $("document").ready(function () {
            $('html').bind('keydown', function (e) {
                if (e.keyCode == 13) {      //回车键的值为13，绑定回车键
                    $('#form-ok').click();
                }
            });
            
            $.ajax({
                type: 'post',
                data: '{}', //参数
                dataType: 'json',
                url: "Default.aspx/showImgCode",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    //将图片的Base64编码设置给src
                   // var img = "data:image/png;base64," + data.d;
                    var img = document.getElementById("Img");
                    img.src = "data:image/png;base64," + data.d;
                    //$("#imgCode").attr("src", img);
                },
                error: function (data) {
                    alert('响应失败！');
                }
            });           
            $(".changbtn").click(function () {
                 changevcode();
             });
            var changevcode = function () {
                $.ajax({
                    type: 'post',
                    data: {},
                    dataType: 'json',
                    url: "Default.aspx/showImgCode",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        var img = document.getElementById("Img");
                        img.src = "data:image/png;base64," + data.d;
                        //将图片的Base64编码设置给src
                        //var img = "data:image/png;base64," + data.d;
                        //$("#imgcode").attr("src", img);
                    },
                    error: function (data) {
                        alert('响应失败！');
                    }
                });
            }
            $(".btndl").click(function () {

                var user = $("input[name='j_username']").val();  //用户名
                var pass = $("input[name='j_password']").val();	//密码
                var vcode = $("input[name='vCode']").val();	//验证码
                if (user == '') {
                    layer.msg('用户名不能为空', { icon: 0 });
                    $("input[name='j_username']").focus();
                } else if (pass == '') {
                    layer.msg('密码不能为空', { icon: 0 });
                    $("input[name='j_password']").focus();
                } else if (vcode == '') {
                    layer.msg('验证码不能为空', { icon: 0 });
                    $("input[name='vCode']").focus();
                } else {
                    $.ajax({
                        type: "post",
                        url: "Default.aspx/loginOn",
                        data: "{'loginUser':'" + $('#j_username').val() + "','loginPass':'" + $('#j_password').val() + "','vcode':'" + $('#vCode').val() + "'}",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (data.d == "ok") {
                                window.location.href = "MainPage.aspx";
                            }
                            else if (data.d == 'vcodeerror') {
                                alert('验证码错误');
                                changevcode();
                            }
                            else {
                                alert('账号密码错误！');
                                changevcode();
                            }
                        },
                        error: function (err) {
                            alert(err);
                        }

                    });
                    function keylogin() {
                        if (event.keyCode == 13)
                            document.getElementByIdx_x("input1").click();
                    }
                }
            });
        });
    </script>
</body>
</html>

