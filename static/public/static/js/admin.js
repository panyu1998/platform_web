/*
	edmin v3.0
	Created   : 2016-6-6, 6:6:6
	Author    : 丁显才,18798076684
	Copyright : http://www.dingxc.com
	
	1、转换成大写：toUpperCase() 2、转换成小写：toLowerCase()
	Trident(IE内核)：Gecko(Firefox内核)：Presto(Opera前内核)Webkit(Safari内核,Chrome内核原型,开源)Blink是一个由Google和Opera Software开发的浏览器排版引擎
	排版引擎 WebCore KHTML
	绘画canvas用于媒介回放的video和audio元素本地离线存储localStorage长期存储数据，浏览器关闭后数据不丢失；sessionStorage的数据在浏览器关闭后自动删除语意化更好的内容元素，比如article、footer、header、nav、section表单控件，calendar、date、time、email、url、search新的技术webworker,websockt,Geolocation
	px和em都是长度单位，区别是，px的值是固定的，指定是多少就是多少，计算比较容易。em得值不是固定的，并且em会继承父级元素的字体大小 浏览器的默认字体高都是16px。1em=16px
	
	强制类型转换 parseInt,parseFloat,Number,Boolean,String,.toString();前者可以处理空和未定义   隐形转换    == ===   43px Number NAN parseInt()=43
	split() join() 的区别 割成数组的形式string.split('-') ，后者是将数组转换成字符串eg  array.join('-');
	数组方法pop() push() unshift() shift();  push()尾部添加 pop()尾部删除unshift()头部添加 shift()头部删除  array.push('kl'); array.pop();删除可携带参数，但无用
	事件绑定和普通事件有什么区别 事件绑定就是针对dom元素的事件，绑定在dom元素上 普通事件即为非针对dom元素的事件
	ajax请求的时候get 和post方式的区别 GET 1024字节，2k左右ie2083字节 一个在url后面 一个放在虚拟载体里面\有大小限制\安全问题
	如何解释json数据 使用eval parse 鉴于安全性考虑 使用parse更靠谱 $.parseJSON(str)
	
	div+css的布局较table布局有什么优点？ 改版的时候更方便 只要改css文件。
　　页面加载速度更快、结构化清晰、页面显示简洁。
　　表现与结构相分离。
　　易于优化（seo）搜索引擎更友好，排名更容易靠前。
	CSS hack的目的就是使你的CSS代码兼容不同的浏览器。当然，我们也可以反过来利用CSS hack为不同版本的浏览器定制编写不同的CSS效果。
	rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的透明度，而rgba()只作用于元素的颜色或其背景色
	http:状态码 ：1消息  2成功 ，200 ok 3重定向  4请求错误 5 服务器错误
	
	call和apply的区别  Object.call(this,obj1,obj2,obj3)参数对应  Object.apply(this,arguments),只接受一个对象组 
	闭包是什么，有什么特性，对页面有什么影响  闭包就是能够读取其他函数内部变量的函数。
		闭包”（closure）定义非常抽象，很难看懂。我的理解是，闭包就是能够读取其他函数内部变量的函数。
		它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。
	如何阻止事件冒泡和默认事件	event.stopPropagation(); canceBubble return false
	”==”和“===”的不同  前者会自动转换类型  后者不会
	数组去重的方法  array.indexOf(var);
	
	JavaScript的数据类型
	基本数据类型：Number，String，Boolean，Undefined，Null
	复杂数据类型：Object，Array，Function，RegExp，Date，Error
	全局数据类型：Math

	var a = '15.56'; var b = 20.03;  var s = parseInt(a)+parseInt(b);var m = parseInt(a+b);  console.log(s,m); var s = new Array(5);
	s[1] = 1; s[5] = 5; console.log(  s,s.length  );
	screen  对象

	^[^#]*#{2}[^#]*$
	
	var arr = [1,2,6,4,8];  arr.slice(2);删除前两个得到的新数组 不会改变原来arr ；  arr.slice(0,3);从第几个开始，保留多少个；
	arr.sort(sortNumber)
	function sortNumber(a, b){return a - b} 
	
	str = str.replace(/www/gm,"--");
	str = str.replace(/\./gm,"--"); console.log(str);
	val.replace(new RegExp(key,"gm"),'<m class="red-8">'+key+'</m>')
	setTimeout(function(){dotelm(elm)},50);
	$("body").on("click","button",function(){
		clearTimeout(TimeDb);
		TimeDb = setTimeout(function(){

		},300);
	}).on("dblclick","button",function(){
		clearTimeout(TimeDb);

	});
	div tabindex 属性为元素加key 事件
	encodeURI(encodeURI(name,'utf8'),'utf8');
	input lable checkbox  input前有元素  ie会失效
*/
//配置常量
var config = {} , edwin = {
	sysTem:'edmin',resizeTime:null,
	TimeFn : null,TimeDb : null,
	siteTabDisplay : 'flex',flexMinSize:90,tabsMoveSize: 0 ,tabsNum : 2,
	winName:'',winWidth:'',winHeight:'',winX:'',
	quitTime : 7200,quitCue : 60,quitSwitch : false,
	lang     : ['en','zh-CN','zh-TW'],
	nowHref  : window.location.href,
	splitMark: ['♔','♗'],
	fiveKey  : [37,38,39,40,13],
	FILE_PATH: 'edmin/',
	SERVER   : window.location.href.split(window.location.pathname)[0]+'/edwin/public/index/index/',
	ROOT_PATH: window.location.href.split(window.location.pathname)[0]+'/edmin/',
	PB_PATH  : window.location.href.split(window.location.pathname)[0]+'/edmin/public/' };
$.ajaxSettings.async = false;$.getJSON(edwin.PB_PATH+"json/edmin.json",function(data){ config=data; });
/*注释：
	所有赋值取值系统  遵循  type name key val。
	sysTem     		-> 当前系统名称
	resizeTime 		-> window改变大小时间次数
	nowHref		 	-> 当前网址
	TimeFn,TimeDb	-> 单击双击事件单击次数定义
	siteTabDisplay : 'page',tabsMoveSize: 0 ,tabsNum : 2,  网站标签栏布局page flex两种，tabsMoveSize按钮每次移动长度，标签数量为2
	winName,winWidth,winHeight,winX, -> 当前窗口信息名字（xs,sm,md,lg,vl） 浏览器宽度。高度。左侧菜单winX（0，1，2）0手机算，1平板，2电脑
	quitTime = 7200,quitCue = 60,quitSwitch=false; -> //退出系统时间，提示时间，是否开启退出模式
	SERVER   服务器  地址  
	ROOT_PATH 当前系统根地址
	PB_PATH  public文件夹目录
	config JSON      配置文件 主要包含页面布局等
*/

//菜单加载
$.getJSON(edwin.PB_PATH+'json/menu.json',function(data){
	setEdmin('menu',$(".sidebar-menu"),data.menu);
	if(edwin.nowHref.indexOf('home.html')>-1){
		$(".sidebar-menu").prepend(data.head);
	}else if(edwin.nowHref.indexOf('apple.html')>-1){
		
	}else{
		$(".sidebar-menu").prepend(data.head);
		$(".sidebar-menu").find("a").each(function(i){
			var href = $(this).attr("data-href");
			if(href=="#"){ $(this).attr("href","#");
			}else if(href.indexOf('http://')>-1){
				$(this).attr({"target":"_blank","href":href});
			}else{$(this).attr("href",edwin.ROOT_PATH+href);}
		});
	}
});
$(".control-aside").load(edwin.ROOT_PATH+'menc.html',function(){
	$(".localpath").each(function(){
		$(this).attr("src",edwin.ROOT_PATH+$(this).attr("src"));
	});
	var html = '<div class="table-left width-100"><ul class="list-item"></ul></div><div class="table-right"><div class="tab-content"></div></div>';
	var wrap = $("<div>",{"class":"table-wrap",html:html}).appendTo($("#syschar"));
	$.each(config.edmin_char,function(i,list){
		var left  = '<li data-toggle="tab" href="#schar'+i+'">'+list.name+'</li>';
		var right = ''; $.each(list.char,function(i,list){right = right +'<li>'+list+'</li>';});
		var right = '<div class="tab-pane fade" id="schar'+i+'"><ul class="sChar-ul list-inline">'+right+'</ul></div>';
		wrap.find(".list-item").append(left);wrap.find(".tab-content").append(right);
	});
	$("#syschar").find(".list-item li").first().click();
});

if(!window.localStorage){htmlError($('body'),'浏览器出错','您的浏览器版本太低，不能访问本站，请升级!',1);}
//单击双击事件 $("button").onClick(function(e){},function(e){});
$.fn.onClick = function(onClick,onDblclick){
	return this.each(function(){
		var timer = null;
		var target = this; 
		$(this).click(function(e){ 
			clearTimeout(timer); 
			timer = setTimeout(function(){
				(onClick || $.noop).call(target, e);
			}, 400); 
		}).dblclick(function(e) { 
			clearTimeout(timer);(onDblclick || $.noop).call(target, e); 
		});
	}); 
};
//edsel noverify不验证数据
; (function ($) { "use strict";
$.fn.edsel = function (method){
	var $defaults = {
			errorinfo:langGet('system','nofind'),
			name:'edsel',  		//插件名称	
			nodeal:false,		//是否运行插件	
			readonly:false,		//只读
			disabled:false,		//禁用
			noverify:false,
			data    :false,
			ajax 	:false,
			version:'3.0'
		},
	$edselset = {},$sodList,$sodListOption;
	var _private = {
		initSoD: function (options) {
			$edselset = $.extend({}, $defaults, options);
			return this.each(function () {
				if($(this).parent().hasClass("edselwrap")) return false;
				if( $edselset.nodeal || $(this).attr("nodeal") || $(window).width()<=768) return false;
				if($(this).attr("multiple")){
					$(this).addClass("hidden").wrap("<div class='edselwrap edselmul'></div>");var elmSel = $(this).closest(".edselwrap");
					elmSel.append('<i class="fa fa-caret-down" aria-hidden="true"></i><ol class="edsel-ol"></ol>');
				}else{
					$(this).addClass("hidden").wrap("<div class='edselwrap edselone'></div>");var elmSel = $(this).closest(".edselwrap");
					if($edselset.ajax){
						elmSel.addClass("edselAjax").append('<i class="fa fa-caret-down" aria-hidden="true"></i><input class="edseIn form-input" type="text">');
					}else{
						if( $edselset.readonly || $(this).attr("readonly") || $(this).find("option").length<12 ){
							  elmSel.append('<i class="fa fa-caret-down" aria-hidden="true"></i><span  class="edseIn form-input"></span>');
						}else elmSel.append('<i class="fa fa-caret-down" aria-hidden="true"></i><input class="edseIn form-input" type="text">');
					}
					if($(this).attr("data-small")) elmSel.addClass("edselSmall");
				}
				if( $edselset.disabled || $(this).attr("disabled"))elmSel.addClass("disabled").find(".edseIn").attr("disabled",true);
				if( $edselset.data){
					var html='';$($edselset.data).each(function(i,list){ html+='<option value='+list.id+'>'+list.text+'</option>'; });
					elmSel.find("select").html(html);
				}
				if($edselset.ajax){
					elmSel.on("keyup","input",function(){
						if(jQuery.inArray(event.keyCode,edwin.fiveKey)>-1)return true;
						$edselset.ajax.delay = ($edselset.ajax.delay)? $edselset.ajax.delay:100;
						var params = $(this).val(); clearTimeout(edwin.TimeFn); 
						edwin.TimeFn = setTimeout(function(){
							$edselset.ajax.info = $edselset.ajax.data(params);
							_private.ajaxSel($edselset.ajax,elmSel);
						},$edselset.ajax.delay);
					});
				}
				_private.selput($(this));
				elmSel.attr("tabindex",1991).on("click", _private.clickSel)
				.on("change"  , "select",_private.selChange)
				.on("change"  , "input",_private.verifySel)
				.on("keydown" , _private.selKeyDown)
				.on("keyup"   , _private.selKeyup)
				.on("focusin" , _private.focusSel)
				.on("click"   , '.edsel-ol span',_private.delVal)
				.on("click"   , ".option:not('.disabled')", _private.optionClick)
				.on("click"   , ".edsel-ol,span.edseIn",function(){ _private.openSel(elmSel); });
			});
		},
		ajaxSel : function(data,elmSel){
			$.ajax({
				type: data.type,
				url: data.url,
				dataType:data.dataType,
				data:data.info,
				success:function(info){
					var html='',gift = data.processResults(info)['results'];
					if(gift.length==0){
						html = '<li>'+$edselset.errorinfo+'</li>';
					}else if(gift.length==1){
						html = '<li class="option selected" value='+gift[0].id+'>'+gift[0].text+'</li>';
					}else{
						$(gift).each(function(i,n){html+='<li class="option" value='+n.id+'>'+n.text+'</li>';});
					}
					elmSel.find(".edsel-ul").html(html);
				}
			});
		},
		clickSel: function (e){ e.stopPropagation(); },
		selChange:function (e){ _private.selput($(this));},
		selput:function(obj){
			var elmSel = obj.closest(".edselwrap");
			if(elmSel.hasClass("edselmul")){
				elmSel.find(".edsel-ol").html('');
				obj.find('option:selected').each(function(){
					var html = '<li name='+$(this).val()+'><span>x</span>'+$(this).text()+'</li>';
					elmSel.find(".edsel-ol").append(html);
				});
			}else{
				elmSel.find("input").val(obj.find('option:selected').text());
				elmSel.find("span.edseIn").text(obj.find('option:selected').text());
			}
			elmSel.find("ul").remove(); if(elmSel.hasClass("disabled"))return false;
			$sodList = $("<ul/>", {"class": "edsel-ul"}).appendTo(elmSel);
			obj.find("option,optgroup").each(function(i){
				if($(this).is("optgroup")){
					$sodListOption = $("<li/>", {"class": "optgroup","text" : $(this).attr("label")}).appendTo($sodList);
				}else{
					var cls = 'option';
					($(this).parent().is("optgroup")) ? cls = 'option groupchild': cls;
					($(this).is(":disabled")) ? cls = cls + ' disabled': cls;
					($(this).is(":selected")) ? cls = cls + ' selected': cls;
					$sodListOption = $("<li/>", {"class": cls,"text" : $(this).text(),"value": $(this).attr("value")}).appendTo($sodList);
				}
			});
		},
		optionClick: function (e){
			e.stopPropagation();
			var $elmSel = $(this).closest(".edselwrap");
			if($elmSel.hasClass("edselmul")){
				var aa = $(this).attr("value");
				var bb = eval($elmSel.find("select").val());
				if($.inArray(aa,bb)>-1){
					bb = $.grep(bb,function(n,i){return n = aa;},true);
				}else{
					(bb) ? bb.push(aa) : bb = aa;
				}
				_private.change($elmSel,bb,'');
			}else{
				_private.change($elmSel,$(this).attr("value"),$(this).text());
			}
			$elmSel.removeClass("open").find("i").attr("class","fa fa-caret-down");
		},
		delVal:function(e){ 
			e.stopPropagation();
			var elm = $(this).closest(".edselwrap"); $(this).closest("li").remove();
			var val =[]; elm.find(".edsel-ol li").each(function(i,n){val[i] = $(this).attr("name");}); console.log(val);
			elm.find("select").val(val);
			 _private.selput(elm);
		},
		selKeyDown:function(e){
			var $elmSel  = $(this),$ul = $elmSel.find("ul"),$cur  = $elmSel.find('.selected');
			if($cur.length==0 && $ul.find(".hidden").length==0)$cur = $elmSel.find('li').eq(0);
			var $pre  = $cur.prevAll("li:not('.disabled,.optgroup,.hidden')").first(),
				$nex  = $cur.nextAll("li:not('.disabled,.optgroup,.hidden')").first();
			if (e.which ===38){
				$elmSel.addClass("open").find("i").attr("class","fa fa-caret-up");
				$pre.addClass("selected").siblings().removeClass("selected");
			}else if(e.which ===40){
				$elmSel.addClass("open").find("i").attr("class","fa fa-caret-up");
				$nex.addClass("selected").siblings().removeClass("selected");				
			}else if(e.which ===13){
				if($elmSel.hasClass('open')){
					$elmSel.find(".selected").click();
					$elmSel.removeClass("open").find("i").attr("class","fa fa-caret-down");
					return false;
				}else{
					$elmSel.addClass("open").find("i").attr("class","fa fa-caret-up");
				}
			}else{
				$elmSel.addClass("open").find("i").attr("class","fa fa-caret-up");
			}
			var top; var max = $ul.find('li').length*30;
			var cur = $ul.find('.selected').index()*30;
			(cur>max)? top = max :  top = cur;
			$ul.scrollTop(top-90);
		},
		selKeyup:function(){
			var $elmSel  = $(this);
			if($elmSel.find('input').length<1)return false;
			var val = $elmSel.find("input").val().split(",").pop().replace(/ /g,"");
			if(val===""){
				$elmSel.find("li").each(function(){
					$(this).removeClass("hidden");
					$(this).html($(this).text());
				});
			}else{
				if(jQuery.inArray(event.keyCode,edwin.fiveKey)<0){
					$elmSel.find("li").removeClass("hidden selected");
					$elmSel.find("li").each(function(i){
						var text = $(this).text();
						if(text.toString().indexOf(val) > -1){
							$(this).html(text.replace(val,'<m class="red-8">'+val+'</m>'));
						}else{
							$(this).addClass("hidden");
						}
					});
					$elmSel.find("ul").find(".option:not('.disabled,.hidden')").first().addClass("selected");
				}
			}
		},
		change:function($elmSel,val,txt){
			if($elmSel.hasClass("edselAjax")){
				$elmSel.find('select').html('<option value='+val+' selected>'+txt+'</option>')
				$elmSel.find('.form-input').val(txt);
			}else{
				$elmSel.find("select").val(val).change();
			}
		},
		focusSel: function () {
			var $elmSel = $(this);
			if (!$elmSel.hasClass("disabled")){
				_private.outSel($(".edselwrap").not($elmSel));
				_private.openSel($elmSel);
				$("html").on("click.edselwrap", function() {
					_private.outSel($elmSel);
				});
			}else{
				_private.outSel($elmSel);
			}
		},
		outSel: function ($elmSel) {
			$elmSel.removeClass("open").find("i").attr("class","fa fa-caret-down");
		},
		openSel:function($elmSel){
			if($elmSel.hasClass("disabled") || $elmSel.hasClass("open")) return false;
			var seat = $elmSel.find("select").attr("data-seat"),HE = $elmSel.height();
			if(seat==="T"){
				$elmSel.find(".edsel-ul").css({"top":'',"bottom":HE});
			}else if(seat==="B"){
				$elmSel.find(".edsel-ul").css({"top":HE,"bottom":''});
			}else{
				var H = $(window).height();
				var X = $elmSel.offset().top;
				var Y = $elmSel.offset().left;
				if(H-X>200){
					$elmSel.find(".edsel-ul").css({"top":HE,"bottom":''});
				}else{
					$elmSel.find(".edsel-ul").css({"top":'',"bottom":HE});
				}
			}
			if($elmSel.hasClass("disabled")) return false;
			$elmSel.addClass("open").find("i").attr("class","fa fa-caret-up");
			if($elmSel.find("ul").find('.selected').length==0){
				$elmSel.find("ul").find(".option:not('.disabled,.hidden')").first().addClass("selected");
			}
			$elmSel.find("ul").scrollTop($elmSel.find("ul").find('.selected').index()*30-90);
		},
		verifySel:function(){
			var $elmSel = $(this).closest(".edselwrap"); 
			if($elmSel.find('select').hasClass("edselAjax"))  return false;
			if(typeof($elmSel.find('select').attr("noverify"))!='undefined')return false;
			if( $elmSel.find('input').length<1) return false; 
			setTimeout(function(){
				var val = $elmSel.find('input').val(); var isFind = "";
				if($elmSel.hasClass("edselmul")){
					val = val.split(",").pop().replace(/ /g,"");
					if(val){
						$elmSel.find("select option").each(function(){
							if(val == $(this).text()){
								isFind = $(this).attr("value");
							}
						});
						if(isFind==""){
							layer.msg($edselset.errorinfo);
							_private.change($elmSel,eval($elmSel.find("select").val()));
						}else{
							var aa = isFind;
							var bb = eval($elmSel.find("select").val());
							if($.inArray(aa,bb)>-1){
								bb = $.grep(bb,function(n,i){return n = aa;},true);
							}else{
								(bb) ? bb.push(aa) : bb = aa;
							}
							_private.change($elmSel,bb);
						}
					}
				}else{
					$elmSel.find("select option").each(function(){
						if(val == $(this).text()){
							isFind = $(this).attr("value");
						}
					});
					if(isFind=="")layer.msg($edselset.errorinfo);
					_private.change($elmSel,isFind);
				}
			},300);
		}
	};
	var methods = {
		destroy: function () {
			return this.each(function () {
				var $elmSel = $(this).parent("div");
				if( !$elmSel.hasClass("edselwrap") )return false;
				$(this).off("change");$elmSel.find("i,input,ul,span,ol").remove();
				$(this).removeClass("hidden").unwrap();
			});
		},
		update: function () {
			return this.each(function () {
				$(this).edsel('destroy').edsel();
			});
		}
	};
	if ( methods[method] ) {
		return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if ( typeof method === "object" || !method ) {
		return _private.initSoD.apply(this, arguments);
	} else {
		console.log("edsel.error");return false;
	}
};
})(jQuery);
//元素是否在可视区域
(function($){
  $.extend({
    nowRegionDel: function(x1, y1, x2, y2, x3, y3, x4, y4){
		if((x1>x3 && x1>x4)||(x3>x1 && x3>x2)||(y1>y3 && y1>y4)||(y3>y1 && y3>y2)){return false;}else{return true;}
    }
  });
  $.fn.nowRegion = function(options){
    options = $.extend({addTop:0,offsetTop:0,offsetLeft:0,addLeft:0,addRight:0,addBottom:0},options);
    var elm = $(this),
        srcInfo = {
          beginLeft: (elm.offset().left + options.offsetLeft + options.addLeft),
          beginTop : (elm.offset().top + options.offsetTop + options.addTop)
        };
        srcInfo.endLeft = (srcInfo.beginLeft + elm.width() + options.addRight);
        srcInfo.endTop  = (srcInfo.beginTop + elm.height() + options.addBottom);
        winInfo = {beginLeft: $(window).scrollLeft(),beginTop: $(window).scrollTop()};
        winInfo.endLeft = (winInfo.beginLeft + $(window).width());
        winInfo.endTop = (winInfo.beginTop + $(window).height());
    return $.nowRegionDel(
      srcInfo.beginLeft, srcInfo.beginTop, srcInfo.endLeft, srcInfo.endTop,
      winInfo.beginLeft, winInfo.beginTop, winInfo.endLeft, winInfo.endTop
    );
  };
})($);

/* 设置系统 获取系统*/
function getEdmin(type,name,key){
	var back; switch(type){
		case 'lang': back = langGet(name,key); break;
		case 'grid': back = gridGet(name,key); break;
		case 'num' : 
			var Range = Max - Min; var Rand = Math.random();
			back = (Min + Math.round(Rand * Range));  
		break;
		
		//网址 getEdmin('url',name);
		case 'url' : 
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r != null){ back =  unescape(r[2]); }else{back =null;}
		break;
		case 'delRepeat':
			var result = [];
			for(var i=0;i<array.length;i++){
				if(result.indexOf(array[i])<0){
					result.push(array[i]);
				}
			}
			back = result;
		break;
		
		//颜色随机生成  getEdmin('colorGet','color');
		case 'colorGet':
			var name  = ['black','gray','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua'];
			var num   = [1,2,3,4,5,6,7,8,9];
			var color = name[getEdmin('randomNum',0,name.length-1)]+'-'+num[getEdmin('randomNum',0,num.length-1)];
			if(color==edGetVal('edmin_color','randomColor','color')){
				return getEdmin('colorGet','color');
			}else{
				edSave('color','randomColor','color',color);
				if(name=='color'){
					return color;
				}else{
					return 'bg-'+color;
				}
			}		
		break;
		//浏览器信息
		case 'browserDel':
			var info = {'name':'','version':'','device':'computer','isOld':false};
			var explorer = window.navigator.userAgent.toLowerCase();
			$.each(['ipad','iphone os','midp','rv:1.2.3.4','ucweb','android','windows ce','windows mobile'],function(i,n){
				if( explorer.indexOf(n) > -1 ) info.device = 'phone';
			});
			if(explorer.indexOf("msie") >= 0) {
				info.name = 'IE'; info.version = explorer.match(/msie ([\d.]+)/)[1]; if(info.version<9) info.isOld = true;
			}else if(explorer.indexOf("chrome") > -1){
				info.name = 'Chrome'; info.version = explorer.match(/chrome\/([\d.]+)/)[1];
			}else if(explorer.indexOf("firefox") >= 0){
				info.name = 'Firefox'; info.version = explorer.match(/firefox\/([\d.]+)/)[1];
				
			}else if(explorer.indexOf("opera") >= 0){
				info.name = 'opera'; info.version = explorer.match(/opera.([\d.]+)/)[1];
			}else if(explorer.indexOf("safari") >= 0){
				info.name = 'Safari';info.version = explorer.match(/safari\/([\d.]+)/)[1];
			}else{
				info.name = '没有标识'; info.version = '';
			}
			back = info;
		break;
		
		
		
		
		default:console.log('bug');break;
	} return back;
}
function setEdmin(type,name,key,val){
	switch(type){
		//菜单系统
		case 'menu':
			$(key).each(function(i,list){
				var mname = ''; if(list.url.indexOf(".html")>0){mname =list.url.split('.html')[0];mname = mname.replace(/\//gm,'');} 
				var method = (list.method)?list.method:'';
				if(list.items && list.items.length>0){
					var liElm = $('<li>',{"class":"treeview",html:'<a name="'+mname+'" data-open="'+method+'" data-href='+list.url+' data-mark='+list.id+'><div class="icon">'+list.icon+'</div><div class="text" lang lang-txt='+list.langTxt+'>'+list.text+'</div><div class="ebtn"><i class="fa fa-fw fa-angle-left"></i></div></a>'}).appendTo(name);
					var ulElm = $('<ul>',{"class":'treeview-menu'}).appendTo(liElm);
					setEdmin('menu',ulElm,list.items);
				}else{
					var liElm = $('<li>',{"class":"treeview",html:'<a name="'+mname+'" data-open="'+method+'" data-href='+list.url+' data-mark='+list.id+'><div class="icon">'+list.icon+'</div><div class="text only" lang lang-txt='+list.langTxt+'>'+list.text+'</div></a>'}).appendTo(name);
				}
			});		
		break;
		//文件系统 例子 setEdmin('file','filetype',fileaddress,filetxt);
		case 'file':
			$.ajax({
				url :edwin.SERVER+'ajaxfileset.html',type: 'GET',dataType:'json',
				data:{filetype:name,fileurl:key,filetxt:val},
				xhrFields:{ withCredentials:true},
				success : function(data){
					var data = $.parseJSON(data);
					laymsg(data.mes,data.status);
				},
				error : function() {console.log('bug');}
			});
		break;
		default: console.log("bug"); break;
	}
}

/*弹出系统*/
function laytip (msg,elm,set){
	var tipsMore = false;
	var time  = (time) ? time : 1500;
	layer.tips(msg,elm,{tips: [3, '#000'],tipsMore:tipsMore,time:time});
}
function laywait(num,set){
	return layer.load((num)?num:0, {shade: [0.3,'#000']});
}
function laymsg (msg,s,set){
	var backElm,layset={theme:'two',anim:1,time:3000000,offset:'',title:getEdmin('lang','system','info')};
	if($.type(set)=='object'){layset = $.extend({}, layset, set); }
	if(layset.theme=='two'){layset.anim=2;layset.offset='rb';}
	var i,n; switch(s){ case 'Y': i=1;n='green-8';break;
	case 'N': i=2;n='red-8';break; case 'W': i=0;n='orange-5';break;
	default : i=4;n='grey-5';}
	return layer.msg('<span class='+n+'>'+msg+'</span>',{
		icon:i,title:layset.title,closeBtn:0,anim:layset.anim,time:layset.time,
		shade: [0.2,'#000'],shadeClose: true,offset:layset.offset //['100px','50px']
	});
}
function layopen(elm,title,html,set){
	var backElm;name = ($.type(elm)=='string')?elm:(elm.attr("id"))?(elm.attr("id")):'';
	var lay={type:1,id:false,skin:'',area:'default',zIndex:1990,shade:false,shadeClose:false,closeBtn:1,anim:1,resize:true,move:true,maxmin:true,min:true,btn:false};
	if($.type(set)=='object'){lay = $.extend({},lay,set);}
	lay.skin  = (lay.skin)?''+lay.skin+' layer'+edwin.winName : 'layer'+edwin.winName;
	lay.shade = (lay.shade)?[0.7,'#000']:false;
	lay.move  = (lay.move)?'.layui-layer-title': false;
	if(lay.area=='default')lay.area = (edwin.winWidth>1200)?['80%', '80%'] : ['100%', '100%'];
	if(lay.area=='auto')lay.area = (edwin.winWidth>800)?['500px'] : ['100%', '100%']; 
	if(lay.shade){lay.resize=false;lay.move=false;lay.min=false;}
	if($.type(elm)=="object") if(elm.attr("data-mark")){ layer.restore(elm.attr("data-mark")); return false;}
	layer.open({
		type:lay.type,title:title,closeBtn:lay.closeBtn,shade:lay.shade,id:lay.id,
		shadeClose:lay.shadeClose,shift:0,maxmin:lay.maxmin,fix:true,scrollbar:false,
		move:lay.move,moveType:0,moveOut:true,area:lay.area,btn:lay.btn,
		skin:lay.skin,offset:'auto',zIndex :lay.zIndex,content:html,resize:lay.resize,
		end: function(layero){if($.type(elm)=="object") elm.removeAttr("data-mark");$(".sCharIn").removeClass("sCharIn");},
		moveEnd: function(layero){
			var topval = parseInt( $(layero).css("top") ),leftval= parseInt( $(layero).css("left") );
			if(topval < 0){$(layero).css("top",0);
			}else if(topval>edwin.winHeight-40){
				$(layero).css("top",edwin.winHeight-40);
			}
			if(leftval>edwin.winWidth-40)$(layero).css("left",edwin.winWidth-40);
		},
	//	yes: function(index, layero){   },
	//	min: function(){ },
		success:function(layero,index){
			backElm=layero;layero.attr({"data-mark":index,"name":name});
			if(lay.min==false)layero.find(".layui-layer-min").remove();
			if($.type(elm)=="object") if(elm.attr("id")) elm.attr('data-mark',index);
		},
		cancel: function(index,layero){
			var name = layero.attr('name');
			if($.type(elm)=="object")
			if(elm.attr("data-warn")){
				layer.confirm('还有数据没有提交,您确定要关闭么', {icon: 3, title:'提示'}, function(i){
					$(layero).find('form input').closest("div").removeClass('has-success has-error').find(".ed-tip").remove();
					$("#"+name+"").removeAttr("data-mark");
					layer.close(index);layer.close(i);
				});
				return false;
			}else{
				$("#"+name+"").removeAttr("data-mark");
				$(layero).find('form input').closest("div").removeClass('has-success has-error').find(".ed-tip").remove();
			}
		},
		full: function(index){
			$(index).css('height','100%');
			var height = $(index).height() - $(index).find(".layui-layer-title").height() - 1;
			$(index).find(".layui-layer-content").css("height",height);
		},
		restore: function(index){
			var height = $(index).height() - $(index).find(".layui-layer-title").height() - 1;
			$(index).find(".layui-layer-content").css("height",height);
		}
	}); return backElm;
}
function layphone(title,elm){
	layer.open({
		type: 1, area: ['100%', '100%'],
		title:false,closeBtn:0,
		content: '<div class="phone"><div class="phone-header"><h3><button class="layBtn"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>'+title+'</h3></div>'+elm.html()+'</div>',
		success: function(layero, index){layero.attr("data-mark",index);}
	});
}

/*数据系统*/
function edClear (type,name,key){
	if(!type){ localStorage.clear(); }else{
		if(!name){ localStorage.removeItem(type); }else{
			if(localStorage.getItem(type)){
				var edval = $.parseJOSN(localStorage.getItem(type));
				if(edval[name])if(key){
					if(edval[name][key]) delete edval[name][key];
				}else{delete edval[name];}
				edval = JSON.stringify(edval);
				localStorage.setItem(type,edval);
			}
		}
	}
}
function edGetVal(type,name,key){
	if(!type){ return window.localStorage; }else{
		if(!localStorage.getItem(type)) return null;
		if(type && !name){
			if(localStorage.getItem(type)) return JSON.parse(localStorage.getItem(type)); 
		}else{
			var edval = JSON.parse(localStorage.getItem(type));
			if(!edval[name]) return null;
			if(!key){return edval[name]; }else{return edval[name][key]; }
		}
	}
}
function edSetVal(type,name,way){
	//表单数据记忆
	if(type=='edmin_form'){
		if(!localStorage.getItem(type)) return false; var formData = JSON.parse(localStorage.getItem('edmin_form'));
		var formElm = (name)? $("form[name="+name+"]") : $(".edform");formElm.each(function(){
			var Elm = $(this),name=Elm.attr("name"); if(!name) return true; if(!formData[name]) return true;if(!Elm.hasClass("edform"))return true;
			var eachElm = Elm.find("input[type='text'],.edcheckbox,.mulCheckbox,.edradio,.mulRadio,select,textarea");
			eachElm.each(function(i){
				if(i==0)Elm.addClass("edstart"); if(i==eachElm.length-1)Elm.removeClass("edstart");
				var key = $(this).attr("name"),val=formData[name][key];if(!val)return true;
				valSet($(this),val);
			});
		});
	}
	//字体记忆
	if(type=='edmin_font'){
		var font = ['body','sidebar','table','tab'];
		$(font).each(function(i,name){
			var fontSet = '',tarName;
			if(localStorage.getItem(type)){
				var edval = JSON.parse(localStorage.getItem(type));	
				if(edval[name]) fontSet = edval[name]['style'];
			}
			if(!fontSet) fontSet  = config['edmin_font'][edwin.winName+name]['style'];
			if(name=='body') tarName = 'body'; if(name=='sidebar') tarName = '.sidebar-menu';
			if(name=='table')tarName = 'table';if(name=='tab') tarName = '.ed-tabs';
			var cash, fontFamily,fontSize,fontLine;
			cash = fontSet.split(';');
			fontFamily   = cash[0].split('font-family: ')[1];
			fontSize = cash[1].split('font-size: ')[1];
			fontLine     = cash[2].split('line-height: ')[1];
			$(".font-wrap[name="+name+"]").find(".fontFamily").val(fontFamily);
			$(".font-wrap[name="+name+"]").find(".fontSize").val(fontSize);
			$(".font-wrap[name="+name+"]").find(".fontLine").val(fontLine);
			$(tarName).css({"font-family":fontFamily,"font-size":fontSize,"line-height":fontLine});
		});
	}
	//表单风格记忆  该处name是 form元素elm
	if(type=='edmin_formSet'){
		var formStyle,formStore;
		if(localStorage.getItem(type)){
			var edval = JSON.parse(localStorage.getItem(type));
			if(edval.style) formStyle = edval.style.style;
			if(edval.store) formStore = edval.store.store;
		}
		if(!formStyle) formStyle = (config)? config.edmin_formSet.style.style :'linkform';
		if(!formStore) formStore = (config)? config.edmin_formSet.store.store :'Y';
		
		
		
		var formStyle,formStore;
		if(localStorage.getItem(type)){
			var edval = JSON.parse(localStorage.getItem(type));
			if(edval.style) formStyle = edval.style.style;
			if(edval.store) formStore = edval.store.store;
		}
		if(!formStyle) formStyle = (config)? config.edmin_formSet.style.style :'linkform';
		
		if(!formStore) formStore = (config)? config.edmin_formSet.store.store :'Y';
		if(name){
			name.removeClass('linkform partform stepform').addClass(formStyle);
			
			// if(formStore=="Y"){
				// if(!name.hasClass("edform") && name.attr("name")) name.addClass("edform");
			// }else{ name.removeClass("edform"); }
		}else{
			$("form").removeClass('linkform partform stepform').addClass(formStyle); 
			$(".formStyle").val(formStyle);
			
			// if(formStore=="Y"){
				// $(".formStore").val("Y");	
				// $("form").each(function(){
					// if(!$(this).hasClass("edform") && $(this).attr("name")) $(this).addClass("edform");
				// });
			// }else{
				  // $(".formStore").val("N"); $("form").each(function(){ $(this).removeClass("edform") });
			// }
		}
		
	}
	//排序记忆
	if(type=='edmin_sort'){
		if(localStorage.getItem('edmin_sort')) {
			var edval = JSON.parse(localStorage.getItem('edmin_sort'));
			if(name){
				var key,val; for(var i in edval[name]){key = i; val = edval[name][i];}
				$(val).each(function(i,n){
					$(".Sortable[name="+name+"] "+key+"[data-edsort='"+n+"']").remove().clone().appendTo(".Sortable[name="+name+"]");
				});
			}else{
				for(var name in edval) {
					var key,val;for(var l in edval[name]) {key = l; val = edval[name][l];}
					$(val).each(function(i,n){
						$(".Sortable[name="+name+"] "+key+"[data-edsort='"+n+"']").remove().clone().appendTo(".Sortable[name="+name+"]");
					});
				}
			}
		}
	}
	//皮肤记忆
	if(type=='edmin_skin'){	//配置文件 edmin_name 包含数组
		if(jQuery.inArray(name,config['edmin_name'])<0){
			console.log('需要name值,且正确');return false;
		} 	var skin='';
		if(localStorage.getItem('edmin_skin')){
			var edval = $.parseJSON(localStorage.getItem('edmin_skin'));
			if(edval[name]) skin = edval[name]['skin'];
		}
		if(!skin) skin = config['edmin_skin'][name]['skin'];
		$("body").removeClass(function(i,c){
			var cls = [];cls = c.split(' ');
			$.each(cls,function(i,n){
				if(n.indexOf('skin-')>=0)$("body").removeClass(n);
			});
		}).addClass(skin);
	}
	//壁纸记忆
	if(type=='edmin_swall'){ //配置文件 edmin_name 包含数组
		if(jQuery.inArray(name,config['edmin_name'])<0){
			console.log('需要name值,且正确');return false;
		} var swall='';
		if(localStorage.getItem('edmin_swall')){
			var edval = $.parseJSON(localStorage.getItem('edmin_swall'));
			if(edval[name]) swall = edval[name]['swall'];
		}
		if(!swall) swall = config['edmin_swall'][name]['swall'];
		if(swall.indexOf('http')<0) swall = edwin.PB_PATH+swall;
		$(".main-swall img").attr("src",swall);
	}
	//布局记忆
	if(type=="edmin_layout"){
		if(jQuery.inArray(name,config['edmin_name'])<0){
			console.log('需要name值,且正确');return false;
		}   var height,width;
		if(localStorage.getItem('edmin_layout')){
			var edval = $.parseJSON(localStorage.getItem('edmin_layout'));
			if(edval[name]['height']) height = edval[name]['height'];
			if(edval[name]['width']) width = edval[name]['width'];
		}
		if(!height) height = config['edmin_layout'][name]['height'];
		if(!width)  width  = config['edmin_layout'][name]['width'];
		$(".main-header").css("height",height); $(".main-header .dropdown>a").css("line-height",height);
		switch(edwin.winX){
			case 0 : 
				$("body").removeClass("sidebar-none sidebar-mini sidebar-normal open").addClass('sidebar-none').attr("name","none");
				$(".main-sidebar").css({"width":0,"padding-top":height});
				$(".content-wrapper").css({"padding-left":0,"padding-top":height});
				elmScroll($(".sidebar"));break;
			case 1 :
				$("body").removeClass("sidebar-none sidebar-mini sidebar-normal open").addClass('sidebar-mini').attr("name","mini");
				$(".main-sidebar").css({"width":'40px',"padding-top":height});
				$(".content-wrapper").css({"padding-left":'40px',"padding-top":height});
				$(".sidebar").slimScroll({destroy:true}).removeAttr("style");break;
			case 2 :
				$("body").removeClass("sidebar-none sidebar-mini sidebar-normal open").addClass('sidebar-normal').attr("name","normal");
				$(".main-sidebar").css({"width":width,"padding-top":height});
				$(".content-wrapper").css({"padding-left":width,"padding-top":height});
				elmScroll($(".sidebar"));break;
			case 3 :
				if($("body").hasClass('open')){
					$("body").removeClass('open');$(".main-sidebar").css({"width":0,"padding-top":height});
				}else{
					$("body").addClass('open');$(".main-sidebar").css({"width":width,"padding-top":height});
				}
			default:
		}
	}	
}
function edSave  (type,name,key,val){
	if(type && name && key && val){
		if(window.localStorage){
			if(localStorage.getItem('edmin_'+type)){
				var edval = $.parseJSON(localStorage.getItem('edmin_'+type));
				if(edval[name]){
					edval[name][key] = val;
				}else{
					var obj = {}; obj[key]=val;  edval[name] = obj;
				}
			}else{
				var obj = {}; obj[key] = val; var edval = {} ; edval[name] = obj;
			}
			localStorage.setItem('edmin_'+type,JSON.stringify(edval));
		}
	}
}

//语言系统
function langGet(name,key){
	var back,lang=(edGetVal('edmin_root','lang','lang'))?edGetVal('edmin_root','lang','lang'):'zh-CN';
	$.getJSON(edwin.PB_PATH+'lang/'+lang+'/lang.json',function(lang){back=lang[name][key];});return back;
}
function langsys(lang){
	var lsys = (lang)?lang:'zh-CN'; edSave('root',"lang","lang",lsys);
	$.getJSON(edwin.PB_PATH+'lang/'+lsys+'/lang.json',function(lang){
		$("*[lang]").each(function(i){
			$(this).attr("lang",lsys); 
			var txt = $(this).attr("lang-txt"),img = $(this).attr("lang-imgsrc"),inf = $(this).attr("lang-title");
			if(txt){ var name = txt.split('-'); $(this).html(lang[name[0]][name[1]]);}
			if(img){ var name = img.split('-'); $(this).attr("src",edwin.PB_PATH+lang[name[0]][name[1]]); }
			if(inf){ var name = inf.split('-'); $(this).attr("title",lang[name[0]][name[1]]);}
		});
	});
}

/*表单系统*/
function btnWait(elm,time){
	var time = (time)? time :3000; elm.prop("disabled",true);
	setTimeout(function(){ elm.prop("disabled",false); },time);
}
function valOne(formInput){
	var type=formInput.attr("type"),name=formInput.attr("name");
	//选择
	if(formInput.hasClass("normalCheck")){
		formInput.find('input').each(function(){
			$(this).closest("label").removeClass("checked disabled");
			if($(this).is(":checked"))  $(this).closest("label").addClass("checked");
			if($(this).is(":disabled")) $(this).closest("label").addClass("disabled");
		});
	}
	//多选
	if(formInput.hasClass("edcheckbox")){
		formInput.find('input').each(function(){
			$(this).closest("label").removeClass("checked disabled").find(".fa").remove();
			if($(this).is(":checked")){
				$(this).closest("label").addClass("checked");
				$(this).after('<i class="fa fa-fw fa-check-square-o"></i>');
			}else{
				$(this).after('<i class="fa fa-fw fa-square-o"></i>');
			}
			if($(this).is(":disabled")) $(this).closest("label").addClass("disabled");
		});
	}
	if(formInput.hasClass("mulCheckbox")){
		var check = []; formInput.find("input:checked").each(function(i){ check[i]= $(this).closest("label").text();});
		if(check.length==0){
			formInput.find("span").html('未选择');
		}else if(check.length==1){formInput.find("span").html(check[0]);}else{
			formInput.find("span").html("您选择了"+check.length+"项");
		}
	}
	//单选
	if(formInput.hasClass("mulRadio")){
		var html = formInput.find("input:checked").closest("label").text();
		if(!html) html='未选择'; formInput.find("span").html(html);
	}
	if(formInput.hasClass("edradio")){
		formInput.find('input').each(function(){
			$(this).closest("label").removeClass("checked disabled").find(".fa").remove();
			if($(this).is(":checked")){
				$(this).closest("label").addClass("checked");
				$(this).after('<i class="fa fa-fw fa-dot-circle-o"></i>');
			}else{
				$(this).after('<i class="fa fa-fw fa-circle-o"></i>');
			}
			if($(this).is(":disabled")) $(this).closest("label").addClass("disabled");
		});
	}
	//数字输入
	if(formInput.hasClass("spinner")){
		formInput.removeClass("spinner").wrap("<div class='spinner'></div>");
		formInput.after('<button class="edplus" type="button"><i class="fa fa-plus"></i></button><button class="edmins" type="button"><i class="fa fa-minus"></i></button>');
		var min  = (formInput.attr("data-range")) ? Number(formInput.attr("data-range").split('?')[0]) : -100000000000000;
		var max  = (formInput.attr("data-range")) ? Number(formInput.attr("data-range").split('?')[1]) : 100000000000000;
		var step = (formInput.attr("data-step"))  ? Number(formInput.attr("data-step").split('?')[0] ) : 1;
		var scale= (formInput.attr("data-step"))  ? Number(formInput.attr("data-step").split('?')[1] ) : 0;
		var val  = Number($(this).find("input").val());
		if(scale>=0){ val = val.toFixed(scale); var egg = "1."; for(var i=0;i<scale;i++){ egg=egg+'0';}}
		else{ var egg = "1"; for(var i=0;i>scale;i--){ egg=egg+'0';} val = parseInt(val/egg)*egg; }
		formInput.closest(".spinner").data("data", {min:min,max:max,step:step,scale:scale,egg:egg});
	}
	//edsel
	if(formInput.hasClass("edsel")){
		formInput.edsel();
	}
	
	if(formInput.hasClass("mulSelect")){
		if(!formInput.closest("div").hasClass('edSelect')){
			formInput.addClass("hidden").wrap("<div class='edSelect form-input'></div>");
			formInput.after('<span>未选择</span><button type="button"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>');
		}
		var num = (formInput.val())? formInput.val().length : 0 ;
		if(num==0){
			formInput.siblings('span').html('未选择');
		}else if(num==1){
			formInput.siblings('span').html( formInput.find("option:selected").text());
		}else{
			formInput.siblings('span').html('您选择了'+num+'项');
		}
	}
	
	//关联的
	if(formInput.closest(".form-wrap").attr("data-relate")){
		formInput.closest(".col-xs-12").css("display","none");
		var relate = formInput.closest(".form-wrap").attr("data-relate");relate = relate.split('♗');
		var elm = formInput.closest("form").find("*[data-link="+relate[0]+"]");
		if(elm.attr('type')=='select'){
			var field = elm.attr("data-link");
			var fielding  = elm.find("option:selected").attr("data-link");
			formInput.closest("form").find(".form-wrap[data-relate='"+field+"♗"+fielding+"']").closest(".col-xs-12").show();
		}
		if(elm.attr('type')=='radio'){
			var field = elm.attr("data-link");
			var fielding = elm.find("input:checked").attr("data-link");
			formInput.closest("form").find(".form-wrap[data-relate='"+field+"♗"+fielding+"']").closest(".col-xs-12").show();
		}
		if(elm.attr('type')=='checkbox'){
			var filed =	elm.attr("data-link"); 
			if(elm.is(":checked")) formInput.closest("form").find(".form-wrap[data-relate="+filed+"]").closest(".col-xs-12").show("slow");
		}
	}
	
	//KindEditor
	if(type=='KE'){
		var items = ['fullscreen','bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','wordpaste','image','link'];
		KindEditor.ready(function(K){
			K.each({
				'plug-align':{name:'对齐方式',method:{'justifyleft':'左对齐','justifycenter':'居中对齐','justifyright':'右对齐'}},
				'plug-order':{name:'编号',method:{'insertorderedlist':'数字编号','insertunorderedlist':'项目编号'}},
				'plug-indent':{name:'缩进',method:{'indent':'向右缩进','outdent':'向左缩进'}}
			},function( pluginName, pluginData ){
				var lang = {};
				lang[pluginName] = pluginData.name;
				KindEditor.lang( lang );
				KindEditor.plugin( pluginName, function(K) {
					var self = this;
					self.clickToolbar( pluginName, function() {
						var menu = self.createMenu({name : pluginName,width : pluginData.width || 100});
						K.each( pluginData.method, function( i, v ){
							menu.addItem({
								title : v,checked : false,iconClass : pluginName+'-'+i,click : function() {self.exec(i).hideMenu();}
							});
						});
					});
				});
			});
			var kename = 'KE'+name ; eval(kename+'=K.create("textarea[name='+name+']",{themeType :"qq", items : items,afterBlur:function(){    }})');
		});
	}
}
function valGet(formInput){
	var type=formInput.attr("type"),name=formInput.attr("name"),val;
	if(type && name) switch(type){
		case 'text'    : val = formInput.val(); break;
		case 'hidden'  : val = formInput.val(); break;
		case 'password': val = formInput.val(); break;
		case 'number'  : val = formInput.val(); break;
		case 'textarea': val = formInput.val(); break;
		case 'select'  : 
			if(formInput.attr("noverify")){
				val = formInput.closest(".form-wrap").find(".form-input").val();
			}else{val = formInput.val();}
			break;
		case 'radio'   : val = formInput.find('input:checked').val();break;
		case 'checkbox': 
			val = []; formInput.find("input:checked").each(function(i){val[i] = $(this).val();});
		break;
		case 'KE'      : val = eval('KE'+name+'.html()');break;
		default: console.log('bug'); break;
	} return val;
}
function valSet(formInput,val,way){
	var type=formInput.attr("type"),name=formInput.attr("name");
	if(type && name) switch(type){
		case 'text'    : formInput.val(val); break;
		case 'hidden'  : formInput.val(val); break;
		case 'password': formInput.val(val); break;
		case 'number'  : formInput.val(val); break;
		case 'textarea': formInput.val(val); break;
		case 'select'  : 
			formInput.val(val);
			if(formInput.hasClass("edsel"))formInput.edsel('update');
			if(formInput.hasClass("mulSelect")) valOne(formInput);
			if(way=="change")formInput.change();
			break;
		case 'radio'   :
			formInput.find("input").prop("checked", false);
			if(val)formInput.find("input[value="+val+"]").prop("checked", true);
			valOne(formInput); if(way=="change")formInput.find("input").change();
		break;
		case 'checkbox': 
			if(formInput.find("input").length==0){console.log('错误元素');return false;}
			formInput.find("input").prop("checked",false);
			if(val)if($.isArray(val)){
				$(val).each(function(i,val){
					var checkElm = formInput.find('input[name="'+name+'"][value="'+val+'"]');
					if(!checkElm.is(":checked")) checkElm.prop("checked",true);
				});
			}else{
				var checkElm = formInput.find('input[name="'+name+'"][value="'+val+'"]');
				if(!checkElm.is(":checked")) checkElm.prop("checked",true);
			}
			valOne(formInput);if(way=="change")formInput.find("input").change();
		break;
		case 'KE'      : eval('KE'+name+'.html(val)'); break;
		default: console.log('bug'); break;
	}
}
function valAdd(formInput,val,way){
	var type=formInput.attr("type"),name=formInput.attr("name"),val;
	if(type && name) switch(type){
		case 'checkbox': 
			if($.isArray(val)){
				$(val).each(function(i,val){
					var checkElm = formInput.find('input[name="'+name+'"][value="'+val+'"]');
					if(!checkElm.is(":checked")) checkElm.prop("checked",true);
				});
			}else{
				var checkElm = formInput.find('input[name="'+name+'"][value="'+val+'"]');
				if(!checkElm.is(":checked"))checkElm.prop("checked",true);
			}
		break;
		default: console.log('bug'); break;
	}
}
function valLen(formInput){
	var type=formInput.attr("type"),name=formInput.attr("name"),val;
	if(type && name) switch(type){
		case 'text'    : val = formInput.val().replace(/[^\x00-\xff]/g, "xx").length; break;
		case 'hidden'  : val = formInput.val().replace(/[^\x00-\xff]/g, "xx").length; break;
		case 'password': val = formInput.val().replace(/[^\x00-\xff]/g, "xx").length; break;
		case 'number'  : val = formInput.val().replace(/[^\x00-\xff]/g, "xx").length; break;
		case 'textarea': val = formInput.val().replace(/[^\x00-\xff]/g, "xx").length; break;
		case 'select'  : break;
		case 'radio'   : break;
		case 'checkbox': val=0; formInput.find("input:checked").each(function(i){val++;});break;
		case 'KE'	   : break;
		default: console.log('bug'); break;
	}
	return val;
}
function formVal(formElm,data){
	if(formElm.length!=1){console.log('bug');return false;}
	var back=1; if(formElm[0].tagName=="FORM"){
		if(data){
			if($.type(data)!='object'){console.log($.type(data));return false;}
			formElm.find(".form-input[type]").each(function(){
				var name = $(this).attr("name");if(!data[name])return true; valSet($(this),data[name]);
			});
		}else{
			back = {};formElm.find(".form-input").each(function(){
				var type = $(this).attr("type"),name = $(this).attr("name"),val;
				if(type && name){ back[name] = valGet($(this));}
			});
		}	
	}else{
		if(!formElm.hasClass("form-input"))return false;
		(data)?valSet(formElm,data):back = valGet(formElm);
	}
	return back;
}

function formLoad(fromELm,method){
	if(fromELm.length!=1){console.log('bug');return false;}
	edSetVal('edmin_formSet',fromELm); dotelm(fromELm,'form');
	$(fromELm.find(".form-input[type]")).each(function(){valOne($(this));});
	if(!method){return false;}
	if(method.data) setTimeout(function(){ formVal(fromELm,method.data);},400);
	if(method.addClass) setTimeout(function(){fromELm.addClass(method.addClass);},500);
}
function formReset(elm,name){
	if(typeof(elm)=="string"){
		edClear('edmin_form',elm);
		var elm = $("form[name="+elm+"]");
	}else{
		var elm = (elm instanceof jQuery)? elm : $(elm);
		if(name=="field"){
			var elm = (elm.is('fieldset'))?elm : elm.closest(".form-field");
		}else if(name=="clear"){
			var elm = (elm.is('form'))?elm : elm.closest("form");
			edClear('edmin_form',elm.attr("name"));
		}else{
			var elm = (elm.is('form'))?elm : elm.closest("form");
		}
	}
	elm.find(".form-input").each(function(){
		var type=$(this).attr("type"),name=$(this).attr("name"),temp='';
		if(type && name) switch(type){
			case 'text'    : temp = $(this).attr("value"); $(this).val(temp); break;
			case 'hidden'  : break;
			case 'password': temp = $(this).attr("value"); $(this).val(temp); break;
			case 'number'  : temp = $(this).attr("value"); $(this).val(temp); break;
			case 'textarea': temp = $(this).html(); $(this).val(temp); break;
			case 'select'  :
				temp = ($(this).find("option[selected]").length==1)?
				$(this).find("option[selected]").attr("value"):$(this).find("option:first").attr("value");
				valSet($(this),temp);
			break;
			case 'checkbox':
				temp = [];$(this).find("input[checked]").each(function(i){temp[i]=$(this).attr("value");});
				valSet($(this),temp);
			break;
			case 'radio'   : 
				temp = $(this).find("input[checked]").attr("value");
				valSet($(this),temp);
			break;
			
			case 'KE'      :
			
			break;
			default: console.log('bug'); break;
		}
	});
}
function formCheck(formElm,btnElm){
	if(btnElm) btnWait(btnElm,3000);
	var checkInfo = {'isTrue':'Y','msg':""};
	formElm.find(".form-input[data-reg]").each(function(){
		if($(this).closest(".col-xs-12").css("display")=="none") return true;
		var regInfo = $(this).attr("data-reg").split('♗'),val = valGet($(this));
		if(!regInfo){ checkInfo.isTrue='N';checkInfo.msg='表单元素信息获取失败!';checkInfo.col='';return false;}
		if(val==''){
			if(regInfo[0] != 'null'){
				checkInfo.isTrue='N';checkInfo.msg='';
				checkInfo.col=$(this).closest(".form-wrap").find(".form-label div").text();
				$(this).focus();return false;
			}
		}else{
			if(regInfo[1]) if(!eval(regInfo[1])(val)){
				checkInfo.isTrue='N';checkInfo.msg='';
				checkInfo.col=$(this).closest(".form-wrap").find(".form-label div").text();
				$(this).focus();return false;
			}
			if(regInfo[2])
			if( stringLen(val)>regInfo[2].split('-')[1] || stringLen(val)<regInfo[2].split('-')[0]){
				checkInfo.isTrue='N';checkInfo.msg='';
				checkInfo.col=$(this).closest(".form-wrap").find(".form-label div").text();
				$(this).focus();return false;
			}
		}
	});
	if(checkInfo.isTrue=="Y"){ 
		checkInfo.msg  = '数据验证成功';
		checkInfo.data = formVal(formElm);
	}else{
		checkInfo.data = '';
		checkInfo.msg = langGet('public','regwrong')+checkInfo.col;
		laymsg(checkInfo.msg,checkInfo.isTrue,langGet('public','regform'));
	}
	return checkInfo;
}

function formAuto(elm,data){
	var formInfo={title:'表单标题',name:'formname',clsname:'form linkform',group:false,enctype:'multipart/form-data',data:''};
	formInfo = $.extend({}, formInfo,{title:data.displayName,name:data.id,group:data.group,data:data.relationship});
	formInfo.group = false ;  $(data.relationship).each(function(i,list){ if(list.group) formInfo.group = true; });   //是否为组
	var formHeader = '',formFooter = '<div class="block btn-wrap"><div class="col-xs-12"></div></div>';
	var formElm = $("<form>",{'class':formInfo.clsname,name:formInfo.name,"enctype":formInfo.enctype,"action":"","method":""}).appendTo(elm);
	if(formInfo.group){
		formHeader = '<header class="form-heading text-center">'
			+'	<h3 class="form-title"><i class="fa fa-window-restore" aria-hidden="true"></i> '+formInfo.title+' <small>星号必填</small></h3>'
			+'	<ul class="form-tools">'
			+'		<li class="formClear" title="清空缓存"><button type="button" class="askhref" data-mark="您确定清除缓存吗？" data-func="formReset?gform"><i class="fa fa-recycle" aria-hidden="true"></i></button></li>'
			+'	</ul>'
			+'</header>';
		formElm.append(formHeader);
		$(formInfo.data).each(function(i,list){
			var fieldElm = $("<fieldset>",{"class":"form-field"}).appendTo(formElm);
			var fieldFooter = '<div class="block btn-wrap"><div class="col-xs-12"></div></div>';
			var fieldHeader = '<div class="form-field-header">'
				+'<div class="form-field-btn">'
				+'	<legend class="form-legend">'+list.displayName+'</legend>'
				+'	<button class="field-reset" type="button" title="刷新当前区域" onclick="formReset(this,\'field\')"><i class="icon iconfont icon-shuaxin2"></i></button>'
				+'	<button class="field-small" type="button" title="折叠当前区域"><i class="icon iconfont icon-xia"></i></button>'
				+'</div></div>';
			fieldElm.append(fieldHeader); var fieldBody = $("<div>",{"class":"form-field-wrap"}).appendTo(fieldElm);fieldElm.append(fieldFooter);
			if(list.group){
				formArea(fieldBody,list.fieldGroup,'group');
			}else{
				formArea(fieldBody,list,'single');
			}
		});
	}else{
		formHeader = '<header class="form-heading">'
			+'	<h3 class="form-title"><i class="fa fa-window-restore" aria-hidden="true"></i> '+formInfo.title+' <small>星号必填</small></h3>'
			+'	<ul class="form-tools">'
			+'		<li class="formClear" title="清空缓存"><button type="button" class="askhref" data-mark="您确定清除缓存吗？" data-func="formReset?gform"><i class="fa fa-recycle" aria-hidden="true"></i></button></li>'
			+'		<li title="重置表单"><button type="button" onclick="formReset(this)"><i class="fa fa-refresh" aria-hidden="true"></i></button></li>'
			+'	</ul>'
			+'</header>';
		formElm.append(formHeader);var formBody= $("<fieldset>",{"class":"form-body"}).appendTo(formElm);formElm.append(formFooter);
		formArea(formBody,formInfo.data,'single');
	}
}
function formArea(elm,data,method){
	var widthname = ["col-xs-12","col-xs-12 col-md-12 col-lg-6","col-xs-12 col-md-6 col-lg-3"];
	var data = (method=='single')? data : data.relationship; $(data).each(function(i,list){
		var areaInfo = {};
		areaInfo.clswrap  = widthname[2];
		areaInfo.label    = (list.displayName)? list.displayName : list.field.locales[0].displayName
		areaInfo.clsdot   = 'eddot lineone';
		areaInfo.need     = (list.field.isnull==1)?'<i>*</i>':'';
		areaInfo.clsname  = 'form-input';
		areaInfo.name     = list.field.name;
		areaInfo.value    = '';
		areaInfo.stats    = '';
		areaInfo.id       = (list.field.id)? list.field.id : '';
		areaInfo.reg      = '';
		areaInfo.placeholder = '请输入'+areaInfo.label;
		areaInfo.other    = '';  
		
		if(list.field.type.id==1){
			areaInfo.type = 'text' ;
		}
		if(list.field.type.id==9){
			areaInfo.type = 'radio';
			areaInfo.clsname = areaInfo.clsname+' edradio';var html = list.field.locales[0].multValue;
			if(stringLen(html)<20){
				areaInfo.clswrap  = widthname[2];
			}else if(stringLen(html)<80){
				areaInfo.clswrap  = widthname[1];
			}else{
				areaInfo.clswrap  = widthname[0];
			}
			var temp = []; $(html.split(';')).each(function(i,n){
				temp.push({"name":areaInfo.name,"txt":n.split(':')[0],"value":n.split(':')[1]});
			}); temp.pop();
			areaInfo.data = temp ;
		}
		if(list.field.type.id==3){
			areaInfo.clsname = areaInfo.clsname+' edcheckbox'; 
			areaInfo.type = 'checkbox' ; var html = list.field.locales[0].multValue;
			if(stringLen(html)<20){
				areaInfo.clswrap  = widthname[2];
			}else if(stringLen(html)<80){
				areaInfo.clswrap  = widthname[1];
			}else{
				areaInfo.clswrap  = widthname[0];
			}
			var temp = []; $(html.split(';')).each(function(i,n){temp.push({"name":areaInfo.name,"txt":n.split(':')[0],"value":n.split(':')[1]});}); temp.pop();
			areaInfo.data = temp ;
		}

		if(list.field.type.id==5){
			areaInfo.type = 'data';
			areaInfo.clsname = areaInfo.clsname+' layTime';
		}
		
		if(list.field.type.id==2){
			areaInfo.type    = 'button';
			areaInfo.clsname = "edbtn";
			areaInfo.stats   = '';
			areaInfo.icon    = '<i class="fa fa-cloud-upload" aria-hidden="true"></i>';
			areaInfo.other   = 'onclick="laymsg(\'这种按钮事件\',\'Y\')"';
		}
		var html = '';switch(areaInfo.type){
			case 'text':
				html = '<div class="'+areaInfo.clswrap+'"><div class="form-wrap">'
					+'<label class="form-label"><div class="'+areaInfo.clsdot+'">'+areaInfo.label+'</div>'+areaInfo.need+'</label>'
					+'<input class="'+areaInfo.clsname+'" type="text" placeholder="'+areaInfo.placeholder+'" name="'+areaInfo.name+'"'
					+' id="'+areaInfo.id+'" value="'+areaInfo.value+'" data-reg="'+areaInfo.reg+'" '+areaInfo.stats+' '+areaInfo.other+'>'
					+'</div></div>';
			break;
			case 'data':
				html = '<div class="'+areaInfo.clswrap+'">'
					+'	<div class="form-wrap">'
					+'		<label class="form-label"><div class="'+areaInfo.clsdot+'">'+areaInfo.label+'</div>'+areaInfo.need+'</label>'
					+'		<input class="'+areaInfo.clsname+'" type="text" placeholder="'+areaInfo.placeholder+'" name="'+areaInfo.name+'" id="'+areaInfo.id+'">'
					+'		<span class="fa-span"><i class="fa fa-calendar"></i></span>'
					+'	</div></div>';
			break;
			case 'radio':
				var checkHtml ='';$(areaInfo.data).each(function(i,n){
					checkHtml = checkHtml +'<label><input type="radio" name='+n.name+' value='+n.value+'>'+n.txt+'</label>';
				});
				html ='<div class="'+areaInfo.clswrap+'">'
					+'	<div class="form-wrap">'
					+'		<label class="form-label"><div class="'+areaInfo.clsdot+'">'+areaInfo.label+'</div>'+areaInfo.need+'</label>'
					+'		<div class="'+areaInfo.clsname+'" type="checkbox" name='+areaInfo.name+' data-reg="noNull">'+checkHtml+'</div></div></div>';
			break;
			case 'checkbox':
				var checkHtml ='';$(areaInfo.data).each(function(i,n){
					checkHtml = checkHtml +'<label><input type="checkbox" name='+n.name+' value='+n.value+'>'+n.txt+'</label>';
				});
				html ='<div class="'+areaInfo.clswrap+'">'
					+'	<div class="form-wrap">'
					+'		<label class="form-label"><div class="'+areaInfo.clsdot+'">'+areaInfo.label+'</div>'+areaInfo.need+'</label>'
					+'		<div class="'+areaInfo.clsname+'" type="checkbox" name='+areaInfo.name+' data-reg="noNull">'+checkHtml+'</div></div></div>';
			break;
			case 'button':
				var btnHtml = '<button type="button" class="'+areaInfo.clsname+'" id="'+areaInfo.id+'" data-num="2" '+areaInfo.stats+' '+areaInfo.other+'>'+areaInfo.icon+' '+areaInfo.label+'</button>';
				if(elm.hasClass("form-field")){    }else{ elm.closest("form").find(".btn-wrap>div").append(btnHtml);}
			break;
			default:console.log(1);  break;
		}
		if(html)elm.append(html);
	});
	//console.log(html);
	
	
}

function readOneFile(file,fileWrap){
	if(!/image\/\w+/.test(file.type)){alert("看清楚,这个需要图片");return false;}  
	var reader = new FileReader();  
	reader.readAsDataURL(file);
	reader.onabort=function(){fileWrap.html("未知原因,中断了,请刷新后重试");};//终断
	reader.onerror=function(){fileWrap.html("未知原因,出错了,请刷新后重试");};//出错			
	reader.onload=function(e){
		fileWrap.find(".edfile").addClass("hidden");
		fileWrap.find(".oneView").html('<img src="'+this.result+'">');
	};			
}
function readAsDataURL(file,fileView,fileName,fileSize){  
	if(!/image\/\w+/.test(file.type)){alert("看清楚,这个需要图片");return false;}  
	var reader = new FileReader(); 
	reader.readAsDataURL(file);
	reader.onabort=function(){fileView.html("未知原因,中断了,请刷新后重试！");};//终断
	reader.onerror=function(){fileView.html("未知原因,出错了,请刷新后重试！");};//出错			
	reader.onload=function(e){  
		var html = '<li data-size="'+fileSize+'"><img src="' + this.result +'" alt=""><div class="bottom"><span class="fileName" title="'+fileName+','+fileSize/1000+'KB">'+fileName+'</span><span class="pull-right">'+
				'<button type="button" class="btn btn-xs btn-default fileToLeft"><i class="fa fa-hand-o-left text-warning" aria-hidden="true"></i></button>'+
				'<button type="button" class="btn btn-xs btn-default fileRemove"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></button>'+
				'<button type="button" class="btn btn-xs btn-default fileToright"><i class="fa fa-hand-o-right text-warning" aria-hidden="true"></i></button>'+
				'</span></div></li>';fileView.append(html); 
	};
	new Sortable(fileView[0]);					
} 
function readFiles(file,fileWrap){
	var type = file.type.split('/')[0];
	switch(type){
		case "text":var html  = '<i class="fa fa-file-text-o" aria-hidden="true"></i>';break;
		case "audio":var html = '<i class="fa fa-file-audio-o" aria-hidden="true"></i>';break;
		case "video":var html = '<i class="fa fa-file-video-o" aria-hidden="true"></i>';break;
		case "application":
			if(file.type.indexOf("word") > 0){var html='<i class="fa fa-file-word-o" aria-hidden="true"></i>';}
			if(file.type.indexOf("excel") > 0 || file.type.indexOf("sheet") > 0){var html='<i class="fa fa-file-excel-o" aria-hidden="true"></i>';}
			if(file.type.indexOf("powerpoint") > 0 || file.type.indexOf("slideshow") > 0){var html='<i class="fa fa-file-powerpoint-o" aria-hidden="true"></i>';}
			var html = (html)? html:'<i class="fa fa-file-o" aria-hidden="true"></i>';break;
		case "image":
			var reader = new FileReader(); 
			reader.readAsDataURL(file);
			reader.onload = function(e){
				fileWrap.find("ul").append('<li><div class="con-wrap"><img src="'+this.result+'" alt="img"></div><div class="bottom"><span class="fileName">'+file.name+'</span><button type="button" class="btn-remove"><i class="fa fa-times"></i></button></div></li>');
			};
		break;
		default:var html = '<i class="fa fa-file" aria-hidden="true"></i>';
	}
	return html;
}

/*表格系统*/
function gridShow(elm){
	var elm = (elm.hasClass("grid-page"))? elm : elm.closest(".grid-page"),name = elm.attr("data-show");
	elm.find(".pageOne,.pageTwo,.pageThr").fadeOut();
	elm.find("."+name+"").fadeIn();
}
function gridBtn (elm){
	var data=[];elm.find(".data-tbody .chosen").each(function(){data.push($(this).data());});
	elm.find(".grid-btn button[data-open!='all']").each(function(){
		var method = $(this).attr("data-open"); if(!method) return false;
		if(method=="hasVal"){
			(data.length>0)? $(this).prop("disabled",false) : $(this).prop("disabled",true);
		}else if(method=="one"){
			(data.length==1)? $(this).prop("disabled",false) : $(this).prop("disabled",true);	
		}else{
			if(data.length==0){ $(this).prop("disabled",true); return true; }	
			if(method.indexOf('!=')>-1){
				var temp=true,meth = method.split('!=');
				$(data).each(function(i,list){
					 if(list[meth[0]]== meth[1]) temp=false;
				});
				(temp)? $(this).prop("disabled",false) : $(this).prop("disabled",true);	
				return true;
			}
			if(method.indexOf('=')>-1){
				var temp = true,meth=method.split('=');
				$(data).each(function(i,list){
					if(list[meth[0]] != meth[1]) temp=false;
				});
				(temp)? $(this).prop("disabled",false) : $(this).prop("disabled",true);	
				return true;
			}
			if(method.indexOf('<')>-1){
				var temp = true,meth=method.split('<');
				$(data).each(function(i,list){
					if(list[meth[0]] >= meth[1]) temp=false;
				});
				(temp)? $(this).prop("disabled",false) : $(this).prop("disabled",true);	
				return true;
			}
			if(method.indexOf('>')>-1){
				var temp = true,meth=method.split('>');
				$(data).each(function(i,list){
					if(list[meth[0]] <= meth[1]) temp=false;
				});
				(temp)? $(this).prop("disabled",false) : $(this).prop("disabled",true);	
				return true;
			}
		}
	});
}
function gridGet (elm,key){
	if(elm.length!=1)return false;
	var back = {}; back.tbsmart = elm.attr("data-smart");
	back.elm = elm,back.tbid = elm.attr("id");back.tbname=elm.attr("name");
	back.nowpage = elm.find(".edpage").attr('data-nowpage');
	back.pagenum = elm.find(".edpage").attr('data-pagenum');
	back.maxpage = elm.find(".edpage").attr('data-maxpage');
	back.allnum  = elm.find(".edpage").attr('data-nums');
	if(elm.find('.key-detail').css("display")=="block"){
		back.table     = elm.find(".data-table").attr("data-table");
		back.orderName = elm.find(".data-order").attr("data-order");
		back.orderSort = elm.find(".data-order").attr("data-sort");
		back.map       = elm.find(".data-table").attr("data-map");
		back.field     = [];
		elm.find(".key-detail .grid-field").each(function(){
			var temp = {
				relat  : $(this).attr("data-relat"),
				relate : $(this).attr("data-relate"),
				column : $(this).attr("data-column"),
				keyWord: valGet($(this))
			}
			back.field.push(temp);
		});
	}else{
		back.table     = elm.find(".data-table").attr("data-table");
		back.column    = elm.find(".keyword").attr("data-column");
		back.keyWord   = elm.find(".keyword").val();
		back.orderName = elm.find(".data-order").attr("data-order");
		back.orderSort = elm.find(".data-order").attr("data-sort");
		back.map       = elm.find(".data-table").attr("data-map");
	}
	var start = {nowpage:1,pagenum:10}
	back = $.extend({},start, back);
	back.data = [];elm.find(".data-tbody .chosen").each(function(){back.data.push($(this).data());});
	
	back.th = [];elm.find(".data-thead th").each(function(){
		var mark = $(this).attr("data-mark"),column=mark.split('|')[0],style=$(this).attr("style"),html=$.trim($(this).html());
		back.th.push({'clas':$(this).attr("class"),'mark':mark,'column':column,'style':style,'html':html});
	});
	return back;
}
function redMark (val,key,redCol,cold){
	key = key.toString(); val = val.toString();
	if(redCol=="all"){
		if(key)val = val.replace(new RegExp(key,"gm"),'<m class="red-8">'+key+'</m>');
	}else{
		if('data.'+redCol==cold){
			if(key)val = val.replace(new RegExp(key,"gm"),'<m class="red-8">'+key+'</m>');
		}
	}
	return val;
}
function pageAuto(elm){
	var tdNum   = elm.find("th").children().length - elm.find("thead>tr").children(".hidden").length;
	var nowPage = Number(elm.find(".edpage").attr("data-nowpage"));
	var maxPage = Number(elm.find(".edpage").attr("data-maxpage"));
	var pageNum = Number(elm.find(".edpage").attr("data-pageNum"));	
	var total   = Number(elm.find(".edpage").attr("data-nums"));
	if(total==0){
		elm.find(".edpage").html('<td colspan="'+tdNum+'"><div class="pageauto">没有找到相应的数据，请刷新！</div></td>' );
		elm.find(".gridPage").html('<div class="pageauto">没有找到相应的数据，请刷新！</div>');
		return false;
	}
	var pageHtml='',gridHtml='',selHtml='',selGrid='',gridSelect = '<select class="my-num">';
	$.each([5,10,20,30,50],function(i,n){
		if(pageNum==n){
			selHtml = selHtml+'<option value='+n+' selected>'+n+'</option>';
			selGrid = selGrid+'<option value='+n+' selected>每页'+n+'条</option>';
		}else{
			selHtml = selHtml+'<option value='+n+'>'+n+'</option>';
			selGrid = selGrid+'<option value='+n+'>每页'+n+'条</option>';
		}
	});
	for (var i=1;i <= maxPage;i++){
		if(i==nowPage){
			gridSelect = gridSelect + '<option value="'+i+'" selected>'+i+' / '+maxPage+'</option>';
		}else{
			gridSelect = gridSelect + '<option value="'+i+'">'+i+' / '+maxPage+'</option>';
		}
	} gridSelect = gridSelect + '</select>';
	selHtml = '<div class="page-edsel"><select class="edsel pageNumSel" data-small="Y" data-seat="T">'+selHtml+'</select></div>';
	selGrid = '<div class="page-edsel"><select class="pageNumSel" data-small="Y" data-seat="T">'+selGrid+'</select></div>';
	var firsInfo,prevInfo,nextInfo,lastInfo;
	if(maxPage==1){
		firsInfo = 'firstPage disabled'; prevInfo = 'prevPage disabled';
		nextInfo = 'nextPage disabled';  lastInfo = 'lastPage disabled';
	}else{
		if(nowPage<=1){
			firsInfo = 'firstPage disabled'; prevInfo = 'prevPage disabled';
			nextInfo = 'nextPage';  lastInfo = 'lastPage';
		}else if(nowPage == maxPage){
			firsInfo = 'firstPage'; prevInfo = 'prevPage';
			nextInfo = 'nextPage disabled';  lastInfo = 'lastPage disabled';
		}else{
			firsInfo = 'firstPage'; prevInfo = 'prevPage';
			nextInfo = 'nextPage';  lastInfo = 'lastPage';
		}
	}
	var pageHtml = '<a class="'+firsInfo+'" data-href="1" href="javascript:void(0);"><i class="fa fa-step-backward" aria-hidden="true"></i></a>'
	+'	<a class="'+prevInfo+'" data-href='+(nowPage-1)+' href="javascript:void(0);"><i class="fa fa-backward" aria-hidden="true"></i></a>'
	+'	&nbsp;  &nbsp;<span>第<input class="my-num" type="text" value='+nowPage+'>页，共<span class="total">'+maxPage+'</span>页</span>&nbsp;  &nbsp;'
	+'	<a class="'+nextInfo+'" data-href='+(nowPage+1)+' href="javascript:void(0);"><i class="fa fa-forward" aria-hidden="true"></i></a>'
	+'	<a class="'+lastInfo+'" data-href='+maxPage+' href="javascript:void(0);"><i class="fa fa-step-forward" aria-hidden="true"></i></a>'
	+'	<div class="pull-right">每页显示'+selHtml+'条，共'+total+'条</div>';
	var gridHtml = '<div class="pageauto nospace">'
	+'<div class="col-xs-3"><button class='+prevInfo+' data-href='+(nowPage-1)+'><i class="fa fa-chevron-left" aria-hidden="true"></i></button></div>'
	+'<div class="col-xs-3">'+gridSelect+'</div><div class="col-xs-3">'+selGrid+'</div>'
	+'<div class="col-xs-3"><button class='+nextInfo+' data-href='+(nowPage+1)+'><i class="fa fa-chevron-right" aria-hidden="true"></i></button></div></div>';
	elm.find(".edpage").html('<td colspan="'+tdNum+'"><div class="pageauto">'+pageHtml+'</div></td>');
	elm.find(".gridPage").html(gridHtml);
	elm.find(".edsel").edsel();
}
function gridLoad(elm,config){
	if(elm.attr("data-smart")=="N"){eval(eval(elm.attr("name"))(elm)); return true;}
	var lay       = laywait(1);
	var table     = elm.find(".data-table").attr("data-table");
	var column    = elm.find(".keyword").attr("data-column");		//关键字栏目
	var redCol    = (column.split('|')[1]) ? 'all' : column ;   	//描红字段	
	var keyWord   = elm.find(".keyword").val();						//关键字
	var orderName = elm.find(".data-order").attr("data-order");		//排序字段
	var orderSort = elm.find(".data-order").attr("data-sort");		//排序方式
	var nowPage   = elm.find(".edpage").attr("data-nowpage"); 		//当前页
	var map 	  = elm.find(".data-table").attr("data-map");		//查询
	var pageNum   = (elm.find(".edpage").attr("data-pageNum"))? elm.find(".edpage").attr("data-pageNum"):10;
	$.ajax({
		type: "POST",
		url : edwin.SERVER+'ajaxsers.html',
		data:{table:table,column:column,keyWord:keyWord,orderName:orderName,orderSort:orderSort,pageNum:pageNum,nowPage:nowPage,map:map},
		success: function(msg){
			var msg  = $.parseJSON(msg),page = msg[0]['page'],data = (page.nums < 1) ? data='':data=msg;
			elm.find(".edpage").attr({"data-nowpage":page.nowPage,"data-maxpage":page.maxPage,"data-pageNum":page.pageNum,"data-nums":page.nums});
			pageAuto(elm);elm.find(".data-tbody,.gridDataWrap").html("");
			$.each(data, function(i,data){
				var html = '';var delmark = table+'|id|'+data['id'];
				elm.find("th").each(function(i){
					var clas = ($(this).hasClass('hidden')) ? 'class="hidden"' : '';
					var mark = $(this).attr('data-mark').split('|');
					var cold = 'data.'+mark[0];
					if(mark[1]=='check')html +='<td class="text-center"><input type="checkbox" data-mark="'+delmark+'"></td>';
					if(mark[1]=='id')   html +='<td>'+redMark(data['id'],keyWord,redCol,cold)+'</td>';
					if(mark[1]=='eddot')html +='<td '+clas+'><div class="eddot">'+redMark(eval(cold),keyWord,redCol,cold)+'</div></td>';
					if(mark[1]=='ajaxInput')html +='<td '+clas+'><input class="ajaxInput" data-mark="'+delmark+'|'+mark[0]+'" type="text" value="'+eval(cold)+'"></td>';
					if(mark[1]=='unix')html +='<td '+clas+'><div class="eddot">'+moment.unix(eval(cold)).format(mark[2])+'</div></td>';
					if(mark[1]=='img')html +='<td><img src="'+mark[2]+eval(cold)+'"></td>';
					if(mark[1]=='ajaxSelect'){
						var selhtml = (eval(cold)) ? 
						'<option value="1" selected>'+mark[2]+'</option><option value="0">不'+mark[2]+'</option>' : 
						'<option value="1">'+mark[2]+'</option><option value="0" selected>不'+mark[2]+'</option>' ;
						html +='<td '+clas+'><select class="ajaxSelect" data-mark="'+delmark+'|'+mark[0]+'" >'+selhtml+'</select></td>';
					}
					if(mark[1]=='option'){
						var handle = ''; if(mark[3])delmark = delmark+'|'+mark[3];
						$.each(mark[2].split('/'),function(i,n){
							if(n=="ser")handle +='<li class="ajaxSer" data-mark="'+delmark+'">修改</li>';
							if(n=="del")handle +='<li class="ajaxDel" data-mark="'+delmark+'">删除</li>';
							if(n=="ajaxEdt")handle +='<li class="ajaxEdt" data-mark="'+eval('data.page_addr')+'">编辑</li>';
						});
						html +='<td><ul class="handle">'+handle+'</ul></td>';
					}
				});
				$("<tr>",{"class":"data","data":data,"html":html}).appendTo(elm.find(".data-tbody"));
			});
			colResize(elm);$(".eddot").dotdotdot();smartSort(elm,{name:'grid',hand:'.drug'});
		},error:function(){
			
		},complete:function(){
			layer.close(lay);
		}
	});
}


/*杂项*/
//溢出dotdotdot
function dotelm(elm,method){
	if(elm){elm=elm.find(".eddot");}else{elm=$(".eddot");}
	elm.dotdotdot({
		callback : function( isTruncated, orgContent ){
			if(isTruncated)$(this).attr('title',orgContent[0]['textContent']);
		}
	});
	if(method=="form")
	elm.find(".eddot").dotdotdot({
		callback : function( isTruncated, orgContent ){
			if(isTruncated){
				$(this).attr('title',orgContent[0]['textContent']);
			}else{
				if($(this).hasClass("linetwo")) $(this).css("line-height","34px");
			}
		}
	});
}
//滚动条
function elmScroll(elm){
	if(typeof($.fn.slimScroll)!="undefined")
	elm.slimScroll({
		width:'100%',height:'100%',size: '4px',
		color: 'rgba(0,0,0,.5)',
		position: 'right',distance: '0px',
		start: 'top',opacity: .4,
		alwaysVisible: false, //是否 始终显示组件
		disableFadeOut: false, //是否 鼠标经过可滚动区域时显示组件，离开时隐藏组件
		railVisible: true, //是否 显示轨道
		railColor: 'rgba(0,0,0,.4)', //轨道颜色
		railOpacity: .4, //轨道透明度
		railDraggable: true, //是否 滚动条可拖动
		railClass: 'slimScrollRail', //轨道div类名 
		barClass: 'slimScrollBar', //滚动条div类名
		wrapperClass: 'slimScrollDiv', //外包div类名
		allowPageScroll: false, //是否 使用滚轮到达顶端/底端时，滚动窗口
		wheelStep: 20, //滚轮滚动量
		touchScrollStep: 200, //滚动量当用户使用手势
		borderRadius: '0px', //滚动条圆角
		railBorderRadius: '0px'
	});
}

//全屏切换 
function launchFullScreen(element){
	if(element.requestFullscreen){element.requestFullscreen();}
	else if(element.mozRequestFullScreen){element.mozRequestFullScreen();}
	else if(element.webkitRequestFullscreen){element.webkitRequestFullscreen();}
	else if(element.msRequestFullscreen){element.msRequestFullscreen();}
}
function exitFullscreen(){
	if(document.exitFullscreen){document.exitFullscreen();}
	else if(document.mozExitFullScreen){document.mozExitFullScreen();}
	else if(document.webkitExitFullscreen){document.webkitExitFullscreen();}
}
//地图
function mapMake(elm,option){
	elm.css({"height":elm.width()/4,"min-height":"200px"});
	var name = 'myChart'+elm.attr('id');
	eval(''+name+' = echarts.init(elm[0]);'+name+'.setOption(option);window.onresize = '+name+'.resize;');
}
function mapSize(){
	$(".map").each(function(){
		$(this).css({"height":$(this).width()/4,"min-height":"200px"});
		var name = 'myChart'+$(this).attr("id");
		eval('if(typeof('+name+')!="undefined")'+name+'.resize();');
	});
}

//排序字段
function smartSort(elm,method){
	var set = {save:false,hand:false};
	if($.type(method)=='object'){set = $.extend({},set,method);}
	var sElm = (set.name=='grid')? elm.find(".data-thead tr") : elm;
	var sort = Sortable.create(sElm[0], {
		group: "name", 
		handle: set.hand,
		animation: 150,
		onEnd: function (evt) {
			if(set.name=='grid') colResize(elm);
		},onUpdate: function (evt){
			if(set.name=='grid'){
				var olds = evt.oldIndex;	var news = evt.newIndex;
				if(news<2){elm.find(".data-table th").eq(olds).after(elm.find(".data-table th").eq(news));return false;}
				if(olds >= news){
					elm.find(".data-tbody tr").each(function(){
						$(this).find("td").eq(news-1).after($(this).find("td").eq(olds));
					});
				}else{
					elm.find(".data-tbody tr").each(function(){
						$(this).find("td").eq(news).after($(this).find("td").eq(olds));
					});
				}	
			}
			
			if(!set.save) return true;
			var s = [];elm.children().each(function(i){s[i] = $(this).attr("data-edsort");})
			edSave('sort',elm.attr('name'),elm.children().get(0).tagName,s);
		} 
	});
}

//改变大小宽度
function colResize(elm,method){
	elm.find(".JCLRgrips").remove();
	elm.find(".data-table").colResizable({disable:true}).removeClass("JColResizer").find("th").css("width","auto");
	setTimeout(function(){
		elm.find(".data-table").colResizable({
			resizeMode:'fit',  				//调整模型values: 'fit', 'flex', 'overflow']
			disable:false,      			//删除所有之前添加增强等事件
			disabledColumns:[0,1],			//数组的列索引被排除在外,因此它将不能手动拖动它们。
			minWidth:80,
			liveDrag:true,					//当该值设置成真 拖动列锚时更新表布局
			postbackSafe:false,		        //浏览器刷新保持不变
		//	flush: false,  	 			    //postbackSafe启用时有效。其目的是删除所有之前存储的数据与当前表布局让它回到原来的布局
		//	marginLeft :'null',
			partialRefresh:true,		    //相同的部分前后局部刷新
			gripInnerHtml:"<div class='grip'></div>", 
			draggingClass:"dragging",	    //分配给列的css类锚而被拖。它可以用于视觉反馈的目的。
			hoverCursor:"e-resize",		
			onResize:function(e){	
				//elm.find(".JCLRgrips").css("width",resize.width());
			}
		});
	},500);
}
//右键菜单
function smartMenu(elm,menu,name){
	var name = (name)?name:'menu';
	elm.smartMenu(menu,{
		name: name,
		beforeShow: function() {
			$.smartMenu.remove();
		}
	});
}
//窗口改变大小
function sizeChange(name){
	if(name=="winSize"){
		edwin.winWidth = $(window).width(),edwin.winHeight = $(window).height();
		$(".content-main").css("min-height",edwin.winHeight-131);
		if(edwin.winWidth<768){						   		   edwin.winName = "xs"; edwin.winX = 0;if(!$("body").hasClass("sidebar-none"))  edSetVal('edmin_layout',edwin.sysTem);
		}else if(edwin.winWidth>=768  && edwin.winWidth<992) { edwin.winName = "sm"; edwin.winX = 1;if(!$("body").hasClass("sidebar-mini"))  edSetVal('edmin_layout',edwin.sysTem);
		}else if(edwin.winWidth>=992  && edwin.winWidth<1200){ edwin.winName = "md"; edwin.winX = 2;if(!$("body").hasClass("sidebar-normal"))edSetVal('edmin_layout',edwin.sysTem);
		}else if(edwin.winWidth>=1200 && edwin.winWidth<1920){ edwin.winName = "lg"; edwin.winX = 2;if(!$("body").hasClass("sidebar-normal"))edSetVal('edmin_layout',edwin.sysTem);
		}else if(edwin.winWidth>=1920){				   		   edwin.winName = "vl"; edwin.winX = 2;if(!$("body").hasClass("sidebar-normal"))edSetVal('edmin_layout',edwin.sysTem);}
		edSetVal('edmin_font',edwin.sysTem);
		/*
		$(".grid-btn").each(function(){
			var btnElm = $(this);btnElm.find(".btn-group").before($(this).find("li button").clone()).remove();
			var allWidth = btnElm.width(),addWidth = 0,html;
			btnElm.find("button").each(function(i,n){
				addWidth = addWidth+$(this).innerWidth()+8;
				if(addWidth > allWidth){
					html = btnElm.find("button:gt("+(i-2)+")"); return false;
				}
			});
			if(!html) return false;
			var bhtml = '<div class="btn-group" role="group"><button class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-list" aria-hidden="true"></i> 其他 <span class="caret"></span></button><ul class="dropdown-menu">';
			html.each(function(){bhtml = bhtml + '<li>'+$(this).context.outerHTML+'</li>';}); bhtml = bhtml+'</ul></div>';
			html.remove();btnElm.append(bhtml);
		});
		*/
		
		if(edwin.nowHref.indexOf('apple.html')>-1){
			$("body").removeClass("sidebar-mini sidebar-none").addClass("sidebar-normal");
			var x = Math.floor(edwin.winWidth/100),y = Math.floor(edwin.winHeight/100),z = x*y;
			$(".apple-ul").html('');
			for(var i = 1;i<=z;i++){
				var name = 'col'+i%x;
				$(".apple-ul").append('<li class='+name+' data-edsort="sort'+i+'"></li>');			
			}
			$.getJSON(edwin.PB_PATH+'json/menu.json',function(data){
				var y = Math.floor(edwin.winHeight/100);
				$(data.menu).each(function(i,list){
					var name = 'col'; 
					if(i<y) name= name+'1';
					if(i>=y && i<2*y) name= name+'2';
					if(i>=2*y && i<3*y) name= name+'3';
					if(i>=3*y && i<4*y) name= name+'4';
					
					var html = '<div class="desktop" data-href='+list.url+'><div class="app-icon">'+list.icon+'</div><div class="app-name">'+list.text+'</div></div>';
					$(".apple-ul ").find("."+name).eq(i%y).html(html);
					//console.log(list);
				});
			});
		}
	}
	if($(".site-tabs").length>0){setTimeout('tabsResize("winSize")',500);}
	if($(".grid-wrap").length>0){setTimeout('colResize($(".grid-wrap"))',500);}
	if($(".map-wrap ").length>0){setTimeout("mapSize()",500);}
}
//主页Tab切换
function tabsResize(name){
	var ulwrapWidth = $(".site-header").width(),toolWidth = $(".tab-tools").width(),ulWidth=ulwrapWidth-toolWidth-20; 	
	if(edwin.siteTabDisplay=='flex'){
		var maxNum = Math.floor(ulwrapWidth/180),flexNum = Math.floor(ulwrapWidth/edwin.flexMinSize),nowNum = $(".site-ul li").length;
		$(".site-tabs").attr({"data-index":1,"data-max":maxNum,"data-flex":flexNum}).removeClass('page').addClass("flex");
		$(".ul-wrap,.site-ul").css("width",ulWidth);
		if(nowNum <= maxNum){
			$(".site-ul li").css("width","180px");
		}else if(nowNum > maxNum && nowNum <= flexNum){
			$(".site-ul li").css("width",ulWidth/nowNum);
		}else{
			if(name=="winSize")if($(".layui-layer-dialog").length<1)laymsg("窗口缩小，多余标签将隐藏，请关闭标签");
		}
	}else{
		var maxNum = Math.floor(ulWidth/120),flexNum = 100,nowNum = $(".site-ul li").length;
		$(".site-tabs").attr({"data-index":1,"data-max":maxNum,"data-flex":maxNum}).removeClass('flex').addClass("page");
		$(".site-ul").css("width",120 * nowNum);
		if(edwin.tabsMoveSize==0){
			$(".ul-wrap" ).css("width",ulWidth);
			if(nowNum>maxNum)if($(".layui-layer-dialog").length<1)laymsg("窗口缩小，多余标签将隐藏，请关闭标签");
		}else{
			console.log('bug');
		// if(ulwrapWidth>=ulWidth){
			// $(".site-tabs").attr("data-max",0); $(".site-tabs").find(".btn-left,.btn-right").addClass("hidden");
		// }else{
			// if(12){
				// if($(".layui-layer-dialog").length<1)layer.msg("窗口缩小，多余标签将隐藏，请删除非必要标签");
				// $(".site-tabs").find(".btn-left,.btn-right").addClass("hidden");
			// }else{
				// $(".site-tabs").find(".btn-left,.btn-right").removeClass("hidden");
				// $(".site-tabs").attr("data-max",Math.ceil((ulWidth-ulwrapWidth)/tabsMoveSize));
			// }
		// }
			
		}
	}
}
function tabChange(){
	return;
	// var index = -1*120*Number($(".site-ul li.active").index());
	// var nowindex = $(".site-tabs").attr("data-index");
	// var maxindex = $(".site-tabs").attr("data-max");
	// var leftMove = (maxindex<1) ? 0 : index ;
	// $(".site-ul").animate({left:leftMove},300);
	// var moveIndex = Math.floor(-leftMove/tabsMoveSize * 100) / 100;
	// if(moveIndex >= maxindex){
		// moveIndex = maxindex;
		// $(".site-tabs .btn-left").prop("disabled",false);
		// $(".site-tabs .btn-right").prop("disabled",true);
	// }else if(moveIndex <= 0){
		// moveIndex = 0;
		// $(".site-tabs .btn-left").prop("disabled",true);
		// $(".site-tabs .btn-right").prop("disabled",false);
	// }else{
		// $(".site-tabs .btn-left").prop("disabled",false);
		// $(".site-tabs .btn-right").prop("disabled",false);
	// }
	// $(".site-tabs").attr("data-index",moveIndex);
}

//错误函数
function htmlError(elm,tltle,msg,icon){
	var html = '<div class="page-middle"><div class="page-error-wrap"><header class="page-error">'
			+'		<i class="fa fa-id-card-o" aria-hidden="true"></i>'
			+'	<h3>'+tltle+'</h3><p>'+msg+'</p>'
			+'	</header><footer class="margin-top-30">'
			+'		<p>© 2017  <a href="http://www.dingxc.com/" target="_blank"> edwin</a></p>'
			+'	</footer></div></div>';
	elm.attr('class','page-full').html(html);		
}
//退出系统
edSave('root','login','edwin.quitTime',edwin.quitTime); edSave('root','login','quitNow',edwin.quitTime);
if(edwin.quitSwitch) var loginRemain = setInterval(function(){
	var quitNow = edGetVal('edmin_root','login','quitNow')-1; edSave('root','login','quitNow',String(quitNow));
	if(quitNow<=edwin.quitCue){
		if(quitNow==0){ signOut();
		}else if(quitNow<0){ clearInterval(loginRemain);
		}else{ var msg = '您由于长时间未活动，系统将在 '+quitNow+' 妙后退出';
			if($(".loginOutMark").length<1){
				layer.msg('<span class="red-8">'+msg+'</span>',{
					icon:2,title:'系统退出提示',skin:'loginOutMark',closeBtn:0,anim:1,time:edwin.quitCue*1000,
					btn: ['退出', '继续使用'],yes: function(index, layero){
						signOut();edSave('root','login','quitNow','0');
					},btn2: function(index, layero){
						edSave('root','login','quitNow',edGetVal('edmin_root','login','edwin.quitTime'));
					}
				});
			}else{$(".loginOutMark").find(".red-8").html(msg); }
		}
	}
},1000);
function signOut(){
	htmlError($("body"),'退出错误','退出系统失败了，请联系管理员',1);console.log('函数错误:signOut();');
}

$("body").click(function(){ 
	//if() $(".form-input").removeClass("sCharIn");
	$(".amenu-wrap ,.apple-topbar .info").removeClass("open");
	if($("body").hasClass("sidebar-none"))$("body").removeClass("open");
});
$(window).bind('beforeunload',function(){ 
	//if($("#homeBox").find("a[data-mark]").length>0) return '您输入的内容尚未保存，确定离开此页面吗？';
});
window.onload=function(){
	var page = edGetVal('edmin_temp','page','num');
	var page = ( page > 0)? ++page : 1;
	edSave('temp','page','num',page);
}
window.onunload=function(){
	var page = edGetVal('edmin_temp','page','num');
	(page>1)?edSave('temp','page','num',page-1):edClear('edmin_temp');
}

/*程序执行开始*/
$(document).ready(function(){
	edSetVal('edmin_sort');
	edSetVal('edmin_skin',edwin.sysTem);
	edSetVal('edmin_swall',edwin.sysTem);
	if(typeof(slimScroll)!="undefined") elmScroll($(".slimscroll"));$(".edsel").edsel();
	langsys((edGetVal('edmin_root',"lang","lang"))?edGetVal('edmin_root',"lang","lang"):'zh-CN');	
	$(window).resize(function(){
		if (edwin.resizeTime)clearTimeout(edwin.resizeTime);
        edwin.resizeTime = setTimeout(function(){
            sizeChange("winSize");
        },300);
	});sizeChange("winSize");
/*表单系统*/
	$(".dbDateCho").each(function(){
		var elmOne = $(this).find(".dbDateOne");
		var elmTwo = $(this).find(".dbDateTwo");
		var name   = $(this).closest("form").attr("name");
		var keyOne = elmOne.attr("name"),keyTwo=elmTwo.attr("name");
		var start = {
			elem: '#'+elmOne.attr("id")+'',
			format: 'YYYY/MM/DD',
			istime: false,
			istoday: true,
			choose: function(val){ 
				end.min = val; 
				end.start = val;
				if(name && keyOne &&val) edSave('form',name,keyOne,val);
			}
		};
		var end = {
			elem: '#'+elmTwo.attr("id")+'',
			format: 'YYYY/MM/DD',
			istime: false,
			istoday: true,
			choose: function(datas){
				start.max = datas;
				if(name && keyTwo &&datas) edSave('form',name,keyTwo,datas);
			}
		};
		laydate(start);
		laydate(end);
	});
	//改变储存
	$("body").on("change",".edform input,.edform select,.edform textarea",function(){
		var formElm  = $(this).closest("form");if(formElm.hasClass("edstart")) return false;
		var inputElm = ($(this).hasClass("form-input"))? $(this) : $(this).closest(".form-input");
		if(!formElm || !inputElm){console.log('元素没有找到啊');return false;}
		var name    = formElm.attr("name");   if(!name) return false;
		var key     = inputElm.attr("name");  if(!key) return false;
		var val     = valGet(inputElm);
		if(name && key &&val) edSave('form',name,key,val);
	})
	.on("click",".specialChar",function(){
		layopen($(this),'特殊字符',$("#syschar"),{skin:'lay-sChar',area:'auto',maxmin:false,resize:false});
	})
	//表单折叠
	.on("click",".field-small",function(){
		$(this).toggleClass("open").closest(".form-field").find(".form-field-wrap").slideToggle();
	})
	//表单联动系统
	.on("change",".form-relate",function(){
		switch ($(this).attr("type")){
			case 'checkbox':
				var filed =	$(this).attr("data-link").split('|'); 
				if($(this).is(":checked")){
					$(".form-wrap[data-relate="+filed[0]+"]").closest(".col-xs-12").show("slow");
				}else{
					$(".form-wrap[data-relate="+filed[0]+"]").closest(".col-xs-12").hide("slow");
				}
			
			break;
			case 'radio':
				var elm = $(this).closest(".form-input"),field = elm.attr("data-link");
				var fielding = elm.find("input:checked").attr("data-link");
				
				$(".form-wrap[data-relate^="+field+"]").each(function(){
					if($(this).find(".form-relate").length>0){
						
						
						
					}
				});

				$(".form-wrap[data-relate^="+field+"]").closest(".col-xs-12").hide();
				$(".form-wrap[data-relate='"+field+"♗"+fielding+"']").closest(".col-xs-12").show("slow");
			break;
			case 'select':
				var field = $(this).attr("data-link");
				var name  = $(this).find("option:selected").attr("data-link");
				$(".form-wrap[data-relate^="+field+"]").closest(".col-xs-12").hide("slow");
				//valSet($(".form-wrap[data-relate^="+field+"]").find(".form-input"),'');
				
				$(".form-wrap[data-relate='"+field+"♗"+name+"']").closest(".col-xs-12").show("slow");
				
			break;
			default: console.log('bug');break;
		}
	})
	
	//获得失去焦点 特殊字符输入
	.on("focus",".form-input",function(){
		if($(".lay-sChar").length>0){
			$(".form-input").removeClass("sCharIn");
			$(this).addClass("sCharIn");
		}
		$(this).closest(".form-wrap").addClass("focus");
		}).on("blur",".form-input",function(){
		$(this).closest(".form-wrap").removeClass("focus");
	}).on("click",".sChar-ul li",function(){
		if($(".sCharIn").length==0 || !$(".sCharIn").nowRegion())
		{laymsg('请选择要输入的位置','Y','特殊字符提示'); return false; }
		$(".sCharIn").val($(".sCharIn").val()+$(this).html());
	})
	//日期输入
	.on("click",".layDate,.layTime",function(){
		var name = $(this).closest(".edform").attr("name"),key = $(this).attr("name");
		var isTime=false,format='YYYY-MM-DD';
		if($(this).hasClass("layTime")){isTime=true;format='YYYY-MM-DD hh:mm:ss';}
		laydate({
			istime:isTime,format:format,
			choose: function(val){
				if(name && key &&val) edSave('form',name,key,val);
			}
		});
	})
	//数字输入
	.on("click",".edplus,.edmins",function(){
		var elm = $(this).closest(".spinner"),data = elm.data('data'),val=Number(elm.find("input").val());
		if( $(this).hasClass("edplus") ){val = eval(val + data.step);}else{val = eval(val - data.step);}
		if(val > data.max){
			layer.msg('该域最大值为'+data.max); val = data.max;
		}else if(val < data.min){
			layer.msg('该域最小值为'+data.min); val = data.min;
		}else{
			if(data.scale>=0){ val = val.toFixed(data.scale);}
			else{ var egg = "1"; for(var i=0;i>data.scale;i--){ egg=egg+'0'} val = parseInt(val/egg)*egg }
		}
		elm.find("input").val(val); var name = $(this).closest(".edform").attr("name"),key = elm.find("input").attr('name');
		if(name && key &&val)	edSave('form',name,key,val);
		}).on("keyup",".spinner",function(event){
			if(event.keyCode==37 || event.keyCode==40)$(this).find(".edmins").click();
			if(event.keyCode==38 || event.keyCode==39)$(this).find(".edplus").click();
		}).on("blur",".spinner input",function(){
			var name = $(this).closest(".edform").attr("name"),key = $(this).attr('name')
			var elm = $(this).closest(".spinner"),data = elm.data('data'),val = data.egg;
			if($(this).val()>Number(data.max) || $(this).val()<Number(data.min)){
				layer.msg('该域最小值为'+data.min+'，最大值为'+data.max+'，是'+data.step+'的倍数');
			}else{
				var val  = Number($(this).val());
				if(data.scale>=0){ val = val.toFixed(data.scale);}
				else{ var egg = "1"; for(var i=0;i>data.scale;i--){ egg=egg+'0'} val = parseInt(val/egg)*egg }
			}
			$(this).val(val);if(name && key &&val)	edSave('form',name,key,val);
	})
	//单选多选
	.on("click",".edcheckbox>label,.edradio>label",function(event){
		event.stopPropagation();
	}).on("click",".edcheckbox input",function(){
		var elm = $(this).closest("label");
		if(elm.hasClass("checked")){
			elm.removeClass("checked").find('i').attr("class","fa fa-fw fa-square-o");
		}else{
			elm.addClass("checked").find('i').attr("class","fa fa-fw fa-check-square-o");
		}
	}).on("click",".edradio input",function(){
		var elm = $(this).closest("label");
		if(!elm.hasClass("checked")){
			elm.addClass("checked").siblings().removeClass("checked");
			elm.find("i").attr("class","fa fa-fw fa-dot-circle-o");
			elm.siblings().find('i').attr("class","fa fa-fw fa-circle-o");
		}
	})
	//弹出框选择
	.on("click","#layerCho input",function(event){
		var elm = $(this).closest("label");
		if($(this).attr("type")=="radio"){
			if(!elm.hasClass("checked")){elm.addClass("checked").siblings().removeClass("checked");}
		}else{
			if(elm.hasClass("checked")){elm.removeClass("checked");}else{elm.addClass("checked");}
		}
	}).on("click",".mulCheckbox button,.mulRadio button",function(){
		var elm = $(this).closest(".form-input"),type=elm.attr('type'),name = elm.attr("name");
		if(!elm || !name){console.log(elm,"没有设置name属性"); return false;}
		layer.open({
			type: 1,title: false,closeBtn: false,area: '300px;',shade: 0.8,
			id: 'layerCho',skin: 'layerChose',resize: false,btn: ['取消', '确认'],btnAlign: 'c',moveType:1,
			content:'<div class="form-input normalCheck" type='+type+' name='+name+'>'+elm.find("div").html()+'</div>',
			success: function(layero){
				$("#layerCho label").append('<i class="fa fa-check" aria-hidden="true"></i>');
				if(edwin.winX==2) elmScroll($("#layerCho>div"));
				valSet($("#layerCho").find(".form-input"),valGet(elm),'turn');
			},
			btn2: function(){
				valSet(elm,valGet($("#layerCho").find(".form-input")),'change');
			}
		});
	})
	//弹出框多选
	.on("click",".edSelect button",function(){
		var elm=$(this).closest(".form-wrap"),length=elm.find("select option").length;
		var html='',title = elm.find("label div").text()+'-选择',val = elm.find("select").val();
		elm.find(".edSelect").addClass('edSelectNow').find("select option").each(function(){
			html = html+'<div><label><input type="checkbox" name="edSelect" value='+$(this).val()+'>'+$(this).text()+'</label></div>';
		});
		var html2 ='<div class="key-wrap padding-horizontal-15"><p class="info"> &nbsp; </p><div class="row"><div class="col-xs-12 col-md-9"><div class="grid-btn">'
		+'<button class="selAll">所有全选</button> <button class="selNull">所有不选</button> <button class="selReAll">结果全选</button> <button class="selReNull">结果不选</button> '
		+'<button class="selHideA">显示未选</button> <button class="selHideB">显示已选</button> <button class="selShow">显示全部</button> <button type="button" class="selOk"><i class="fa fa-upload" aria-hidden="true"></i>确认选择</button>'
		+'</div></div> <div class="col-xs-6 col-md-3"><div class="grid-from addonNull"><input class="keyword" name="keyword" data-column="" type="text">'
		+'<button class="selBtn" type="button"><i class="fa fa-search" aria-hidden="true"></i></button></div></div>'
		+'</div></div>';
		elm.find("select option").each(function(){
			html2 = html2+'<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label class=""><input type="checkbox" name="edSelect" value='+$(this).val()+'>'+$(this).text()+'</label></div>';
		});
		
		if(length<12){
			layer.open({
				type: 1,title: false,closeBtn: false,area: '300px;',shade: 0.8,
				id: 'layerCho',skin: 'layerChose',resize: false,btn: ['取消', '确认'],btnAlign: 'c',moveType:1,
				content:'<div class="form-input normalCheck" type="checkbox" name="edSelect">'+html+'</div>',
				success: function(layero){
					$("#layerCho label").append('<i class="fa fa-check" aria-hidden="true"></i>');
					if(edwin.winX==2) elmScroll($("#layerCho>div"));
					valSet($("#layerCho").find(".form-input"),val,'turn');
				},
				btn2: function(){
					elm.find(".edSelect").removeClass('edSelectNow');
					valSet(elm.find("select"),valGet($("#layerCho").find(".form-input")),'change');
				}	
			});
		}else{
			var range = ($(window).width() > 1200)? ['80%', '80%'] : ['100%', '100%'];
			layer.open({
				type: 1,title:title,closeBtn: 1,area:range,shade: 0.8,
				id: 'layerCho',resize: false,move:false,content:'<div class="form-input normalCheck muchSelect" type="checkbox" name="edSelect">'+html2+'</div>',
				success: function(layero,index){
					layero.attr('data-mark',index);
					$("#layerCho label").append('<i class="fa fa-check" aria-hidden="true"></i>');
					if(edwin.winX==2) elmScroll($("#layerCho>div"));
					valSet($("#layerCho").find(".form-input"),val,'turn');
					$("#layerCho .keyword").change();
				}
			});
		}
	})
	.on("change","#layerCho .muchSelect input",function(){
		var length = $("#layerCho input").length-1; var cho = $("#layerCho .checked").length;
		$("#layerCho .info").html('共'+length+'条,您选择了'+cho+'条，未选择'+(length-cho)+'条');
	}).on("click","#layerCho .selAll",function(){
		$(this).closest("#layerCho").find("label").addClass("checked").find("input").prop('checked',true);
		$("#layerCho .keyword").change();
	}).on("click","#layerCho .selNull",function(){
		$(this).closest("#layerCho").find("label").removeClass("checked").find("input").prop('checked',false);
		$("#layerCho .keyword").change();
	}).on("click","#layerCho .selReAll",function(){
		$(this).closest("#layerCho").find("label").each(function(){
			if(!$(this).closest("div").hasClass("hidden")) $(this).addClass("checked").find("input").prop('checked',true); 
		});
		$("#layerCho .keyword").change();
	}).on("click","#layerCho .selReNull",function(){
		$(this).closest("#layerCho").find("label").each(function(){
			if(!$(this).closest("div").hasClass("hidden")) $(this).removeClass("checked").find("input").prop('checked',false);
		});$("#layerCho .keyword").change();
	}).on("click","#layerCho .selHideA",function(){
		$(this).closest("#layerCho").find("label").each(function(){
			if($(this).hasClass("checked")){
				$(this).closest("div").addClass("hidden");
			}else{
				$(this).closest("div").removeClass("hidden");
			} 
		});$("#layerCho .keyword").change();
	}).on("click","#layerCho .selHideB",function(){
		$(this).closest("#layerCho").find("label").each(function(){
			if(!$(this).hasClass("checked")){
				$(this).closest("div").addClass("hidden");
			}else{
				$(this).closest("div").removeClass("hidden");
			} 
		});
	}).on("click","#layerCho .selShow",function(){
		$(this).closest("#layerCho").find("label").each(function(){
			$(this).closest("div").removeClass("hidden");
		});
	}).on("click","#layerCho .selOk",function(){
		var elm = $(".edSelectNow"); elm.removeClass('edSelectNow');
		valSet(elm.find("select"),valGet($("#layerCho").find(".form-input")),'change');
		layer.close($(this).closest(".layui-layer").attr('data-mark'));
	}).on("click",".selBtn",function(){
		var index = true,key = $(this).closest(".key-wrap").find(".keyword").val();
		$(this).closest("#layerCho").find("label").each(function(){
			if($(this).text().toString().indexOf(key) > -1){
				index = false;$(this).closest("div").removeClass("hidden");
			}else{
				$(this).closest("div").addClass("hidden");
			}
		});
		if(index){laymsg('没有找到相应的数据，请切换关键词','N')}
	})
	
	//文件上传
	.on("change",".oneFileInput",function(){
		var fileWrap = $(this).closest(".oneFileWrap");
		var length = $(this).prop("files").length;
		for(var i=0;i<length;i++){
			var file =  $(this).prop("files")[i];
			readOneFile(file,fileWrap)
		}						
		}).on("click",".oneView",function(){
			$(this).closest(".oneFileWrap").find(".oneFileInput").click();
		}).on("change",".fileInput",function(){
			var fileInfo = $(this).closest(".edFileWrap").find(".fileInfo");
			var fileView = $(this).closest(".edFileWrap").find(".fileView");
			fileView.removeClass("hidden");
			//var files = document.getElementById("file_input").files;
			var length = $(this).prop("files").length;
			var size = Number(fileInfo.attr("data-size"));
			for(var i=0;i<length;i++){
				var file =  $(this).prop("files")[i]; // var file = document.getElementById("file_input").files[i];
				size = size + file.size;
				readAsDataURL(file,fileView,file.name,file.size)
			}
			var total = length+Number(fileInfo.attr("data-num"));
			fileInfo.attr("data-num",total).attr("data-size",size).html("你选择了"+total+"个文件，共"+size/1000+"KB！");
		}).on("click",".fileRemove",function(){
			var fileInfo = $(this).closest(".edFileWrap").find(".fileInfo");
			var num  = Number(fileInfo.attr("data-num"))-1;
			if(num==0){$(this).closest(".edFileWrap").find(".fileView").addClass("hidden");}
			var size = Number(fileInfo.attr("data-size")) - Number($(this).closest("li").attr("data-size"));
			fileInfo.attr("data-num",num).attr("data-size",size).html("你选择了"+num+"个文件，共"+size/1000+"KB！");
			$(this).closest("li").remove();
		}).on("click",".fileToLeft",function(){
			$(this).closest("li").after($(this).closest("li").prev());
		}).on("click",".fileToright",function(){
			$(this).closest("li").before($(this).closest("li").next());
		}).on("change",".filesInput",function(){
			for(var i=0;i<$(this).prop("files").length;i++){
				var file =  $(this).prop("files")[i];
				var html =	readFiles(file,$(this).closest(".allFile-wrap"));
				if(html)$(this).closest(".allFile-wrap").find(".files-ul").append('<li><div class="con-wrap">'+html+'</div><div class="bottom"><span class="fileName">'+file.name+'</span><button type="button" class="btn-remove"><i class="fa fa-times"></i></button></div></li>');
			}
		}).on("click",".files-ul .btn-remove",function(){
			$(this).closest("li").remove();	
	})
	//表单验证
	.on("blur",".regform input[data-reg],.regform textarea[data-reg]",function(){
		var regInfo = $(this).attr("data-reg").split('♗'),regElm = $(this).closest(".form-wrap"),val = $(this).val();
		if(!regElm || !regInfo){console.log("bug,信息获取失败!");return false;}
		if(val==''){
			if(regInfo[0] != 'null'){laytip(langGet('public','fildnull'),$(this)); }
		}else{
			if(regInfo[1]) if(!eval(regInfo[1])(val)){
				laytip(langGet('public','regwrong'),$(this));
			}
			if(regInfo[2])
			if( stringLen(val)>regInfo[2].split('-')[1] || stringLen(val)<regInfo[2].split('-')[0]) 
				laytip(langGet('public','reglength')+regInfo[2].split('-')[0]+' - '+regInfo[2].split('-')[1],$(this));
		}
	});


/*表格系统*/
	$("body").on("click",".grid-back",function(){
		var elm = $(this).closest(".grid-page"); 
		if(elm.attr("data-show")=="pageThr"){
			elm.attr("data-show","pageTwo");
			gridShow(elm.find(".pageTwo .grid-wrap"));
		}else if(elm.attr("data-show")=="pageTwo"){
			elm.attr("data-show","pageOne").find(".grid-back").addClass("hidden");
			gridShow(elm.find(".pageOne .grid-wrap"));
		}else{
			
		}
	}).on("mouseenter",".data-tbody tr",function(){
	var elm = $(this).closest(".grid-wrap");	
	var MenuOrder =[]; var MenuX = [];
	elm.find(".data-order .order").each(function(i){
		var MenuY  = {};var thiselm = $(this);
		var name = $(this).find("div").text();
		MenuY.clas = "";
		MenuY.text = name;
		if($(this).find(".fa").length==1) MenuY.icon = $(this).find(".fa").clone()[0].outerHTML;
		MenuY.func = function(){ thiselm.click(); };
		MenuX[i] = MenuY;	
	}); MenuOrder[0] = MenuX;

	var MenuDis =[]; var MenuX = [];
	elm.find(".data-order .display").each(function(i){
		var MenuY  = {};var thiselm  = $(this); var clas;
		var name = $(this).find("div").text();
		($(this).hasClass("hidden")) ? clas="nodis" : clas ="isdis";
		MenuY.clas = clas;
		MenuY.text = name;
		if(!$(this).hasClass("hidden")) MenuY.icon = '<i class="fa fa-fw fa-check" aria-hidden="true"></i>';
		MenuY.func = function(){ thiselm.dblclick(); };
		MenuX[i] = MenuY;	
	}); MenuDis[0] = MenuX;
	var MenuData = [
		[{	text:"查看/修改",clas:'view',
			func:function(){
				$(this).find(".ajaxSer").click();}
		 },{
			text: "选择/取消",clas:'chose',
			func: function() {
				$(this).find("input[type='checkbox']").click();		
			}
		}]
		,[
		{text: "显示",clas:'',icon:'<i class="fa fa-fw fa-eye" aria-hidden="true"></i>',data: MenuDis},
		{text: "排序",clas:'',icon:'<i class="fa fa-fw fa-sort" aria-hidden="true"></i>',data: MenuOrder},
		{text: "删除",clas:'',func: function(){$(this).find(".ajaxDel").click();}}
        ]];smartMenu($(this),MenuData);
	})
	.on("click",".grid-wrap th.order",function(e){
		var elm = $(this);if(!elm.attr("data-mark")) return false;
		clearTimeout(edwin.TimeDb);
		edwin.TimeDb = setTimeout(function(){
			var orderElm = elm.closest(".data-order");orderElm.find(".fa").remove();
			var thsorder = elm.attr("data-mark").split('|')[0];
			if(orderElm.attr("data-order")==thsorder){
				if(orderElm.attr("data-sort")=="1"){
					orderElm.attr("data-sort","0");elm.append('<i class="fa fa-fw fa-long-arrow-up"></i>');
				}else{
					orderElm.attr("data-sort","1");elm.append('<i class="fa fa-fw fa-long-arrow-down"></i>');
				}
			}else{
				elm.append('<i class="fa fa-fw fa-long-arrow-down"></i>');
				orderElm.attr({"data-order":thsorder,"data-sort":"1"});
			}
			elm.closest(".grid-wrap").find(".edpage").attr("data-nowpage",1);
			gridLoad(elm.closest(".grid-wrap"));
		},300);
	}).on("dblclick",".grid-wrap th.display",function(){
		clearTimeout(edwin.TimeDb);
		var elm = $(this).closest(".grid-wrap");
		var index = $(this).index()+1;
		if(index>2){
			if($(this).hasClass("hidden")){
				elm.find("table").find(".data-order th:nth-child("+index+")").removeClass("hidden");
				elm.find("table").find(".data-tbody tr td:nth-child("+index+")").removeClass("hidden");	
			}else{
				elm.find("table").find(".data-order th:nth-child("+index+")").addClass("hidden");
				elm.find("table").find(".data-tbody tr td:nth-child("+index+")").addClass("hidden");		
			}
		}colResize(elm);
	}).on("click",".select-all",function(){
		if($(this).closest("table").hasClass("selectMuch")){
			var elm = $(this).closest("table").find("tbody");
			if(!$(this).hasClass("yes")){
				elm.find("tr").addClass("chosen").find("input[type='checkbox']").prop("checked", true);
				$(this).addClass("yes");
			}else{
				elm.find("tr").removeClass("chosen").find("input[type='checkbox']").prop("checked", false);
				$(this).removeClass("yes");
			}
		}gridBtn($(this).closest(".grid-wrap"));
	}).on("click",".data-tbody input:checkbox",function(event){
		event.stopPropagation();
		if($(this).closest("table").hasClass("selectOne")){
			if($(this).is(":checked")){
				$(this).closest("tr").addClass("chosen").siblings("tr").removeClass("chosen").find("input[type='checkbox']").prop("checked", false);
			}else{return false;}
		}else if($(this).closest("table").hasClass("selectMuch")){
			if($(this).is(":checked")){
				$(this).closest("tr").addClass("chosen").find("input:checkbox").prop("checked", true);
			}else{
				$(this).closest("tr").removeClass("chosen").find("input:checkbox").prop("checked", false);
			}
			var elm = $(this).closest("tbody");
			if(elm.find("input[type='checkbox']:checked").size()==0)
			$(this).closest("table").find(".select-all").removeClass("yes").prop("checked", false);
			if(elm.find("input[type='checkbox']").size() == elm.find("input[type='checkbox']:checked").size())
			$(this).closest("table").find(".select-all").addClass("yes").prop("checked", true);
		}gridBtn($(this).closest(".grid-wrap"));
	}).on("click",".data-tbody tr",function(){
		clearTimeout(edwin.TimeDb);var elm = $(this);
		edwin.TimeDb = setTimeout(function(){
			elm.find("input").click();
		},200);
	}).on("dblclick",".data-tbody tr",function(){
		clearTimeout(edwin.TimeDb);
		
	}).on("click","tr .ajaxInput,tr .ajaxSelect,.handle",function(event){
		event.stopPropagation();
	}).on("change",".grid-from .colSel",function(event){
		$(this).closest(".grid-from").find(".keyword").attr("data-column",$(this).val());
	}).on("keydown",".grid-from",function(e){
		if(e.keyCode==13){$(this).find("button").click();}
	}).on("click",".grid-keybtn",function(){
		$(this).closest(".grid-wrap").find(".edpage").attr("data-nowpage",1);
		gridLoad($(this).closest(".grid-wrap"));	
	}).on("change",".pageNumSel",function(){
		$(this).closest(".grid-wrap").find(".edpage").attr({"data-nowpage":"1","data-pageNum":$(this).find("option:selected").val()});
		gridLoad($(this).closest(".grid-wrap"));
	}).on("click",".prevPage,.nextPage,.lastPage,.firstPage",function(){
		if($(this).hasClass("disabled")) return false;
		$(this).closest(".grid-wrap").find(".edpage").attr("data-nowpage",$(this).attr("data-href"));
		gridLoad($(this).closest(".grid-wrap"));
	}).on("change",".my-num",function(){
		var page = $(this).val();
		var maxPage = Number($(this).closest(".grid-wrap").find(".edpage").attr("data-maxpage"));
		reg=/^[1-9]\d*$/; 
		if(reg.test(page) && page <= maxPage){
			$(this).closest(".grid-wrap").find(".edpage").attr("data-nowpage",page);
			gridLoad($(this).closest(".grid-wrap"));
		}else{
			$(this).addClass("has-error");
		}
	});

/*设置系统*/
	$("body").on("mouseenter",".sidebar-menu>.treeview",function(){
		if(!$("body").hasClass("sidebar-mini")) return true;
		var ulELm = $(this).children("ul"),uH = ulELm.height(),liTop = $(this).offset().top;
		var maxheight= (liTop>edwin.winHeight/2+80) ? liTop-50 : edwin.winHeight-45-liTop;
		ulELm.css({"max-height":maxheight,"overflow-x":"hidden","overflow-y":"auto"});
		if(liTop>edwin.winHeight/2+80) ulELm.css({"bottom":"40px"});
		if(maxheight<uH)ulELm.find(".text").each(function(){$(this).css("width",$(this).width()-20)});
	}).on("mouseleave",".sidebar-menu>.treeview",function(){
		if($("body").hasClass("sidebar-mini"))
		$(this).find("ul").removeAttr("style").find(".text").removeAttr("style");
	});
	//字体设置
	$("body").on("change",".fontFamily,.fontSize,.fontLine",function(){
		var name = $(this).closest(".font-wrap").attr("name");
		var fontFamily = $(this).closest(".font-wrap").find(".fontFamily").val();
		var fontSize   = $(this).closest(".font-wrap").find(".fontSize").val();
		var fontLine   = $(this).closest(".font-wrap").find(".fontLine").val();
		var styleVal = "font-family: "+fontFamily+";font-size: "+fontSize+";line-height: "+fontLine+";";
		edSave('font',name,'style',styleVal); edSetVal('edmin_font');
		
	})
	//系统设置
	.on("change",".formStyle",function(){
		var val = $(this).find('option:selected').val();
		$(".form").removeClass("linkform partform stepform").addClass(val);
		edSave('formSet','style','style',val);
	}).on("change",".formStore",function(){
		var val = $(this).find('option:selected').val();
		if(val=="Y"){
			$("form").each(function(){ if(!$(this).hasClass("edform") && $(this).attr("name")) $(this).addClass("edform") })
		}else{
			$("form").removeClass("edform");
		}
		edSave('formSet','store','store',val);
	})
	//菜单切换
	.on("click",".sidebar-menu li:not('.header')",function(event){
		event.stopPropagation();
		
		if($(this).hasClass("active") ){
			$(this).removeClass("active").children("ul").slideUp('slow'); 
		}else{
			$(this).children("ul").slideDown('slow');
			$(this).siblings().children("ul").slideUp('slow');
			$(this).addClass("active").siblings().removeClass("active");
		}
	}).on("click",".sidebar-toggle",function(event){
		event.stopPropagation();
		if($("body").hasClass("sidebar-normal")){
			edwin.winX = 1; edSetVal('edmin_layout',edwin.sysTem);
		}else if($("body").hasClass("sidebar-mini")){
			edwin.winX = 2; edSetVal('edmin_layout',edwin.sysTem);
		}else{
			edwin.winX = 3; edSetVal('edmin_layout',edwin.sysTem);
		}
		sizeChange("menuSize");
	})
	//壁纸切换
	.on("click",".swallBtn",function(){
		var swall = $(this).closest(".form-wrap").find("input").val();
		edSave('swall','edmin','swall',swall);
		$(".main-swall img").attr("src",swall);
		laymsg('恭喜您,壁纸切换成功！','Y','壁纸切换');
	})
	.on("click",".swall-ul li",function(){
		var swall = $(this).find("img").attr("src"); $(".main-swall img").attr("src",swall);
		edSave('swall','edmin','swall',swall);laymsg('恭喜您,壁纸切换成功！','Y','壁纸切换');
	})
	//皮肤切换
	.on("click",".skin-ul li",function(){
		edSave('skin','edmin','skin',$(this).attr('data-skin'));
		edSetVal('edmin_skin','edmin');
		$(this).addClass("active").siblings().removeClass("active");
		laymsg('恭喜您,皮肤切换成功！','Y','皮肤切换');
	})
	//打开设置
	.on("click",".mainSet",function(){
		var back = '<button class="layerSet"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>';
		layopen($("#mainSet"),'hello',$("#sysinfo"),{'skin':'main-set',shade:true,shadeClose:true});
		$(".main-set").append(back); $("#sysinfo .setting").find("a[href='#"+$(this).attr("name")+"']").click();
		}).on("click",".sys-left a",function(){
			var back  = '<button class="layerSet"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>';
			$(this).closest(".layui-layer").find(".layui-layer-title").html(back).append($(this).find("span").clone());
			$(this).closest(".layui-layer").find(".sys-wrap").addClass("open");
		}).on("click",".layerSet",function(){
			$(this).closest(".layui-layer").find(".sys-wrap").removeClass("open");
		})
	//主页tab切换
	$(".apple-menu").on("click","li a",function(){
		var mark = $(this).attr("data-mark"),href = $(this).attr("data-href"),name=$(this).attr("name");
		if(!mark || !href || href=="#" || !name){if(href.indexOf('http://')>-1)window.open(href);return true;}
		var markHtml = '<li><a name='+name+' href="#tab_'+mark+'" data-toggle="tab" data-mark='+mark+'>'+$(this).find(".text").clone()[0].outerHTML+'</a></li>';
		if( $(".appTaskList ul").find('a[href="#tab_'+mark+'"]').length==0 )$(".appTaskList ul").append(markHtml); $(".appTaskList ul").find('a[href="#tab_'+mark+'"]').click();
		if($(this).attr('data-open')=='iframe'){
			var layElm = layopen('',$(this).find(".text").clone()[0].outerHTML,href,{type:2});
		}else{
			var layElm = layopen('',$(this).find(".text").clone()[0].outerHTML,'',{});
			layElm.find(".layui-layer-content").load(href+' .content-main',function(){
				eval('pageLoad("'+name+'")');
			});
		}

	});
	$(".site-menu").on("click","li a",function(){
		var tabElm = $(".site-tabs"),mark = $(this).attr("data-mark"),href = $(this).attr("data-href"),name=$(this).attr("name");
		if(tabElm.length==0 || !mark || !href || href=="#" || !name){return true;}
		var maxNum = tabElm.attr('data-max'),flexNum =  tabElm.attr('data-flex'),nowNum = tabElm.find(".site-ul li").length;
		if(nowNum > flexNum-1){
			laymsg('当前标签过多，请先关闭一些标签','N');return false;
		}else{
			var markHtml = '<li><a href="#tab_'+mark+'" data-toggle="tab" data-mark='+mark+'>'+$(this).find(".text").clone()[0].outerHTML+'</a><button class="clo-btn"><i class="icon iconfont icon-close"></i></button></li>';
			var dataHtml = '<div class="tab-pane" id="tab_'+mark+'"></div>';
			if(href){
				if( $("#tab_"+mark+"").length > 0 ){
					$(".site-ul").find('a[href="#tab_'+mark+'"]').click();
				}else{
					$(".site-ul").append(markHtml);
					$(".site-content").append(dataHtml);
					if($(this).attr('data-open')=='iframe'){
						$(".site-content #tab_"+mark+"").attr({"data-mark":href}).html('<iframe src='+href+' style="width:100%;height:500px"></iframe>');
					}else{
						$(".site-content #tab_"+mark+"").attr({"data-mark":href}).load(href+' .content-main',function(){
							tabsResize();
						});
					}
					
					$(".site-ul").find('a[href="#tab_'+mark+'"]').click(); 
				}
				eval('pageLoad("'+name+'")');
			}
		}
	});
	$(".site-tabs").on("click","li a",function(){
		setTimeout("tabChange()",100);
	}).on("click",".clo-btn",function(){
		var leftelm = $(this).closest("li").prev("li").find("a");
		var nowelm  = $(this).siblings("a");
		$(".site-content").find(nowelm.attr("href")).remove();
		$(this).closest("li").remove();
		if($(".site-ul").find("li.active").length<1)leftelm.click();
		tabsResize();		
	}).on("click",".btn-left",function(){
		var index = parseFloat($(".site-tabs").attr("data-index"));
		var max   = parseFloat($(".site-tabs").attr("data-max"));
		var nowMove = Math.abs(parseInt($(".site-ul").css("left")));
		if(index < max){
			var thisIndex = (index == Math.floor(index)) ? index - 1 : Math.floor(index);
		}else{
			var thisIndex = (nowMove > max*tabsMoveSize)? max : max - 1;
		}
		$(".btn-right").prop('disabled', false);
		if(thisIndex == 0) $(".btn-left").prop('disabled', true);
		if(thisIndex == max) $(".btn-right").prop('disabled', true);
		$(".site-tabs").attr("data-index",thisIndex).find(".site-ul").animate({left: -1*tabsMoveSize*thisIndex},300);
	}).on("click",".btn-right",function(){
		var index = parseFloat($(".site-tabs").attr("data-index"));
		var max   = parseFloat($(".site-tabs").attr("data-max"));
		var nowMove = Math.abs(parseInt($(".site-ul").css("left")));
		if(index < max){
			var thisIndex = (index == Math.floor(index)) ? index + 1 : Math.floor(index) + 1;
			$(".btn-right").prop('disabled', false);
			if(thisIndex == 0) $(".btn-left").prop('disabled', true);
			if(thisIndex == max) $(".btn-right").prop('disabled', true);
			$(".site-tabs").attr("data-index",thisIndex).find(".site-ul").animate({left: -1*tabsMoveSize*thisIndex},300);
		}
		$(".btn-left").prop('disabled', false);
	}).on("click",".kill-all",function(){
		$(".site-ul li").each(function(){
			$(this).find(".clo-btn").click();
		});
		$(".site-ul .home").find("a").click();tabsResize();
	}).on("click",".kill-now",function(){
		var elm = $(".site-content>.active");
		if(elm.hasClass("home")){layer.msg("网站首页不可关闭！");return false; }
		var elm = $(".site-ul li.active").prev("li").find("a");
		$(".site-ul li.active").find(".clo-btn").click();elm.click();tabsResize();
	}).on("click",".kill-oth",function(){
		$(".site-ul li").each(function(){
			if(!$(this).hasClass("active")) $(this).find(".clo-btn").click();
		});
		tabsResize();layer.msg("关闭其他标签成功！");
	}).on("click",".refresh-now",function(){
		edSave('root','login','quitNow',edGetVal('edmin_root','login','quitTime'));
		var elm = $(".site-content>.active");
		if(elm.hasClass("home")){
			$("#trainTodoTable .data-tbody").html('');
			setTimeout(function(){ trainTodo(1,10,'null') },200);
		}else{
			elm.empty().load(elm.attr("data-mark"));
			setTimeout("pageRelod('"+elm.attr("data-name")+"');",200);
		}
		//layer.msg("网站刷新成功！");
	}).on("click",".refresh-All",function(){
		window.location.reload();
	});
	
/*杂项 */
	//折叠按钮
	$("body").on("click",".toggleBtn",function(){
		var href =  $(this).attr("href");var elm = $("#"+href+""); 
		if(!$(this).attr('data-toggle'))return false; 
		var toggle = $(this).attr('data-toggle').split('|');
		if(elm.css("display")=="none"){
			elm.slideDown(); $(this).html(toggle[1]);
		}else{
			elm.slideUp();$(this).html(toggle[0]);
		}
	})
	//下拉菜单溢出处理
	.on("click",".dropdown-toggle",function(){
		var elm = $(this).siblings(".dropdown-menu");
		setTimeout(function(){dotelm(elm)},80);
	})
	//询问执行  <a class="askhref" data-href="" data-mark="您确定删除该数据吗？" data-func="askFunc?1">                                                                                                                                                                    
	.on("click",".askhref",function(){
		if($(this).hasClass("disabled"))	return false;
		var mark = ($(this).attr("data-mark")) ? $(this).attr("data-mark") : "确认信息?";
		var href = ($(this).attr("data-href")) ? $(this).attr("data-href") : "#";
		var func = ($(this).attr("data-func")) ? $(this).attr("data-func").split('?') : '#';
		layer.confirm(mark, {icon:3, btn: ['确定','取消']}, function(index,layero){
			layero.find('.layui-layer-btn').remove();
			layer.close(index);if(href!="#"){window.location.href = href;}else{
				if(func[0]) eval(eval(func[0])(func[1]));
			}
		});
	})
	//关闭弹出
	.on("click",".layClose",function(){
		layer.close($(this).closest(".layui-layer").attr("data-mark"));
	})
	//box
	.on("click",".box-small",function(){
		if($(this).find(".fa").hasClass("fa-minus")){
			$(this).html('<i class="fa fa-plus" aria-hidden="true"></i>');
		}else{
			$(this).html('<i class="fa fa-minus" aria-hidden="true"></i>');
		}
		$(this).closest(".box").find(".box-body").slideToggle("slow","linear");
		}).on("click",".box-remove",function(){
		$(this).closest(".box").slideUp("slow");
	})
	//全屏切换
	.on("click",".fullScreen",function(){
		if($(this).attr("name")=="false"){
			launchFullScreen(document.documentElement);$(this).attr("name","");
		}else{
			exitFullscreen();$(this).attr("name","false");
		}
	})
	//文件上传判断
	$(".allFile-wrap").each(function(){
		if(typeof FileReader == 'undefined'){
			$(this).find(".fileInfo").html("你的浏览器不支持FileReader接口,请升级");
			$(this).find(".files-a").remove();
		}
	});
	$(".oneFileWrap").each(function(){
		if(typeof FileReader == 'undefined'){
			$(this).find(".oneView").html("你的浏览器不支持FileReader接口,请升级");
			$(this).find(".edfile").remove();
		}
	});
	$(".edFileWrap").each(function(){
		if(typeof FileReader == 'undefined'){
			$(this).find(".fileInfo").html("你的浏览器不支持FileReader接口,请升级");
			$(this).find(".edfile").remove();
		}else{
			$(this).find(".fileInfo").html("准备就绪，请选择文件！");
		}
	});

	
/*数据处理*/
	//网站留言
	$("body").on("click",".leaveBtn",function(){
		var elm = $(this).closest(".layui-layer");
		var checkInfo  = formCheck($(this).closest("form"),$(this));
		if(checkInfo.isTrue=="N"){ laymsg(checkInfo.msg,checkInfo.isTrue,'表单验证',1500); return false;}
		$.ajax({
			type: "GET",
			url:  edwin.SERVER+'ajaxLeave.html',
			data: checkInfo.data,
			success: function(msg){
				msg = $.parseJSON(msg);
				if(msg.result=="Y"){ elm.find("#feedback").find('input,textarea').val(''); }
				laymsg(msg.msg,msg.result,'留言提示');
				layer.close(Number(elm.attr("data-mark")));
			},error:function(){
				laymsg('服务器离线了，请稍候重试','N','留言提示',1500);
				layer.close(Number(elm.attr("data-mark")));
			}
		});
	})
	//删除数据
	.on("click",".ajaxDel",function(){
		if($(this).hasClass("disabled"))return false;
		var data = $(this).attr("data-mark");
		if(!data)return false;
		layer.confirm('您确定删除该数据吗？', {btn: ['确定','取消']}, function(){
			$.ajax({
				type: "GET",
				url: edwin.SERVER+'ajaxdel.html',
				data: {data:data.replace(/\|/g, ",")},
				success: function(data){
					layer.msg($.parseJSON(data));
					var int = self.setInterval(function(){window.location.reload();},1000);
				},error:function(){
					laymsg('跨域的情况下不可删除数据','N','跨域删除不用许');
				}
			});
		});
	})	
	//批量删除数据	
	.on("click",".ajaxDels",function(){
		var data ={};var m = 0;
		$(".data-tbody tr").each(function(){
			var elm = $(this).find("input[type='checkbox']");
			if(elm.is(':checked'))data[m++] = elm.attr("data-mark");
		});
		if(!data){
			return false;
		}else{
			layer.confirm('您确定删除该数据吗？', {btn: ['确定','取消']}, function(){
				$.ajax({
					type: "GET",
					url: edwin.SERVER+'ajaxdels.html',
					data: {data:data},
					success: function(data){
						layer.msg($.parseJSON(data));
						var int = self.setInterval(function(){window.location.reload();},1000);
					}	
				});
			});
		}
	})	
	//修改数据	
	.on("change",".ajaxInput,.ajaxSelect",function(){
		var data = $(this).attr("data-mark")+'|'+$(this).val();
		$.ajax({
			type: "GET",
			url: edwin.SERVER+'ajaxup.html',
			data: {data:data},
			success: function(data){
				layer.msg($.parseJSON(data));
			}
		});
	})
	//批量修改数据	
	.on("click",".ajaxUps",function(){
		console.log(1);
		var other = $(this).attr("data-mark"),data ={},m = 0;
		$(".data-tbody tr").each(function(){
			var elm = $(this).find("input[type='checkbox']");
			if(elm.is(':checked'))data[m++] = elm.attr("data-mark")+'(M)'+other;
		});
		$.ajax({
			type: "GET",
			url:edwin.SERVER+'ajaxups.html',
			data: {data:data},
			success: function(data){
				layer.msg($.parseJSON(data));
				var int = self.setInterval(function(){window.location.reload();},1000);
			}
		});
	})
	//标记删除
	.on("click",".ajaxMark",function(){
		if($(this).hasClass("disabled"))return false;
		var data = $(this).attr("data-mark");
		if(!data)return false;
		layer.confirm('您确定将该数据放入回收站吗？', {btn: ['确定','取消']}, function(){
			$.ajax({
				type: "GET",
				url: edwin.SERVER+'ajaxup.html',
				data: {data:data},
				success: function(data){	
					layer.msg(data);
					var int = self.setInterval(function(){window.location.reload();},1000);
				}
			});
		});
	})
	//查找数据		
	.on("click",".ajaxSer",function(){
		var data = $(this).attr("data-mark");
		var elm  = $(this).closest(".form-wrap");
		if(!data)return false;
		$.ajax({
			type: "GET",
			url:  edwin.SERVER+'ajaxSer.html',
			data: {data:data},
			dataType: "json",
			success: function(msg){
				ajaxSerData(elm,msg);
			}
		});
	});
});

/*  //base64文件上传代码
	function base64_upload($base64) {
		$imageAddr = str_replace(' ', '+', $base64);//post的数据加号会被替换为空格,需要重新替换,不是post的数据,注释掉这一行
		$imageAddr = explode('data:image',$imageAddr);
		$imgName = "";
		foreach($imageAddr as $key=>$val){
			if($key>=1){
				$imgAddr = 'data:image'.$val;
				if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $imgAddr, $result)){
					if($result[2] == 'jpeg'){
						$image_name = uniqid().'.jpg';//纯粹是看jpeg不爽才替换的
					}else{
						$image_name = uniqid().'.'.$result[2];
					}
					$image_file = "./Upload/edwin/".date('Y-m-d')."/".$image_name;
					mkdir("./Upload/edwin/".date('Y-m-d'));
					//服务器文件存储路径
					if (file_put_contents($image_file, base64_decode(str_replace($result[1], '', $imgAddr)))){
						if($imgName==""){
							$imgName = date('Y-m-d').'/'.$image_name; 
						}else{ 
							$imgName = $imgName.','.date('Y-m-d').'/'.$image_name;
						}
					}else{
						$imgName =  false;	break;
					}
				}else{
					$imgName =  false;	break;
				}
				
			}
		}
		return $imgName;
	}
*/