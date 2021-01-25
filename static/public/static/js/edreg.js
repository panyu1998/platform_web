/*
//data-reg = 'is null♗regtype♗min-max'
isAll  			 所有
isInt      	 	 整数  int(+— int)
isPosInt    	 正整数+
isNegInt    	 负整数-
isPosFloat		 匹配正浮点数
isNegFloat 		 匹配负浮点数
isTel     		 手机号码  18798076684
isPhone   		 电话号码  0851-4796169
isQq      		 QQ号码    1041661206
isIdCard  		 身份证	522129199109205011
isChinese 		 汉字  
isEngNum         小英文数字 
isUser  		 "[A-Z][a-z]_[0-9]"组成,并且第一个字必须为字母6~16位
isPass  		 6-18位 a-z 0-9
isUrl   		 url
isIp   			 ip
isHtml  		 html标签
isLatitude   	 纬度 data-reg="isNull|isLatitude|纬度(请补足4位小数)|0.0000"
isLongitude 	 经度 data-reg="isNull|isLongitude|经度(请补足4位小数)|0.0000"
*/	
//字符串长度
function stringLen(val){return val.replace(/[^\x00-\xff]/g, "xx").length;}			
function isAll(val){return 1;}
function notSupport(obj){
	reg= /[@#\$%\^&\*\"\']+/g ; 
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isInt(obj){
	reg=/^-?[1-9]\d*$/; 
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isPosInt(obj){
	reg=/^[1-9]\d*$/; 
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isNegInt(obj){
	reg=/^-[1-9]\d*$/; 
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isPosFloat(obj){
	reg=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/; 
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isNegFloat(obj){
	reg=/^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/; 
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isTel(obj){
	var phone = obj; if(!(/^1[34578]\d{9}$/.test(phone))){  return 0;}else{return 1;} 
}
function isPhone(obj){
	reg=/^(\\d{3,4}-)\\d{7,8}$/;
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isPost(obj){   
	reg=/[1-9]\\d{5}(?!\d)/; 
	if(!reg.test(obj)){return 0;}else{return 1;}   
} 
function isQq(obj){
	reg=/^[1-9][0-9]{4,9}$/;
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isIdCard(obj){
	reg=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	if(!reg.test(obj)){return 0;}else{return 1; }   
}
function isEmail(obj){   
	reg=/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/; 
	if(!reg.test(obj)){return 0;}else{return 1;}   
} 
function isChinese(obj){   
	 reg=/^[\u2E80-\u9FFF]+$/;   
	if(!reg.test(obj)){return 0;}else{return 1;}   
}
function isChineseAndEng(obj){   
	reg=/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/; 
	if(!reg.test(obj)){return 0;}else{return 1;}   
}  
function isEngNum(obj){
	reg=/^[a-z0-9]{3,24}$/;
	if(!reg.test(obj)){return 0;}else{return 1;}   
}
function isUser(obj){   
	reg=/^[a-zA-Z]\w{5,15}$/;
	if(!reg.test(obj)){return 0;}else{return 1;}   
} 
function isPass(obj){   
	reg=/^[a-z0-9_-]{6,18}$/;
	if(!reg.test(obj)){return 0;}else{return 1;}   
} 
function isUrl(obj){   
	reg=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
	if(!reg.test(obj)){return 0;}else{return 1;}   
} 
function isIp(obj){   
	reg=/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	if(!reg.test(obj)){return 0;}else{return 1;}   
} 
function isHtml(obj){   
	reg=/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
	if(!reg.test(obj)){return 0;}else{return 1;}   
} 
//经度
function isLongitude(obj){
	reg=/^[0-9]\d*\.[0-9]/; 
	if(!reg.test(obj)){
		return 0;
	}else{
		var num = Number(obj);
		if( num<0 || num>180){
			return 0;
		}else{
			return 1;
		}
	} 
} 
//纬度
function isLatitude(obj){   //weidu
	reg=/^[0-9]\d*\.[0-9]/; 
	if(!reg.test(obj)){
		return 0;
	}else{
		var num = Number(obj);
		if( num<0 || num>90){
			return 0;
		}else{
			return 1;
		}
	}   
}