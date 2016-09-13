var webapp = angular.module('webapp',[]);
var userInfoDetail = JSON.parse(localStorage.getItem('userInfo'));
webapp.directive('aaa', function(){
	return function(scope,$element,attr){

		$element.bind('click',function(){

			$element.parent().children().removeClass('active');
			$element.addClass('active');
			
		})
	}
})

webapp.controller('userJF',function($scope,$http){
	//菜单
	$scope.liIndex = 0;
	$scope.menus = [
		//{id:0,status:'全部'},
		{id:0,status:'未确认',Text:'待处理',color:'iconOrange',btns:[{btnName:'提醒物业',color:'btnOrange'},{btnName:'取消报修',color:'btnGreen'}]},
		{id:1,status:'已确认',Text:'处理中',color:'iconOrange',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
		{id:2,status:'处理中',Text:'处理中',color:'iconGreen',btns:[{btnName:'取消报修',color:'btnGreen'},{btnName:'催促物业',color:'btnOrange'}]},
		{id:3,status:'未支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'去支付',color:'btnOrange'}]},
		{id:4,status:'部分支付',Text:'待支付',color:'iconOrange',btns:[{btnName:'继续支付',color:'btnOrange'}]},
		{id:5,status:'已支付',Text:'已支付',color:'iconBlack',btns:[{btnName:'去评价',color:'btnOrange'}]},
		{id:6,status:'处理完成',Text:'处理完成',color:'iconBlack'},
		{id:7,status:'已取消',Text:'已取消',color:'iconBlack'}
	];
	//列表内容
	$scope.items = '';

	$scope.mydata=JSON.parse(localStorage.getItem("userInfo"));
	getpersondata();
	
	console.log($scope.mydata)
	getData($scope.mydata.houseId);
	
	$scope.tabSwitch = function(a){
		$scope.liIndex = a;
	}
	function getData(houseId){
		$http({
			method:'GET',
			url:ip+'api/member/repair/list',
			params:{
				'memberId':$scope.mydata.memberId,
				'houseId':houseId
			}
		})
		.success(function(json){
			$scope.items = json.api_data;
		})
		.error(function(json){
			console.log(json);
		})
	}
//	getData($scope.mydata.houseId);
	
	
	//预约报修，选择位置
	$http({
		method:'GET',
		url:ip+'api/member/house/myHome',
		params:{
			memberId:$scope.mydata.memberId
		}
	})
	.success(function(json){
		console.log(json);
		$scope.myhousedata=json.api_data;
	})
	
	//点击下拉框赋值
	$scope.clickoption=function(id){
		console.log(id);
			$scope.inputselect=name;
			$scope.inputid=id;
			getData(id);
	}
	
	//获取个人资料
	function getpersondata(){
		$http({
			method:'GET',
			url:ip+'api/member/profile/index',
			params:{
				memberId:$scope.mydata.memberId
			}
		})
		.success(function(json){
			console.log(json+"dkifjf");
			$scope.balance=json.api_data.balacne;
			if(json.api_code=='0'){
				$scope.houseid=json.api_data.houseId;
				localStorage.setItem('userInfo',JSON.stringify(json.api_data));

			}
		})
	}

	
	//页面跳转
	$scope.itemDetail = function(id){
		window.location.href = '../person/repairDetail.html?id='+id;
	}
	//获取支付类型
	$scope.paytype=1;
	$scope.typefun=function(n,type){
		if(type==0){
			$scope.amountMoney = $scope.balance - $scope.moneys;
		}else{
			$scope.amountMoney = $scope.balance;
		}
		$scope.paytype=n;
	}
	//提醒报修
	$scope.Remind=function(id,name,money){
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
				getData($scope.mydata.houseId);
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
				$(".closediv").show();
				$(".shade").show();
				$scope.clickinfor();
				getData($scope.mydata.houseId);
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
				getData($scope.mydata.houseId);
			})
		}
		if(name=="去支付" || name=="继续支付"){
			$(".shade").show();
			$(".paydiv").show();
			$scope.moneys=money;
			console.log($scope.moneys);
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
					$(".paydiv").hide();
					$(".shade").hide();
					alert('支付成功');
					getData($scope.mydata.houseId);
				})
			})
		}
		if(name=="去评价"){
			window.location.href="repairestimate.html?id=" + id+"&memberid="+$scope.mydata.memberId;
		}
	}
	$scope.clickinfor=function(){
		$(".shade").click(function(){
			$(".commentinfor").hide();
			$(this).hide();
		});
	}
	
	
	//点击图片放大
	$scope.setbigimg=function(imgsrc){
		var html = '<div class="shade" style="display:block"></div>'+
					'<div class="imgbig commentinfor" style="width: 200px; height: 200px;display:block">'+
						'<img src="'+ imgsrc +'" style="width: 100%;height: 100%;" />'+
					'</div>'
		$('body').append(html);			
		$(".shade").click(function(){
			$(this).remove();
			$(".imgbig").remove();
		});
	}
	
	
	
})
webapp.controller('personAdCtrl',function($scope,$http){
	$scope.mydata=JSON.parse(localStorage.getItem("userInfo"));
	$scope.infor=JSON.parse(localStorage.getItem("userInfo"));
	$scope.getDataslist=function(id){
		$http({
			method:'GET',
			url:ip+'api/member/complaint/list',
			params:{
				memberId:$scope.infor.memberId,
				houseId:id,
				pageNumber:1
			}
		})
		.success(function(json){
			console.log(json);
			if(json.api_code == 0){
				$scope.itemAds = json.api_data;
			}
		})
		
	}
	$scope.getDataslist($scope.mydata.houseId);
	//预约报修，选择位置
	$http({
		method:'GET',
		url:ip+'api/member/house/myHome',
		params:{
			memberId:$scope.infor.memberId
		}
	})
	.success(function(json){
		console.log(json);
		$scope.myhousedata=json.api_data;
	})
	
	//点击下拉框赋值
	$scope.clickoption=function(id){
		console.log(id);
			$scope.inputselect=name;
			$scope.inputid=id;
			$scope.getDataslist(id);
			$scope.userHouseId = id;
	}
	
	$scope.evalStatus = [
		{id:0,name:"无语"},
		{id:1,name:"抠鼻"},
		{id:2,name:"已哭瞎"},
		{id:3,name:"已给跪"},
		{id:4,name:"火大"},
		{id:5,name:"吃一拳"}
	]
})