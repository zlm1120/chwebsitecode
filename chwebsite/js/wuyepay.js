var webapp = angular.module('webapps', []);
webapp.controller('wuyepayCtr', function($scope, $http) {
	$scope.userDatas = JSON.parse(localStorage.getItem('userInfo'));
	$scope.totalprice = getUrlParam("payable");
	$scope.memberIds = getUrlParam('memberid');
	$scope.ids = getUrlParam('aa');
	$scope.paymoney = getUrlParam('bb');
	//获取支付类型
	$scope.paytype = 0;
	$scope.typefun = function(n, type) {
			$scope.paytype = n;
		}
		//支付接口
	$scope.funpay = function() {
		$http({
				method: 'get',
				url: ip + 'api/member/paymentCommunity/submit',
				params: {
					memberId: $scope.memberIds,
					paymentIds: $scope.ids,
					paymentMethod: $scope.paytype,
					depositFees: $scope.paymoney
				}
			})
			.success(function(json) {
				//console.log(json);
				if(json.api_code == 0) {
					//获取支付密码,如果有支付密码判断
					if($scope.userDatas.hasPayPassword) {
						$(".paypwd").show();
						$(".shade").show();
						$scope.clickbtns = function() {
							$scope.inputval = $(".paypwd input").val();
							$http({
									method: 'GET',
									url: ip + 'api/member/profile/validatePayPassword',
									params: {
										memberId: $scope.userDatas.memberId,
										password: $scope.inputval
									}
								})
								.success(function(json) {
									if(json.api_code == '1') {
										alert(json.api_message);
									} else {
										alert("缴费成功");
										$(".paypwd").hide();
										$(".shade").hide();
										window.location.href = "wuyesuccess.html";
									}
								})
						}
					} else {
						$("div.setpwd").show();
						$(".shade").show();
						$(".setpwd .comfirbtn").click(function() {
							window.location.href = "../person/mydata.html";
							$("div.setpwd").hide();
							$(".shade").hide();
						});
						$("div.setpwd .consolebtn").click(function() {
							$("div.setpwd").hide();
							$(".shade").hide();
						});
					}
				} else {
					//if($scope.userDatas.balacne < $scope.totalprice) {
						alertBox("" + json.api_message + "", 1);
						$(".shade").show();
						$(".alertBox h1").css("display", 'none');
						//点击弹出框确定按钮
						$(".alertBox .opera .onlyConfirm").on('click', function() {
							$(".alertBox").hide();
							$(".shade").hide();
						});
					//}/* else {
						//alert("接口请求失败！");
					//}*/
				}
			})
	}

})