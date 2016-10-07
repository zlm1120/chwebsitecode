$(function() {
	//检查电话号码
	$("#phone").blur(function() {
		checktelephone();
	});
	//检查验证码
	$("#code").blur(function() {
		chechcode(localStorage.getItem("servicecode"));
	});
	//检查密码
	$("#pass").keydown(function(){
		chechpass();
	});
	//确认密码
	$("#conpass").blur(function(){
		checkconpass();
	});
});
//验证电话号码
function checktelephone()  { 
	var mytelephone = document.getElementById("phone").value; 
	console.log(mytelephone+"djifj");
	var myDivtelephone = document.getElementById("telephone"); 
	if (mytelephone != "")  {     
		var reg = /^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/;     
		if (!reg.test(mytelephone)) {            
			myDivtelephone.innerHTML = "<font color='red'>请输入正确的手机号</font>";            
			return false;        
		}else {      
			myDivtelephone.innerHTML = "<font color='red'></font>";      
			return true;     
		} 
	} 
	else  {     
		myDivtelephone.innerHTML = "<font color='red'>请输入手机号</font>";     
		return true; 
	}
}

//验证验证码
function chechcode(servicecode) {
	var mycode = document.getElementById("code").value;
	var myDivcode = document.getElementById("mycode");
	if (mycode != "") {
		if (mycode.length > 4 || mycode.length < 4 || mycode != servicecode) {
			myDivcode.innerHTML = "<font color='red'>验证码错误!</font>";
			return false;
		} else {      
			myDivcode.innerHTML = "<font color='red'></font>";
			return true;     
		} 
	} else {
		myDivcode.innerHTML = "<font color='red'>请输入验证码</font>";
		return false;
	}
}
//验证密码
function chechpass() {
	var mypassword = document.getElementById("pass").value;
	var myDivpassword = document.getElementById("passdiv");
	if (mypassword == "") {
		myDivpassword.innerHTML = "<font color='red'>密码不能为空!</font>";
		return false;
	} else if (mypassword.length < 6 || mypassword.length>12) {
		myDivpassword.innerHTML = "<font color='red'>请输入6-12位密码!</font>";
		return false;
	} else {
		myDivpassword.innerHTML = "<font color='red'></font>";
		return true;
	}
}
//确认密码
function checkconpass(){
	var mypassword = document.getElementById("pass").value;
	var myDivpassword = document.getElementById("passdiv");
	var myconpass=document.getElementById("conpass").value;
	if(mypassword != myconpass){
		myDivpassword.innerHTML="<font color='red'>两次输入密码不一致，请核对后再试</font>";
		return false;
	}else{
		myDivpassword.innerHTML="<font color='red'></font>";
		return false;
	}
}

