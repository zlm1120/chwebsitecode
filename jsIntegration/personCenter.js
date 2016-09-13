//个人中心 
var wabapp = angular.module('webapp', []);
/*支付密码管理*/
wabapp.controller('paymentPwdCtr', function($scope, $http) {
	$scope.uerdatas = JSON.parse(localStorage.getItem('userInfo')); //获取登录时存的localStorage
	//判断用户是否设置了支付密码，如果没有显示setPayPwd的内容，如果有就显示modeChange的内容
	if($scope.uerdatas.hasPayPassword) { //有支付密码
		$(".setPayPwd").css("display", 'none'); //设置支付密码div隐藏
		//给modeChange下的title的span绑定点击事件，如果点击了记得原支付密码Originalpwdx显示，忘记原支付密码content显示
		$(".modeChange .title span").click(function() {
			var dataindex;
			$(this).addClass("active").siblings().removeClass("active");
			if($(this).hasClass("active")) {
				dataindex = $(this).data("index");
			}
			if(dataindex == '1') {
				$(".modeChange .content").hide();
				$(".modeChange .Originalpwd").show();
				$(".modeChange .Originalpwd .confirm").click(function() {
					$scope.btnclick('Originalpwd');
				})
			} else {
				$(".modeChange .Originalpwd").hide();
				$(".modeChange .content").show();
			}
		});
	} else {
		$(".setPayPwd").show();
		$(".modeChange").hide();
	}
	//点击验证码的时候调用验证码接口
	$scope.verCodeClick = function() {
			$http({
					method: 'GET',
					url: ip + 'api/common/getCode',
					params: {
						mobile: $scope.uerdatas.username
					}
				})
				.success(function(json) {
					$scope.valicode = json.api_data;
					$(".changePayPwd .code input").next().next().text('');
				})
		}
		//input blur事件验证验证码
	function VerificationBlyr(type) {
			$http({
				method: 'GET',
				url: ip + 'api/common/validateCode',
				params: {
					mobile: $scope.uerdatas.username,
					code: $scope.valicode
				}
			})
			.success(function(json) {
				if(json.api_code == '0') {
					$(".changePayPwd .code input").next().next().text('');
					setPayPwd(type);
				} else {
					$(".changePayPwd .code input").next().next().text(json.api_message);
				}

			});

	}
	//验证密码是否输入格式正确，长度为6到12位
	var regs = /^[a-zA-Z]\w{6,12}$/;
	$(".payPwd").delegate(".inputpwd input[type=password]", 'blur', function() {
		if(regs.test($(this).val())) {
			$(this).next().text('');
		} else {
			$(this).next().text("请输入以字母开头的6-12位子母和数字");
		}
	});
	//验证再次输入支付密码
	$(".payPwd").delegate(".secoundpwd input[type=password]", 'blur', function() {
		var scoundpwd = $(this).val();
		var firstpwd = $(this).parent().prev().find("input[type=password]").val();
		console.log("firstpwd=" + firstpwd + "scoundpwd" + scoundpwd);
		if(scoundpwd != firstpwd) {
			$(this).next().text("两次输入密码不一样");
		} else {
			$(this).next().text('');
		}
	});
	//点击确定按钮,如果没用支付密码
	$scope.btnclick = function(type) {
		if(type == 1) {

			if($(".changePayPwd .code input").val() == '' || $(".changePayPwd .code input") == undefined) {
				$(".changePayPwd .code input").next().next().text("请输入验证码！");
			} else {
				VerificationBlyr(type);
			}
		} else if(type == 2) {
			if($(".changePayPwd .foreverPwd input").val() == '' || $(".changePayPwd .foreverPwd input").val() == undefined) {
				$(".changePayPwd .foreverPwd input").next().next().text("请输入原密码！");
			} else {
				valiForeverPwd(type);

			}
		} else {
			setPayPwd(type);
		}
	}

	function valiForeverPwd(type) {
		var status;
		$(".changePayPwd .foreverPwd input").next().next().text('');
		$http({
				method: 'GET',
				url: ip + 'api/member/profile/validatePayPassword',
				params: {
					memberId: $scope.uerdatas.memberId,
					password: $(".changePayPwd .foreverPwd input").val()
				}
			})
			.success(function(json) {

				if(json.api_code == 0) {
					status = true;
					$(".changePayPwd .foreverPwd input").next().text('');
					setPayPwd(type);
				} else {
					status = false;
					$(".changePayPwd .foreverPwd input").next().text(json.api_message);

				}
			})
		return status;
	}

	function setPayPwd(type) {
		if(!regs.test($(".changePayPwd .inputpwd input").eq(type).val())) {
			$(".changePayPwd .inputpwd input").next().text("请输入以字母开头的6-12位子母和数字");
		} else if($(".changePayPwd .secoundpwd input").eq(type).val() != $(".changePayPwd .inputpwd input").eq(type).val()) {
			$(".changePayPwd .inputpwd input").next().text(" ");
			$(".changePayPwd .secoundpwd input").eq(type).next().text("两次输入密码不一样！");
		} else {
			$(".changePayPwd .secoundpwd input").eq(type).next().text("");
			$http({
					method: 'GET',
					url: ip + 'api/member/profile/payPassword',
					params: {
						memberId: $scope.uerdatas.memberId,
						password: $(".changePayPwd .inputpwd input").eq(type).val()
					}
				})
				.success(function(json) {
					console.log(json);
					if(json.api_code == 0) {
						alert('成功')
					}
				})
		}
	}

});