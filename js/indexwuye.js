var webapp=angular.module('webapp',[]);
webapp.controller('wuyeCtr',function($http,$scope){
	$scope.userdatas=JSON.parse(localStorage.getItem('userInfo'));
	$scope.notmoneyList=function(){
		$http({
			method:'GET',
			url:ip+'api/member/paymentCommunity/index',
			params:{
				memberId:$scope.userdatas.memberId,
				//houseId:$scope.userdatas.houseId
			}
		})
		.success(function(json){
			console.log(json);
			$scope.jsondatas=json.api_data;
		})
	}
	$scope.notmoneyList()
	
	//点击查看的时候
	$scope.clickgreenText=function(type){
		$(".listContent tbody tr td.lasttds").click(function(){
			$(".shade").show();
			$(".paymentHis").show();
		});
		$(".shade").click(function(){
			$(".shade").hide();
			$(".paymentHis").hide();
		});
		$http({
			method:'GET',
			url:ip+'api/member/paymentCommunity/list',
			params:{
				memberId:$scope.userdatas.memberId,
				houseId:$scope.userdatas.houseId,
				type:type,
				pageNumber:1
			}
		})
		.success(function(json){
			console.log(json);
			$scope.rocodelist=json.api_data;
		});
	}
	//一键支付
	$scope.payclicks=function(){
		$scope.ids='';
		var paymoney = '';
		var money;
		$(".listContent tbody tr label").each(function(){
			if($(this).hasClass("checked")){
				if($(this).parent().parent().find('input').val()=='' || isNaN($(this).parent().parent().find('input').val())){
					money=0;
				}else{
					money=parseFloat($(this).parent().parent().find('input').val());
				}
				$scope.ids += $(this).data('parmentids') + ',';
				paymoney += money + ',';
//				$scope.ids.push({"paymentid":$(this).data('parmentids'),"paymoney": paymoney});
			}
		});
		$scope.ids = $scope.ids.substr(0,$scope.ids.length - 1);
		paymoney = paymoney.substr(0,paymoney.length -1);
		
		console.log("ids="+$scope.ids,"paymoney="+paymoney);
		$scope.payables=parseFloat($("#sum i").text());
		window.location.href="wuyepay.html?memberid="+$scope.userdatas.memberId+"&payable="+$scope.payables +'&aa='+$scope.ids + '&bb=' + paymoney;
	}
})