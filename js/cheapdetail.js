var webapp=angular.module('webapp',[]);
//捡相应详情
webapp.controller('detailCtr',function($scope,$http){
	$scope.userdata = JSON.parse(localStorage.getItem('userInfo'));
	//捡相应列表详情
	$scope.cheapid=getUrlParam('id');
	console.log($scope.cheapid);
	$http({
		method:'GET',
		url:ip+'api/cheap/view',
		params:{
			cheapId:$scope.cheapid,
			memberId:$scope.userdata.memberId
		}
	})
	.success(function(json){
		$scope.detaildata=json.api_data;
		$scope.status=json.api_data.status;
	})
	
	//立即抢购，判断是否已经购买过
	$scope.statusfun=function(id,price){
		var numbertotal=$(".numbertotal").text();
		if($scope.status=='1'){
			alertBox("抱歉，每个用户仅限参与一次",1);
//			$(".shade").show();
//			$(".alertBox h1").css("display",'none');
			//点击弹出框确定按钮
			$(".alertBox .opera .onlyConfirm").on('click',function(){
				$(".alertBox").remove();
//				$(".shade").hide();
			});
		}else{
			window.location.href="payfor.html?id="+id+"&number="+numbertotal+"&prices="+price;
			//window.location.href="payfor.html?id="+encodeURI(""+id+"")+"&number="+numbertotal+"&prices="+price;
		}
	}
})