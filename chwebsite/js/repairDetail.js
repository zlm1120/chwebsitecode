angular.module('webapp',[])
.controller('repairDetail',function($scope,$http,$sce){
	$scope.repairId = getUrlParam('id');
	$http({
		method:'GET',
		url:ip+'api/member/repair/view',
		params:{
			repairId:$scope.repairId
		}
	}).success(function(json){
		var data = json.api_data;
		$scope.title = data.repair.repairTypeName;
		$scope.status=data.repair.repairStatus;
		$scope.repair = data.repair;
		$scope.repairIds=data.repairContactsId;
		$scope.records = data.records;
		$scope.reviews = data.review;
		if(data.review.reviewScore != undefined){
		var ahtml = '';
		for(var i = 0;i<data.review.reviewScore;i++){
			ahtml += '<i class="redHeart"></i>';
		}
		for(var i = 0;i>5-data.review.reviewScore;i++){
			ahtml += '<i class="greyHeart"></i>';
		}
		console.log(ahtml)
		$scope.starbox = $sce.trustAsHtml(ahtml);
		}
//		$(function(){
//			$("#starBox").html(ahtml)		
//			
//		})


	});
	//状态数组
	$scope.menus = [
		//{id:0,status:'全部'},
		{id:0,status:'未确认',Text:'待处理',color:'iconOrange',btns:[{btnName:'提醒物业',color:'btnOrange'},{btnName:'取消报修',color:'btnGreen'}]},
		{id:1,status:'已确认',Text:'处理中',color:'iconOrange',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
		{id:2,status:'处理中',Text:'处理中',color:'iconGreen',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
		{id:3,status:'未支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'去支付',color:'btnOrange'}]},
		{id:4,status:'部分支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'继续支付',color:'btnOrange'}]},
		{id:5,status:'已支付',Text:'已支付',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
		{id:6,status:'处理完成',Text:'处理完成',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
		{id:7,status:'已取消',Text:'已取消',colur:'iconBlack'}
	];
	//左边的状态数组
//	$scope.leftstatus=[
//		{id:0,status:'未确认',Text:'待处理',color:'iconOrange',btns:[{btnName:'提醒物业',color:'btnOrange'},{btnName:'取消报修',color:'btnGreen'}]},
//		{id:1,status:'已确认',Text:'处理中',color:'iconOrange',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
//		{id:2,status:'处理中',Text:'处理中',color:'iconGreen',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
//		{id:3,status:'未支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'去支付',color:'btnOrange'}]},
//		{id:4,status:'部分支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'继续支付',color:'btnOrange'}]},
//		{id:5,status:'已支付',Text:'已支付',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
//		{id:6,status:'处理完成',Text:'处理完成',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
//		{id:7,status:'已取消',Text:'已取消',colur:'iconBlack'}
//	]
	
	$scope.Remind=function(id,name){
		if(name=="提醒物业"){
			//提醒报修
			$http({
				method:'GET',
				url:ip+'api/member/repair/remind',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				$(".remind").show();
				$(".shade").show();
				$scope.clickinfor();
				getData();
			})
		}
		if(name=="取消报修"){
			$http({
				method:'GET',
				url:ip+'api/member/repair/cancel',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				console.log(json+"取消报修");
				//window.location.reload(true);
			})
		}
		if(name=="催促物业"){
			$http({
				method:'GET',
				url:ip+'api/member/repair/urge',
				params:{
					memberId:$scope.mydata.memberId,
					repairId:id
				}
			})
			.success(function(json){
				$(".urge").show();
				$(".shade").show();
				$scope.clickinfor();
				getData();
			})
		}
		if(name=="去支付" || name=="继续支付"){
			$(".shade").show();
			$(".paydiv").show();
			$(".btnpay").click(function(){
				$http({
					method:'GET',
					url:ip+'api/member/repair/payment',
					params:{
						memberId:$scope.mydata.memberId,
						repairId:id,
						paymentMethod:$scope.paytype
					}
				})
				.success(function(json){
					console.log(json+"dhfuhdf");
//					$(".paydiv").hide();
//					$(".shade").hide();
				})
			})
		}
		if(name=="去评价"){
//			sessionStorage.setItem("repaireid",id);
			window.location.href="repairestimate.html?id=" + id+"&memberid="+$scope.mydata.memberId;
		}
	}
	
	
	$(function(){
//		getLineHeight();
	})
	
	function getLineHeight(){
		var item = $('.tapGroup .item');
		console.log(item);
		if(item.length>1){
			var lineHeight = $(item[item.length-1]).find('.circle').offset().top - $(item[0]).find('.circle').offset().top; 
		}
		console.log(lineHeight);
		$('.line').css('height',lineHeight);
		$('.line').css('top',$(item[0]).find('.circle').offset().top)
	}
})
//.directive('line',function(){
//	return {
//		restrict:"C",
//		link:function(scope,element,attr){
//			console.log(element)
//			var item = $('.tapGroup .item');
//			if(item.length>1){
//				var lineHeight = $(item[item.length-1]).find('.circle').offset().top - $(item[0]).find('.circle').offset().top; 
//			}
//			console.log(lineHeight);
//			$(element).css('height',lineHeight);
//			$(element).css('top',$(item[0]).find('.circle').offset().top)
//		}
//	}
//})