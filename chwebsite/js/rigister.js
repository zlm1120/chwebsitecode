$(function() {
	/*
	 * 模拟复选框
	 */
	$('.checkboxcomm label').click(function() {
		var radioId = $(this).attr('name');
		$('.checkboxcomm label').removeAttr('class') && $(this).attr('class', 'checked');
		$('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
	});
	/*
	 * form-control 获得/失去焦点事件
	 */
	$('.form-control').focus(function() {
		$(this).addClass('activeinput');
	});
	$('.form-control').blur(function() {
		$(this).removeClass('activeinput');
	});
	/*
	 * 定义公共变量
	 */
	var inputphone, inputpass, inputconpass,hasReg = false;
	var $span = $(".specialinfor");
	/*
	 * 判断手机号是否存在
	 */
	
	function isHasPhone(){
		inputphone = $('#phone').val();
		console.log(inputphone);

		$.ajax({
			type: "get",
			url: ip+'api/common/mobileExists',
			async: false,
			cache: false,
			dataType: "json",
			data: {
				mobile: inputphone
			},
			success: function(json) {
				//已经存在手机号
				if (json.api_code =="0") {
					console.log(json);
					if (json.api_data==true) {
						$span.hide();
						$("#telephone").html("<font color='red'>该手机号已注册</font>");
						$("#telephone").show();	
						hasReg = true;
					}
				}
			},
			error: function(json) {}
		});
	}
	
	$('#phone').blur(function() {
		isHasPhone();
	});
	
	
	var sec,int;
	var cutdown = function(){
	  sec--;
	  $(".rigistercon b").html(sec+'s');
	  if(sec < 1){
	    $(".rigistercon b").css('background','#01BF71');
	    $(".rigistercon b").html('获取验证码');
	    clearInterval(int);
	    $(".rigistercon b").removeClass('mui-disabled');
	  }
	}
	
	function secEndTime(obj){
	  obj.addClass('mui-disabled')
	  sec = 59;
	  $(".rigistercon b").html(sec+'s');
	//  obj.off();
	  int = setInterval(function(){
	  	cutdown();
	  },1000);
	   $(".rigistercon b").css('background','#cccccc');
	}
	
	
	
	/*
	 * 获取验证码
	 */
	$(".rigistercon b").click(function() {
		hasReg = false;
		isHasPhone();
		if(hasReg == true){
			return false;
		}
		inputphone = $('#phone').val();
		if(!isMobile.test(inputphone)){
			return false;
		}

		if(!$(".rigistercon b").hasClass('mui-disabled')){
			secEndTime($(this));
		}else{
			return false;
		}
		
		$.ajax({
			type: "post",
			url: ip+'api/common/getCode',
			async: true,
			cache: false,
			dataType: "json",
			data: {
				mobile: inputphone
			},
			success: function(json) {
				if (json.api_code == "0") {
					$(".codegroup input").val(json.api_data);
					console.log(json);
					localStorage.setItem("servicecode", json.api_data);
				} else {
					$("#mycode").html("<font color='red'>" + json.api_message + "</font>");
				}
			},
			error: function(json) {}
		});
	});
	/*引用头部和底部页面*/
	$.ajax({
		type: "get",
		url: 'http://' + window.location.host + "/chwebsite/commentPage/01header.html",
		async: true,
		success: function(json) {
			$('.headerwrapper').html(json);
		}
	});
	$.ajax({
		type: "get",
		url: 'http://' + window.location.host + "/chwebsite/commentPage/footer.html",
		async: true,
		success: function(json) {
			$('.footerwrapper').html(json);
		}
	});

	//提交注册表单
	$(".rigistercon .submitbtn").click(function() {
		inputphone = $("#phone").val();
		inputpass = $("#pass").val();
		inputconpass=$("#conpass").val();
		inputCode = $("#code").val();
		var code=$("#code").val();
		if(inputphone==="" || inputphone===undefined){
			checktelephone();
			return false;
		}
		if(code=="" || code==undefined){
			chechcode(localStorage.getItem("servicecode"));
			return false;
		}
		if(inputpass.length < 6 || inputpass.length > 12){
					document.getElementById("passdiv").innerHTML = "<font color='red'>请输入6-12位密码!</font>";
					return false;
		}
		if(inputconpass != inputpass){
			document.getElementById("passdiv").innerHTML = "<font color='red'>两次输入密码不一致，请核对后再试</font>";
					return false;
		}
		if(!$(".agreement label").hasClass('checked')){
			$("#faq").html('<font color="red">同意服务条款才可注册</font>');
			return false;
		}
			$("#code").next().hide();
			$.ajax({
				type: "get",
				url: ip+'api/member/register/submit',
				async: true,
				dataType: "json",
				data: {
					username: inputphone,
					password: inputpass,
					validateCode:inputCode
				},
				success: function(json) {
					console.log(json);
					if(json.api_code == 0){
						alert('注册成功');
						localStorage.setItem('userInfo',JSON.stringify(json.api_data));
						window.location.href="../index.html";
					}else{
						$("#code").next().html(json.api_message);
						$("#code").next().show();
					}

				}
			});
	});
	//隐藏光标
	$(".commnity input.commnityname").focus(function(){
		$(this).attr("readonly",true);
	});
});