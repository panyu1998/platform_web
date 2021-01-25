/**
	Admin:Edwin
	Time:2015年6月6日
*/

$(document).ready(function(){ 
	xOffset = -12; yOffset = 12; 
	$("body").on("mouseenter",".ed-hover",function(e){
		if($(this).attr("data-hover")!=""){
			var hoverhtml = $(this).attr("data-hover").replace(/\n/g,"<br/>");
			$("body").append('<div class="ed-hovdata">'+hoverhtml+'</div>');
			$(".ed-hovdata").css('display', 'block').css("top",(e.pageY - xOffset) + "px") 
			.css("left",(e.pageX + yOffset) + "px").fadeIn("slow"); 
			var width  =  $(this).attr("data-width");
			var height =  $(this).attr("data-height");
			if( !width || !height){  }
			else{$(".ed-hovdata").css({"width":width,"height":height});}
		}
	});
	$("body").on("mouseleave",".ed-hover",function(e){ $(".ed-hovdata").remove(); }); 
	$("body").on("mousemove",".ed-hover",function(e){ 
		$(".ed-hovdata").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px"); 
	}); 
	$(".ed-tag").each(function(){
		var dataColc = $(this).css('border-top-color');
		var dataPosi = $(this).attr("data-pos");
		var dataSize = Number($(this).attr("data-size"));
		switch(dataPosi){
			case "top":$(this).children("em,span").css("left",dataSize);
			$(this).children("em").css("border-color","transparent transparent "+dataColc+"").css("top","-24px");
			$(this).children("span").css("border-color","transparent transparent #FFF").css("top","-23px");
			break;			
			case "bottom":$(this).children("em,span").css("left",dataSize);
			$(this).children("em").css("border-color",""+dataColc+" transparent transparent").css("bottom","-24px");
			$(this).children("span").css("border-color","#FFF transparent transparent").css("bottom","-23px");
			break;
			case "left":$(this).children("em,span").css("top",dataSize);
			$(this).children("em").css("border-color","transparent "+dataColc+" transparent transparent").css("left","-24px");
			$(this).children("span").css("border-color","transparent #FFF transparent transparent").css("left","-23px");
			break;
			case "right":$(this).children("em,span").css("top",dataSize);
			$(this).children("em").css("border-color","transparent transparent transparent  "+dataColc+"").css("right","-24px");
			$(this).children("span").css("border-color","transparent transparent transparent  #FFF").css("right","-23px");
			break;
			default:$(this).children("em,span").remove();
		}
	});	
	$(".ed-menu").parent("div").hoverDelay({
		hoverDuring : 200,
		outDuring : 500,
		hoverEvent : function(that) {
			$(that).addClass("open");
			$(that).find(".ed-menu-div").slideDown("slow");
		},
		outEvent : function(that) {
			$(that).removeClass("open");
			$(that).find(".ed-menu-div").slideUp("slow");
		}
	});
	
	/*
	$(document).bind("click",function(e){
	var target = $(e.target);
		if(target.closest(".ed-menu").length == 0){
			$(".ed-menu-div").hide();
		}
	});
	$('body').on('click','.ed-menu',function(){
		$(".ed-menu-div").toggle();
	});
	*/
}); 















//日期

//两个日期相差天数 eg: DateDiff('2010-01-01','2015-09-22');
function DateDiff(sDate1, sDate2) {
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("/")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //轉換為12-18-2002格式
	aDate = sDate2.split("/")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //把相差的毫秒數轉抽象為天數
	return iDays
}
//日期相加天数得到新日期 eg: AddDays('2010-01-01','10');
function AddDays(date,days){
	var nd = new Date(date);
	nd = nd.valueOf();
	nd = nd + days * 24 * 60 * 60 * 1000;
	nd = new Date(nd);
	var y = nd.getFullYear();
	var m = nd.getMonth()+1;
	var d = nd.getDate();
	if(m <= 9) m = "0"+m;
	if(d <= 9) d = "0"+d; 
	var cdate = y+"-"+m+"-"+d;
	return cdate;
}
//获得某年某月多少天 eg: getDaysInMonth('2010','10');
function getDaysInMonth(year,month){ 
	month = parseInt(month,10);
	var temp = new Date(year,month,0); 
	return temp.getDate(); 
}





$(document).ready(function(){
/* 下拉菜单start */
	$(document).bind("click",function(e){var target = $(e.target);if(target.closest(".ed-menu").length == 0){$(".ed-menu-ul").hide();}});
	$(".ed-menu").click(function(){$(".ed-menu-ul").toggle();});
/*下拉菜单 end */ 

	var edmove =  $(".map-con");
	edmove.mousedown(function(e)//e鼠标事件  
	{  
		$(this).css("cursor","move");//改变鼠标指针的形状  
		edmove.fadeTo(20, 0.25);//点击后开始拖动并透明显示  
		var offset = $(this).offset();//DIV在页面的位置  
		var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离  
		var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离  
		$(document).bind("mousemove",function(ev)//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件  
		{  
			edmove.stop();//加上这个之后   
			var _x = ev.pageX - x;//获得X轴方向移动的值  
			var _y = ev.pageY - y;//获得Y轴方向移动的值   
			edmove.animate({left:_x+"px",top:_y+"px"},10);  
		});  
	});  
	$(document).mouseup(function()  
	{  
		edmove.css("cursor","default");  
		edmove.fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
		$(this).unbind("mousemove");  
	})  
});