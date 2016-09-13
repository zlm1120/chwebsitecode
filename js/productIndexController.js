var webapp = angular.module('webApp',[]);
webapp.controller('merchantCategory',function($scope,$http){
	$scope.showList=true;
	$scope.cateIndex=0;
	
	//奇数偶数
	$scope.stoneEven = 0;
	$scope.stoneOdd = 1;
	
	$http({
		method:'GET',
		url:ip+'api/product/categorys',
		params:{
			//communityId:userInfo.communityId
		}
	})
	.success(function(json){
		if(json.api_code==0){
			$scope.categorys = json.api_data;
		}
	})
	
	$scope.more=function(){
		$scope.showList= !$scope.showList;
	}
	
	$scope.categoryPro=function(name,n){
		$scope.cateIndex=n;
		$http({
			method:'GET',
			url:ip+'api/product/merchants',
			params:{
				categoryName:name
			}
		})
		.success(function(json){			
			if(json.api_code==0){
				$scope.merchants = json.api_data;
			}
		})
	}
	$scope.categoryPro('',0);
})
webapp.directive('starnum',function(){
	return {
		link:function(scope,ele,attr){
			var str='';
			for (var i=0;i<attr.score;i++) {
				str+='<i class="redHeart" ></i>';
			}
			for (var i=0;i<5-attr.score;i++) {
				str+='<i class="greyHeart"></i>';
			}
			
			ele.html(str);
		}
	}
})
webapp.controller('grouponController',function($scope,$http){
	$http({
		method:'GET',
		url:ip+'api/groupon/list',
		params:{
			//communityId:userInfo.communityId
			pageNumber:1,
			pageSize:3
		}
	})
	.success(function(json){
		if(json.api_code==0){
			$scope.groupon = json.api_data;
		}
	})
})