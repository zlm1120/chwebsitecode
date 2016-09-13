//抢相应列表
var webapp = angular.module("webApp", []);
//抢相应列表
webapp.controller('cheapCtr', function($scope, $http) {
	$scope.userdata = JSON.parse(localStorage.getItem('userInfo'));
	
	function getDate(id){
		$http({
			method: 'GET',
			url: ip + 'api/cheap/list',
			params: {
				communityId: id
			}
		})
		.success(function(json) {
			$scope.cheapdata = json.api_data;
			console.log(json.api_data);
		})
	}
	getDate($scope.userdata.communityId);
	//点击减相应列表进入详情页面
	$scope.itemclick=function(id){
		window.location.href='detail.html?id='+id;
	}
	
	$scope.changeHouse = function(id){
//		getDate(id);
		$http({
			method:'GET',
			url:ip+'api/index/cutHouse',
			params:{
				memberId:$scope.userdata.memberId,
				houseId:id
			}
		})
		.success(function(json){
			console.log(json);
			refreshUserInfo();
		})
		
		function refreshUserInfo(){
		$http({
			method:'GET',
			url:ip+'api/member/profile/index',
			params:{
				memberId:$scope.userdata.memberId
			}
		})
		.success(function(json){
			localStorage.setItem('userInfo',JSON.stringify(json.api_data));
			window.location.reload();
		})
		}
	}
	
	function getMoreList(){
		$http({
			method:'GET',
			url:ip+'api/member/house/myHome',
			params:{
				memberId:$scope.userdata.memberId
			}
		})
		.success(function(json){
			$scope.address = json.api_data;
			$scope.defalut = $scope.userdata.houseId;
		})
	}
	getMoreList();
})