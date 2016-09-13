//var ip = 'http://101.201.222.160:8083/lzj-api/';
var ip = 'http://192.168.1.115:8080/lzj-api/';

//var ImgIp = 'http://101.201.222.160:8083/lzj-image/';
var ImgIp = 'http://192.168.1.115:8888/lzj-image/';
var isMobile = /^(((13[0-9]{1})|(18[0-9]{1})|(17[6-9]{1})|(15[0-9]{1}))+\d{8})$/; //手机号码验证规则
var userInfo = JSON.parse(localStorage.getItem('userInfo'));

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
var alertStatus;

function alertBox(content, type) {
	if($(".alertBox").length == 0) {
		alertStatus = undefined;
		var html = '';
		if(type == 2) {
			html = '<div class="alertBox">' +
				'<h1>提示信息</h1>' +
				'<p>' + content + '</p>' +
				'<div class="opera">' +
				'<span class="confirm">确定</span>' +
				'<span class="cancel">取消</span>' +
				'</div>' +
				'</div>'
		} else if(type == 1) {
			html = '<div class="alertBox">' +
				'<h1>提示信息</h1>' +
				'<p>' + content + '</p>' +
				'<div class="opera">' +
				'<span class="onlyConfirm">确定</span>' +
				'</div>' +
				'</div>'
		}
		$("body").append(html);

		$('.alertBox').hover(
			function() {
				alertStatus = true;
			},
			function() {
				alertStatus = false;
			}
		)
//		$(body).on('click',function() {
//			if(!alertStatus)
//				$(".alertBox").remove();
//		})
	}
}

var $floatUser = $(".floatUser");
var $logout = $("#logout");

$("header").delegate('.userName', 'click', function() {
	var $floatUser = $(".floatUser");

	$floatUser.css('display') == "block" ? $floatUser.hide() : $floatUser.show();
});

$("header").delegate('#logout', 'click', function() {

	localStorage.removeItem('userInfo');
	if(window.location.href.indexOf('chwebsite/index.html') > 0) {
		window.location.href = '01Login/Login.html'
	} else {
		window.location.href = '../01Login/Login.html'
	}
});

$("header").delegate('.menuBar li:nth-child(5)', 'click', function() {

	if($('.dropList').css('display') == 'block') {
		$('.dropList').css('display', 'none');
	} else { 
		$('.dropList').css('display', 'block');
	}
	//	$('.dropList').css('display') == "none" ? $('.dropList').css('display', 'block') : $('.dropList').css('display', 'none');
})

$logout.click(function() {
	localStorage.removeItem('userInfo');
	if(window.location.href.indexOf('chwebsite/index.html') > 0) {
		window.location.href = '01Login/Login.html'
	} else {
		window.location.href = '../01Login/Login.html'
	}
})

$("body").on('click',function(e) {
	$this = $(this);
	var obj = e.target;
	if($(obj).hasClass('userName') == false) {
		$(".floatUser").hide();
	}
	if(!$(obj).hasClass('repair')) {
		$(".dropList").hide();
	}
	if(!$(obj).hasClass('houseChange')) {
		$(".floatHouse").hide();
	}
	if($(obj).hasClass('cancel')) {
		$('.alertBox').remove();
	}

	//	if(alertStatus != undefined){
	//		if(!alertStatus){
	//			$('.alertBox').remove();
	//		}
	//	}else{
	//		if($('.alertBox').length > 0){
	//				console.log(alertStatus);
	//			if(alertStatus != undefined){
	//				if(!alertStatus){
	//					$(".alertBox").remove()
	//				}
	//			}else{
	//				$(".alertBox").remove();	
	//			}
	//		}
//	//	}
//	setTimeout(function(){
//		console.log(alertStatus);
		if($(".alertBox").length > 0){
			if(alertStatus != undefined){
				if(!alertStatus){
					$(".alertBox").remove();
				}
			}
		}
//		},2000)
})

//前端部分公共头部
$.ajax({
	type: "get",
	url: "../commentPage/header.html",
	async: true,
	success: function(json) {
		$(".commHead").html(json);
		var user = JSON.parse(localStorage.getItem('userInfo'));
		if(user == null) {
			$("#loginBox").show();
		} else {
			if(user.avatar != '') {
				$(".userImg").attr('src', user.avatar);
			} else {
				$(".userImg").attr('src', 'img/avator.png');
			}
			$(".userName").html(user.name)
			$("#hasLogin").show();
		}
	}
});


