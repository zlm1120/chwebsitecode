var webapp = angular.module("webapps", []).controller('payCtrl', function($scope, $http) {
	$scope.userdata = JSON.parse(localStorage.getItem('userInfo'));
	//获取应付金额
	$scope.nubers=getUrlParam('number');  //数量
	$scope.prices=getUrlParam('prices');  //价格
	$scope.totalprice=$scope.nubers * $scope.prices;
	//获取支付类型
	$scope.paytype=0;
	$scope.typefun=function(n,type){
		$scope.paytype=n;
	}
	//点击确认支付
	$scope.payclick = function() {
		$http({
			method: 'GET',
			url: ip + 'api/cheap/submit',
			params: {
				memberId: $scope.userdata.memberId,
				cheapId: getUrlParam('id'),
				quantity: getUrlParam('number'),
				paymentMethod:$scope.paytype
			}
		})
		.success(function(json){
			if(json.api_code==0){
				//获取支付密码,如果有支付密码判断
				if($scope.userdata.hasPayPassword){
					$(".paypwd").show();
					$(".shade").show();
					$scope.clickbtns=function(){
						$scope.inputval=$(".paypwd input").val();
						$http({
							method:'GET',
							url:ip+'api/member/profile/validatePayPassword',
							params:{
								memberId:$scope.userdata.memberId,
								password:$scope.inputval
							}
						})
						.success(function(json){
							if(json.api_code=='1'){
								alert(json.api_message);
							}else{
								window.location.href="paysuccess.html";
							}
						})
					}
				}else{
					$("div.setpwd").show();
					$(".shade").show();
					$(".setpwd .comfirbtn").click(function(){
						window.location.href="../person/mydata.html";
						$("div.setpwd").hide();
						$(".shade").hide();
					});
					$("div.setpwd .consolebtn").click(function(){
						$("div.setpwd").hide();
						$(".shade").hide();
					});
				}
			}else{
				if($scope.userdata.balacne <$scope.totalprice){
					alertBox(""+json.api_message+"",1);
					$(".shade").show();
					$(".alertBox h1").css("display",'none');
					//点击弹出框确定按钮
					$(".alertBox .opera .onlyConfirm").on('click',function(){
						$(".alertBox").hide();
						$(".shade").hide();
					});
				}else{
					$(".paypwd").show();
					$(".shade").show();
				}
			}
		});
	}
})